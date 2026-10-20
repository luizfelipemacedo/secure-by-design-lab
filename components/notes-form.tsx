"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notesSchema, type NotesInput } from "@/lib/auth-schema";

export function NotesForm() {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<NotesInput>({ resolver: zodResolver(notesSchema), defaultValues: { title: "", content: "" } });

  async function onSubmit(values: NotesInput) {
    setMessage(null);
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(values),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(data.error ?? "Não foi possível enviar a nota.");
      return;
    }
    setMessage(data.message ?? "Nota enviada.");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="note-title">Título</FormLabel>
            <FormControl><Input id="note-title" placeholder="Ex.: Revisão de acesso" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="note-content">Nota ou comentário</FormLabel>
            <FormControl><Textarea id="note-content" placeholder="Escreva uma observação para a equipe de segurança." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Enviando..." : "Enviar nota"}</Button>
      </form>
    </Form>
  );
}

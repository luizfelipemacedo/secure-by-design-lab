"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/auth-schema";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(values),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setServerError(data.error ?? "Não foi possível entrar. Tente novamente.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormControl><Input id="email" type="email" autoComplete="username" placeholder="user@security.local" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <FormControl><Input id="password" type="password" autoComplete="current-password" placeholder="Sua senha" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {serverError && <p role="alert" className="text-destructive text-sm">{serverError}</p>}
        <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Verificando..." : "Entrar com segurança"}
        </Button>
      </form>
    </Form>
  );
}

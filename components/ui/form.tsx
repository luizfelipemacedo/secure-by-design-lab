"use client";

import * as React from "react";
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = { name: TName };
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return <FormFieldContext.Provider value={{ name: props.name }}><Controller {...props} /></FormFieldContext.Provider>;
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  return { name: fieldContext.name, ...fieldState };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error } = useFormField();
  return <Label className={cn(error && "text-destructive", className)} {...props} />;
}

function FormControl({ children }: { children: React.ReactElement<Record<string, unknown>> }) {
  const { error, name } = useFormField();
  return React.cloneElement(children, { name, "aria-invalid": Boolean(error), "aria-describedby": `${name}-form-message` });
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, name } = useFormField();
  if (!error) return null;
  return <p id={`${name}-form-message`} className={cn("text-destructive text-sm", className)} {...props}>{String(error.message)}</p>;
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField };

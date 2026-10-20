import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Informe um e-mail válido.")
  .max(254, "O e-mail é muito longo.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(12, "A senha deve ter pelo menos 12 caracteres.")
    .max(128, "A senha é muito longa.")
    .regex(/^[^\u0000-\u001F\u007F]*$/, "A senha contém caracteres inválidos."),
});

export const notesSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe um título.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  content: z
    .string()
    .trim()
    .min(1, "Informe uma nota.")
    .max(2000, "A nota deve ter no máximo 2000 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type NotesInput = z.infer<typeof notesSchema>;

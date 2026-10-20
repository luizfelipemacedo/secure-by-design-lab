import "server-only";

import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { loginSchema, notesSchema } from "@/lib/auth-schema";

const sanitizeText = (value: string) =>
  sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  }).trim();

export const serverLoginSchema = loginSchema;

export const serverNotesSchema = notesSchema.transform(({ title, content }) => ({
  title: sanitizeText(title),
  content: sanitizeText(content),
})).pipe(
  z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(2000),
  }),
);

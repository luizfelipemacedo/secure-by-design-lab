import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { serverNotesSchema } from "@/lib/server-schemas";
import { isSameOrigin } from "@/lib/request-security";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 403 });
  }

  const user = await requireUser();
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const parsed = serverNotesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revise os campos informados." }, { status: 400 });
  }

  // The prototype deliberately does not persist notes. Only sanitized data reaches this boundary.
  return NextResponse.json({
    ok: true,
    message: `Nota recebida com segurança para ${user.email}.`,
    note: parsed.data,
  });
}

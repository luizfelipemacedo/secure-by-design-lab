import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/session";
import { isSameOrigin } from "@/lib/request-security";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 403 });
  }

  await clearSession();
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { loginSchema } from "@/lib/auth-schema";
import { createSession } from "@/lib/session";
import { clearFailedLogins, isLoginBlocked, registerFailedLogin } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/request-security";

const genericFailure = "Não foi possível autenticar. Verifique os dados e tente novamente.";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: genericFailure }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  const email = parsed.success ? parsed.data.email : "invalid";
  const clientKey = `${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"}:${email}`;

  if (isLoginBlocked(clientKey)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  if (!parsed.success) {
    registerFailedLogin(clientKey);
    return NextResponse.json({ error: genericFailure }, { status: 400 });
  }

  const user = authenticateUser(parsed.data);

  if (!user) {
    const result = registerFailedLogin(clientKey);
    return NextResponse.json(
      { error: result.blocked ? "Muitas tentativas. Aguarde alguns minutos e tente novamente." : genericFailure },
      { status: result.blocked ? 429 : 401 },
    );
  }

  clearFailedLogins(clientKey);
  await createSession(user.email);
  return NextResponse.json({ ok: true });
}

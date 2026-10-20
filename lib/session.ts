import "server-only";

import { cookies } from "next/headers";
import {
  decryptSession,
  encryptSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/session-core";

const cookieOptions = {
  httpOnly: true,
  // Secure is always enabled so the session is never sent over plain HTTP.
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decryptSession(token);
}

export async function createSession(email: string) {
  (await cookies()).set(SESSION_COOKIE, await encryptSession({ email }), cookieOptions);
}

export async function clearSession() {
  (await cookies()).set(SESSION_COOKIE, "", {
    ...cookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
}

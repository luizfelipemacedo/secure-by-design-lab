import "server-only";

import { redirect } from "next/navigation";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { getSession } from "@/lib/session";
import type { LoginInput } from "@/lib/auth-schema";

type DemoCredential = {
  email: string;
  passwordHash: string;
};

function getDemoCredential(): DemoCredential {
  const email = process.env.DEMO_USER_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.DEMO_USER_PASSWORD_HASH;

  if (!email || !passwordHash) {
    throw new Error("DEMO_USER_EMAIL and DEMO_USER_PASSWORD_HASH are required.");
  }

  return { email, passwordHash };
}

function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, nValue, rValue, pValue, saltHex, hashHex] = encodedHash.split("$");
  const n = Number(nValue);
  const r = Number(rValue);
  const p = Number(pValue);

  if (
    algorithm !== "scrypt" ||
    !Number.isInteger(n) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    !/^[0-9a-f]+$/i.test(saltHex ?? "") ||
    !/^[0-9a-f]+$/i.test(hashHex ?? "")
  ) {
    return false;
  }

  try {
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length, {
      N: n,
      r,
      p,
      maxmem: 32 * 1024 * 1024,
    });

    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function authenticateUser(input: LoginInput) {
  const credential = getDemoCredential();
  const emailMatches = input.email === credential.email;
  const passwordMatches = verifyPassword(input.password, credential.passwordHash);

  return emailMatches && passwordMatches ? { email: credential.email } : null;
}

export async function requireUser() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

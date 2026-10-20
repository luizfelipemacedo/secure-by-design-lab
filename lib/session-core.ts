import { EncryptJWT, jwtDecrypt } from "jose";

export const SESSION_COOKIE = "secure_design_session";
export const SESSION_MAX_AGE = 15 * 60;

type SessionPayload = {
  email: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be a base64url secret with 256 bits.");
  }

  const normalized = secret.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(secret.length / 4) * 4, "=");
  const binary = atob(normalized);
  const key = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  if (key.byteLength !== 32) {
    throw new Error("SESSION_SECRET must decode to exactly 32 bytes.");
  }

  return key as Uint8Array<ArrayBufferLike>;
}

export async function encryptSession(payload: SessionPayload) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;

  return new EncryptJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .encrypt(getSecretKey());
}

export async function decryptSession(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtDecrypt(token, getSecretKey(), {
      keyManagementAlgorithms: ["dir"],
      contentEncryptionAlgorithms: ["A256GCM"],
    });

    if (typeof payload.email !== "string" || !payload.email.includes("@")) {
      return null;
    }

    return { email: payload.email };
  } catch {
    return null;
  }
}

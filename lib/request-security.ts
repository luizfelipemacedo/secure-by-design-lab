import type { NextRequest } from "next/server";

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const originUrl = new URL(origin);

  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";

  const expectedHost = forwardedHost.split(":")[0];

  return (
    originUrl.protocol.replace(":", "") === forwardedProto &&
    originUrl.hostname === expectedHost
  );
}
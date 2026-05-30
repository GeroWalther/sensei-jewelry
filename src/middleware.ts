import { NextRequest, NextResponse } from "next/server";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH?.toLowerCase();
  const expectedPlain = process.env.ADMIN_PASSWORD;

  if (!expectedUser || (!expectedHash && !expectedPlain)) {
    return new NextResponse(
      "Admin credentials not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD).",
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const sep = decoded.indexOf(":");
    const user = sep >= 0 ? decoded.slice(0, sep) : decoded;
    const pass = sep >= 0 ? decoded.slice(sep + 1) : "";

    if (user === expectedUser) {
      if (expectedHash) {
        const incomingHash = await sha256Hex(pass);
        if (timingSafeEqualHex(incomingHash, expectedHash)) {
          return NextResponse.next();
        }
      } else if (expectedPlain && pass === expectedPlain) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

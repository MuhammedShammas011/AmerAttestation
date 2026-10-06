import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClientSession, destroyClientSession, isValidClientSession } from "@/lib/db";

const MOCK_CLIENT_EMAIL = "client@amer.ae";
const MOCK_CLIENT_PASSWORD = "clientpassword";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("client_session");

  if (sessionCookie && isValidClientSession(sessionCookie.value)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body;

  if (email === MOCK_CLIENT_EMAIL && password === MOCK_CLIENT_PASSWORD) {
    const sessionId = createClientSession();
    
    const cookieStore = await cookies();
    cookieStore.set("client_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
      sameSite: "strict",
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "Invalid client credentials." },
    { status: 401 }
  );
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("client_session");

  if (sessionCookie) {
    destroyClientSession(sessionCookie.value);
    cookieStore.set("client_session", "", { maxAge: 0, path: "/" });
  }

  return NextResponse.json({ ok: true });
}

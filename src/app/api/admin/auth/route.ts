import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession, destroySession, isValidSession } from "@/lib/db";

const DEFAULT_ADMIN_PASSWORD = "ameradmin2026";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (sessionCookie && isValidSession(sessionCookie.value)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { username, password } = body;

  const envPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (username === "admin" && password === envPassword) {
    const sessionId = createSession();
    
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
      sameSite: "strict",
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "Invalid credentials." },
    { status: 401 }
  );
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");

  if (sessionCookie) {
    destroySession(sessionCookie.value);
    cookieStore.set("admin_session", "", { maxAge: 0, path: "/" });
  }

  return NextResponse.json({ ok: true });
}

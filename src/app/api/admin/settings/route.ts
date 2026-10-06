import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSettings, saveSettings, isValidSession } from "@/lib/db";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  return !!(sessionCookie && isValidSession(sessionCookie.value));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, settings: getSettings() });
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { contactNumbers, branches } = body;

  if (!contactNumbers || !branches) {
    return NextResponse.json({ ok: false, error: "Contact numbers and branches are required." }, { status: 400 });
  }

  saveSettings({ contactNumbers, branches });
  return NextResponse.json({ ok: true });
}

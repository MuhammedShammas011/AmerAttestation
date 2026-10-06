import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLeads, updateLeadStatus, deleteLead, isValidSession } from "@/lib/db";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  return !!(sessionCookie && isValidSession(sessionCookie.value));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ ok: true, leads });
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { id, status, notes } = body;

  if (!id || !status) {
    return NextResponse.json({ ok: false, error: "ID and status are required." }, { status: 400 });
  }

  const success = updateLeadStatus(id, status, notes);
  if (success) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ ok: false, error: "ID is required." }, { status: 400 });
  }

  const success = deleteLead(id);
  if (success) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
}

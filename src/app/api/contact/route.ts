import { NextResponse } from "next/server";
import { addLead } from "@/lib/db";

type ContactPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
  service?: string;
};

export async function POST(request: Request) {
  const body: ContactPayload = await request.json().catch(() => ({}));

  if (!body.name || !body.email || !body.mobile) {
    return NextResponse.json(
      { ok: false, error: "Name, email and mobile number are required." },
      { status: 400 }
    );
  }

  try {
    const lead = addLead({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      message: body.message || "",
      service: body.service || "General Inquiry",
    });
    
    console.log("[contact-form] saved new lead to DB", lead);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServices, saveServices, getOtherServices, saveOtherServices, isValidSession } from "@/lib/db";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  return !!(sessionCookie && isValidSession(sessionCookie.value));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    services: getServices(),
    otherServices: getOtherServices(),
  });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { type, name, slug, icon, description } = body;

  if (!type || !name || !slug) {
    return NextResponse.json({ ok: false, error: "Type, Name and Slug are required." }, { status: 400 });
  }

  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-");

  if (type === "service") {
    const services = getServices();
    if (services.some((s) => s.slug === cleanSlug)) {
      return NextResponse.json({ ok: false, error: "A service with this slug already exists." }, { status: 400 });
    }
    services.push({ name, slug: cleanSlug, icon: icon || "certificate", description: description || "" });
    saveServices(services);
  } else if (type === "otherService") {
    const otherServices = getOtherServices();
    if (otherServices.some((s) => s.slug === cleanSlug)) {
      return NextResponse.json({ ok: false, error: "An other-service with this slug already exists." }, { status: 400 });
    }
    otherServices.push({ name, slug: cleanSlug, description: description || "" });
    saveOtherServices(otherServices);
  } else {
    return NextResponse.json({ ok: false, error: "Invalid service type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { type, originalSlug, name, slug, icon, description } = body;

  if (!type || !originalSlug || !name || !slug) {
    return NextResponse.json({ ok: false, error: "Type, original slug, name and new slug are required." }, { status: 400 });
  }

  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-");

  if (type === "service") {
    const services = getServices();
    const idx = services.findIndex((s) => s.slug === originalSlug);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Service not found." }, { status: 404 });
    }
    
    // Check if new slug conflicts with another service
    if (cleanSlug !== originalSlug && services.some((s) => s.slug === cleanSlug)) {
      return NextResponse.json({ ok: false, error: "A service with this slug already exists." }, { status: 400 });
    }

    services[idx] = {
      name,
      slug: cleanSlug,
      icon: icon || "certificate",
      description: description || "",
    };
    saveServices(services);
  } else if (type === "otherService") {
    const otherServices = getOtherServices();
    const idx = otherServices.findIndex((s) => s.slug === originalSlug);
    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "Service not found." }, { status: 404 });
    }

    // Check if new slug conflicts
    if (cleanSlug !== originalSlug && otherServices.some((s) => s.slug === cleanSlug)) {
      return NextResponse.json({ ok: false, error: "An other-service with this slug already exists." }, { status: 400 });
    }

    otherServices[idx] = {
      name,
      slug: cleanSlug,
      description: description || "",
    };
    saveOtherServices(otherServices);
  } else {
    return NextResponse.json({ ok: false, error: "Invalid service type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!type || !slug) {
    return NextResponse.json({ ok: false, error: "Type and slug are required." }, { status: 400 });
  }

  if (type === "service") {
    const services = getServices();
    const filtered = services.filter((s) => s.slug !== slug);
    if (filtered.length === services.length) {
      return NextResponse.json({ ok: false, error: "Service not found." }, { status: 404 });
    }
    saveServices(filtered);
  } else if (type === "otherService") {
    const otherServices = getOtherServices();
    const filtered = otherServices.filter((s) => s.slug !== slug);
    if (filtered.length === otherServices.length) {
      return NextResponse.json({ ok: false, error: "Service not found." }, { status: 404 });
    }
    saveOtherServices(filtered);
  } else {
    return NextResponse.json({ ok: false, error: "Invalid service type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

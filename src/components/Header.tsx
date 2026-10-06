"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { services as fallbackServices, otherServices as fallbackOtherServices, featuredCountries } from "@/lib/data";
import type { Service, OtherService, Settings } from "@/lib/db";

const simpleLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header({
  services = fallbackServices,
  otherServices = fallbackOtherServices,
  settings,
}: {
  services?: Service[];
  otherServices?: OtherService[];
  settings?: Settings;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navDropdowns = [
    {
      label: "Services",
      href: "/services",
      items: services.slice(0, 9).map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    },
    {
      label: "Countries",
      href: "/countries",
      items: featuredCountries.slice(0, 9).map((c) => ({ label: c.name, href: `/countries/${c.code.toLowerCase()}` })),
    },
    {
      label: "Other Services",
      href: "/other-services",
      items: otherServices.slice(0, 9).map((s) => ({ label: s.name, href: `/other-services/${s.slug}` })),
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  if (pathname.startsWith("/admin") || pathname.startsWith("/client") || pathname.startsWith("/login")) return null;

  return (
    <div className="sticky top-0 z-50 w-full">
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_24px_-16px_rgba(15,44,76,0.35)] border-b border-black/5" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/images/Amer Attesstation Png.png" alt="Amer Attestation" width={140} height={52} className="shrink-0 object-contain" style={{ height: "auto" }} />
          </Link>

          {/* Desktop nav — pill items, no underline */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            <Link
              href="/"
              className={`rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                pathname === "/" ? "bg-brand-green/10 text-brand-green-dark" : "text-brand-text/70 hover:bg-brand-band hover:text-brand-green-dark"
              }`}
            >
              Home
            </Link>
            {navDropdowns.map((menu) => (
              <div key={menu.label} className="group relative">
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                    isActive(menu.href) ? "bg-brand-green/10 text-brand-green-dark" : "text-brand-text/70 hover:bg-brand-band hover:text-brand-green-dark"
                  }`}
                >
                  {menu.label}
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-2xl shadow-brand-navy/10">
                    <div className="p-1.5">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-[13px] text-brand-text/80 transition-colors hover:bg-brand-band hover:text-brand-green-dark"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={menu.href}
                      className="flex items-center justify-between gap-1 border-t border-black/5 bg-brand-band/60 px-3.5 py-2.5 text-[13px] font-semibold text-brand-green-dark transition-colors hover:bg-brand-band"
                    >
                      View all
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                  isActive(link.href) ? "bg-brand-green/10 text-brand-green-dark" : "text-brand-text/70 hover:bg-brand-band hover:text-brand-green-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster — icon-only contact + single CTA */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${(settings?.contactNumbers?.dubai ?? "+971554316535").replace(/\s/g, "")}`}
              aria-label="Call us"
              title="Call us"
              className="hidden size-9 items-center justify-center rounded-full border border-black/10 text-brand-text/70 transition-colors hover:border-brand-green hover:text-brand-green-dark sm:flex"
            >
              <Phone className="size-4" />
            </a>
            <a
              href={`https://wa.me/${(settings?.contactNumbers?.dubai ?? "+971554316535").replace(/[\s+]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              title="WhatsApp us"
              className="hidden size-9 items-center justify-center rounded-full bg-whatsapp text-white transition hover:brightness-95 sm:flex"
            >
              <MessageCircle className="size-4" />
            </a>
            <Link
              href="/login"
              className="hidden items-center rounded-full border border-brand-navy/15 px-4.5 py-2.5 text-sm font-semibold text-brand-navy/80 hover:bg-brand-band lg:flex transition-all"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="hidden items-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-green/25 transition-all hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg hover:shadow-brand-green/30 lg:flex"
            >
              Get Free Quote
            </Link>

            <button
              type="button"
              className="rounded-lg p-2 text-brand-navy lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
          <span className="font-heading text-base font-bold text-brand-navy">Menu</span>
          <button
            type="button"
            className="rounded-lg p-2 text-brand-navy hover:bg-brand-band"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-3">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
              pathname === "/" ? "bg-brand-band text-brand-green" : "hover:bg-brand-band"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          {navDropdowns.map((menu) => (
            <div key={menu.label}>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(menu.href) ? "text-brand-green" : "hover:bg-brand-band"
                }`}
                onClick={() => setMobileSection((s) => (s === menu.label ? null : menu.label))}
              >
                {menu.label}
                <ChevronDown className={`size-4 transition-transform ${mobileSection === menu.label ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === menu.label && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-black/10 pl-3">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm text-brand-text/80 hover:bg-brand-band"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href={menu.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-green hover:bg-brand-band"
                    onClick={() => setMobileOpen(false)}
                  >
                    View all →
                  </Link>
                </div>
              )}
            </div>
          ))}
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive(link.href) ? "bg-brand-band text-brand-green" : "hover:bg-brand-band"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="mt-3 rounded-full border border-brand-navy/15 px-5 py-2.5 text-center text-sm font-semibold text-brand-navy/80 hover:bg-brand-band transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Portal Login
          </Link>
          <Link
            href="/contact"
            className="mt-1.5 rounded-full bg-brand-green px-5 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand-green/25"
            onClick={() => setMobileOpen(false)}
          >
            Get Free Quote
          </Link>
          <a
            href={`https://wa.me/${(settings?.contactNumbers?.dubai ?? "+971554316535").replace(/[\s+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-whatsapp px-5 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            <MessageCircle className="size-4" /> WhatsApp Now
          </a>
        </nav>
      </div>
    </div>
  );
}

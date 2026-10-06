"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { services as fallbackServices, featuredCountries, branches as fallbackBranches, contactNumbers as fallbackContactNumbers } from "@/lib/data";
import { FacebookIcon, LinkedInIcon, InstagramIcon, PinterestIcon, YoutubeIcon, XIcon } from "./SocialIcons";
import type { Service, Settings } from "@/lib/db";

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: PinterestIcon, label: "Pinterest", href: "https://pinterest.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
  { icon: XIcon, label: "X", href: "https://x.com" },
];

export default function Footer({
  services = fallbackServices,
  settings,
}: {
  services?: Service[];
  settings?: Settings;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/client") || pathname.startsWith("/login")) return null;

  const contactNumbers = settings?.contactNumbers ?? fallbackContactNumbers;
  const branches = settings?.branches ?? fallbackBranches;
  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/Amer Attesstation Png.png" alt="Amer Attestation" width={150} height={56} className="shrink-0 object-contain brightness-0 invert" style={{ height: "auto" }} />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Certificate & document attestation company based in Dubai, UAE, serving
              120+ countries with fast, secure and affordable attestation.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-gold">
              <Phone className="size-4" /> Call: {contactNumbers.dubai}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-green transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Attestation by Country
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {featuredCountries.slice(0, 8).map((c) => (
                <li key={c.code}>
                  <Link href={`/countries/${c.code.toLowerCase()}`} className="hover:text-white transition-colors">
                    {c.name} Attestation
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/countries" className="font-semibold text-white hover:text-brand-gold">
                  View all 120+ countries →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Certificate Attestation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-white hover:text-brand-gold">
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Our Office
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-white/75">
              {branches.map((b) => (
                <li key={b.slug}>
                  <p className="flex items-start gap-2 font-medium text-white">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" /> {b.city}
                  </p>
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="ml-6 flex items-center gap-2 hover:text-white">
                    <Phone className="size-3.5" /> {b.phone}
                  </a>
                  <a href={`mailto:${b.email}`} className="ml-6 flex items-center gap-2 hover:text-white">
                    <Mail className="size-3.5" /> {b.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 md:flex-row md:px-6">
          <p>© 2026 Amer Attestation Services. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/cancellation-refund-policy" className="hover:text-white">Cancellation & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

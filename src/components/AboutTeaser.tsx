import Link from "next/link";
import { ShieldCheck, Star, Landmark, MapPin } from "lucide-react";
import { aboutIntro } from "@/lib/data";
import Reveal from "./Reveal";
import { getSettings } from "@/lib/db";

export default function AboutTeaser() {
  const settings = getSettings();
  const contactNumbers = settings.contactNumbers;
  return (
    <section className="section-band py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-[#123252] p-10 shadow-[0_20px_50px_-16px_rgba(15,44,76,0.5)]">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-brand-green/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-6 bottom-0 size-32 rounded-full bg-brand-gold/20 blur-2xl" />
            <ShieldCheck className="relative size-16 text-white/90" />
            <p className="relative mt-6 max-w-[260px] font-heading text-lg font-bold text-white">
              Trusted Attestation Company
            </p>
            <p className="relative mt-2 max-w-[260px] text-sm leading-6 text-white/70">
              Trusted by individuals and businesses across the UAE.
            </p>
          </div>

          <div className="absolute -bottom-7 left-6 sm:left-10">
            <div className="badge-card flex items-center gap-3 border-l-4 border-brand-green py-3 pl-4 pr-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-band text-brand-green">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-xs text-brand-text/60">Dubai Office</p>
                <p className="font-heading text-sm font-bold text-brand-navy">{contactNumbers.dubai}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="pt-6 lg:pt-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-text/50">
            <Star className="size-3.5 fill-brand-green text-brand-green" />
            Welcome to Amer Attestation
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
            Your Trusted Attestation Partner in the UAE
          </h2>
          <p className="mt-4 text-sm leading-6 text-brand-text/70 md:text-base">{aboutIntro[0]}</p>

          <div className="mt-6 flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <Landmark className="size-5" />
            </span>
            <h3 className="mt-1.5 font-heading text-base font-bold text-brand-green">
              We Handle Every Attestation &amp; Legalization Step
            </h3>
          </div>
          <div className="mt-5 border-t border-black/10 pt-5">
            <p className="text-sm leading-6 text-brand-text/70 md:text-base">
              We work directly with notaries, home-country authorities,
              UAE Embassies and the UAE Ministry of Foreign Affairs (MOFA) — so every stage follows the exact
              requirements of the relevant government and diplomatic authorities.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-8 inline-block rounded-3xl bg-brand-green px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            Discover More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

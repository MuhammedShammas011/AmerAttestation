"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

const slides = [
  {
    headline: "Dubai's Fastest Document Attestation Service",
    subline: "Secure, Affordable & Government-Compliant Legalization Across the UAE",
    cta: { label: "Get a Free Quote", href: "/contact" },
  },
  {
    headline: "MOFA, Embassy & Apostille — Handled End-to-End",
    subline: "We collect your documents, process everything, and deliver back to your door",
    cta: { label: "WhatsApp Us Now", href: "https://wa.me/971554316535" },
  },
  {
    headline: "Legalizing Certificates from Over 120 Nations",
    subline: "Educational, Personal & Commercial Documents — All Document Types Accepted",
    cta: { label: "Call Us Today", href: "tel:+971554316535" },
  },
  {
    headline: "When It Comes to Attestation, Choose Amer",
    subline: "Trusted by thousands of expats, families & businesses across the Emirates",
    cta: { label: "See Our Services", href: "/services" },
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const changeSlide = (nextIndex: number) => {
    if (nextIndex === active) return;
    setIsVisible(false);
    setTimeout(() => {
      setActive(nextIndex);
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    const id = setInterval(() => {
      changeSlide((active + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [active]);

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden bg-brand-band">
      <div className="blob-green pointer-events-none -right-28 -top-40 size-[460px]" />
      <div className="blob-coral pointer-events-none bottom-[-80px] left-[28%] size-72" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-bold text-brand-green-dark">
            👋 A real advisor, not a call centre
          </span>
          <div className={`h-[200px] sm:h-[175px] md:h-[165px] lg:h-[155px] transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-navy md:text-5xl">
              {slide.headline}
            </h1>
            <p className="mt-3 max-w-lg text-base text-brand-text/70 md:text-lg">{slide.subline}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={slide.cta.href}
              className="rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(12,165,90,0.6)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
            >
              {slide.cta.label}
            </Link>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.headline}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => changeSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-brand-green" : "w-3 bg-brand-navy/15"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 hidden items-center gap-1 md:flex">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => changeSlide((active - 1 + slides.length) % slides.length)}
              className="flex size-8 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm transition hover:bg-brand-band"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => changeSlide((active + 1) % slides.length)}
              className="flex size-8 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm transition hover:bg-brand-band"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative lg:justify-self-end lg:w-full lg:max-w-sm">
          <div className="soft-card p-6">
            <div className="flex items-center gap-3">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb08a] to-brand-coral text-base font-bold text-white">
                Z
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-brand-green" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-brand-navy">Zara Amal.</p>
                <p className="text-xs font-medium text-brand-text/60">Your Attestation Advisor · Online</p>
              </div>
            </div>
            <p className="mt-4 rounded-2xl bg-brand-band px-4 py-3 text-sm leading-6 text-brand-text/80">
              Hello! I personally manage your document&apos;s entire legalization journey — from notary and home MOFA to UAE Embassy and final MOFA stamp — keeping you fully informed at every milestone.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-brand-text/70">
                Free door-to-door pickup
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-brand-text/70">
                MOFA + Embassy stamping
              </span>
              <span className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-brand-text/70">
                2–4 day express processing
              </span>
            </div>
            <a
              href="https://wa.me/971554316535"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-dark"
            >
              <MessageCircle className="size-4" /> Chat with your advisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

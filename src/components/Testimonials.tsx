"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: visibleCount }, (_, i) => testimonials[(active + i) % testimonials.length]);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="text-center">
          <span className="inline-block rounded-full bg-brand-coral/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-coral">
            Testimonials
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">
            Rated 4.9/5 — What Our Customers Say
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {visible.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="soft-card animate-fade-slide-in flex flex-col items-center p-7 text-center transition hover:-translate-y-1"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? "fill-brand-coral text-brand-coral" : "text-black/10"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-brand-text/75">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-heading text-sm font-semibold text-brand-navy">
                {t.name} <span className="font-normal text-brand-text/50">· {t.location}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="soft-card flex size-9 items-center justify-center rounded-full transition hover:text-brand-green"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => setActive((i) => (i + 1) % testimonials.length)}
            className="soft-card flex size-9 items-center justify-center rounded-full transition hover:text-brand-green"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

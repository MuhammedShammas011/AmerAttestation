"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-band py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal className="text-center">
          <span className="inline-block rounded-full bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
            FAQ
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Reveal delay={100} className="glass-card mt-10 divide-y divide-black/5 rounded-2xl">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-heading text-sm font-semibold text-brand-navy md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown className={`size-4 shrink-0 text-brand-green transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="animate-fade-slide-in px-5 pb-5 text-sm leading-6 text-brand-text/70">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

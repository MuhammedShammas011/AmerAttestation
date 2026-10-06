"use client";

import { useState } from "react";
import { documentCategories } from "@/lib/data";
import { GraduationCap, HeartHandshake, Briefcase, Stamp } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const categoryStyles = [
  { icon: GraduationCap, dot: "bg-brand-green" },
  { icon: HeartHandshake, dot: "bg-brand-coral" },
  { icon: Briefcase, dot: "bg-brand-navy" },
  { icon: Stamp, dot: "bg-brand-gold" },
];

export default function DocumentsBlock() {
  const [active, setActive] = useState<number | null>(null);

  const allItems = documentCategories.flatMap((category, catIndex) =>
    category.items.map((item) => ({ item, catIndex }))
  );

  return (
    <section className="section-band py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <SectionHeading eyebrow="Coverage" title="Documents We Attest" />
        </Reveal>

        <Reveal delay={80} className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
              active === null ? "bg-brand-navy text-white" : "bg-white text-brand-text/60 hover:bg-brand-band"
            }`}
          >
            All documents
          </button>
          {documentCategories.map((category, i) => {
            const style = categoryStyles[i % categoryStyles.length];
            const Icon = style.icon;
            return (
              <button
                key={category.title}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                  active === i ? "bg-brand-navy text-white" : "bg-white text-brand-text/60 hover:bg-brand-band"
                }`}
              >
                <Icon className="size-3.5" /> {category.title}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={140} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {allItems.map(({ item, catIndex }, idx) => {
            const style = categoryStyles[catIndex % categoryStyles.length];
            const dimmed = active !== null && active !== catIndex;
            return (
              <span
                key={`${item}-${idx}`}
                className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-text/75 shadow-[0_8px_20px_-14px_rgba(16,21,27,0.3)] transition-all duration-200 ${
                  dimmed ? "scale-95 opacity-30 grayscale" : "opacity-100"
                }`}
              >
                <span className={`size-1.5 rounded-full ${style.dot}`} />
                {item}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

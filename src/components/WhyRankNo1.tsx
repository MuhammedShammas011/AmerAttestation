import { whyRankNo1 } from "@/lib/data";
import { BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function WhyRankNo1() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <SectionHeading eyebrow="Our Edge" title="Why We Are The Best ?" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyRankNo1.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="soft-card h-full p-7 text-center transition hover:-translate-y-1.5">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-green/12 text-brand-green">
                  <BadgeCheck className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-text/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

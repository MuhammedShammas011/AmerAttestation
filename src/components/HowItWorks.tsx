import Link from "next/link";
import { howItWorks } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <SectionHeading eyebrow="Process" title="How It Works" />
        </Reveal>
        <div className="relative mt-14">
          <div className="dashed-connector absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-0.5 sm:block" />
          <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-4">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 90} className="text-center">
                <span className="relative z-10 mx-auto flex size-11 items-center justify-center rounded-full border-2 border-brand-green bg-white font-heading text-base font-bold text-brand-green">
                  {step.step}
                </span>
                <h3 className="mt-3 font-heading text-sm font-bold text-brand-navy">{step.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[22ch] text-xs leading-5 text-brand-text/60">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(11,122,75,0.6)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

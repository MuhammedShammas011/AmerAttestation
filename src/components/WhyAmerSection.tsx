import { whyAmer } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyAmerSection() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="flex flex-wrap justify-center gap-3">
          {whyAmer.map((item) => (
            <span
              key={item.label}
              className="rounded-full bg-white px-4 py-2.5 text-xs font-bold text-brand-navy shadow-[0_8px_20px_-12px_rgba(22,40,29,0.35)] md:text-sm"
            >
              <span className="text-brand-green">✓</span> {item.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function AnimatedNumber({ value }: { value: string }) {
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d,]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.round(target * progress));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="px-4 py-6 md:px-6">
      <div className="gradient-band relative mx-auto max-w-7xl overflow-hidden rounded-[28px] py-14">
        <div className="pointer-events-none absolute -left-16 top-1/2 size-56 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/2 size-56 -translate-y-1/2 rounded-full bg-brand-coral/20 blur-3xl" />
        <div className="relative grid grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:px-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                <AnimatedNumber value={stat.value} />
              </p>
              <p className="mt-1 text-sm font-medium text-white/85">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

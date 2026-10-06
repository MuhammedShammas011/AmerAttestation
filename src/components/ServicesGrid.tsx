import Link from "next/link";
import { services as fallbackServices } from "@/lib/data";
import { DataIcon } from "@/lib/icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import type { Service } from "@/lib/db";

export default function ServicesGrid({
  services = fallbackServices,
}: {
  services?: Service[];
}) {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Best Attestation Services in UAE"
            description="From educational certificates to commercial documents, we handle every stage of the attestation process."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 4) * 60}>
              <Link
                href={`/services/${service.slug}`}
                className="soft-card group flex h-full flex-col items-center gap-3 p-6 text-center transition hover:-translate-y-1.5"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-brand-green/12 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                  <DataIcon name={service.icon} className="size-6" />
                </span>
                <span className="font-heading text-sm font-semibold text-brand-navy">{service.name}</span>
                <span className="text-xs leading-5 text-brand-text/60">{service.description}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-block rounded-3xl border-2 border-brand-green px-7 py-3 text-sm font-semibold text-brand-green transition hover:-translate-y-0.5 hover:bg-brand-green hover:text-white"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

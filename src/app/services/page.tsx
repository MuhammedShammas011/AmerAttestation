import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCtaBand from "@/components/ContactCtaBand";
import { getServices } from "@/lib/db";
import { DataIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Attestation Services",
  description:
    "Browse all certificate and document attestation services offered by Amer Attestation Services in the UAE.",
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero
        title="Attestation Services"
        description="From educational and personal certificates to commercial documents, explore our full range of attestation services."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Attestation Services" }]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                  <DataIcon name={service.icon} className="size-6" />
                </span>
                <h2 className="font-heading text-base font-bold text-brand-navy">{service.name}</h2>
                <p className="text-sm leading-6 text-brand-text/70">{service.description}</p>
                <span className="text-sm font-semibold text-brand-green">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

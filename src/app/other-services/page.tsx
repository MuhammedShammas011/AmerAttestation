import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCtaBand from "@/components/ContactCtaBand";
import { getOtherServices } from "@/lib/db";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Other Services",
  description: "MOFA, Embassy, Apostille, Translation, Certified True Copy, Equivalency, Family Visa, Golden Visa, POA and PCC services in the UAE.",
};

export default function OtherServicesPage() {
  const otherServices = getOtherServices();
  return (
    <>
      <PageHero
        title="Other Services"
        description="Beyond attestation, we offer a full suite of legalization, translation and visa documentation services."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Other Services" }]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <Link
                key={service.slug}
                href={`/other-services/${service.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg"
              >
                <h2 className="font-heading text-base font-bold text-brand-navy">{service.name}</h2>
                <p className="text-sm leading-6 text-brand-text/70">{service.description}</p>
                <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-brand-green">
                  Learn more <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

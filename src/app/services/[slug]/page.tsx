import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ContactCtaBand from "@/components/ContactCtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { getServices } from "@/lib/db";
import { DataIcon } from "@/lib/icons";
import { CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const services = getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `${service.description} Free pickup & delivery across Dubai, Abu Dhabi and Sharjah.`,
  };
}

const processSteps = [
  "Share your document details for an instant quote",
  "Confirm scope, timeline and pricing with your advisor",
  "Free pickup of your original documents",
  "We process attestation through the required authorities",
  "Attested documents delivered back to you",
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.attestationuae.com/" },
      { "@type": "ListItem", position: 2, name: "Attestation Services", item: "https://www.attestationuae.com/services" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://www.attestationuae.com/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        title={service.name}
        description={service.description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Attestation Services", href: "/services" },
          { label: service.name },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="flex size-14 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <DataIcon name={service.icon} className="size-7" />
            </span>
            <h2 className="mt-5 font-heading text-xl font-bold text-brand-navy">
              {service.name} in the UAE
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70">
              We process {service.name.toLowerCase()} for individuals and businesses across Dubai, Abu Dhabi
              and Sharjah, with free pickup and delivery and a dedicated advisor guiding you through every
              stage.
            </p>

            <h3 className="mt-8 font-heading text-base font-bold text-brand-navy">Our Process</h3>
            <ul className="mt-4 space-y-3">
              {processSteps.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm text-brand-text/75">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm title={`Get a Quote for ${service.name}`} service={service.name} />
        </div>
      </section>
      <FaqAccordion />
      <ContactCtaBand />
    </>
  );
}

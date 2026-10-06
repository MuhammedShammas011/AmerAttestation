import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ContactCtaBand from "@/components/ContactCtaBand";
import { getOtherServices } from "@/lib/db";

export function generateStaticParams() {
  const otherServices = getOtherServices();
  return otherServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const otherServices = getOtherServices();
  const service = otherServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function OtherServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const otherServices = getOtherServices();
  const service = otherServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.name}
        description={service.description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Other Services", href: "/other-services" },
          { label: service.name },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-heading text-xl font-bold text-brand-navy">{service.name} in the UAE</h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70">
              Our advisors handle {service.name.toLowerCase()} end-to-end, coordinating with the relevant
              authorities so your documents are ready for use in the UAE without delays. Contact us for
              document requirements, pricing and turnaround time specific to your case.
            </p>
          </div>
          <QuoteForm title={`Enquire About ${service.name}`} service={service.name} />
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

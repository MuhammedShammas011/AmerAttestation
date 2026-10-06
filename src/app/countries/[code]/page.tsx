import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ContactCtaBand from "@/components/ContactCtaBand";
import { countries } from "@/lib/data";
import { CircleFlag } from "@/lib/flags";
import { CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return countries.map((country) => ({ code: country.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const country = countries.find((c) => c.code.toLowerCase() === code);
  if (!country) return {};
  return {
    title: `${country.name} Certificate Attestation`,
    description: `Attestation services for certificates and documents issued in ${country.name}, for use in the UAE.`,
  };
}

const stages = [
  "Notary attestation in the issuing country",
  "Home State / HRD attestation",
  "Home country MOFA attestation",
  "UAE Embassy attestation",
  "UAE Ministry of Foreign Affairs (MOFA) attestation",
];

export default async function CountryDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const country = countries.find((c) => c.code.toLowerCase() === code);
  if (!country) notFound();

  return (
    <>
      <PageHero
        title={`${country.name} Certificate Attestation`}
        description={`Attestation of educational, personal and commercial documents issued in ${country.name} for use in the UAE.`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Countries", href: "/countries" },
          { label: country.name },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <CircleFlag code={country.code} size={64} />
            <h2 className="mt-5 font-heading text-xl font-bold text-brand-navy">
              Attesting Documents from {country.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70">
              We regularly attest degree, birth, marriage and commercial documents issued in {country.name}.
              Depending on whether {country.name} is a member of the Hague Convention, your documents will
              either require an apostille or full attestation through the following stages.
            </p>
            <h3 className="mt-8 font-heading text-base font-bold text-brand-navy">Typical Attestation Stages</h3>
            <ul className="mt-4 space-y-3">
              {stages.map((stage) => (
                <li key={stage} className="flex items-start gap-3 text-sm text-brand-text/75">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                  {stage}
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm title={`Get a Quote for ${country.name} Documents`} />
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCtaBand from "@/components/ContactCtaBand";
import CountriesList from "@/components/CountriesList";

export const metadata: Metadata = {
  title: "Certificate Attestation by Country",
  description: "Amer Attestation Services provides certificate attestation for documents issued in 120+ countries.",
};

export default function CountriesPage() {
  return (
    <>
      <PageHero
        title="Attestation from 120+ Countries"
        description="Select a country to learn more about our attestation process for documents issued there."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Countries" }]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CountriesList />
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

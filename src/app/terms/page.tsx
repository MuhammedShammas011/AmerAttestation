import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Amer Attestation Services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <section className="mx-auto max-w-3xl px-4 py-16 text-sm leading-6 text-brand-text/70 md:px-6">
        <p>
          These terms and conditions govern your use of our services. By engaging our attestation,
          translation or documentation services, you agree to provide accurate information and
          genuine original documents, and to our stated pricing and turnaround times as confirmed by your
          advisor at the time of booking.
        </p>
        <p className="mt-4">
          Full terms and conditions content to be finalized and published here.
        </p>
      </section>
    </>
  );
}

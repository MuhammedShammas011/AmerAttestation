import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Amer Attestation Services collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className="mx-auto max-w-3xl px-4 py-16 text-sm leading-6 text-brand-text/70 md:px-6">
        <p>
          We collect only the information necessary to process your attestation request, such as your name,
          contact details and document information. Your documents and personal data are handled securely
          and confidentially, and are never shared with third parties except the relevant government
          authorities required to complete your attestation.
        </p>
        <p className="mt-4">
          Full privacy policy content to be finalized and published here.
        </p>
      </section>
    </>
  );
}

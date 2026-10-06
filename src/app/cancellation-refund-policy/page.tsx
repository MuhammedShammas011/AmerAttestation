import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation and refund policy for attestation services booked with Amer Attestation Services.",
};

export default function CancellationRefundPage() {
  return (
    <>
      <PageHero
        title="Cancellation & Refund Policy"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cancellation & Refund Policy" }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-sm leading-6 text-brand-text/70 md:px-6">
        <p>
          Cancellation requests must be raised with your advisor before your documents have been submitted to
          any attesting authority. Once a document has been submitted for notary, MOFA, embassy or apostille
          processing, government fees already paid are non-refundable. Service fees for stages not yet
          completed will be refunded.
        </p>
        <p className="mt-4">
          Full cancellation & refund policy content to be finalized and published here.
        </p>
      </section>
    </>
  );
}

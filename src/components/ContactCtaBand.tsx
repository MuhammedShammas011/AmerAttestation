import { Phone, MessageCircle, FileText } from "lucide-react";
import Reveal from "./Reveal";

export default function ContactCtaBand() {
  return (
    <section className="px-4 pb-6 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-brand-navy">
        <div className="pointer-events-none absolute left-1/4 top-0 size-64 -translate-y-1/2 rounded-full bg-brand-green/25 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 size-64 translate-y-1/2 rounded-full bg-brand-coral/20 blur-3xl" />
        <Reveal className="relative flex flex-col items-center gap-6 px-4 py-14 text-center md:px-6">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Think Attestation, Think Amer
          </h2>
          <p className="max-w-xl text-sm text-white/85 md:text-base">
            Speak to a dedicated attestation advisor today, or start your request online — free pickup &amp;
            delivery included across the UAE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+971554316535"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-green shadow-lg transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              <Phone className="size-4" /> Call Us
            </a>
            <a
              href="https://wa.me/971554316535"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <FileText className="size-4" /> Get Free Quote
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

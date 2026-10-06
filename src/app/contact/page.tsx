import type { Metadata } from "next";
import { Phone, Mail, MapPin, Navigation, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import ContactCtaBand from "@/components/ContactCtaBand";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Amer Attestation Services in Dubai, UAE. Call, WhatsApp or send us your attestation request for a free quote.",
};

const mapEmbeds = [
  {
    city: "Dubai Office",
    query: "Al Muteena, Next to Fish Roundabout, Dubai, UAE",
  },
];

export default function ContactPage() {
  const settings = getSettings();
  const { contactNumbers, branches } = settings;

  const phoneDirectory = [
    { label: "Dubai", value: contactNumbers.dubai },
    { label: "Toll Free", value: contactNumbers.tollFree },
    { label: "Landline Dubai", value: contactNumbers.landlineDubai },
  ];

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Amer Attestation Services",
    telephone: contactNumbers.dubai,
    email: contactNumbers.emailDubai,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Muteena, Next to Fish Roundabout",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: "AE",
    priceRange: "AED 250+",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.attestationuae.com/" },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://www.attestationuae.com/contact" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Section 1: Hero strip */}
      <section className="bg-brand-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-14 md:flex-row md:px-6">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Contact Us</h1>
            <p className="mt-3 max-w-md text-sm text-white/75 md:text-base">
              Have any questions? We&apos;d love to hear from you. Reach a dedicated attestation advisor now.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={`tel:${(contactNumbers.dubai ?? "").replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-3xl bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors"
              >
                <Phone className="size-4" /> Call Now
              </a>
              <a
                href={`mailto:${contactNumbers.emailDubai}`}
                className="flex items-center gap-2 rounded-3xl border-2 border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Mail className="size-4" /> Mail Us
              </a>
              <a
                href="#maps"
                className="flex items-center gap-2 rounded-3xl border-2 border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Navigation className="size-4" /> Get Directions
              </a>
            </div>
          </div>
          <div className="flex size-40 shrink-0 items-center justify-center rounded-full bg-white/10 md:size-48">
            <Phone className="size-16 text-brand-gold md:size-20" />
          </div>
        </div>
      </section>

      {/* Section 2: Two-column contact block */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <QuoteForm title="Send Us a Message" />

          <div className="grid grid-cols-1 gap-5">
            {branches.map((branch) => (
              <div key={branch.slug} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <MapPin className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-brand-navy">
                  {branch.city}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-text/70">{branch.address}</p>
                <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-green">
                  <Phone className="size-3.5" /> {branch.phone}
                </a>
                <a href={`mailto:${branch.email}`} className="mt-1 flex items-center gap-2 text-sm text-brand-text/70">
                  <Mail className="size-3.5" /> {branch.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Phone directory */}
      <section className="section-band py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-brand-navy md:text-3xl">
            Phone Directory
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {phoneDirectory.map((entry) => (
              <a
                key={entry.label}
                href={`tel:${entry.value.replace(/\s/g, "")}`}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Phone className="size-5 text-brand-green" />
                <span className="text-xs font-medium text-brand-text/60">{entry.label}</span>
                <span className="font-heading text-sm font-bold text-brand-navy">{entry.value}</span>
              </a>
            ))}
            <a
              href={`mailto:${contactNumbers.emailDubai}`}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Mail className="size-5 text-brand-green" />
              <span className="text-xs font-medium text-brand-text/60">Email</span>
              <span className="font-heading text-sm font-bold text-brand-navy">{contactNumbers.emailDubai}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Maps */}
      <section id="maps" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-brand-navy md:text-3xl">
            Find Us on Maps
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6">
            {mapEmbeds.map((map) => (
              <div key={map.city} className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-black/5 shadow-sm">
                <p className="bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white">{map.city}</p>
                <iframe
                  title={map.city}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(map.query)}&output=embed`}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA band */}
      <ContactCtaBand />
      <div className="flex items-center justify-center gap-2 bg-brand-green pb-8 text-xs text-white/80">
        <Clock className="size-3.5" /> Business Hours: Sat–Thu, 9:00 AM – 8:00 PM
      </div>
    </>
  );
}

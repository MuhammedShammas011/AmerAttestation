"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, FileCheck2 } from "lucide-react";
import { countries, featuredCountries, services as fallbackServices, otherServices as fallbackOtherServices } from "@/lib/data";
import { CircleFlag } from "@/lib/flags";
import Reveal from "./Reveal";
import type { Service, OtherService } from "@/lib/db";

const quickCountries = [
  { name: "India", code: "IN" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
];

export default function CountryLookup({
  services = fallbackServices,
  otherServices = fallbackOtherServices,
}: {
  services?: Service[];
  otherServices?: OtherService[];
}) {
  const router = useRouter();
  const [issuing, setIssuing] = useState("");
  const [selectedService, setSelectedService] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedService) {
      router.push(selectedService);
    } else if (issuing) {
      router.push(`/countries/${issuing.toLowerCase()}`);
    }
  }

  return (
    <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 md:-mt-16 md:px-6">
      <Reveal>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-[0_25px_60px_-20px_rgba(15,44,76,0.35)] md:flex-row md:items-end md:gap-3 md:p-6"
        >
          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-semibold text-brand-text/60">Document Issuing Country</span>
            <select
              required
              value={issuing}
              onChange={(e) => setIssuing(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-brand-navy outline-none focus:border-brand-green"
            >
              <option value="" disabled>
                Select country
              </option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-semibold text-brand-text/60">Which document do you need to attest?</span>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-brand-navy outline-none focus:border-brand-green"
            >
              <option value="">Select a service</option>
              <optgroup label="Attestation Services">
                {services.map((s) => (
                  <option key={s.slug} value={`/services/${s.slug}`}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Services">
                {otherServices.map((s) => (
                  <option key={s.slug} value={`/other-services/${s.slug}`}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-green px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-dark md:h-[46px]"
          >
            <Search className="size-4" /> Search
          </button>
        </form>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quickCountries.map((country, i) => (
          <Reveal key={country.code} delay={i * 80}>
            <Link
              href={`/countries/${country.code.toLowerCase()}`}
              className="badge-card group flex h-full flex-col gap-3 p-5 pt-8 transition hover:-translate-y-1"
            >
              <span className="badge-card-icon size-12 border-4 border-white text-brand-green">
                <FileCheck2 className="size-5" />
              </span>
              <span className="font-heading text-sm font-bold text-brand-navy">Certificate Attestation</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-brand-text/60">
                <CircleFlag code={country.code} size={16} />
                {country.name}
              </span>
              <span className="text-xs leading-5 text-brand-text/60">
                Get help with attestation, legalisation or translation for {country.name} documents.
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-brand-text/50">
        <MapPin className="size-3.5" /> Documents accepted from 120+ issuing countries
      </p>
    </div>
  );
}

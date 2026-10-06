import Link from "next/link";
import { featuredCountries } from "@/lib/data";
import { CircleFlag } from "@/lib/flags";
import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export default function CountriesGrid() {
  return (
    <section className="section-band py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">
            We are Experts in <span className="text-brand-green">all types of Attestation Services</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-brand-text/70 md:text-base">
            Trusted attestation services for documents from 120+ countries
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCountries.map((country, i) => (
            <Reveal key={country.code} delay={(i % 6) * 50}>
              <Link
                href={`/countries/${country.code.toLowerCase()}`}
                className="glass-card flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgba(15,44,76,0.3)]"
              >
                <CircleFlag code={country.code} size={36} className="shrink-0" />
                <span className="text-sm font-semibold text-brand-navy">{country.name} Certificate Attestation</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/countries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline"
          >
            View all 120+ countries <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Target, Compass, Landmark } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import StatsCounter from "@/components/StatsCounter";
import WhyRankNo1 from "@/components/WhyRankNo1";
import ContactCtaBand from "@/components/ContactCtaBand";
import { DataIcon } from "@/lib/icons";
import { getServices } from "@/lib/db";
import {
  aboutIntro,
  authoritiesWeWorkWith,
  easyBenefits,
  missionVision,
  whyChooseCards,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Amer Attestation Services, a trusted certificate attestation company serving the UAE for 15+ years across 120+ countries.",
};

export default function AboutPage() {
  const services = getServices();
  return (
    <>
      <PageHero
        title="About Us"
        description="15+ years of trusted certificate and document attestation across the UAE."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Intro / credibility */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-24">
            <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-[#123252] shadow-[0_20px_50px_-16px_rgba(15,44,76,0.5)]">
              <ShieldCheck className="size-20 text-white opacity-90" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-brand-green">15+</p>
                <p className="mt-1 text-xs font-medium text-brand-text/60">Years of Experience</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="font-heading text-2xl font-extrabold text-brand-green">120+</p>
                <p className="mt-1 text-xs font-medium text-brand-text/60">Countries Covered</p>
              </div>
            </div>
          </Reveal>
          <div>
            <span className="inline-block rounded-full bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
              Who We Are
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Our Story
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {aboutIntro.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 24)} delay={i * 80}>
                  <p className="text-sm leading-6 text-brand-text/70 md:text-base">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do + Core Services */}
      <section className="section-band py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
              What We Do
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Our Core Services Include
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70 md:text-base">
              We offer a comprehensive range of certificate and document legalization services across the
              UAE. Whether you are an individual or a business, our experienced advisors ensure a smooth,
              transparent and reliable experience from start to finish.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 4) * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="glass-card group flex h-full flex-col items-start gap-3 rounded-2xl p-5 transition hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(11,122,75,0.35)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                    <DataIcon name={service.icon} className="size-5" />
                  </span>
                  <span className="font-heading text-sm font-semibold text-brand-navy">{service.name}</span>
                  <span className="text-xs leading-5 text-brand-text/60">{service.description}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Authorities we work with */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-brand-navy/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navy">
              Coordination
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Authorities & Bodies We Work With
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70 md:text-base">
              We coordinate directly with the relevant government and diplomatic bodies so every document is
              legalized correctly the first time.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {authoritiesWeWorkWith.map((authority, i) => (
              <Reveal key={authority} delay={(i % 4) * 60}>
                <div className="glass-card flex h-full items-start gap-3 rounded-xl p-4">
                  <Landmark className="mt-0.5 size-4 shrink-0 text-brand-green" />
                  <span className="text-sm font-medium text-brand-navy">{authority}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Attestation made easy */}
      <section className="section-band py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
          <Reveal>
            <span className="inline-block rounded-full bg-brand-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gold">
              Your Attestation Partner
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Attestation Made Easy — Anytime, Anywhere
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text/70 md:text-base">
              No more waiting in long queues or travelling between government offices. Our advisors manage
              the entire process for you, from document pickup to final delivery.
            </p>
          </Reveal>
          <Reveal delay={100} className="glass-card rounded-2xl p-6">
            <ul className="flex flex-col gap-4">
              {easyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-brand-text/75">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Our Mission and Vision
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="glass-card h-full rounded-2xl p-7">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Compass className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-brand-navy">Our Vision</h3>
                <p className="mt-2 text-sm leading-6 text-brand-text/70">{missionVision.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="glass-card h-full rounded-2xl p-7">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                  <Target className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-brand-navy">Our Mission</h3>
                <p className="mt-2 text-sm leading-6 text-brand-text/70">{missionVision.mission}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-band py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              Why Choose Us
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {whyChooseCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 80} className="text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-[#183a5e] text-brand-gold shadow-[0_10px_24px_-8px_rgba(15,44,76,0.5)]">
                  <DataIcon name={card.icon} className="size-6" />
                </span>
                <p className="mt-3 font-heading text-sm font-semibold text-brand-navy">{card.title}</p>
                <p className="mt-1 text-xs leading-5 text-brand-text/60">{card.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />
      <WhyRankNo1 />
      <ContactCtaBand />
    </>
  );
}

import Hero from "@/components/Hero";
import CountryLookup from "@/components/CountryLookup";
import ServicesGrid from "@/components/ServicesGrid";
import CountriesGrid from "@/components/CountriesGrid";
import DocumentsBlock from "@/components/DocumentsBlock";
import HowItWorks from "@/components/HowItWorks";
import StatsCounter from "@/components/StatsCounter";
import WhyRankNo1 from "@/components/WhyRankNo1";
import AboutTeaser from "@/components/AboutTeaser";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import ContactCtaBand from "@/components/ContactCtaBand";
import { faqs } from "@/lib/data";
import { getServices, getOtherServices } from "@/lib/db";

export default function Home() {
  const services = getServices();
  const otherServices = getOtherServices();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <CountryLookup services={services} otherServices={otherServices} />
      <ServicesGrid services={services} />
      <CountriesGrid />
      <DocumentsBlock />
      <HowItWorks />
      <StatsCounter />
      <WhyRankNo1 />
      <AboutTeaser />
      <Testimonials />
      <FaqAccordion />
      <ContactCtaBand />
    </>
  );
}

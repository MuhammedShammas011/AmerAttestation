import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCtaBand from "@/components/ContactCtaBand";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, guides and updates on certificate attestation, apostille and legalization from Amer Attestation Services.",
};

const placeholderPosts = [
  {
    title: "Attestation vs Apostille: Which Do You Need?",
    excerpt: "A quick guide to understanding the difference and which process applies to your documents.",
  },
  {
    title: "A Complete Guide to Degree Certificate Attestation in the UAE",
    excerpt: "Step-by-step breakdown of the notary, home MOFA, embassy and UAE MOFA stages.",
  },
  {
    title: "Documents Required for UAE Family Visa Attestation",
    excerpt: "What to prepare before applying for a family visa, from birth to marriage certificates.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        description="Guides and updates on certificate attestation, apostille and legalization in the UAE."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post) => (
              <article key={post.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Newspaper className="size-5" />
                </span>
                <h2 className="mt-4 font-heading text-base font-bold text-brand-navy">{post.title}</h2>
                <p className="mt-2 text-sm leading-6 text-brand-text/70">{post.excerpt}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-brand-text/50">
            More articles coming soon.
          </p>
        </div>
      </section>
      <ContactCtaBand />
    </>
  );
}

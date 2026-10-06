import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-brand-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-base">{description}</p>}
      </div>
    </section>
  );
}

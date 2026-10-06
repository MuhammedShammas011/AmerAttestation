export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-brand-text/70 md:text-base">{description}</p>}
    </div>
  );
}

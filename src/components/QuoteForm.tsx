"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteForm({
  variant = "card",
  title = "Get a Free Quote",
  service,
}: {
  variant?: "card" | "plain" | "glass";
  title?: string;
  service?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const wrapperClass =
    variant === "card"
      ? "rounded-2xl border border-black/5 bg-white p-6 shadow-xl"
      : variant === "glass"
        ? "glass-card rounded-3xl p-6"
        : "";

  if (status === "success") {
    return (
      <div className={`${wrapperClass} flex flex-col items-center gap-3 py-10 text-center`}>
        <CheckCircle2 className="size-10 text-brand-green" />
        <p className="font-heading text-lg font-semibold text-brand-navy">Thank you!</p>
        <p className="text-sm text-brand-text/70">
          Your request has been received. An attestation advisor will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-brand-green hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    variant === "glass"
      ? "rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm outline-none placeholder:text-brand-text/50 focus:border-brand-green focus:bg-white/90 transition-colors"
      : "rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-green";

  return (
    <form onSubmit={handleSubmit} className={wrapperClass}>
      {title && <h3 className="font-heading text-lg font-bold text-brand-navy">{title}</h3>}
      <input type="hidden" name="service" value={service || ""} />
      <div className="mt-4 flex flex-col gap-3">
        <input required name="name" placeholder="Your Name*" className={inputClass} />
        <input required type="email" name="email" placeholder="Your Email*" className={inputClass} />
        <input required type="tel" name="mobile" placeholder="Mobile Number*" className={inputClass} />
        <textarea name="message" placeholder="Your Message" rows={3} className={inputClass} />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors disabled:opacity-70"
        >
          {status === "loading" && <Loader2 className="size-4 animate-spin" />}
          Submit
        </button>
        {status === "error" && <p className="text-xs text-red-600">{error}</p>}
        <p className="text-center text-[11px] leading-4 text-brand-text/50">
          Protected against spam. By submitting you agree to be contacted about your attestation request.
        </p>
      </div>
    </form>
  );
}

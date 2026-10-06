"use client";

import { useState } from "react";
import { MessageCircle, Phone, MessagesSquare, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Settings } from "@/lib/db";

export default function FloatingButtons({ settings }: { settings?: Settings }) {
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const contactNumbers = settings?.contactNumbers ?? {
    dubai: "+971 55 431 6535",
  };

  const cleanPhone = contactNumbers.dubai.replace(/\s/g, "");
  const cleanWa = contactNumbers.dubai.replace(/[\s+]/g, "");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {chatOpen && (
        <div className="w-[calc(100vw-2.5rem)] max-w-72 rounded-2xl border border-black/5 bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="font-heading text-sm font-semibold text-brand-navy">Live Chat</p>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">
              <X className="size-4 text-brand-text/60" />
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-brand-text/70">
            Our advisors are online. Chat with us on WhatsApp or call now for an instant response.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={`https://wa.me/${cleanWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-whatsapp px-4 py-2 text-center text-xs font-semibold text-white"
            >
              Start WhatsApp Chat
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="rounded-full border border-brand-green px-4 py-2 text-center text-xs font-semibold text-brand-green"
            >
              Call {contactNumbers.dubai}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Toggle live chat"
        className="flex size-13 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg hover:brightness-110 transition"
      >
        <MessagesSquare className="size-5" />
      </button>
      <a
        href={`tel:${cleanPhone}`}
        aria-label="Call Now"
        className="flex size-13 items-center justify-center rounded-full bg-brand-green text-white shadow-lg hover:brightness-110 transition"
      >
        <Phone className="size-5" />
      </a>
      <a
        href={`https://wa.me/${cleanWa}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
        className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg hover:brightness-105 transition"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}

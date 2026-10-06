import type { Metadata } from "next";
import { DM_Sans, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { getServices, getOtherServices, getSettings } from "@/lib/db";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const govityFont = Poppins({
  variable: "--govity-font",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.attestationuae.com"),
  title: {
    default: "Amer Attestation Services | Certificate Attestation in UAE",
    template: "%s | Amer Attestation Services",
  },
  description:
    "Certificate & document attestation company in Dubai, UAE. MOFA, Embassy, Apostille & translation services for 120+ countries. Free pickup & delivery.",
  keywords: [
    "certificate attestation UAE",
    "document attestation Dubai",
    "MOFA attestation",
    "embassy attestation",
    "apostille UAE",
    "degree certificate attestation",
  ],
  openGraph: {
    title: "Amer Attestation Services | Certificate Attestation in UAE",
    description:
      "Fast, secure & affordable certificate attestation in Dubai, Sharjah & Abu Dhabi. Free pickup & delivery across the UAE.",
    siteName: "Amer Attestation Services",
    locale: "en_AE",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = getServices();
  const otherServices = getOtherServices();
  const settings = getSettings();

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${govityFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-text">
        <Header services={services} otherServices={otherServices} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer services={services} settings={settings} />
        <FloatingButtons settings={settings} />
      </body>
    </html>
  );
}

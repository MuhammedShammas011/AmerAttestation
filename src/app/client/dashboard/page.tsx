"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  UploadCloud,
  LogOut,
  Loader2,
  DollarSign,
  Briefcase,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Application {
  id: string;
  documentType: string;
  country: string;
  status: "Under Review" | "Notary Cleared" | "MOFA Attesting" | "Completed" | "Pending Payment";
  updatedAt: string;
  fee: string;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "APP-9827",
    documentType: "Degree Certificate (Bachelor of Science)",
    country: "United Kingdom",
    status: "Completed",
    updatedAt: "2026-08-19T10:30:00Z",
    fee: "AED 850",
  },
  {
    id: "APP-4421",
    documentType: "Marriage Certificate",
    country: "India",
    status: "MOFA Attesting",
    updatedAt: "2026-08-20T14:15:00Z",
    fee: "AED 450",
  },
  {
    id: "APP-1102",
    documentType: "Police Clearance Certificate",
    country: "United States",
    status: "Pending Payment",
    updatedAt: "2026-08-20T08:00:00Z",
    fee: "AED 350",
  },
];

export default function ClientDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/client/auth");
        const json = await res.json();
        if (!json.authenticated) {
          router.push("/login?portal=client");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        router.push("/login?portal=client");
      }
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/client/auth", { method: "DELETE" });
      router.push("/login?portal=client");
    } catch (err) {
      console.error("Error logging out", err);
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).map((f) => ({
        name: f.name,
        size: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-brand-green" />
          <p className="mt-3 text-sm text-slate-500 font-semibold">Loading client portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {/* Client Portal Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Amer Attesstation Png.png"
              alt="Amer Logo"
              width={110}
              height={40}
              className="object-contain"
              style={{ height: "auto" }}
            />
            <span className="h-6 w-px bg-slate-200" />
            <h1 className="font-heading text-lg font-bold text-brand-navy">Client Document Portal</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-brand-navy p-6 text-white shadow-lg relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-radial-gradient from-brand-green/20 to-transparent blur-2xl" />
          <h2 className="font-heading text-xl font-bold md:text-2xl">Welcome back, client@amer.ae</h2>
          <p className="mt-1 text-sm text-white/70">
            Track your certificate attestations, upload new documents, and manage invoices securely.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applications</span>
              <FileText className="size-5 text-brand-navy" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-brand-navy">{applications.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">In Progress</span>
              <Clock className="size-5 text-blue-500" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-brand-navy">
              {applications.filter((a) => a.status === "MOFA Attesting" || a.status === "Under Review" || a.status === "Notary Cleared").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed</span>
              <CheckCircle className="size-5 text-brand-green" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-brand-navy">
              {applications.filter((a) => a.status === "Completed").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Actions</span>
              <AlertCircle className="size-5 text-amber-500" />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-brand-navy">
              {applications.filter((a) => a.status === "Pending Payment").length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Applications Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-brand-navy">Your Active Applications</h3>
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                Live Status
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">App ID</th>
                      <th className="px-6 py-4">Document Details</th>
                      <th className="px-6 py-4">Target Country</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Fee</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-brand-navy">{app.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">{app.documentType}</p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Updated {new Date(app.updatedAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-900">{app.country}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              app.status === "Completed"
                                ? "bg-green-50 text-green-700 border border-green-100"
                                : app.status === "Pending Payment"
                                  ? "bg-amber-50 text-amber-700 border border-amber-100"
                                  : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}
                          >
                            {app.status === "Completed" ? (
                              <CheckCircle className="size-3" />
                            ) : app.status === "Pending Payment" ? (
                              <AlertCircle className="size-3" />
                            ) : (
                              <Clock className="size-3" />
                            )}
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900">{app.fee}</td>
                        <td className="px-6 py-4 text-right">
                          {app.status === "Pending Payment" ? (
                            <button className="rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition">
                              Pay Now
                            </button>
                          ) : (
                            <button className="flex items-center gap-1 ml-auto text-xs font-semibold text-brand-green hover:underline">
                              View <ExternalLink className="size-3" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Document Upload Area */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-base font-bold text-brand-navy mb-4">Securely Upload Additional Files</h3>
              
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? "border-brand-green bg-brand-green/5"
                    : "border-slate-300 hover:border-brand-green hover:bg-slate-50/50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files).map((f) => ({
                        name: f.name,
                        size: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
                      }));
                      setUploadedFiles((prev) => [...prev, ...files]);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <UploadCloud className="size-10 text-slate-400" />
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Drag and drop files here, or click to browse
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Supported formats: PDF, JPEG, PNG (Max 15MB per file)
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uploaded Files</p>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-xs">
                      <span className="font-medium text-slate-700">{file.name}</span>
                      <span className="text-slate-400 font-semibold">{file.size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Info column */}
          <div className="space-y-6">
            {/* Help desk card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-sm font-bold text-brand-navy pb-3 border-b border-slate-100">
                Your Attestation Advisor
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative size-12 rounded-full overflow-hidden bg-brand-navy/10 flex items-center justify-center">
                  <Briefcase className="size-6 text-brand-navy" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Zara Amal.</p>
                  <p className="text-xs text-slate-500">Legalization Expert</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Have questions about your active application or target legalization rules in the UAE?
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://wa.me/971554316535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-2.5 text-xs font-bold text-white transition hover:brightness-95"
                >
                  WhatsApp Support
                </a>
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Open Support Ticket
                </Link>
              </div>
            </div>

            {/* Note on security */}
            <div className="rounded-2xl bg-amber-50/50 border border-amber-200/60 p-5 flex gap-3 text-xs text-amber-800">
              <ShieldAlert className="size-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold">Encrypted Document Handling</p>
                <p className="mt-1 text-[11px] leading-relaxed text-amber-700">
                  All documents uploaded to the Amer Attestation portal are stored using high-grade end-to-end encryption. Original physical documents are handled via certified secure courier partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

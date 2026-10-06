"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Loader2, Mail, Shield, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PortalType = "client" | "admin";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [portal, setPortal] = useState<PortalType>("client");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const qPortal = searchParams.get("portal");
    if (qPortal === "admin" || qPortal === "client") {
      setPortal(qPortal as PortalType);
    }
  }, [searchParams]);

  useEffect(() => {
    async function checkAuth() {
      try {
        if (portal === "admin") {
          const res = await fetch("/api/admin/auth");
          const json = await res.json();
          if (json.authenticated) {
            router.push("/admin/dashboard");
            return;
          }
        } else {
          const res = await fetch("/api/client/auth");
          const json = await res.json();
          if (json.authenticated) {
            router.push("/client/dashboard");
            return;
          }
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [portal, router]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (portal === "admin") {
        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          router.push("/admin/dashboard");
        } else {
          setError(data.error || "Invalid admin username or password.");
        }
      } else {
        const res = await fetch("/api/client/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          router.push("/client/dashboard");
        } else {
          setError(data.error || "Invalid client email or password.");
        }
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const handlePortalSwitch = (type: PortalType) => {
    if (submitting) return;
    setPortal(type);
    setError(null);
    setPassword("");
    const params = new URLSearchParams(window.location.search);
    params.set("portal", type);
    router.replace(`/login?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-navy">
        <div className="text-center text-white">
          <Loader2 className="mx-auto size-8 animate-spin text-brand-gold" />
          <p className="mt-3 text-sm text-white/60">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-mesh relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
      >
        <ArrowLeft className="size-3.5" /> Back to Home
      </Link>

      <div className="pointer-events-none absolute left-1/4 top-1/4 size-80 -translate-y-1/2 rounded-full bg-brand-green/25 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 size-80 translate-y-1/2 rounded-full bg-brand-gold/15 blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-slide-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/images/Amer Attesstation Png.png"
            alt="Amer Attestation"
            width={170}
            height={64}
            className="object-contain brightness-0 invert"
            style={{ height: "auto" }}
            priority
          />
          <p className="mt-3 text-sm font-semibold tracking-wide text-brand-gold/80 uppercase">
            Attestation Services Portal
          </p>
        </div>

        <div className="glass-card-dark overflow-hidden rounded-3xl p-8 shadow-2xl">
          <div className="relative flex rounded-xl bg-white/5 p-1 border border-white/5">
            <div
              className={`absolute top-1 bottom-1 w-[48%] rounded-lg bg-brand-green shadow-md transition-all duration-300 ease-out ${
                portal === "admin" ? "left-[50%]" : "left-1"
              }`}
            />
            <button
              onClick={() => handlePortalSwitch("client")}
              disabled={submitting}
              className={`relative z-10 flex w-1/2 items-center justify-center gap-2 py-2.5 text-xs font-bold transition-colors ${
                portal === "client" ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <User className="size-3.5" />
              Client Portal
            </button>
            <button
              onClick={() => handlePortalSwitch("admin")}
              disabled={submitting}
              className={`relative z-10 flex w-1/2 items-center justify-center gap-2 py-2.5 text-xs font-bold transition-colors ${
                portal === "admin" ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Shield className="size-3.5" />
              Admin Portal
            </button>
          </div>

          <div className="mt-6 text-center">
            <h2 className="font-heading text-lg font-bold tracking-tight text-white">
              {portal === "client" ? "Client Sign In" : "Admin Sign In"}
            </h2>
            <p className="mt-1 text-xs text-white/50">
              {portal === "client"
                ? "Access your dashboard, track documents and view invoices"
                : "Manage leads, edit services and update site configurations"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {portal === "client" ? (
              <div>
                <label className="block text-xs font-semibold text-white/70">Client Email</label>
                <div className="relative mt-1.5">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
                    <Mail className="size-4" />
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@amer.ae"
                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-green focus:bg-white/15 transition-all"
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-white/40">
                  Demo Client Account: <span className="text-brand-gold">client@amer.ae</span>
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-white/70">Username</label>
                <div className="relative mt-1.5">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
                    <User className="size-4" />
                  </span>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-green focus:bg-white/15 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/70">Password</label>
              <div className="relative mt-1.5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
                  <Lock className="size-4" />
                </span>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={portal === "client" ? "clientpassword" : "Enter password"}
                  className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-green focus:bg-white/15 transition-all"
                />
              </div>
              {portal === "client" && (
                <p className="mt-1.5 text-[10px] text-white/40">
                  Demo Client Password: <span className="text-brand-gold">clientpassword</span>
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green py-3 text-sm font-semibold text-white shadow-md shadow-brand-green/20 hover:bg-brand-green-dark transition-all disabled:opacity-70 active:scale-[0.98]"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {portal === "client" ? "Sign In to Client Portal" : "Sign In to Admin Portal"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[11px] text-white/40">
          Amer Attestation Services. Secure Restricted Access.
        </p>
      </div>
    </div>
  );
}

export default function UnifiedLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-navy">
          <div className="text-center text-white">
            <Loader2 className="mx-auto size-8 animate-spin text-brand-gold" />
            <p className="mt-3 text-sm text-white/60">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?portal=admin");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy">
      <div className="text-center text-white">
        <Loader2 className="mx-auto size-8 animate-spin text-brand-gold" />
        <p className="mt-3 text-sm text-white/60">Redirecting to login portal...</p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { countries } from "@/lib/data";
import { CircleFlag } from "@/lib/flags";

export default function CountriesList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter((country) => {
    const term = searchTerm.toLowerCase().trim();
    const name = country.name.toLowerCase();
    
    // Add special aliases based on user requests (e.g. "indian" -> "india")
    if (term.includes("indian") && name === "india") return true;
    if (term.includes("pakistani") && name === "pakistan") return true;
    if (term.includes("filipino") && name === "philippines") return true;
    
    return name.includes(term);
  });

  return (
    <div>
      <div className="mb-10 relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="size-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green text-sm transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No countries found matching "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => (
            <Link
              key={country.code}
              href={`/countries/${country.code.toLowerCase()}`}
              className="flex items-center gap-3 rounded-full border border-black/5 bg-white py-2.5 pl-2.5 pr-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-md"
            >
              <CircleFlag code={country.code} size={36} className="shrink-0" />
              <span className="text-sm font-semibold text-brand-navy">{country.name} Certificate Attestation</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

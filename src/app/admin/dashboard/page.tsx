"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  Layers,
  Settings as SettingsIcon,
  LogOut,
  Loader2,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Check,
} from "lucide-react";
import Image from "next/image";
import type { Lead, Service, OtherService, Settings } from "@/lib/db";

// Available Lucide icon names list that the admin can choose from
const ICON_OPTIONS = [
  "building",
  "stamp",
  "globe",
  "shield",
  "certificate",
  "graduation-cap",
  "baby",
  "rings",
  "briefcase",
  "translate",
  "users",
  "star",
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "services" | "settings">("leads");

  // State for data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [otherServices, setOtherServices] = useState<OtherService[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  // Search & filter state for leads
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [leadStatus, setLeadStatus] = useState<Lead["status"]>("New");
  const [leadNotes, setLeadNotes] = useState("");

  // Services State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<{
    type: "service" | "otherService";
    originalSlug?: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
  } | null>(null);

  // Settings State
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  useEffect(() => {
    // Check authentication and load initial data
    async function checkAuthAndLoad() {
      try {
        const authRes = await fetch("/api/admin/auth");
        const authJson = await authRes.json();
        if (!authJson.authenticated) {
          router.push("/admin");
          return;
        }

        // Parallel load of leads, services, and settings
        const [leadsRes, servicesRes, settingsRes] = await Promise.all([
          fetch("/api/admin/leads"),
          fetch("/api/admin/services"),
          fetch("/api/admin/settings"),
        ]);

        const leadsData = await leadsRes.json();
        const servicesData = await servicesRes.json();
        const settingsData = await settingsRes.json();

        if (leadsData.ok) setLeads(leadsData.leads);
        if (servicesData.ok) {
          setServices(servicesData.services);
          setOtherServices(servicesData.otherServices);
        }
        if (settingsData.ok) setSettings(settingsData.settings);

        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data", err);
        router.push("/admin");
      }
    }
    checkAuthAndLoad();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin");
    } catch (err) {
      console.error("Error during logout", err);
    }
  }

  // ==========================================
  // Leads Handlers
  // ==========================================
  async function handleUpdateLead(leadId: string) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: leadStatus, notes: leadNotes }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: leadStatus, notes: leadNotes } : l))
        );
        setEditingLeadId(null);
      } else {
        alert(data.error || "Failed to update lead.");
      }
    } catch (err) {
      alert("Failed to update lead.");
    }
  }

  async function handleDeleteLead(leadId: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
      } else {
        alert(data.error || "Failed to delete lead.");
      }
    } catch (err) {
      alert("Failed to delete lead.");
    }
  }

  // ==========================================
  // Services Handlers
  // ==========================================
  async function handleSaveService(e: React.FormEvent) {
    e.preventDefault();
    if (!editingService) return;

    const isEdit = !!editingService.originalSlug;
    const url = "/api/admin/services";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        // Refresh services
        const servRes = await fetch("/api/admin/services");
        const servData = await servRes.json();
        if (servData.ok) {
          setServices(servData.services);
          setOtherServices(servData.otherServices);
        }
        setServiceModalOpen(false);
        setEditingService(null);
      } else {
        alert(data.error || "Failed to save service.");
      }
    } catch (err) {
      alert("Failed to save service.");
    }
  }

  async function handleDeleteService(type: "service" | "otherService", slug: string) {
    if (!confirm(`Are you sure you want to delete this ${type === "service" ? "primary service" : "other service"}?`)) return;
    try {
      const res = await fetch(`/api/admin/services?type=${type}&slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (type === "service") {
          setServices((prev) => prev.filter((s) => s.slug !== slug));
        } else {
          setOtherServices((prev) => prev.filter((s) => s.slug !== slug));
        }
      } else {
        alert(data.error || "Failed to delete service.");
      }
    } catch (err) {
      alert("Failed to delete service.");
    }
  }

  // ==========================================
  // Settings Handlers
  // ==========================================
  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setSavingSettings(true);
    setSettingsSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      } else {
        alert(data.error || "Failed to save settings.");
      }
    } catch (err) {
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  }

  // Filters leads list based on search and status filter
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.mobile.includes(leadSearch) ||
      (lead.message || "").toLowerCase().includes(leadSearch.toLowerCase());

    const matchesFilter = leadFilter === "all" || lead.status === leadFilter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-brand-green" />
          <p className="mt-3 text-sm text-slate-500 font-semibold">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/Amer Attesstation Png.png" alt="Amer Logo" width={110} height={40} className="object-contain" style={{ height: "auto" }} />
            <span className="h-6 w-px bg-slate-200" />
            <h1 className="font-heading text-lg font-bold text-brand-navy">Management Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === "leads"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/20"
                  : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50"
              }`}
            >
              <Inbox className="size-4" /> Leads Inbox
              {leads.filter((l) => l.status === "New").length > 0 && (
                <span className={`ml-auto flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${activeTab === "leads" ? "bg-white text-brand-green" : "bg-red-500 text-white"}`}>
                  {leads.filter((l) => l.status === "New").length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === "services"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/20"
                  : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50"
              }`}
            >
              <Layers className="size-4" /> Manage Services
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-brand-green text-white shadow-md shadow-brand-green/20"
                  : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50"
              }`}
            >
              <SettingsIcon className="size-4" /> Site Settings
            </button>
          </aside>

          {/* Tab Contents */}
          <main className="min-w-0">
            {/* LEADS TAB */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-brand-navy">Customer Leads</h2>
                    <p className="text-xs text-slate-500">Track and respond to submitted contact requests</p>
                  </div>
                  {/* Lead Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {["all", "New", "In-Progress", "Contacted", "Closed"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLeadFilter(filter)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                          leadFilter === filter
                            ? "bg-brand-green/10 text-brand-green-dark border-brand-green/20"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {filter === "all" ? "All Leads" : filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lead Search Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Search className="size-4" />
                  </span>
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads by name, email, phone number, or messages..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                  />
                </div>

                {/* Leads List / Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4">Client</th>
                          <th className="px-6 py-4">Details</th>
                          <th className="px-6 py-4">Requested Service</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                              <Inbox className="mx-auto size-8 text-slate-300" />
                              <p className="mt-2 text-sm">No leads found matching current criteria.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => {
                            const isEditing = editingLeadId === lead.id;
                            return (
                              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  <p className="font-semibold text-slate-900">{lead.name}</p>
                                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <Phone className="size-3" /> {lead.mobile}
                                  </p>
                                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <Mail className="size-3" /> {lead.email}
                                  </p>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                  <div className="line-clamp-2 text-xs text-slate-600" title={lead.message}>
                                    {lead.message || <span className="italic text-slate-400">No message provided</span>}
                                  </div>
                                  {lead.notes && (
                                    <div className="mt-1.5 rounded bg-amber-50 border border-amber-100 px-2 py-1 text-[11px] text-amber-700">
                                      <strong>Notes:</strong> {lead.notes}
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-xs font-semibold text-slate-900">
                                  <span className="inline-block rounded-md bg-slate-100 px-2 py-1">
                                    {lead.service || "General Inquiry"}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <select
                                      value={leadStatus}
                                      onChange={(e) => setLeadStatus(e.target.value as Lead["status"])}
                                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-brand-green"
                                    >
                                      <option value="New">New</option>
                                      <option value="In-Progress">In-Progress</option>
                                      <option value="Contacted">Contacted</option>
                                      <option value="Closed">Closed</option>
                                    </select>
                                  ) : (
                                    <span
                                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        lead.status === "New"
                                          ? "bg-red-50 text-red-700 border border-red-100"
                                          : lead.status === "In-Progress"
                                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                                            : lead.status === "Contacted"
                                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                                              : "bg-green-50 text-green-700 border border-green-100"
                                      }`}
                                    >
                                      {lead.status === "New" && <Clock className="size-3" />}
                                      {lead.status === "Closed" && <CheckCircle className="size-3" />}
                                      {lead.status}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">
                                  {new Date(lead.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {isEditing ? (
                                    <div className="space-y-1.5">
                                      <input
                                        type="text"
                                        value={leadNotes}
                                        onChange={(e) => setLeadNotes(e.target.value)}
                                        placeholder="Add note..."
                                        className="w-full rounded border border-slate-200 px-2 py-1 text-[11px] outline-none"
                                      />
                                      <div className="flex justify-end gap-1.5">
                                        <button
                                          onClick={() => handleUpdateLead(lead.id)}
                                          className="rounded-md bg-brand-green px-2 py-1 text-[11px] font-bold text-white hover:bg-brand-green-dark"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setEditingLeadId(null)}
                                          className="rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-500 hover:bg-slate-100"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          setEditingLeadId(lead.id);
                                          setLeadStatus(lead.status);
                                          setLeadNotes(lead.notes || "");
                                        }}
                                        className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                                        title="Edit Status"
                                      >
                                        <Edit2 className="size-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteLead(lead.id)}
                                        className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition"
                                        title="Delete Lead"
                                      >
                                        <Trash2 className="size-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-brand-navy">Service Pages</h2>
                    <p className="text-xs text-slate-500">Configure primary attestation services and other services</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingService({ type: "service", name: "", slug: "", icon: "certificate", description: "" });
                        setServiceModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-brand-green px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand-green/10 hover:bg-brand-green-dark transition"
                    >
                      <Plus className="size-3.5" /> Add Primary Service
                    </button>
                    <button
                      onClick={() => {
                        setEditingService({ type: "otherService", name: "", slug: "", icon: "", description: "" });
                        setServiceModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                    >
                      <Plus className="size-3.5" /> Add Other Service
                    </button>
                  </div>
                </div>

                {/* Primary Services List */}
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400">
                    Primary Services ({services.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                      <div key={service.slug} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-semibold text-xs uppercase">
                              {service.icon.substring(0, 2)}
                            </span>
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                              /{service.slug}
                            </span>
                          </div>
                          <h4 className="mt-4 font-heading text-sm font-bold text-slate-900">{service.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-3">{service.description}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-1.5 border-t border-slate-100 pt-4">
                          <button
                            onClick={() => {
                              setEditingService({
                                type: "service",
                                originalSlug: service.slug,
                                name: service.name,
                                slug: service.slug,
                                icon: service.icon,
                                description: service.description,
                              });
                              setServiceModalOpen(true);
                            }}
                            className="flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
                          >
                            <Edit2 className="size-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService("service", service.slug)}
                            className="flex items-center gap-1 rounded bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                          >
                            <Trash2 className="size-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Services List */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400">
                    Other Services ({otherServices.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {otherServices.map((service) => (
                      <div key={service.slug} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            /other-services/{service.slug}
                          </span>
                          <h4 className="mt-3 font-heading text-sm font-bold text-slate-900">{service.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-3">{service.description}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-1.5 border-t border-slate-100 pt-4">
                          <button
                            onClick={() => {
                              setEditingService({
                                type: "otherService",
                                originalSlug: service.slug,
                                name: service.name,
                                slug: service.slug,
                                icon: "",
                                description: service.description,
                              });
                              setServiceModalOpen(true);
                            }}
                            className="flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
                          >
                            <Edit2 className="size-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService("otherService", service.slug)}
                            className="flex items-center gap-1 rounded bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                          >
                            <Trash2 className="size-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && settings && (
              <form onSubmit={handleSaveSettings} className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-navy">Site Settings</h2>
                  <p className="text-xs text-slate-500">Update general contact numbers, office locations, and emails</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Contact details */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                    <h3 className="font-heading text-sm font-bold text-brand-navy flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Phone className="size-4 text-brand-green" /> Contact Numbers
                    </h3>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-500">Toll Free Helpline</label>
                      <input
                        required
                        type="text"
                        value={settings.contactNumbers.tollFree}
                        onChange={(e) =>
                          setSettings((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  contactNumbers: {
                                    ...prev.contactNumbers,
                                    tollFree: e.target.value,
                                  },
                                }
                              : null
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500">Dubai Mobile / WhatsApp</label>
                      <input
                        required
                        type="text"
                        value={settings.contactNumbers.dubai}
                        onChange={(e) =>
                          setSettings((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  contactNumbers: {
                                    ...prev.contactNumbers,
                                    dubai: e.target.value,
                                  },
                                }
                              : null
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500">Dubai Landline</label>
                      <input
                        required
                        type="text"
                        value={settings.contactNumbers.landlineDubai}
                        onChange={(e) =>
                          setSettings((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  contactNumbers: {
                                    ...prev.contactNumbers,
                                    landlineDubai: e.target.value,
                                  },
                                }
                              : null
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500">Dubai Email</label>
                      <input
                        required
                        type="email"
                        value={settings.contactNumbers.emailDubai}
                        onChange={(e) =>
                          setSettings((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  contactNumbers: {
                                    ...prev.contactNumbers,
                                    emailDubai: e.target.value,
                                  },
                                }
                              : null
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Branches */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                    <h3 className="font-heading text-sm font-bold text-brand-navy flex items-center gap-2 pb-3 border-b border-slate-100">
                      <MapPin className="size-4 text-brand-green" /> Head Office Details
                    </h3>

                    {settings.branches.map((branch, idx) => (
                      <div key={branch.slug} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500">City / Label</label>
                          <input
                            required
                            type="text"
                            value={branch.city}
                            onChange={(e) => {
                              const updatedBranches = [...settings.branches];
                              updatedBranches[idx].city = e.target.value;
                              setSettings((prev) => (prev ? { ...prev, branches: updatedBranches } : null));
                            }}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500">Physical Address</label>
                          <textarea
                            required
                            rows={3}
                            value={branch.address}
                            onChange={(e) => {
                              const updatedBranches = [...settings.branches];
                              updatedBranches[idx].address = e.target.value;
                              setSettings((prev) => (prev ? { ...prev, branches: updatedBranches } : null));
                            }}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-green focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Save Area */}
                <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-green/25 hover:bg-brand-green-dark transition disabled:opacity-75"
                  >
                    {savingSettings ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    Save Site Settings
                  </button>

                  {settingsSuccess && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 animate-pulse">
                      <Check className="size-4" /> Settings updated successfully!
                    </span>
                  )}
                </div>
              </form>
            )}
          </main>
        </div>
      </div>

      {/* SERVICE MODAL DIALOG */}
      {serviceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h3 className="font-heading text-sm font-bold text-brand-navy uppercase">
                {editingService.originalSlug ? "Edit" : "Create"}{" "}
                {editingService.type === "service" ? "Primary Service" : "Other Service"}
              </h3>
              <button
                onClick={() => {
                  setServiceModalOpen(false);
                  setEditingService(null);
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-150 hover:text-slate-700 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500">Service Name*</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Birth Certificate Attestation"
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500">URL Slug* (lowercase, hyphens instead of spaces)</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. birth-certificate-attestation"
                  value={editingService.slug}
                  onChange={(e) =>
                    setEditingService((prev) => (prev ? { ...prev, slug: e.target.value } : null))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>

              {editingService.type === "service" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500">Icon Type</label>
                  <select
                    value={editingService.icon}
                    onChange={(e) =>
                      setEditingService((prev) => (prev ? { ...prev, icon: e.target.value } : null))
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-green transition-all"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-500">Description / Snippet</label>
                <textarea
                  rows={4}
                  placeholder="Provide a clear, brief description of this service and what it includes..."
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setServiceModalOpen(false);
                    setEditingService(null);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-green px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand-green/20 hover:bg-brand-green-dark"
                >
                  {editingService.originalSlug ? "Save Changes" : "Create Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

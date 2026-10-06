import fs from "fs";
import path from "path";
import {
  services as defaultServices,
  otherServices as defaultOtherServices,
  contactNumbers as defaultContactNumbers,
  branches as defaultBranches,
} from "./data";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Helper to safely parse JSON files
function readJsonFile<T>(filename: string, defaultValue: T): T {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

// Helper to write JSON files
function writeJsonFile<T>(filename: string, data: T): void {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

// ==========================================
// DB API Functions
// ==========================================

export interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message?: string;
  service?: string;
  status: "New" | "In-Progress" | "Contacted" | "Closed";
  notes?: string;
  createdAt: string;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export interface OtherService {
  slug: string;
  name: string;
  description: string;
}

export interface Settings {
  contactNumbers: {
    dubai: string;
    tollFree: string;
    landlineDubai: string;
    emailDubai: string;
  };
  branches: Array<{
    slug: string;
    city: string;
    address: string;
    phone: string;
    email: string;
  }>;
}

export interface Session {
  sessionId: string;
  expiresAt: string;
}

// Leads CRUD
export function getLeads(): Lead[] {
  return readJsonFile<Lead[]>("leads.json", []);
}

export function saveLeads(leads: Lead[]): void {
  writeJsonFile<Lead[]>("leads.json", leads);
}

export function addLead(leadData: Omit<Lead, "id" | "status" | "createdAt">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead); // Add new lead to the beginning of the array
  saveLeads(leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"], notes?: string): boolean {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    leads[idx].status = status;
    if (notes !== undefined) {
      leads[idx].notes = notes;
    }
    saveLeads(leads);
    return true;
  }
  return false;
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length !== leads.length) {
    saveLeads(filtered);
    return true;
  }
  return false;
}

// Services CRUD
export function getServices(): Service[] {
  return readJsonFile<Service[]>("services.json", defaultServices);
}

export function saveServices(services: Service[]): void {
  writeJsonFile<Service[]>("services.json", services);
}

// Other Services CRUD
export function getOtherServices(): OtherService[] {
  return readJsonFile<OtherService[]>("other-services.json", defaultOtherServices);
}

export function saveOtherServices(services: OtherService[]): void {
  writeJsonFile<OtherService[]>("other-services.json", services);
}

// Settings CRUD
export function getSettings(): Settings {
  return readJsonFile<Settings>("settings.json", {
    contactNumbers: defaultContactNumbers,
    branches: defaultBranches,
  });
}

export function saveSettings(settings: Settings): void {
  writeJsonFile<Settings>("settings.json", settings);
}

// Session Helpers
export function getSessions(): Session[] {
  return readJsonFile<Session[]>("sessions.json", []);
}

export function saveSessions(sessions: Session[]): void {
  writeJsonFile<Session[]>("sessions.json", sessions);
}

export function createSession(): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const sessions = getSessions().filter(s => new Date(s.expiresAt) > new Date()); // Clean expired sessions
  sessions.push({ sessionId, expiresAt });
  saveSessions(sessions);
  return sessionId;
}

export function isValidSession(sessionId: string): boolean {
  const sessions = getSessions();
  const session = sessions.find((s) => s.sessionId === sessionId);
  if (!session) return false;
  return new Date(session.expiresAt) > new Date();
}

export function destroySession(sessionId: string): void {
  const sessions = getSessions();
  const filtered = sessions.filter((s) => s.sessionId !== sessionId);
  saveSessions(filtered);
}

// Client Session Helpers
export function getClientSessions(): Session[] {
  return readJsonFile<Session[]>("client-sessions.json", []);
}

export function saveClientSessions(sessions: Session[]): void {
  writeJsonFile<Session[]>("client-sessions.json", sessions);
}

export function createClientSession(): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const sessions = getClientSessions().filter(s => new Date(s.expiresAt) > new Date()); // Clean expired sessions
  sessions.push({ sessionId, expiresAt });
  saveClientSessions(sessions);
  return sessionId;
}

export function isValidClientSession(sessionId: string): boolean {
  const sessions = getClientSessions();
  const session = sessions.find((s) => s.sessionId === sessionId);
  if (!session) return false;
  return new Date(session.expiresAt) > new Date();
}

export function destroyClientSession(sessionId: string): void {
  const sessions = getClientSessions();
  const filtered = sessions.filter((s) => s.sessionId !== sessionId);
  saveClientSessions(filtered);
}


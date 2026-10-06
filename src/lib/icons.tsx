import {
  Building2,
  Stamp,
  Globe2,
  ShieldCheck,
  ScrollText,
  GraduationCap,
  Baby,
  Heart,
  Briefcase,
  Languages,
  Users,
  Star,
  BadgeCheck,
  BarChart3,
  Truck,
  Lock,
  Clock,
  Headset,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  stamp: Stamp,
  globe: Globe2,
  shield: ShieldCheck,
  certificate: ScrollText,
  "graduation-cap": GraduationCap,
  baby: Baby,
  rings: Heart,
  briefcase: Briefcase,
  translate: Languages,
  users: Users,
  star: Star,
  badge: BadgeCheck,
  chart: BarChart3,
  truck: Truck,
  lock: Lock,
  clock: Clock,
  headset: Headset,
};

export function DataIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? ScrollText;
  return <Icon className={className} />;
}

import {
  Home,
  Landmark,
  Briefcase,
  Wallet,
  Car,
  CarFront,
  Shield,
  HeartHandshake,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/lib/services";

const ICON_MAP: Record<ServiceIconName, LucideIcon> = {
  home: Home,
  landmark: Landmark,
  briefcase: Briefcase,
  wallet: Wallet,
  car: Car,
  "car-front": CarFront,
  shield: Shield,
  "heart-handshake": HeartHandshake,
  stethoscope: Stethoscope,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} aria-hidden="true" />;
}

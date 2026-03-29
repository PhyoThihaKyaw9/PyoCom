import type { LucideIcon } from "lucide-react";
import {
  Bug,
  Cloud,
  CloudRain,
  CloudSun,
  Leaf,
  LeafyGreen,
  Sprout,
  Sun,
  Tractor,
  Wheat,
} from "lucide-react";

const weatherIcons: Record<string, LucideIcon> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  "cloud-rain": CloudRain,
  cloud: Cloud,
};

const timelineIcons: Record<string, LucideIcon> = {
  sprout: Sprout,
  leaf: Leaf,
  wheat: Wheat,
  tractor: Tractor,
};

const pestIcons: Record<string, LucideIcon> = {
  beetle: Bug,
  hopper: LeafyGreen,
  borer: Leaf,
};

export function WeatherForecastIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const I = weatherIcons[name] ?? Cloud;
  return <I className={className} strokeWidth={2} aria-hidden />;
}

export function TimelineStageIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const I = timelineIcons[name] ?? Sprout;
  return <I className={className} strokeWidth={2} aria-hidden />;
}

export function PestRowIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const I = pestIcons[name] ?? Bug;
  return <I className={className} strokeWidth={2} aria-hidden />;
}

import { MOCK_DETAILED_GUIDE } from "../mocks/guides";
import type { GrowingTimelineStage } from "../mocks/types";

const KEY = "pyoe-planting-plan-v1";

export type PlantingPlan = {
  /** ISO timestamp when farmer tapped စိုက်မည် */
  startedAt: string;
  titleMM: string;
  titleEn: string;
};

export function loadPlantingPlan(): PlantingPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<PlantingPlan>;
    if (
      typeof p.startedAt !== "string" ||
      typeof p.titleMM !== "string" ||
      typeof p.titleEn !== "string"
    ) {
      return null;
    }
    return {
      startedAt: p.startedAt,
      titleMM: p.titleMM,
      titleEn: p.titleEn,
    };
  } catch {
    return null;
  }
}

export function savePlantingPlan(plan: PlantingPlan): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(plan));
}

export function clearPlantingPlan(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function broadcastPlantingPlanUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("pyoe-planting-plan-updated"));
}

export type PlantingDayContext = {
  farmerDay: number;
  /** 0-based days since startedAt midnight bucket */
  d0: number;
  stage: GrowingTimelineStage;
  /** True if past the last timeline range (still show last stage advice) */
  beyondSchedule: boolean;
  plan: PlantingPlan;
};

export function getPlantingDayContext(plan: PlantingPlan): PlantingDayContext {
  const start = new Date(plan.startedAt).getTime();
  const d0 = Math.max(0, Math.floor((Date.now() - start) / 86_400_000));
  const farmerDay = d0 + 1;
  const tl = MOCK_DETAILED_GUIDE.timeline;

  for (let i = 0; i < tl.length; i++) {
    const [lo, hi] = tl[i].days.split("-").map((x) => Number.parseInt(x.trim(), 10));
    if (d0 >= lo && d0 <= hi) {
      return {
        farmerDay,
        d0,
        stage: tl[i],
        beyondSchedule: false,
        plan,
      };
    }
  }

  const last = tl[tl.length - 1];
  const parts = last.days.split("-").map((x) => Number.parseInt(x.trim(), 10));
  const lastHi = parts[1] ?? parts[0];
  const beyondSchedule = d0 > lastHi;

  return {
    farmerDay,
    d0,
    stage: last,
    beyondSchedule,
    plan,
  };
}

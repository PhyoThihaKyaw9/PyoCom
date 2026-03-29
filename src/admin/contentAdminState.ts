import type { GuideCard } from "../mocks/types";

const KEY = "pyoe-com-admin-content-v1";

export type ContentAdminState = {
  hiddenGuideIds: number[];
  verifiedOverrides: Record<string, boolean>;
  /** Admin-posted guide cards (merged with mock catalog for farmers). */
  customGuides: GuideCard[];
};

const defaultState: ContentAdminState = {
  hiddenGuideIds: [],
  verifiedOverrides: {},
  customGuides: [],
};

function parseGuideCard(x: unknown): GuideCard | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  if (
    typeof o.id !== "number" ||
    typeof o.title !== "string" ||
    typeof o.titleEn !== "string" ||
    typeof o.advice !== "string" ||
    typeof o.adviceEn !== "string" ||
    typeof o.upvotes !== "number" ||
    typeof o.downvotes !== "number" ||
    typeof o.rating !== "number" ||
    typeof o.paddyType !== "string" ||
    typeof o.verified !== "boolean"
  ) {
    return null;
  }
  return {
    id: o.id,
    title: o.title,
    titleEn: o.titleEn,
    advice: o.advice,
    adviceEn: o.adviceEn,
    upvotes: o.upvotes,
    downvotes: o.downvotes,
    rating: o.rating,
    paddyType: o.paddyType,
    verified: o.verified,
  };
}

function parseStored(raw: string): ContentAdminState {
  const parsed = JSON.parse(raw) as Partial<ContentAdminState>;
  const customRaw = parsed.customGuides;
  const customGuides = Array.isArray(customRaw)
    ? customRaw.map(parseGuideCard).filter((g): g is GuideCard => g !== null)
    : [];
  return {
    hiddenGuideIds: Array.isArray(parsed.hiddenGuideIds)
      ? parsed.hiddenGuideIds
      : [],
    verifiedOverrides:
      parsed.verifiedOverrides &&
      typeof parsed.verifiedOverrides === "object" &&
      parsed.verifiedOverrides !== null
        ? (parsed.verifiedOverrides as Record<string, boolean>)
        : {},
    customGuides,
  };
}

export function loadContentAdminState(): ContentAdminState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return parseStored(raw);
  } catch {
    return { ...defaultState };
  }
}

export function saveContentAdminState(state: ContentAdminState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function broadcastContentAdminUpdated() {
  window.dispatchEvent(new Event("pyoe-content-admin-updated"));
}

export function computeNextGuideId(
  base: GuideCard[],
  custom: GuideCard[]
): number {
  const ids = [...base, ...custom].map((g) => g.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

export function mergeGuidesForFarmer(base: GuideCard[]): GuideCard[] {
  const { hiddenGuideIds, verifiedOverrides, customGuides } =
    loadContentAdminState();
  const hidden = new Set(hiddenGuideIds);
  const merged = [...base, ...(customGuides ?? [])];
  return merged
    .filter((g) => !hidden.has(g.id))
    .map((g) => {
      const o = verifiedOverrides[String(g.id)];
      if (o === undefined) return g;
      return { ...g, verified: o };
    });
}

export function clearContentAdminState() {
  localStorage.removeItem(KEY);
}

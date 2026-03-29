import type { KnowledgeArticle } from "../mocks/types";

const KEY = "pyoe-com-knowledge-custom-v1";

function parseStored(raw: string): KnowledgeArticle[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isValidArticle);
}

function isValidArticle(x: unknown): x is KnowledgeArticle {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.category === "string" &&
    typeof o.titleMM === "string" &&
    typeof o.titleEn === "string" &&
    typeof o.summaryMM === "string" &&
    typeof o.summaryEn === "string" &&
    typeof o.bodyMM === "string" &&
    typeof o.bodyEn === "string" &&
    typeof o.attributionMM === "string" &&
    typeof o.attributionEn === "string" &&
    typeof o.publishedAt === "string"
  );
}

export function loadCustomKnowledgeArticles(): KnowledgeArticle[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return parseStored(raw);
  } catch {
    return [];
  }
}

export function saveCustomKnowledgeArticles(articles: KnowledgeArticle[]) {
  localStorage.setItem(KEY, JSON.stringify(articles));
}

export function broadcastKnowledgeUpdated() {
  window.dispatchEvent(new Event("pyoe-knowledge-updated"));
}

export function mergeKnowledgeFeed(base: KnowledgeArticle[]): KnowledgeArticle[] {
  return [...loadCustomKnowledgeArticles(), ...base];
}

export function addCustomKnowledgeArticle(
  draft: Omit<KnowledgeArticle, "id">
): KnowledgeArticle {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? `k-${crypto.randomUUID()}`
      : `k-${Date.now()}`;
  const row: KnowledgeArticle = { ...draft, id };
  const next = [row, ...loadCustomKnowledgeArticles()];
  saveCustomKnowledgeArticles(next);
  broadcastKnowledgeUpdated();
  return row;
}

export function deleteCustomKnowledgeArticle(id: string) {
  const next = loadCustomKnowledgeArticles().filter((a) => a.id !== id);
  saveCustomKnowledgeArticles(next);
  broadcastKnowledgeUpdated();
}

export function clearCustomKnowledgeArticles() {
  localStorage.removeItem(KEY);
  broadcastKnowledgeUpdated();
}

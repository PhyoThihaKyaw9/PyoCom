import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Library } from "lucide-react";
import {
  KNOWLEDGE_CATEGORY_LABELS,
  MOCK_KNOWLEDGE_ARTICLES,
} from "../../mocks/community";
import type { KnowledgeArticle, KnowledgeCategory } from "../../mocks/types";
import { mergeKnowledgeFeed } from "../../admin/knowledgeSharingState";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ALL = "all" as const;

export function CommunityFeed() {
  const [category, setCategory] = useState<string>(ALL);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [articles, setArticles] = useState<KnowledgeArticle[]>(() =>
    mergeKnowledgeFeed(MOCK_KNOWLEDGE_ARTICLES)
  );

  const refresh = useCallback(() => {
    setArticles(mergeKnowledgeFeed(MOCK_KNOWLEDGE_ARTICLES));
  }, []);

  useEffect(() => {
    refresh();
    const onUpdated = () => refresh();
    window.addEventListener("pyoe-knowledge-updated", onUpdated);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pyoe-com-knowledge-custom-v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pyoe-knowledge-updated", onUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const filtered = useMemo(() => {
    if (category === ALL) return articles;
    return articles.filter((a) => a.category === category);
  }, [articles, category]);

  const categoryOptions: { value: string; label: string }[] = useMemo(
    () => [
      { value: ALL, label: "အားလုံး · All topics" },
      ...(
        Object.keys(KNOWLEDGE_CATEGORY_LABELS) as KnowledgeCategory[]
      ).map((key) => ({
        value: key,
        label: `${KNOWLEDGE_CATEGORY_LABELS[key].mm} · ${KNOWLEDGE_CATEGORY_LABELS[key].en}`,
      })),
    ],
    []
  );

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#f0fdf4] pb-24">
      <header className="bg-[#1B4332] px-4 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pb-6 sm:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:h-11 sm:w-11">
            <Library className="size-5 sm:size-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-wide sm:text-2xl">သုတမျှဝေရေး</h1>
            <p className="text-xs opacity-90 sm:text-sm">Knowledge from extension &amp; admins</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg space-y-4 px-4 py-4">
        <Card className="border-2 border-[#1B4332]/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-snug">
                ဤနေရာတွင် စိုက်ပျိုးရေးအတွက် လက်တွေ့ကျသော မှတ်ချက်များနှင့်
                သင်ကြားရေးသုတေသန အကျဉ်းချုပ်များကို ဖော်ပြပါသည်။ ပိုစ်အသစ်များ
                အက်မင်မှ တင်သွင်းပါသည်။
              </p>
            </div>
            <label className="block text-sm font-semibold text-[#1B4332] mb-2">
              ခေါင်းစဉ်အမျိုးအစား
              <span className="block text-xs font-normal text-gray-500">
                Topic
              </span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-12 border-2 border-[#1B4332]/35 bg-white font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <ul className="space-y-4">
          {filtered.map((article) => {
            const open = expandedId === article.id;
            const cat = KNOWLEDGE_CATEGORY_LABELS[article.category];
            return (
              <li key={article.id}>
                <Card className="border-2 border-gray-200 overflow-hidden shadow-sm hover:border-[#16a34a]/50 transition-colors">
                  <CardContent className="p-0">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(open ? null : article.id)
                      }
                      className="w-full text-left p-4 flex gap-3 items-start"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className="bg-[#166534] text-white text-xs shrink-0">
                            {cat.mm}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {article.publishedAt}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-[#1B4332] leading-tight">
                          {article.titleMM}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">{article.titleEn}</p>
                        <p className="text-sm text-gray-800 mt-3 line-clamp-3">
                          {article.summaryMM}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {article.summaryEn}
                        </p>
                      </div>
                      <div className="shrink-0 text-[#1B4332] mt-1">
                        {open ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </button>

                    {open ? (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100 space-y-3">
                        <div className="pt-3 space-y-2 text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                          <p>{article.bodyMM}</p>
                          <p className="text-gray-600">{article.bodyEn}</p>
                        </div>
                        <p className="text-xs text-gray-500 border-t border-dashed pt-3">
                          <span className="font-medium text-[#1B4332]">
                            {article.attributionMM}
                          </span>
                          <span className="block">{article.attributionEn}</span>
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-sm">
            ဤအမျိုးအစားတွင် ပေါ့စ်များမရှိသေးပါ။
            <span className="block text-xs mt-1">No articles in this topic yet.</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

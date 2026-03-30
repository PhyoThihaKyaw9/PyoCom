import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  MessageSquareText,
  Search,
  Shield,
  ThumbsUp,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import type { UserRole } from "../../auth/types";
import {
  broadcastContentAdminUpdated,
  computeNextGuideId,
  loadContentAdminState,
  saveContentAdminState,
  type ContentAdminState,
} from "../../admin/contentAdminState";
import {
  mockListUserSummaries,
  type MockUserSummary,
} from "../../auth/mockAuthStorage";
import { useAuth } from "../../auth/AuthContext";
import {
  addCustomKnowledgeArticle,
  deleteCustomKnowledgeArticle,
  loadCustomKnowledgeArticles,
} from "../../admin/knowledgeSharingState";
import { KNOWLEDGE_CATEGORY_LABELS } from "../../mocks/community";
import type { KnowledgeCategory } from "../../mocks/types";
import {
  MOCK_GUIDES,
  MOCK_PADDY_INSTRUCTION_REVIEWS,
  MOCK_PADDY_TYPES,
} from "../../mocks";
import type { GuideCard } from "../../mocks/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface AdminDashboardProps {
  onBack: () => void;
}

const KNOWLEDGE_CAT_KEYS = Object.keys(
  KNOWLEDGE_CATEGORY_LABELS
) as KnowledgeCategory[];

const PADDY_TYPES_NEW_GUIDE = MOCK_PADDY_TYPES.filter((t) => t.value !== "all");

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { user, setUserRole } = useAuth();
  const [accounts, setAccounts] = useState<MockUserSummary[]>([]);
  const [content, setContent] = useState<ContentAdminState>(() =>
    loadContentAdminState()
  );
  const [customKnowledge, setCustomKnowledge] = useState(() =>
    loadCustomKnowledgeArticles()
  );
  const [kCat, setKCat] = useState<KnowledgeCategory>("general");
  const [kTitleMM, setKTitleMM] = useState("");
  const [kTitleEn, setKTitleEn] = useState("");
  const [kSumMM, setKSumMM] = useState("");
  const [kSumEn, setKSumEn] = useState("");
  const [kBodyMM, setKBodyMM] = useState("");
  const [kBodyEn, setKBodyEn] = useState("");

  const [gTitleMM, setGTitleMM] = useState("");
  const [gTitleEn, setGTitleEn] = useState("");
  const [gAdviceMM, setGAdviceMM] = useState("");
  const [gAdviceEn, setGAdviceEn] = useState("");
  const [gPaddyType, setGPaddyType] = useState(
    PADDY_TYPES_NEW_GUIDE[0]?.value ?? "shwebo-pawsan"
  );
  const [gVerified, setGVerified] = useState(true);
  const [gUpvotes, setGUpvotes] = useState("0");
  const [gDownvotes, setGDownvotes] = useState("0");

  const [userSearch, setUserSearch] = useState("");
  const [userRoleTab, setUserRoleTab] = useState<"all" | "farmer" | "admin">(
    "all"
  );

  const reloadAccounts = useCallback(() => {
    if (!user || user.role !== "admin") return;
    try {
      setAccounts(mockListUserSummaries(user.id));
    } catch {
      setAccounts([]);
    }
  }, [user]);

  useEffect(() => {
    reloadAccounts();
  }, [reloadAccounts]);

  const persistContent = useCallback((next: ContentAdminState) => {
    saveContentAdminState(next);
    setContent(next);
    broadcastContentAdminUpdated();
  }, []);

  const reloadKnowledge = useCallback(() => {
    setCustomKnowledge(loadCustomKnowledgeArticles());
  }, []);

  const publishKnowledge = () => {
    if (!user) return;
    const t = kTitleMM.trim();
    const b = kBodyMM.trim();
    if (!t || !b) {
      toast.error("Title and Myanmar body required", {
        description: "ခေါင်းစဉ်နှင့် မြန်မာအကြောင်းအရာ လိုအပ်ပါသည်",
      });
      return;
    }
    const stamp = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date());
    addCustomKnowledgeArticle({
      category: kCat,
      titleMM: t,
      titleEn: kTitleEn.trim() || t,
      summaryMM: kSumMM.trim() || t.slice(0, 120),
      summaryEn: kSumEn.trim() || kTitleEn.trim() || t,
      bodyMM: b,
      bodyEn: kBodyEn.trim() || b,
      attributionMM: `${user.displayName} · အက်မင်`,
      attributionEn: `${user.displayName} · Admin`,
      publishedAt: stamp,
    });
    setKTitleMM("");
    setKTitleEn("");
    setKSumMM("");
    setKSumEn("");
    setKBodyMM("");
    setKBodyEn("");
    reloadKnowledge();
    toast.success("Published to Knowledge tab");
  };

  const removeKnowledge = (id: string) => {
    deleteCustomKnowledgeArticle(id);
    reloadKnowledge();
    toast.success("Removed post");
  };

  const allCatalogGuides = useMemo(
    () => [...MOCK_GUIDES, ...content.customGuides],
    [content.customGuides]
  );

  const stats = useMemo(() => {
    const farmers = accounts.filter((a) => a.role === "farmer").length;
    const admins = accounts.filter((a) => a.role === "admin").length;
    const hidden = new Set(content.hiddenGuideIds);
    const visibleGuides = allCatalogGuides.filter((g) => !hidden.has(g.id)).length;
    return {
      users: accounts.length,
      farmers,
      admins,
      guidesTotal: allCatalogGuides.length,
      guidesVisible: visibleGuides,
      instructionReviews: MOCK_PADDY_INSTRUCTION_REVIEWS.length,
    };
  }, [accounts, content.hiddenGuideIds, allCatalogGuides]);

  const filteredAccounts = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");
    return accounts.filter((a) => {
      if (userRoleTab === "farmer" && a.role !== "farmer") return false;
      if (userRoleTab === "admin" && a.role !== "admin") return false;
      if (!q) return true;
      const name = a.displayName.toLowerCase();
      const phoneDigits = a.phone.replace(/\D/g, "");
      return (
        name.includes(q) ||
        (digits.length > 0 && phoneDigits.includes(digits))
      );
    });
  }, [accounts, userSearch, userRoleTab]);

  const soleAdminLocked =
    accounts.filter((x) => x.role === "admin").length <= 1;

  const setGuideHidden = (guideId: number, hidden: boolean) => {
    const hiddenSet = new Set(content.hiddenGuideIds);
    if (hidden) hiddenSet.add(guideId);
    else hiddenSet.delete(guideId);
    persistContent({
      ...content,
      hiddenGuideIds: [...hiddenSet],
    });
  };

  const setVerifiedMode = (
    guideId: number,
    mode: "default" | "verified" | "unverified"
  ) => {
    const key = String(guideId);
    const nextOverrides = { ...content.verifiedOverrides };
    if (mode === "default") {
      delete nextOverrides[key];
    } else {
      nextOverrides[key] = mode === "verified";
    }
    persistContent({
      ...content,
      verifiedOverrides: nextOverrides,
    });
  };

  const addCatalogGuide = () => {
    const title = gTitleMM.trim();
    const advice = gAdviceMM.trim();
    if (!title || !advice) {
      toast.error("Title and advice required", {
        description: "ခေါင်းစဉ်နှင့် အကြံပြုချက် (မြန်မာ) လိုအပ်ပါသည်",
      });
      return;
    }
    const up = Number.parseInt(gUpvotes, 10);
    const down = Number.parseInt(gDownvotes, 10);
    const newGuide: GuideCard = {
      id: computeNextGuideId(MOCK_GUIDES, content.customGuides),
      title,
      titleEn: gTitleEn.trim() || title,
      advice,
      adviceEn: gAdviceEn.trim() || advice,
      upvotes: Number.isFinite(up) && up >= 0 ? up : 0,
      downvotes: Number.isFinite(down) && down >= 0 ? down : 0,
      rating: 0,
      paddyType: gPaddyType,
      verified: gVerified,
    };
    persistContent({
      ...content,
      customGuides: [...content.customGuides, newGuide],
    });
    setGTitleMM("");
    setGTitleEn("");
    setGAdviceMM("");
    setGAdviceEn("");
    setGVerified(true);
    setGUpvotes("0");
    setGDownvotes("0");
    setGPaddyType(PADDY_TYPES_NEW_GUIDE[0]?.value ?? "shwebo-pawsan");
    toast.success("စပါးလမ်းညွှန် ထည့်ပြီးပါပြီ", {
      description: "Farmers see it under လမ်းညွှန် when visible.",
    });
  };

  const removeCatalogGuide = (id: number) => {
    if (MOCK_GUIDES.some((g) => g.id === id)) return;
    const customGuides = content.customGuides.filter((g) => g.id !== id);
    const hiddenGuideIds = content.hiddenGuideIds.filter((h) => h !== id);
    const verifiedOverrides = { ...content.verifiedOverrides };
    delete verifiedOverrides[String(id)];
    persistContent({
      ...content,
      customGuides,
      hiddenGuideIds,
      verifiedOverrides,
    });
    toast.success("Removed from catalog");
  };

  const handleRoleChange = async (
    targetId: string,
    role: UserRole,
    label: string
  ) => {
    try {
      await setUserRole(targetId, role);
      reloadAccounts();
      toast.success("Role updated", { description: label });
    } catch (e) {
      const code = (e as Error).message;
      if (code === "LAST_ADMIN") {
        toast.error("Cannot remove last admin", {
          description: "Promote another user before demoting this account.",
        });
        return;
      }
      if (code === "FORBIDDEN") {
        toast.error("Not allowed");
        return;
      }
      toast.error("Something went wrong");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-[#F8FAFC] px-4 pb-24 sm:px-6">
        <div className="max-w-md w-full rounded-2xl border-4 border-[#1B4332]/25 bg-white p-6 shadow-lg text-center space-y-4">
          <p className="text-lg font-bold text-[#1B4332]">အက်မင်အခွင့်မရှိပါ</p>
          <p className="text-sm text-gray-600">
            Admin access required · ဤစာမျက်နှာကို ဖြတ်သန်းခွင့်မရှိပါ။
          </p>
          <Button
            type="button"
            className="w-full bg-[#1B4332] hover:bg-[#15291f]"
            onClick={onBack}
          >
            ပင်မသို့ ပြန်သွားရန် · Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#F8FAFC] pb-24">
      <header className="bg-[#1B4332] px-4 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pb-6 sm:pt-8">
        <div className="flex items-center gap-3 mb-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/15 shrink-0 rounded-xl"
            aria-label="Back to app"
          >
            <ArrowLeft className="size-6" />
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="size-8 shrink-0 opacity-90" />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-wide sm:text-2xl">
                အက်မင် စီမံခန့်ခွဲမှု
              </h1>
              <p className="text-xs opacity-90 sm:text-sm">
                Users, guides, knowledge · ဒေမို စက်ပိုင်း
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Card className="border-2 border-[#1B4332]/20">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Users
              </p>
              <p className="text-3xl font-bold text-[#1B4332]">{stats.users}</p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.farmers} farmers · {stats.admins} admins
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#1B4332]/20">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Guides
              </p>
              <p className="text-3xl font-bold text-[#1B4332]">
                {stats.guidesVisible}/{stats.guidesTotal}
              </p>
              <p className="text-xs text-gray-500 mt-1">visible in app</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#D97706]/30 bg-[#fffbeb]/30 col-span-2 sm:col-span-1">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Instruction reviews
              </p>
              <p className="text-3xl font-bold text-[#D97706]">
                {stats.instructionReviews}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                လမ်းညွှန် သုံးသပ်ချက် · Mock
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-[#1B4332] shadow-md">
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1B4332] text-white">
                  <Users className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-[#1B4332] text-xl leading-tight">
                    အသုံးပြုသူ စီမံခန့်ခွဲမှု
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Main user management for this app mock: promote farmers to admin or demote to farmer.
                    Phone and display name only in this demo.
                  </p>
                </div>
              </div>
              {soleAdminLocked ? (
                <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 shrink-0 max-w-sm leading-snug">
                  <span className="font-semibold">သတိပေး ·</span> အက်မင် တစ်ဦးသာ ရှိပါသည်။ နောက်ထပ်
                  အက်မင် မတင်မီ သင့်အကောင့်ကို လယ်သမားအဖြစ် မချုပ်ချယ်ပါနှင့်။
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["all", `အားလုံး (${stats.users})`] as const,
                  ["farmer", `လယ်သမား (${stats.farmers})`] as const,
                  ["admin", `အက်မင် (${stats.admins})`] as const,
                ] as const
              ).map(([key, label]) => (
                <Button
                  key={key}
                  type="button"
                  size="sm"
                  variant={userRoleTab === key ? "default" : "outline"}
                  className={
                    userRoleTab === key
                      ? "bg-[#1B4332] hover:bg-[#15291f]"
                      : "border-2 border-[#1B4332]/30"
                  }
                  onClick={() => setUserRoleTab(key)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <Input
                placeholder="အမည် သို့ ဖုန်းနံပါတ် ရှာရန် · Search name or phone"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="h-11 border-2 border-[#1B4332]/30 pl-10"
                aria-label="Search accounts"
              />
            </div>

            <ul className="space-y-3">
              {filteredAccounts.map((a) => {
                const isSelf = a.id === user.id;
                return (
                  <li
                    key={a.id}
                    className={`rounded-xl border-2 bg-white p-4 ${
                      isSelf
                        ? "border-[#16a34a] shadow-[0_0_0_1px_rgba(22,163,74,0.15)]"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-[#1B4332] truncate">
                            {a.displayName}
                          </p>
                          {isSelf ? (
                            <Badge className="bg-[#16a34a] px-1.5 py-0 text-[10px] text-white">
                              ယခုဝင်နေသူ · You
                            </Badge>
                          ) : null}
                          <Badge
                            variant="secondary"
                            className={
                              a.role === "admin"
                                ? "border border-[#1B4332]/25 bg-[#1B4332]/10 text-[#1B4332]"
                                : "border border-[#16a34a]/25 bg-[#f0fdf4] text-[#166534]"
                            }
                          >
                            {a.role === "admin" ? "အက်မင်" : "လယ်သမား"}
                          </Badge>
                        </div>
                        <p className="mt-1 break-all font-mono text-xs text-gray-500">
                          {a.phone}
                        </p>
                      </div>
                      <div className="w-full shrink-0 space-y-1 sm:w-[210px]">
                        <Label className="text-[10px] uppercase tracking-wide text-gray-500">
                          အခွင့်အရေး · Role
                        </Label>
                        <Select
                          value={a.role}
                          onValueChange={(v) =>
                            void handleRoleChange(a.id, v as UserRole, a.displayName)
                          }
                          disabled={
                            soleAdminLocked && isSelf && a.role === "admin"
                          }
                        >
                          <SelectTrigger className="h-11 border-2 border-[#1B4332]/40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="farmer">
                              လယ်သမား · Farmer
                            </SelectItem>
                            <SelectItem value="admin">အက်မင် · Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {accounts.length === 0 ? (
              <p className="text-sm text-gray-500">
                Mock store တွင် အကောင့် မရှိပါ — No accounts in mock store.
              </p>
            ) : filteredAccounts.length === 0 ? (
              <p className="text-sm text-gray-500">
                စစ်ထုတ်ချက်နှင့် ကိုက်ညီသော အကောင့် မရှိပါ · No accounts match filters.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-4 border-[#1B4332]/25">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1B4332]/10 text-[#1B4332]">
                <MessageSquareText className="size-6" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-[#1B4332] text-lg leading-tight">
                  လမ်းညွှန်မှ လယ်သမားသုံးသပ်ချက်များ
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Reviews from paddy instruction cards (ကြိုက်နှစ်သက်သည် / optional comments). ဒေမို
                  အချက်အလက်သာ · frontend demo.
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {MOCK_PADDY_INSTRUCTION_REVIEWS.map((r) => {
                const typeLabel =
                  MOCK_PADDY_TYPES.find((t) => t.value === r.paddyType)?.label ??
                  r.paddyType;
                return (
                  <li
                    key={r.id}
                    className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1B4332]">{r.farmerName}</p>
                        <p className="text-xs text-gray-500">{r.phoneMasked}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-medium text-gray-700">{r.submittedAtMM}</p>
                        <p className="text-[10px] text-gray-500">{r.submittedAtEn}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#f8fafc] border border-[#1B4332]/10 px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{r.guideTitleMM}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{r.guideTitleEn}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-[#f0fdf4] text-[#166534] border border-[#16a34a]/30 text-xs"
                      >
                        {typeLabel}
                      </Badge>
                      {r.liked ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#1B4332]/10 px-2.5 py-0.5 text-xs font-medium text-[#1B4332]">
                          <ThumbsUp className="size-3.5" strokeWidth={2} aria-hidden />
                          ကြိုက်နှစ်သက်သည်
                        </span>
                      ) : null}
                    </div>
                    {r.commentMM || r.commentEn ? (
                      <div className="rounded-lg border border-[#E67E22]/40 bg-[#FEF3C7]/40 px-3 py-2 text-sm">
                        {r.commentMM ? (
                          <p className="text-gray-900 leading-snug">{r.commentMM}</p>
                        ) : null}
                        {r.commentEn ? (
                          <p className="text-gray-600 text-xs mt-1 leading-snug">
                            {r.commentEn}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">
                        အကြောင်းအရာ မထည့်ပါ (သာ သဘောကျခြင်း)
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#1B4332]/25">
          <CardContent className="p-5 space-y-4">
            <h2 className="font-bold text-[#1B4332]">
              စပါးလမ်းညွှန် · Paddy instructions
            </h2>
            <p className="text-sm text-gray-600">
              Add new cards for the farmer လမ်းညွှန် tab. Choose variety, short
              instruction text, and whether it shows as verified. Saved on this device
              only (local demo).
            </p>

            <div className="space-y-3 rounded-xl border-2 border-[#16a34a]/40 bg-[#f0fdf4]/50 p-4">
              <p className="text-sm font-semibold text-[#1B4332]">
                အသစ်ထည့်ရန် · Add instruction
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="g-t-mm">ခေါင်းစဉ် (မြန်မာ)</Label>
                  <Input
                    id="g-t-mm"
                    value={gTitleMM}
                    onChange={(e) => setGTitleMM(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                    placeholder="ဥပမာ · မနောသုခ လမ်းညွှန်"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="g-t-en">Title (English)</Label>
                  <Input
                    id="g-t-en"
                    value={gTitleEn}
                    onChange={(e) => setGTitleEn(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-a-mm">အကြံပြုချက် (မြန်မာ)</Label>
                <Textarea
                  id="g-a-mm"
                  rows={3}
                  value={gAdviceMM}
                  onChange={(e) => setGAdviceMM(e.target.value)}
                  className="border-2 border-[#1B4332]/30 resize-none"
                  placeholder="လယ်သမားဖတ်ရန် တိုတောင်းသော လမ်းညွှန်ချက်..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-a-en">Instruction (English)</Label>
                <Textarea
                  id="g-a-en"
                  rows={2}
                  value={gAdviceEn}
                  onChange={(e) => setGAdviceEn(e.target.value)}
                  className="border-2 border-[#1B4332]/30 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>စပါးအမျိုးအစား · Paddy type</Label>
                <Select value={gPaddyType} onValueChange={setGPaddyType}>
                  <SelectTrigger className="border-2 border-[#1B4332]/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PADDY_TYPES_NEW_GUIDE.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="g-up">Upvotes (display)</Label>
                  <Input
                    id="g-up"
                    inputMode="numeric"
                    value={gUpvotes}
                    onChange={(e) => setGUpvotes(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="g-down">Downvotes (display)</Label>
                  <Input
                    id="g-down"
                    inputMode="numeric"
                    value={gDownvotes}
                    onChange={(e) => setGDownvotes(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="g-verified-new"
                  checked={gVerified}
                  onCheckedChange={setGVerified}
                />
                <Label htmlFor="g-verified-new" className="text-sm">
                  Verified badge on card
                </Label>
              </div>
              <Button
                type="button"
                className="w-full bg-[#16a34a] hover:bg-[#15803d] h-12 text-base font-bold"
                onClick={() => addCatalogGuide()}
              >
                လမ်းညွှန်ကို ကတ်တလောက် ထည့်မည် · Add to catalog
              </Button>
            </div>

            <p className="text-sm font-medium text-[#1B4332]">
              ကတ်တလောက် အားလုံး · All catalog entries
            </p>
            <ul className="space-y-4">
              {allCatalogGuides.map((g) => {
                const hidden = content.hiddenGuideIds.includes(g.id);
                const vo = content.verifiedOverrides[String(g.id)];
                const verifiedValue =
                  vo === undefined ? "default" : vo ? "verified" : "unverified";
                const isBuiltIn = MOCK_GUIDES.some((m) => m.id === g.id);
                return (
                  <li
                    key={g.id}
                    className="rounded-xl border-2 border-gray-200 bg-white p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1B4332]">{g.title}</p>
                        <p className="text-sm text-gray-600">{g.titleEn}</p>
                        {!isBuiltIn ? (
                          <p className="text-xs font-medium text-amber-800 mt-1">
                            Admin · ID {g.id} ·{" "}
                            {
                              MOCK_PADDY_TYPES.find((t) => t.value === g.paddyType)
                                ?.label ?? g.paddyType
                            }
                          </p>
                        ) : null}
                      </div>
                      {!isBuiltIn ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-red-600 hover:bg-red-50"
                          onClick={() => removeCatalogGuide(g.id)}
                          aria-label="Remove from catalog"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`vis-${g.id}`}
                          checked={!hidden}
                          onCheckedChange={(on) => setGuideHidden(g.id, !on)}
                        />
                        <Label htmlFor={`vis-${g.id}`} className="text-sm">
                          လယ်သမားမြင် · Visible
                        </Label>
                      </div>
                      <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto sm:min-w-[200px]">
                        <span className="text-xs text-gray-500 shrink-0">
                          Verified
                        </span>
                        <Select
                          value={verifiedValue}
                          onValueChange={(v) =>
                            setVerifiedMode(
                              g.id,
                              v as "default" | "verified" | "unverified"
                            )
                          }
                        >
                          <SelectTrigger className="h-10 border-2 border-[#1B4332]/40 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">
                              {isBuiltIn
                                ? "Default (mock)"
                                : "Default (as posted)"}
                            </SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="unverified">Not verified</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#1B4332]/25">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2 text-[#1B4332] font-bold">
              <BookOpen className="size-5" />
              <span>Knowledge sharing</span>
            </div>
            <p className="text-sm text-gray-600">
              Posts appear in the farmer သုတမျှဝေရေး tab on this device.
            </p>
            <div className="space-y-3 rounded-xl border-2 border-gray-200 bg-white p-4">
              <div className="space-y-2">
                <Label>Topic</Label>
                <Select value={kCat} onValueChange={(v) => setKCat(v as KnowledgeCategory)}>
                  <SelectTrigger className="border-2 border-[#1B4332]/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KNOWLEDGE_CAT_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {KNOWLEDGE_CATEGORY_LABELS[key].mm} ·{" "}
                        {KNOWLEDGE_CATEGORY_LABELS[key].en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="k-t-mm">Title (Myanmar)</Label>
                  <Input
                    id="k-t-mm"
                    value={kTitleMM}
                    onChange={(e) => setKTitleMM(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="k-t-en">Title (English)</Label>
                  <Input
                    id="k-t-en"
                    value={kTitleEn}
                    onChange={(e) => setKTitleEn(e.target.value)}
                    className="border-2 border-[#1B4332]/30"
                  />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="k-s-mm">Summary (Myanmar)</Label>
                  <Textarea
                    id="k-s-mm"
                    rows={2}
                    value={kSumMM}
                    onChange={(e) => setKSumMM(e.target.value)}
                    className="border-2 border-[#1B4332]/30 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="k-s-en">Summary (English)</Label>
                  <Textarea
                    id="k-s-en"
                    rows={2}
                    value={kSumEn}
                    onChange={(e) => setKSumEn(e.target.value)}
                    className="border-2 border-[#1B4332]/30 resize-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-b-mm">Full text (Myanmar)</Label>
                <Textarea
                  id="k-b-mm"
                  rows={4}
                  value={kBodyMM}
                  onChange={(e) => setKBodyMM(e.target.value)}
                  className="border-2 border-[#1B4332]/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-b-en">Full text (English)</Label>
                <Textarea
                  id="k-b-en"
                  rows={4}
                  value={kBodyEn}
                  onChange={(e) => setKBodyEn(e.target.value)}
                  className="border-2 border-[#1B4332]/30"
                />
              </div>
              <Button
                type="button"
                className="w-full bg-[#16a34a] hover:bg-[#15803d]"
                onClick={() => publishKnowledge()}
              >
                Publish to Knowledge tab
              </Button>
            </div>
            {customKnowledge.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#1B4332]">
                  Your published posts (this device)
                </p>
                <ul className="space-y-2">
                  {customKnowledge.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-start justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50/80 p-3"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-[#1B4332] truncate">
                          {a.titleMM}
                        </p>
                        <p className="text-xs text-gray-500">
                          {KNOWLEDGE_CATEGORY_LABELS[a.category].en} ·{" "}
                          {a.publishedAt}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-red-600 hover:bg-red-50"
                        onClick={() => removeKnowledge(a.id)}
                        aria-label="Delete post"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

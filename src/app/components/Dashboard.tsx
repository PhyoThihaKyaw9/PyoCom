import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bug,
  CloudRain,
  LayoutDashboard,
  Library,
  Lightbulb,
  LogOut,
  MapPin,
  Settings,
  Shield,
  Sprout,
  Users,
} from "lucide-react";
import {
  broadcastPlantingPlanUpdated,
  clearPlantingPlan,
  getPlantingDayContext,
  loadPlantingPlan,
  type PlantingPlan,
} from "../../farmer/plantingPlanStorage";
import {
  loadContentAdminState,
  mergeGuidesForFarmer,
} from "../../admin/contentAdminState";
import { mockCountUsers } from "../../auth/mockAuthStorage";
import {
  MOCK_ADMIN_PEST_SCANS_MONTH,
  MOCK_FORECAST_DAYS,
  MOCK_GUIDES,
  MOCK_KNOWLEDGE_ARTICLES,
  MOCK_LOCATION,
  MOCK_PADDY_TYPES,
  MOCK_WEATHER_ALERT,
} from "../../mocks";
import { TimelineStageIcon, WeatherForecastIcon } from "../illustrationIcons";
import { useAuth } from "../../auth/AuthContext";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MM_DIGITS = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"] as const;

function toMyanmarDigits(n: number): string {
  return String(Math.max(0, Math.floor(n)))
    .split("")
    .map((c) => MM_DIGITS[Number(c)] ?? c)
    .join("");
}

function AdminStatCard({
  icon: Icon,
  labelMM,
  labelEn,
  value,
  sublabel,
}: {
  icon: LucideIcon;
  labelMM: string;
  labelEn: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <Card className="border-2 border-white/25 bg-white/10 shadow-none backdrop-blur-sm">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-tight">{labelMM}</p>
            <p className="text-[11px] text-white/75 mt-0.5">{labelEn}</p>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
            <Icon className="size-4" strokeWidth={2.25} aria-hidden />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold tabular-nums text-white">{value}</p>
        {sublabel ? (
          <p className="text-[11px] leading-snug text-white/80">{sublabel}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface DashboardProps {
  /** Admins see workspace entry only (no pest scan / farmer guides). */
  variant?: 'farmer' | 'admin';
  onNavigateToPest?: () => void;
  onNavigateToGuides?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToAdmin?: () => void;
}

export function Dashboard({
  variant = 'farmer',
  onNavigateToPest,
  onNavigateToGuides,
  onNavigateToSettings,
  onNavigateToAdmin,
}: DashboardProps) {
  const { user, signOut } = useAuth();
  const [plantingPlan, setPlantingPlan] = useState<PlantingPlan | null>(null);

  const refreshPlantingPlan = useCallback(() => {
    setPlantingPlan(loadPlantingPlan());
  }, []);

  useEffect(() => {
    refreshPlantingPlan();
    const onUpdate = () => refreshPlantingPlan();
    window.addEventListener("pyoe-planting-plan-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("pyoe-planting-plan-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refreshPlantingPlan]);

  const growingCtx =
    variant === "farmer" && plantingPlan ? getPlantingDayContext(plantingPlan) : null;

  const computeAdminSnapshot = useCallback(() => {
    const guides = mergeGuidesForFarmer(MOCK_GUIDES);
    const content = loadContentAdminState();
    return {
      users: mockCountUsers(),
      instructionCount: guides.length,
      verifiedCount: guides.filter((g) => g.verified).length,
      knowledgePosts: MOCK_KNOWLEDGE_ARTICLES.length,
      customGuides: content.customGuides.length,
      hiddenGuides: content.hiddenGuideIds.length,
      contentActions: content.customGuides.length + content.hiddenGuideIds.length,
    };
  }, []);

  const [adminSnapshot, setAdminSnapshot] = useState(() => computeAdminSnapshot());

  const refreshAdminSnapshot = useCallback(() => {
    setAdminSnapshot(computeAdminSnapshot());
  }, [computeAdminSnapshot]);

  useEffect(() => {
    if (variant !== "admin") return;
    refreshAdminSnapshot();
    const onContent = () => refreshAdminSnapshot();
    window.addEventListener("pyoe-content-admin-updated", onContent);
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "pyoe-com-mock-users-v4" ||
        e.key === "pyoe-com-admin-content-v1"
      ) {
        refreshAdminSnapshot();
      }
    };
    window.addEventListener("storage", onStorage);
    const onFocus = () => refreshAdminSnapshot();
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("pyoe-content-admin-updated", onContent);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, [variant, refreshAdminSnapshot]);

  const varietyTrackCount = MOCK_PADDY_TYPES.filter((t) => t.value !== "all").length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
      {/* Top Header with Clean Design */}
      <header className="bg-[#1B4332] px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white sm:px-6 sm:pt-8">
        <div className="mb-6 flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {variant === "admin" ? (
              <>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <LayoutDashboard className="size-7" strokeWidth={2.25} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-wide leading-tight">
                    အက်မင် စာရင်း
                  </h1>
                  <p className="text-base sm:text-lg opacity-90 mt-1">
                    Dashboard overview · ပျိုးကွန် ပလက်ဖောင်း
                  </p>
                </div>
              </>
            ) : (
              <>
                <MapPin className="size-6 shrink-0 sm:size-7" strokeWidth={2.5} />
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
                    {MOCK_LOCATION.nameMM}
                  </h1>
                  <p className="mt-1 text-sm opacity-90 sm:text-lg">{MOCK_LOCATION.subtitleEn}</p>
                </div>
              </>
            )}
          </div>
          {user ? (
            <div className="flex items-center gap-3 shrink-0 min-w-0 pl-1">
              <p
                className="min-w-0 max-w-[9rem] sm:max-w-[11rem] text-right text-sm sm:text-base font-semibold text-white leading-snug tracking-wide truncate"
                title={user.displayName}
              >
                {user.displayName}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl border-2 border-white/50 bg-white/15 shadow-md outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B4332]"
                    aria-label={`အကောင့် မီနူး · ${user.displayName}`}
                  >
                    <Sprout
                      className="size-[22px] text-white"
                      strokeWidth={2.2}
                      aria-hidden
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-64 rounded-xl border-2 border-[#1B4332]/20 bg-white p-1 shadow-lg"
                >
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-[#1B4332] text-sm leading-tight">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 break-all">
                      <span className="text-gray-500">ဖုန်းနံပါတ် · </span>
                      {user.phone}
                    </p>
                  </div>
                  <DropdownMenuItem
                    className="min-h-11 text-[#1B4332] cursor-pointer rounded-lg"
                    onClick={() => onNavigateToSettings?.()}
                  >
                    <Settings className="size-4" />
                    <span>ဆက်တင်များ</span>
                    <span className="ml-1 text-xs text-gray-500">Settings</span>
                  </DropdownMenuItem>
                  {user.role === "admin" ? (
                    <DropdownMenuItem
                      className="min-h-11 text-[#1B4332] cursor-pointer rounded-lg"
                      onClick={() => onNavigateToAdmin?.()}
                    >
                      <Shield className="size-4" />
                      <span>အက်မင်</span>
                      <span className="ml-1 text-xs text-gray-500">Admin</span>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    variant="destructive"
                    className="min-h-11 cursor-pointer rounded-lg"
                    onClick={() => signOut()}
                  >
                    <LogOut className="size-4" />
                    <span>ထွက်မည်</span>
                    <span className="ml-1 text-xs opacity-80">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}
        </div>

        {variant === "admin" ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <AdminStatCard
              icon={Users}
              labelMM="မှတ်ပုံတင်အသုံးပြုသူများ"
              labelEn="Registered users"
              value={adminSnapshot.users.total}
              sublabel={`လယ်သမား ${adminSnapshot.users.farmers} · အက်မင် ${adminSnapshot.users.admins}`}
            />
            <AdminStatCard
              icon={BookOpen}
              labelMM="လမ်းညွှန်တင်သွင်းမှုများ"
              labelEn="Instruction posts (visible)"
              value={adminSnapshot.instructionCount}
              sublabel={`အတည်ပြုထား ${adminSnapshot.verifiedCount}`}
            />
            <AdminStatCard
              icon={Library}
              labelMM="ဉာဏ်မျှဝေပို့စ်များ"
              labelEn="Knowledge sharing posts"
              value={adminSnapshot.knowledgePosts}
              sublabel="တင်ပြီး ဉာဏ်မျှဝေ စာများ · Demo catalog"
            />
            <AdminStatCard
              icon={Bug}
              labelMM="ပိုးမွှားစကင်သုံးမှု"
              labelEn="Pest scans (this month)"
              value={MOCK_ADMIN_PEST_SCANS_MONTH}
              sublabel="ဒေမို စုစည်းချက် · Local aggregate"
            />
            <AdminStatCard
              icon={Sprout}
              labelMM="စပါးအမျိုးအစားလမ်းကြောင်း"
              labelEn="Variety tracks"
              value={varietyTrackCount}
              sublabel="လမ်းညွှန်အမျိုးအစား ရွေးစရာများ"
            />
            <AdminStatCard
              icon={Shield}
              labelMM="အကြောင်းကြား စီမံမှု"
              labelEn="Content admin (demo)"
              value={adminSnapshot.contentActions}
              sublabel={`စိတ်ကြိုက်လမ်းညွှန် ${adminSnapshot.customGuides} · ဖျောက်ထား ${adminSnapshot.hiddenGuides}`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-1.5 sm:flex sm:justify-between sm:gap-3">
            {MOCK_FORECAST_DAYS.map((day, index) => (
              <div
                key={index}
                className="min-w-0 flex-1 rounded-xl border-2 border-white/20 bg-white/10 p-2 text-center backdrop-blur-sm sm:rounded-2xl sm:p-4"
              >
                <p className="mb-1 truncate text-[10px] font-bold leading-tight sm:mb-2 sm:text-lg">
                  {day.day}
                </p>
                <p className="mb-1.5 text-[9px] opacity-80 sm:mb-3 sm:text-sm">{day.dayEn}</p>
                <div className="mb-1 flex justify-center text-white sm:mb-2">
                  <WeatherForecastIcon
                    name={day.icon}
                    className="size-6 sm:size-9"
                  />
                </div>
                <p className="text-sm font-bold sm:text-xl">{day.temp}</p>
              </div>
            ))}
          </div>
        )}
      </header>

      {variant === "admin" ? (
        <div className="border-t border-white/10 bg-[#D97706] px-4 py-6 shadow-lg sm:px-6 sm:py-7">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                လုပ်ငန်းလည်ပတ်မှု နှင့် အကြောင်းကြား ပြင်ဆင်ချက်များ
              </h2>
              <p className="text-sm text-white/90 mt-2 leading-relaxed">
                ရာသီဥတု ခန့်မှန်းချက်နှင့် မိုးလေဝသမှတ်တမ်းများ အက်မင်ဒိုင်ခွက်တွင် မပြပါ။ စာရင်းအင်းများ
                မှတ်ပုံတင်ခြင်း၊ လမ်းညွှန်များ၊ ဉာဏ်မျှဝေမှုတို့ကို အောက်ပါ အက်မင် ပန်နယ်တွင်
                စီမံခန့်ခွဲနိုင်ပါသည်။
              </p>
            </div>
            <div className="shrink-0 rounded-2xl bg-white/15 border-2 border-white/25 px-4 py-3 text-white max-w-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                Platform · ဒေမို
              </p>
              <p className="text-sm text-white/95 mt-1 leading-snug">
                Mock auth မှ အသုံးပြုသူရေတွက်ချက် ဖြစ်သည်။ လမ်းညွှန်အရေအတွက် သည် ကမ္ဘာ့လမ်းညွှန်များနှင့်
                အက်မင်ဖျောက်ထားမှုများကို လိုက်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#D97706] px-4 py-6 shadow-lg sm:px-6 sm:py-8">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white text-[#D97706] shadow-md sm:size-20 sm:rounded-2xl">
              <CloudRain className="size-8 sm:size-10" strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-2 text-lg font-bold leading-snug text-white sm:text-2xl">
                {MOCK_WEATHER_ALERT.titleMM}
              </h2>
              <p className="text-sm text-white/90 sm:text-lg">{MOCK_WEATHER_ALERT.titleEn}</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-6 sm:px-6 sm:py-8">
        {variant === 'farmer' ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <Card
              onClick={onNavigateToPest}
              className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
            >
              <CardContent className="flex min-h-[170px] flex-col items-center justify-center p-4 sm:min-h-[220px] sm:p-6">
                <div className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-[#1B4332] text-white sm:mb-4 sm:size-20">
                  <Bug className="size-8 sm:size-10" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mb-1 text-center text-base font-bold text-[#1B4332] sm:text-2xl">
                  ပိုးမွှားစကင်
                </h3>
                <p className="text-center text-xs text-gray-600 sm:text-base">Pest Scan</p>
              </CardContent>
            </Card>

            <Card
              onClick={onNavigateToGuides}
              className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
            >
              <CardContent className="flex min-h-[170px] flex-col items-center justify-center p-4 sm:min-h-[220px] sm:p-6">
                <div className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-[#1B4332] text-white sm:mb-4 sm:size-20">
                  <BookOpen className="size-8 sm:size-10" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="mb-1 text-center text-base font-bold text-[#1B4332] sm:text-2xl">
                  လမ်းညွှန်များ
                </h3>
                <p className="text-center text-xs text-gray-600 sm:text-base">
                  Community Guides
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card
            onClick={() => onNavigateToAdmin?.()}
            className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-[0.99] transition-all bg-[#F8FAFC]"
          >
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left sm:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#1B4332] text-white">
                  <Shield className="size-10" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-2xl font-bold text-[#1B4332]">
                    အက်မင် ပန်နယ်
                  </h3>
                  <p className="text-base text-gray-600">
                    Admin workspace · လမ်းညွှန်စီမံချက်၊ ဉာဏ်မျှဝေရေး တင်ခြင်း၊ အသုံးပြုသူအခွင့်အရေးများ
                  </p>
                  <p className="text-sm text-gray-500">
                    Manage guide visibility, publish knowledge posts, and change mock user roles (local demo).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Growing season / day-by-day guide (farmer plan from စိုက်မည် in detailed guide) */}
        {growingCtx ? (
          <Card className="border-4 border-[#D97706] bg-white mt-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#1B4332] border-2 border-[#D97706]/40">
                  <TimelineStageIcon
                    name={growingCtx.stage.icon}
                    className="size-8"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#1B4332]/90 leading-snug">
                    {growingCtx.plan.titleMM}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{growingCtx.plan.titleEn}</p>
                  <h3 className="text-2xl font-bold text-[#1B4332] mt-2">
                    စိုက်ပျိုးရက် {toMyanmarDigits(growingCtx.farmerDay)}
                  </h3>
                  <p className="text-lg text-gray-600">
                    Day {growingCtx.farmerDay} — {growingCtx.stage.stageEn}
                  </p>
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#1B4332]/15 bg-[#f8fafc] p-4">
                <p className="text-lg font-bold text-gray-900">{growingCtx.stage.stage}</p>
                <p className="text-base text-gray-600 mt-1">{growingCtx.stage.stageEn}</p>
              </div>
              {growingCtx.beyondSchedule ? (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  သက်တမ်း အဆုံးသတ်ပြီးနောက် နောက်ဆုံး အဆင့်အကြံပြုချက်ကို ပြသထားသည်။ · Showing the last
                  stage guidance after the schedule end.
                </p>
              ) : null}
              <div className="flex gap-3 items-start rounded-xl border-2 border-[#FDB813]/50 bg-[#FEF3C7]/80 p-4">
                <Lightbulb
                  className="size-7 shrink-0 text-amber-800 mt-0.5"
                  strokeWidth={2.2}
                  aria-hidden
                />
                <p className="text-base text-gray-900 leading-snug">{growingCtx.stage.tip}</p>
              </div>
              <button
                type="button"
                className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
                onClick={() => {
                  clearPlantingPlan();
                  broadcastPlantingPlanUpdated();
                }}
              >
                အစမှ ပြန်စမည် · Reset growing plan
              </button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
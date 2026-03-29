import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Bug,
  CloudRain,
  Lightbulb,
  LogOut,
  MapPin,
  Settings,
  Shield,
  Sprout,
} from "lucide-react";
import {
  broadcastPlantingPlanUpdated,
  clearPlantingPlan,
  getPlantingDayContext,
  loadPlantingPlan,
  type PlantingPlan,
} from "../../farmer/plantingPlanStorage";
import { TimelineStageIcon, WeatherForecastIcon } from "../illustrationIcons";
import { useAuth } from "../../auth/AuthContext";
import {
  MOCK_FORECAST_DAYS,
  MOCK_LOCATION,
  MOCK_WEATHER_ALERT,
} from "../../mocks";
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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header with Clean Design */}
      <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <MapPin className="w-7 h-7 shrink-0" strokeWidth={2.5} />
            <div className="min-w-0">
              <h1 className="text-4xl font-bold tracking-wide">{MOCK_LOCATION.nameMM}</h1>
              <p className="text-lg opacity-90 mt-1">{MOCK_LOCATION.subtitleEn}</p>
            </div>
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

        {/* 5-Day Forecast - Horizontal Row */}
        <div className="flex gap-3 justify-between">
          {MOCK_FORECAST_DAYS.map((day, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1 text-center border-2 border-white/20"
            >
              <p className="text-lg font-bold mb-2">{day.day}</p>
              <p className="text-sm opacity-80 mb-3">{day.dayEn}</p>
              <div className="flex justify-center mb-2 text-white">
                <WeatherForecastIcon name={day.icon} className="size-9" />
              </div>
              <p className="text-xl font-bold">{day.temp}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Predictive Alert Banner - Burnt Harvest Orange #D97706 */}
      <div className="bg-[#D97706] px-6 py-8 shadow-lg">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md text-[#D97706]">
            <CloudRain className="size-10" strokeWidth={2} aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">
              {MOCK_WEATHER_ALERT.titleMM}
            </h2>
            <p className="text-lg text-white/90 mb-4">{MOCK_WEATHER_ALERT.titleEn}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30 flex gap-3 items-start">
              <CloudRain className="size-7 shrink-0 text-white mt-0.5" strokeWidth={2} aria-hidden />
              <p className="text-xl font-bold text-white">
                {MOCK_WEATHER_ALERT.warningMM}
              </p>
              <p className="text-base text-white/90 mt-1">{MOCK_WEATHER_ALERT.warningEn}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {variant === 'farmer' ? (
          <div className="grid grid-cols-2 gap-5">
            <Card
              onClick={onNavigateToPest}
              className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[220px]">
                <div className="w-20 h-20 bg-[#1B4332] rounded-2xl flex items-center justify-center mb-4 text-white">
                  <Bug className="size-10" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332] text-center mb-1">
                  ပိုးမွှားစကင်
                </h3>
                <p className="text-base text-gray-600 text-center">Pest Scan</p>
              </CardContent>
            </Card>

            <Card
              onClick={onNavigateToGuides}
              className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[220px]">
                <div className="w-20 h-20 bg-[#1B4332] rounded-2xl flex items-center justify-center mb-4 text-white">
                  <BookOpen className="size-10" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332] text-center mb-1">
                  လမ်းညွှန်များ
                </h3>
                <p className="text-base text-gray-600 text-center">Community Guides</p>
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
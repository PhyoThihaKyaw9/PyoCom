import { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  ChevronLeft,
  Droplets,
  Leaf,
  Lightbulb,
  Sprout,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import { toast } from "sonner";
import {
  broadcastPlantingPlanUpdated,
  savePlantingPlan,
} from "../../farmer/plantingPlanStorage";
import { getDetailedGuideForPaddyType } from "../../mocks";
import { PestRowIcon, TimelineStageIcon } from "../illustrationIcons";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

/** Icon key for ပိုးညို / Brown Planthopper — reused for every pest row in prevention. */
const PEST_SECTION_ICON = "beetle" as const;

interface DetailedGuideProps {
  onBack?: () => void;
  /** Variety key matching `GuideCard.paddyType` (e.g. shwebo-pawsan). */
  paddyType?: string;
}

export function DetailedGuide({ onBack, paddyType = "shwebo-pawsan" }: DetailedGuideProps) {
  const [userComment, setUserComment] = useState("");
  const [hasVoted, setHasVoted] = useState<"up" | "down" | null>(null);

  const guide = getDetailedGuideForPaddyType(paddyType);
  const ws = guide.weatherSoil;
  const sh = guide.sectionHeadings;

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#F8FAFC] pb-8">
      {/* Sticky: back + titles stay visible while scrolling (any paddy guide). */}
      <header className="sticky top-0 z-30 border-b border-white/15 bg-[#1B4332] text-white shadow-lg px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 sm:px-6 sm:pb-5">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-3 flex w-fit max-w-full items-center gap-0.5 rounded-lg py-2 pr-2 pl-1 text-white/90 transition-colors hover:bg-white/10 hover:text-white active:bg-white/15"
            aria-label="နောက်သို့ ပြန်သွားရန် · Back to guides"
          >
            <ChevronLeft className="size-5 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
            <span className="text-sm font-medium tracking-wide">နောက်သို့</span>
            <span className="text-sm font-normal text-white/70">· Back</span>
          </button>
        )}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <BookOpen className="size-5" strokeWidth={2.2} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold leading-tight tracking-wide sm:text-2xl">
              {guide.title}
            </h1>
            <p className="mt-0.5 text-sm leading-snug text-white/85 sm:text-base">
              {guide.titleEn}
            </p>
          </div>
        </div>
      </header>

      {/* Single Column Vertical Scroll - NO TABS */}
      <div className="space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        {/* Section 1: Weather & Soil */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {sh?.weatherMM ?? "ရာသီဥတုနှင့် မြေဆီလွှာ"}
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              {sh?.weatherEn ?? "Weather & Soil Conditions"}
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border-2 border-[#FDB813] bg-[#FEF3C7] p-4">
                <div className="mb-2 flex items-center gap-3">
                  <Thermometer className="size-8 shrink-0 text-amber-700" strokeWidth={2.2} aria-hidden />
                  <h3 className="text-xl font-bold text-gray-900">အပူချိန်</h3>
                </div>
                <p className="text-lg text-gray-900">
                  {ws?.tempMM ?? "၂၅-၃၅°C အကောင်းဆုံး"}
                </p>
                <p className="text-base text-gray-600">
                  {ws?.tempEn ?? "Optimal: 25-35°C"}
                </p>
              </div>

              <div className="rounded-xl border-2 border-[#0EA5E9] bg-[#E0F2FE] p-4">
                <div className="mb-2 flex items-center gap-3">
                  <Droplets className="size-8 shrink-0 text-sky-600" strokeWidth={2.2} aria-hidden />
                  <h3 className="text-xl font-bold text-gray-900">မြေဆီ pH</h3>
                </div>
                <p className="text-lg text-gray-900">
                  {ws?.phMM ?? "pH 5.5-6.5 လိုအပ်သည်"}
                </p>
                <p className="text-base text-gray-600">
                  {ws?.phEn ?? "Required: pH 5.5-6.5"}
                </p>
              </div>

              {(ws?.soilTypeMM || ws?.soilTypeEn) && (
                <div className="rounded-xl border-2 border-[#16a34a] bg-[#f0fdf4] p-4">
                  <div className="mb-2 flex items-center gap-3 text-[#16a34a]">
                    <Leaf className="size-8 shrink-0" strokeWidth={2.2} aria-hidden />
                    <h3 className="text-xl font-bold text-gray-900">မြေအမျိုးအစား</h3>
                  </div>
                  {ws.soilTypeMM ? (
                    <p className="text-lg text-gray-900">{ws.soilTypeMM}</p>
                  ) : null}
                  {ws.soilTypeEn ? (
                    <p className="text-base text-gray-600">{ws.soilTypeEn}</p>
                  ) : null}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Growing Timeline */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {sh?.timelineMM ?? "စိုက်ပျိုးချိန်ဇယား"}
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              {sh?.timelineEn ?? "Growing Timeline"}
            </p>

            {(guide.growingDurationMM || guide.growingDurationEn) && (
              <div className="mb-5 rounded-xl border-2 border-[#16a34a]/35 bg-[#f0fdf4] p-4">
                {guide.growingDurationMM ? (
                  <p className="font-semibold text-[#1B4332]">{guide.growingDurationMM}</p>
                ) : null}
                {guide.growingDurationEn ? (
                  <p className="mt-1 text-sm text-gray-700">{guide.growingDurationEn}</p>
                ) : null}
              </div>
            )}

            <div className="space-y-6">
              {guide.timeline.map((stage, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#f0fdf4] rounded-xl border-2 border-[#16a34a]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-[#16a34a] bg-white text-[#16a34a]">
                    <TimelineStageIcon name={stage.icon} className="size-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold text-[#16a34a]">ရက် {stage.daysMM}</span>
                      <span className="text-base text-gray-600">({stage.days} days)</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{stage.stage}</h3>
                    <p className="text-base text-gray-600 mb-2">{stage.stageEn}</p>
                    {stage.tipMM && stage.tipEn ? (
                      <div className="space-y-2">
                        <p className="flex items-start gap-2 text-base font-medium text-gray-900">
                          <Lightbulb
                            className="mt-0.5 size-5 shrink-0 text-amber-600"
                            strokeWidth={2.2}
                            aria-hidden
                          />
                          <span>{stage.tipMM}</span>
                        </p>
                        <p className="pl-7 text-base text-gray-600 leading-relaxed">{stage.tipEn}</p>
                      </div>
                    ) : (
                      <p className="flex items-start gap-2 text-base font-medium text-gray-900">
                        <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-600" strokeWidth={2.2} aria-hidden />
                        <span>{stage.tip}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 3: How-To Steps */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {sh?.howToMM ?? "လုပ်ဆောင်ရမည့် အဆင့်များ"}
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              {sh?.howToEn ?? "Step-by-Step Instructions"}
            </p>

            <div className="space-y-4">
              {guide.howToSteps.map((item, index) => (
                <div key={index} className="flex gap-3 p-3 bg-white rounded-xl border-2 border-gray-300 sm:gap-4 sm:p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16a34a] text-2xl font-bold text-white sm:h-16 sm:w-16 sm:text-3xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-base text-gray-600 mb-2">{item.titleEn}</p>
                    <p className="text-lg text-gray-900">{item.desc}</p>
                    <p className="text-base text-gray-600">{item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Fertilizer Schedule */}
        <Card className="border-4 border-[#78350f] bg-[#FEF3C7]">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {sh?.fertilizerMM ?? "မြေသြဇာအချိန်ဇယား"}
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              {sh?.fertilizerEn ?? "Fertilizer Schedule"}
            </p>

            <div className="space-y-4">
              {guide.fertilizerSchedule.map((row, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl border-2 border-[#78350f]"
                >
                  <p className="text-xl font-bold text-gray-900 mb-1">{row.titleMM}</p>
                  <p className="text-lg text-gray-900">{row.detailMM}</p>
                  <p className="text-base text-gray-600">{row.detailEn}</p>
                </div>
              ))}
              {(guide.fertilizerFootnoteMM || guide.fertilizerFootnoteEn) && (
                <div className="rounded-xl border-2 border-dashed border-[#78350f]/60 bg-white/90 p-4">
                  {guide.fertilizerFootnoteMM ? (
                    <p className="font-medium text-gray-900">{guide.fertilizerFootnoteMM}</p>
                  ) : null}
                  {guide.fertilizerFootnoteEn ? (
                    <p className="mt-1 text-sm text-gray-600">{guide.fertilizerFootnoteEn}</p>
                  ) : null}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Pest Protection & Prevention */}
        <Card className="border-4 border-[#E67E22] bg-[#FEF3C7]">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {sh?.pestMM ?? "ပိုးမွှားကာကွယ်ရေး"}
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              {sh?.pestEn ?? "Pest Protection & Prevention"}
            </p>

            {(guide.pestIntroMM || guide.pestIntroEn) && (
              <div className="mb-4 rounded-lg border border-[#E67E22]/40 bg-white/80 px-3 py-2">
                {guide.pestIntroMM ? (
                  <p className="font-semibold text-gray-900">{guide.pestIntroMM}</p>
                ) : null}
                {guide.pestIntroEn ? (
                  <p className="text-sm text-gray-600">{guide.pestIntroEn}</p>
                ) : null}
              </div>
            )}

            <div className="space-y-4">
              {guide.pestRows.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border-2 border-[#E67E22]">
                  <div className="flex items-center gap-3 mb-2 text-[#E67E22]">
                    <PestRowIcon name={PEST_SECTION_ICON} className="size-8 shrink-0" />
                    <h3 className="text-xl font-bold text-gray-900">{item.pest}</h3>
                  </div>
                  <p className="text-base text-gray-600 mb-2">{item.pestEn}</p>
                  <p className="text-lg text-gray-900">{item.treatment}</p>
                  <p className="text-base text-gray-600">{item.treatmentEn}</p>
                </div>
              ))}

              <div className="mt-4 rounded-xl border-2 border-[#16a34a] bg-[#f0fdf4] p-4">
                <div className="mb-2 flex items-center gap-3 text-[#16a34a]">
                  <Leaf className="size-8 shrink-0" strokeWidth={2.2} aria-hidden />
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-[#16a34a]">
                      {guide.naturalHeadingMM ?? "သဘာဝနည်းလမ်း"}
                    </h3>
                    {guide.naturalHeadingEn ? (
                      <p className="text-sm font-medium text-[#166534]/90">{guide.naturalHeadingEn}</p>
                    ) : null}
                  </div>
                </div>
                <p className="mb-1 text-lg text-gray-900">{guide.naturalTipMM}</p>
                <p className="text-base text-gray-600">{guide.naturalTipEn}</p>
              </div>

              {(guide.pestImportantMM || guide.pestImportantEn) && (
                <div
                  className="flex gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 p-4"
                  role="note"
                >
                  <AlertTriangle
                    className="mt-0.5 size-6 shrink-0 text-amber-700"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <div className="min-w-0 space-y-2">
                    {guide.pestImportantMM ? (
                      <p className="text-base text-gray-900">{guide.pestImportantMM}</p>
                    ) : null}
                    {guide.pestImportantEn ? (
                      <p className="text-sm text-gray-700">{guide.pestImportantEn}</p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button
            type="button"
            className="flex h-16 w-full items-center justify-center gap-2 border-4 border-[#15291f] bg-[#1B4332] text-lg font-bold text-white shadow-md hover:bg-[#15291f] sm:text-xl"
            onClick={() => {
              savePlantingPlan({
                startedAt: new Date().toISOString(),
                titleMM: guide.title,
                titleEn: guide.titleEn,
              });
              broadcastPlantingPlanUpdated();
              toast.success("စိုက်မည်", {
                description: `${guide.title} · Plan to plant noted (local demo).`,
              });
            }}
          >
            <Sprout className="size-7 shrink-0" strokeWidth={2.2} aria-hidden />
            စိုက်မည်
          </Button>
          <p className="text-center text-sm text-gray-500">
            Mark that you intend to plant this variety · စိုက်ပျိုးမည့် အမျိုးအစား မှတ်သားရန်
          </p>
        </div>

        {/* Section 6: Was this useful? */}
        <Card className="border-4 border-[#16a34a] bg-[#f0fdf4]">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-3 text-center text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
              ဒီနည်းလမ်းက အသုံးဝင်သလား?
            </h2>
            <p className="mb-5 text-center text-base text-gray-600 sm:mb-6 sm:text-lg">Was this useful?</p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setHasVoted("up")}
                className={`flex h-20 flex-col items-center justify-center gap-1 rounded-xl text-lg font-bold transition-all active:scale-95 sm:h-24 sm:gap-2 sm:text-xl ${
                  hasVoted === "up"
                    ? "bg-[#1B4332] text-white border-4 border-[#15291f]"
                    : "bg-white text-[#1B4332] border-4 border-[#1B4332] hover:bg-[#f0fdf4]"
                }`}
              >
                <ThumbsUp className="size-8 shrink-0 sm:size-10" strokeWidth={2.2} aria-hidden />
                <span>အသုံးဝင်တယ်</span>
              </button>
              <button
                type="button"
                onClick={() => setHasVoted("down")}
                className={`flex h-20 flex-col items-center justify-center gap-1 rounded-xl text-lg font-bold transition-all active:scale-95 sm:h-24 sm:gap-2 sm:text-xl ${
                  hasVoted === "down"
                    ? "bg-gray-700 text-white border-4 border-gray-900"
                    : "bg-white text-gray-700 border-4 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <ThumbsDown className="size-8 shrink-0 sm:size-10" strokeWidth={2.2} aria-hidden />
                <span>မသုံးဝင်ပါ</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xl text-gray-900">
                <span className="font-bold text-2xl text-[#16a34a]">{guide.upvotes}</span> ဦး က အကြံပြုထားပါသည်
              </p>
              <p className="text-base text-gray-500">{guide.upvotes} people recommend this</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Share Your Experience */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
              သင့်အတွေ့အကြုံကို မျှဝေပါ
            </h2>
            <p className="mb-5 text-base text-gray-600 sm:mb-6 sm:text-lg">Share Your Experience</p>

            <Textarea
              placeholder="ဒီလမ်းညွှန်ချက်နဲ့ ပတ်သက်ပြီး သင့်အတွေ့အကြုံကို မျှဝေပါ..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="min-h-[100px] border-4 border-gray-300 text-base sm:min-h-[120px] sm:text-lg"
            />
            <Button className="mt-4 h-14 w-full bg-[#16a34a] text-lg font-bold hover:bg-[#15803d] sm:h-16 sm:text-xl">
              တင်သွင်းမည် (Submit)
            </Button>
          </CardContent>
        </Card>

        {/* Section 8: Comments */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              ဆွေးနွေးချက်များ ({guide.comments.length})
            </h2>
            <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
              ဆွေးနွေးချက် (မော်ဒယ်) · Sample comments (demo)
            </p>

            <div className="space-y-4">
              {guide.comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-[#f0fdf4] rounded-xl border-2 border-gray-300">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <User className="size-6 shrink-0 text-gray-500" strokeWidth={2} aria-hidden />
                    <span className="text-lg font-bold text-gray-900">{comment.author}</span>
                    {comment.verified && (
                      <Badge className="bg-[#16a34a] text-white text-sm gap-1">
                        <Check className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                        Verified
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500 ml-auto">{comment.timePosted}</span>
                  </div>
                  <p className="text-lg text-gray-900 mb-2">{comment.content}</p>
                  <p className="text-base text-gray-600">{comment.contentEn}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
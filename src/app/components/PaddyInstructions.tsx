import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCallback, useEffect, useState } from "react";
import { BookOpen, Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { mergeGuidesForFarmer } from "../../admin/contentAdminState";
import { GUIDE_CANONICAL_TITLES, MOCK_GUIDES, MOCK_PADDY_TYPES } from "../../mocks";
import { useAuth } from "../../auth/AuthContext";
import type { GuideCard } from "../../mocks/types";

interface PaddyInstructionsProps {
  onGuideClick?: (paddyType: string) => void;
}

function guideDisplayTitles(guide: GuideCard): { mm: string; en: string } {
  const mapped = GUIDE_CANONICAL_TITLES[guide.paddyType];
  if (mapped) return mapped;
  return { mm: guide.title, en: guide.titleEn };
}

export function PaddyInstructions({ onGuideClick }: PaddyInstructionsProps) {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [guides, setGuides] = useState<GuideCard[]>(() =>
    mergeGuidesForFarmer(MOCK_GUIDES)
  );

  const refreshGuides = useCallback(() => {
    setGuides(mergeGuidesForFarmer(MOCK_GUIDES));
  }, []);

  useEffect(() => {
    refreshGuides();
    const onAdminContent = () => refreshGuides();
    window.addEventListener("pyoe-content-admin-updated", onAdminContent);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "pyoe-com-admin-content-v1") refreshGuides();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pyoe-content-admin-updated", onAdminContent);
      window.removeEventListener("storage", onStorage);
    };
  }, [refreshGuides]);

  const filteredGuides = guides.filter((guide) => {
    return selectedType === "all" || guide.paddyType === selectedType;
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] pb-24">
      {/* Header with Clean Design matching Dashboard */}
      <header className="bg-[#1B4332] px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-white shadow-lg sm:px-6 sm:pt-8">
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
            <BookOpen className="size-5" strokeWidth={2.2} aria-hidden />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-wide sm:text-2xl md:text-3xl">
              ပညာရှင်များ၏ စိုက်ပျိုးရေးအကြံပြုချက်
            </h1>
            <p className="text-base opacity-90 mt-1">Community Wisdom Cards</p>
          </div>
        </div>
      </header>

      {/* Variety Picker Section */}
      <div className="border-b-4 border-gray-200 bg-white px-4 py-5 sm:px-6 sm:py-6">
        <label className="block text-xl font-bold text-[#1B4332] mb-4">
          စပါးအမျိုးအစား ရွေးချယ်ပါ
          <span className="block text-base text-gray-600 font-normal mt-1">Select Paddy Type</span>
        </label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full h-16 text-xl border-4 border-[#1B4332] bg-[#F8FAFC] font-bold">
            <SelectValue placeholder="Choose your Paddy Type..." />
          </SelectTrigger>
          <SelectContent>
            {MOCK_PADDY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-lg py-4">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Instruction Cards */}
      <div className="space-y-6 p-4 sm:p-6">
        {filteredGuides.map((guide) => {
          const { mm: titleMM, en: titleEn } = guideDisplayTitles(guide);
          return (
            <Card
              key={guide.id}
              onClick={() => onGuideClick?.(guide.paddyType)}
              className="border-2 border-gray-200 hover:border-[#16a34a] cursor-pointer active:scale-[0.99] transition-colors shadow-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-[#2D5A27] mb-0.5">{titleMM}</h3>
                    <p className="text-base text-gray-600">{titleEn}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2 text-right">
                    {guide.verified ? (
                      <Badge className="bg-[#16a34a] text-white text-sm px-2.5 py-1 gap-1">
                        <Check className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                        Verified
                      </Badge>
                    ) : null}
                    <div>
                      <p className="text-xs font-medium text-gray-600 leading-tight">
                        ကြိုက်နှစ်သက်သည့်အရေအတွက်
                      </p>
                      <p className="text-xl font-bold tabular-nums text-[#1B4332] mt-0.5">
                        {guide.upvotes}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-16 bg-[#1B4332] hover:bg-[#15291f] text-white rounded-xl flex items-center justify-center text-lg font-bold active:scale-[0.98] transition-transform border-2 border-[#1B4332]"
                >
                  ကြိုက်နှစ်သက်သည်
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-500">မတွေ့ရှိပါ</p>
          <p className="text-lg text-gray-400 mt-2">No guides found</p>
        </div>
      )}

      {user?.role === "admin" && (
        <Button
          onClick={() => alert("Admin: Upload New Instruction (Feature coming soon)")}
          className="fixed bottom-24 right-6 w-20 h-20 rounded-full bg-[#16a34a] hover:bg-[#15803d] shadow-xl z-20 flex items-center justify-center p-0 border-4 border-white"
        >
          <Plus className="w-10 h-10 text-white" strokeWidth={3} />
        </Button>
      )}
    </div>
  );
}

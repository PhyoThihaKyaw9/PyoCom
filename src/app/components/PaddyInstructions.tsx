import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useCallback, useEffect, useState } from "react";
import { BookOpen, Plus, ThumbsDown, ThumbsUp, Check } from "lucide-react";
import { Button } from "./ui/button";
import { mergeGuidesForFarmer } from "../../admin/contentAdminState";
import { MOCK_GUIDES, MOCK_PADDY_TYPES } from "../../mocks";
import { useAuth } from "../../auth/AuthContext";
import type { GuideCard } from "../../mocks/types";

interface PaddyInstructionsProps {
  onGuideClick?: () => void;
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
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header with Clean Design matching Dashboard */}
      <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
            <BookOpen className="size-5" strokeWidth={2.2} aria-hidden />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-wide">ပညာရှင်များ၏ စိုက်ပျိုးရေးအကြံပြုချက်</h1>
            <p className="text-base opacity-90 mt-1">Community Wisdom Cards</p>
          </div>
        </div>
      </header>

      {/* Variety Picker Section */}
      <div className="px-6 py-6 bg-white border-b-4 border-gray-200">
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
      <div className="p-6 space-y-6">
        {filteredGuides.map((guide) => (
          <Card
            key={guide.id}
            onClick={onGuideClick}
            className="border-2 border-gray-200 hover:border-[#16a34a] cursor-pointer active:scale-[0.99] transition-colors shadow-sm"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#2D5A27] mb-0.5">
                    {guide.title}
                  </h3>
                  <p className="text-base text-gray-600">{guide.titleEn}</p>
                </div>
                {guide.verified && (
                  <Badge className="shrink-0 bg-[#16a34a] text-white text-sm px-2.5 py-1 gap-1">
                    <Check className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-16 bg-[#1B4332] hover:bg-[#15291f] text-white rounded-xl flex items-center justify-center gap-2 text-lg font-bold active:scale-[0.98] transition-transform border-2 border-[#1B4332]"
                >
                  <ThumbsUp className="size-7 shrink-0" strokeWidth={2.2} aria-hidden />
                  <span>{guide.upvotes}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-16 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl flex items-center justify-center gap-2 text-lg font-bold active:scale-[0.98] transition-transform border-2 border-gray-200"
                >
                  <ThumbsDown className="size-7 shrink-0" strokeWidth={2.2} aria-hidden />
                  <span>{guide.downvotes}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
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

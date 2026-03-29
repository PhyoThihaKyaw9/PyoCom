import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Guide {
  id: number;
  title: string;
  titleEn: string;
  advice: string;
  adviceEn: string;
  upvotes: number;
  downvotes: number;
  rating: number;
  paddyType: string;
  verified: boolean;
}

interface PaddyInstructionsProps {
  onGuideClick?: () => void;
}

export function PaddyInstructions({ onGuideClick }: PaddyInstructionsProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  
  // Simulating admin user
  const isAdmin = true;

  const guides: Guide[] = [
    {
      id: 1,
      title: "ရွှေဘိုပေါစန်",
      titleEn: "Shwebo Pawsan",
      advice: "စိုက်ပျိုးပြီး ၂၀ ရက်အကြာတွင် NPK 15-15-15 မြေသြဇာကို အသုံးပြုပါ။",
      adviceEn: "Use NPK 15-15-15 fertilizer at 20 days after planting.",
      upvotes: 120,
      downvotes: 8,
      rating: 4.8,
      paddyType: "shwebo-pawsan",
      verified: true
    },
    {
      id: 2,
      title: "မနောသုခ",
      titleEn: "Manaw Thukha",
      advice: "ပိုးမွှားကာကွယ်ရေးအတွက် နင်းသီးဆိပ်ကို ၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
      adviceEn: "Spray neem oil every 10 days for pest prevention.",
      upvotes: 89,
      downvotes: 5,
      rating: 4.7,
      paddyType: "manaw-thukha",
      verified: true
    },
    {
      id: 3,
      title: "၉၀ ရက် (ရက်ကိုးဆယ်)",
      titleEn: "90-Day (Yetkoese)",
      advice: "ရေကို အမြဲတမ်း ၃ လက်မအထက် မထားပါနှင့်။ အမြစ်ပုပ်နိုင်ပါတယ်။",
      adviceEn: "Never keep water above 3 inches. Root rot may occur.",
      upvotes: 156,
      downvotes: 12,
      rating: 4.6,
      paddyType: "90-day",
      verified: false
    },
    {
      id: 4,
      title: "စင်သုခ",
      titleEn: "Sinthukha",
      advice: "ပန်းပွင့်ချိန်တွင် ရေကို တစ်ပတ်လျှင် ၂ ကြိမ် လျှော့ချပေးပါ။",
      adviceEn: "Drain water twice per week during flowering stage.",
      upvotes: 74,
      downvotes: 3,
      rating: 4.9,
      paddyType: "sinthukha",
      verified: true
    },
    {
      id: 5,
      title: "ရာသီဥတုခံနိုင်ရည် မြင့်သောမျိုးများ",
      titleEn: "Climate-Resilient Varieties",
      advice: "မိုးခေါင်ရာသီအတွက် ရွှေဘိုပေါစန်နှင့် မနောသုခ အကောင်းဆုံးဖြစ်ပါတယ်။",
      adviceEn: "Shwebo Pawsan and Manaw Thukha are best for dry season.",
      upvotes: 203,
      downvotes: 7,
      rating: 5.0,
      paddyType: "all",
      verified: true
    }
  ];

  const paddyTypes = [
    { value: "all", label: "အားလုံး (All Types)" },
    { value: "manaw-thukha", label: "မနောသုခ (Manaw Thukha)" },
    { value: "shwebo-pawsan", label: "ရွှေဘိုပေါစန် (Shwebo Pawsan)" },
    { value: "sinthukha", label: "စင်သုခ (Sinthukha)" },
    { value: "90-day", label: "၉၀ ရက် (90-Day)" }
  ];

  const filteredGuides = guides.filter(guide => {
    return selectedType === "all" || guide.paddyType === selectedType;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header with Clean Design matching Dashboard */}
      <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-wide">ပညာရှင်များ၏ အကြံပြုချက်</h1>
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
            {paddyTypes.map(type => (
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
            className="border-4 border-gray-300 hover:border-[#16a34a] cursor-pointer active:scale-98 transition-all"
          >
            <CardContent className="p-6">
              {/* Title */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2D5A27] mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-lg text-gray-600">{guide.titleEn}</p>
                </div>
                {guide.verified && (
                  <Badge className="bg-[#16a34a] text-white text-base px-3 py-1">
                    <span className="text-xl mr-1">✓</span>
                    Verified
                  </Badge>
                )}
              </div>

              {/* Single Clear Advice */}
              <div className="bg-[#f0fdf4] p-4 rounded-lg mb-4 border-2 border-[#16a34a]">
                <p className="text-lg text-gray-900 mb-2">
                  {guide.advice}
                </p>
                <p className="text-base text-gray-600">
                  {guide.adviceEn}
                </p>
              </div>

              {/* Large Thumbs Up/Down Buttons */}
              <div className="flex items-center gap-4 mb-4">
                <button className="flex-1 h-20 bg-[#1B4332] hover:bg-[#15291f] text-white rounded-xl flex items-center justify-center gap-3 text-2xl font-bold active:scale-95 transition-transform border-2 border-[#1B4332]">
                  <span className="text-4xl">👍</span>
                  <span>{guide.upvotes}</span>
                </button>
                <button className="flex-1 h-20 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-3 text-2xl font-bold active:scale-95 transition-transform border-2 border-gray-300">
                  <span className="text-4xl">👎</span>
                  <span>{guide.downvotes}</span>
                </button>
              </div>

              {/* Meta Information - Trust Highlight */}
              <div className="bg-[#D97706] bg-opacity-10 p-4 rounded-xl border-2 border-[#D97706]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">⭐</span>
                    <span className="text-xl font-bold text-gray-900">{guide.rating}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900">
                      {guide.upvotes} ဦး က အကြံပြုထားပါသည်
                    </p>
                    <p className="text-base text-gray-600">
                      {guide.upvotes} people recommend this
                    </p>
                  </div>
                </div>
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

      {/* Admin FAB */}
      {isAdmin && (
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
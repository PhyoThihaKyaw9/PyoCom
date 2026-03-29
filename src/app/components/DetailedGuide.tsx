import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Comment {
  id: number;
  author: string;
  content: string;
  contentEn: string;
  verified: boolean;
  timePosted: string;
}

export function DetailedGuide() {
  const [userComment, setUserComment] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  const guide = {
    title: "ရွှေဘိုပေါစန်",
    titleEn: "Shwebo Pawsan - Complete Growing Guide",
    upvotes: 120,
    rating: 4.8
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: "U Tin Maung",
      content: "အရမ်းကောင်းတဲ့ အကြံပြုချက်ပါ။ စမ်းသုံးကြည့်ပြီး အောင်မြင်ပါတယ်။",
      contentEn: "Excellent advice! I tried it and it worked well.",
      verified: true,
      timePosted: "၂ ရက် အရင်က"
    },
    {
      id: 2,
      author: "Daw Aye Aye",
      content: "အပူချိန် ၃၅ ဒဂရီအထက်တက်ရင် မြေသြဇာပေးချိန်ကို ပြောင်းလဲရမလား?",
      contentEn: "Should I adjust fertilizer timing if temperature exceeds 35°C?",
      verified: false,
      timePosted: "၁ ရက် အရင်က"
    },
    {
      id: 3,
      author: "U Kyaw Htun",
      content: "အပူချိန်မြင့်ရင် မနက်စောစောပဲ ပေးသင့်ပါတယ်။ နေ့လည်မှာ ရှောင်ပါ။",
      contentEn: "For high temperatures, apply in early morning. Avoid midday.",
      verified: true,
      timePosted: "၁ ရက် အရင်က"
    }
  ];

  const emojiReactions = [
    { emoji: "😠", label: "Very Bad", labelMM: "အရမ်းမကောင်း" },
    { emoji: "😕", label: "Not Good", labelMM: "မကောင်း" },
    { emoji: "😐", label: "Okay", labelMM: "ရပါတယ်" },
    { emoji: "😊", label: "Good", labelMM: "ကောင်း" },
    { emoji: "😍", label: "Very Good", labelMM: "အရမ်းကောင်း" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header matching Dashboard design */}
      <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-2xl">📖</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{guide.title}</h1>
            <p className="text-base opacity-90 mt-1">{guide.titleEn}</p>
          </div>
        </div>
      </header>

      {/* Single Column Vertical Scroll - NO TABS */}
      <div className="p-6 space-y-8">
        
        {/* Section 1: Was This Useful? - Large Vote Buttons */}
        <Card className="border-4 border-[#16a34a] bg-[#f0fdf4]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              ဒီနည်းလမ်းက အသုံးဝင်သလား?
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-center">Was this useful?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setHasVoted('up')}
                className={`h-24 rounded-xl flex flex-col items-center justify-center gap-2 font-bold text-xl active:scale-95 transition-all ${
                  hasVoted === 'up' 
                    ? 'bg-[#1B4332] text-white border-4 border-[#15291f]' 
                    : 'bg-white text-[#1B4332] border-4 border-[#1B4332] hover:bg-[#f0fdf4]'
                }`}
              >
                <span className="text-5xl">👍</span>
                <span>အသုံးဝင်တယ်</span>
              </button>
              <button 
                onClick={() => setHasVoted('down')}
                className={`h-24 rounded-xl flex flex-col items-center justify-center gap-2 font-bold text-xl active:scale-95 transition-all ${
                  hasVoted === 'down' 
                    ? 'bg-gray-700 text-white border-4 border-gray-900' 
                    : 'bg-white text-gray-700 border-4 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-5xl">👎</span>
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

        {/* Section 2: Emoji Reactions */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              သင့်အတွေ့အကြုံကို အဆင့်သတ်မှတ်ပါ
            </h2>
            <p className="text-lg text-gray-600 mb-6">Rate Your Experience</p>
            
            <div className="grid grid-cols-5 gap-2">
              {emojiReactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedEmoji(index)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 py-4 active:scale-95 transition-all ${
                    selectedEmoji === index
                      ? 'bg-[#FDB813] border-4 border-[#E5A000]'
                      : 'bg-gray-100 border-4 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-4xl">{reaction.emoji}</span>
                  <span className="text-xs font-medium text-center leading-tight">{reaction.labelMM}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Timeline Flow - Icon Based */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              စိုက်ပျိုးချိန်ဇယား
            </h2>
            <p className="text-lg text-gray-600 mb-6">Growing Timeline</p>

            <div className="space-y-6">
              {[
                { icon: "🌱", days: "0-15", daysMM: "၀-၁၅", stage: "အပင်ငယ်ကာလ", stageEn: "Seedling Stage", tip: "ရေတစ်လက်မ ထားပါ (Keep 1 inch water)" },
                { icon: "🌿", days: "15-30", daysMM: "၁၅-၃၀", stage: "အပင်ကြီးထွားကာလ", stageEn: "Vegetative Growth", tip: "ပထမမြေသြဇာပေးရန် (First fertilizer dose)" },
                { icon: "🌾", days: "30-60", daysMM: "၃၀-၆၀", stage: "ပန်းပွင့်ကာလ", stageEn: "Flowering Stage", tip: "ရေနည်းနည်းထိန်းပါ (Keep shallow water)" },
                { icon: "🌾", days: "60-90", daysMM: "၆၀-၉၀", stage: "ဆန်ရင့်ကာ��", stageEn: "Grain Filling", tip: "ရေဖြည်းဖြည်းလျှော့ပါ (Gradually reduce water)" },
                { icon: "🚜", days: "90-120", daysMM: "၉၀-၁၂၀", stage: "ရိတ်သိမ်းကာလ", stageEn: "Harvest Time", tip: "မြေခြောက်စေပါ (Dry the field)" }
              ].map((stage, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#f0fdf4] rounded-xl border-2 border-[#16a34a]">
                  <div className="text-5xl flex-shrink-0">{stage.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold text-[#16a34a]">ရက် {stage.daysMM}</span>
                      <span className="text-base text-gray-600">({stage.days} days)</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{stage.stage}</h3>
                    <p className="text-base text-gray-600 mb-2">{stage.stageEn}</p>
                    <p className="text-base text-gray-900 font-medium">💡 {stage.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Weather & Soil */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ရာသီဥတုနှင့် မြေဆီလွှာ
            </h2>
            <p className="text-lg text-gray-600 mb-6">Weather & Soil Conditions</p>

            <div className="space-y-4">
              <div className="p-4 bg-[#FEF3C7] rounded-xl border-2 border-[#FDB813]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🌡️</span>
                  <h3 className="text-xl font-bold text-gray-900">အပူချိန်</h3>
                </div>
                <p className="text-lg text-gray-900">၂၅-၃၅°C အကောင်းဆုံး</p>
                <p className="text-base text-gray-600">Optimal: 25-35°C</p>
              </div>

              <div className="p-4 bg-[#E0F2FE] rounded-xl border-2 border-[#0EA5E9]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">💧</span>
                  <h3 className="text-xl font-bold text-gray-900">မြေဆီ pH</h3>
                </div>
                <p className="text-lg text-gray-900">pH 5.5-6.5 လိုအပ်သည်</p>
                <p className="text-base text-gray-600">Required: pH 5.5-6.5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: How-To Steps */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              လုပ်ဆောင်ရမည့် အဆင့်များ
            </h2>
            <p className="text-lg text-gray-600 mb-6">Step-by-Step Instructions</p>

            <div className="space-y-4">
              {[
                { step: "၁", stepEn: "1", title: "မြေပြင်ဆင်ခြင်း", titleEn: "Land Preparation", desc: "မြေကို နက်နက်ရှိုင်း ထွန်ယက်ပါ", descEn: "Deep plowing required" },
                { step: "၂", stepEn: "2", title: "မျိုးစေ့ရွေးချယ်ခြင်း", titleEn: "Seed Selection", desc: "ဆားရည်တွင် စမ်းသပ်ပါ", descEn: "Test in salt water" },
                { step: "၃", stepEn: "3", title: "စိုက်ပျိုးခြင်း", titleEn: "Planting", desc: "၆ လက်မ အကွာစိုက်ပါ", descEn: "Space 6 inches apart" },
                { step: "၄", stepEn: "4", title: "မြေသြဇာပေးခြင်း", titleEn: "Fertilizing", desc: "၂၀ ရက်အကြာတွင် NPK ပေးပါ", descEn: "Apply NPK at day 20" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border-2 border-gray-300">
                  <div className="w-16 h-16 bg-[#16a34a] text-white rounded-xl flex items-center justify-center text-3xl font-bold flex-shrink-0">
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

        {/* Section 6: Fertilizer Schedule */}
        <Card className="border-4 border-[#78350f] bg-[#FEF3C7]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              မြေသြဇာအချိန်ဇယား
            </h2>
            <p className="text-lg text-gray-600 mb-6">Fertilizer Schedule</p>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-xl border-2 border-[#78350f]">
                <p className="text-xl font-bold text-gray-900 mb-1">ရက် ၁၅ - NPK 15-15-15</p>
                <p className="text-lg text-gray-900">၁ ဧကလျှင် ၁ အိတ်</p>
                <p className="text-base text-gray-600">1 bag per acre at day 15</p>
              </div>
              <div className="p-4 bg-white rounded-xl border-2 border-[#78350f]">
                <p className="text-xl font-bold text-gray-900 mb-1">ရက် ၃၀ - NPK 15-15-15</p>
                <p className="text-lg text-gray-900">၁ ဧကလျှင် ၁ အိတ်</p>
                <p className="text-base text-gray-600">1 bag per acre at day 30</p>
              </div>
              <div className="p-4 bg-white rounded-xl border-2 border-[#78350f]">
                <p className="text-xl font-bold text-gray-900 mb-1">ရက် ၄၅ - NPK 15-15-15</p>
                <p className="text-lg text-gray-900">၁ ဧကလျှင် ၀.၅ အိတ်</p>
                <p className="text-base text-gray-600">0.5 bag per acre at day 45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Pest Protection */}
        <Card className="border-4 border-[#E67E22] bg-[#FEF3C7]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ပိုးမွှားကာကွယ်ရေး
            </h2>
            <p className="text-lg text-gray-600 mb-6">Pest Protection & Prevention</p>

            <div className="space-y-4">
              {[
                { icon: "🐛", pest: "ပိုးညို", pestEn: "Brown Planthopper", treatment: "Imidacloprid 17.8% ဖြန်းပါ", treatmentEn: "Spray Imidacloprid 17.8%" },
                { icon: "🦗", pest: "ပိုးစိမ်း", pestEn: "Green Leafhopper", treatment: "Thiamethoxam 25% အသုံးပြုပါ", treatmentEn: "Use Thiamethoxam 25%" },
                { icon: "🪱", pest: "ကျဉ်းကောင်", pestEn: "Stem Borer", treatment: "Chlorantraniliprole 18.5% ဖြန်းပါ", treatmentEn: "Spray Chlorantraniliprole 18.5%" }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border-2 border-[#E67E22]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{item.pest}</h3>
                  </div>
                  <p className="text-base text-gray-600 mb-2">{item.pestEn}</p>
                  <p className="text-lg text-gray-900">{item.treatment}</p>
                  <p className="text-base text-gray-600">{item.treatmentEn}</p>
                </div>
              ))}

              <div className="p-4 bg-[#f0fdf4] rounded-xl border-2 border-[#16a34a] mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🌿</span>
                  <h3 className="text-xl font-bold text-[#16a34a]">သဘာဝနည်းလမ်း</h3>
                </div>
                <p className="text-lg text-gray-900 mb-1">နင်းသီးဆိပ် ၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ</p>
                <p className="text-base text-gray-600">Natural Method: Spray neem oil every 10 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Add Your Comment */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              သင့်အတွေ့အကြုံကို မျှဝေပါ
            </h2>
            <p className="text-lg text-gray-600 mb-6">Share Your Experience</p>
            
            <Textarea
              placeholder="ဒီလမ်းညွှန်ချက်နဲ့ ပတ်သက်ပြီး သင့်အတွေ့အကြုံကို မျှဝေပါ..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="min-h-[120px] text-lg border-4 border-gray-300"
            />
            <Button className="w-full mt-4 h-16 bg-[#16a34a] hover:bg-[#15803d] text-xl font-bold">
              တင်သွင်းမည် (Submit)
            </Button>
          </CardContent>
        </Card>

        {/* Section 9: Comments Thread */}
        <Card className="border-4 border-gray-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ဆွေးနွေးချက်များ ({comments.length})
            </h2>
            <p className="text-lg text-gray-600 mb-6">Community Discussion</p>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-[#f0fdf4] rounded-xl border-2 border-gray-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">👤</span>
                    <span className="text-lg font-bold text-gray-900">{comment.author}</span>
                    {comment.verified && (
                      <Badge className="bg-[#16a34a] text-white text-sm">
                        <span className="text-base mr-1">✓</span>
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
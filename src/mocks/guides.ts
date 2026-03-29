import type {
  DetailedGuideContent,
  GuideCard,
  PaddyTypeOption,
} from "./types";

export const MOCK_PADDY_TYPES: PaddyTypeOption[] = [
  { value: "all", label: "အားလုံး (All Types)" },
  { value: "manaw-thukha", label: "မနောသုခ (Manaw Thukha)" },
  { value: "shwebo-pawsan", label: "ရွှေဘိုပေါစန် (Shwebo Pawsan)" },
  { value: "sinthukha", label: "စင်သုခ (Sinthukha)" },
  { value: "90-day", label: "၉၀ ရက် (90-Day)" },
];

export const MOCK_GUIDES: GuideCard[] = [
  {
    id: 1,
    title: "ရွှေဘိုပေါစန်",
    titleEn: "Shwebo Pawsan",
    advice:
      "စိုက်ပျိုးပြီး ၂၀ ရက်အကြာတွင် NPK 15-15-15 မြေသြဇာကို အသုံးပြုပါ။",
    adviceEn: "Use NPK 15-15-15 fertilizer at 20 days after planting.",
    upvotes: 120,
    downvotes: 8,
    rating: 4.8,
    paddyType: "shwebo-pawsan",
    verified: true,
  },
  {
    id: 2,
    title: "မနောသုခ",
    titleEn: "Manaw Thukha",
    advice:
      "ပိုးမွှားကာကွယ်ရေးအတွက် နင်းသီးဆိပ်ကို ၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
    adviceEn: "Spray neem oil every 10 days for pest prevention.",
    upvotes: 89,
    downvotes: 5,
    rating: 4.7,
    paddyType: "manaw-thukha",
    verified: true,
  },
  {
    id: 3,
    title: "၉၀ ရက် (ရက်ကိုးဆယ်)",
    titleEn: "90-Day (Yetkoese)",
    advice:
      "ရေကို အမြဲတမ်း ၃ လက်မအထက် မထားပါနှင့်။ အမြစ်ပုပ်နိုင်ပါတယ်။",
    adviceEn: "Never keep water above 3 inches. Root rot may occur.",
    upvotes: 156,
    downvotes: 12,
    rating: 4.6,
    paddyType: "90-day",
    verified: false,
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
    verified: true,
  },
  {
    id: 5,
    title: "ရာသီဥတုခံနိုင်ရည် မြင့်သောမျိုးများ",
    titleEn: "Climate-Resilient Varieties",
    advice:
      "မိုးခေါင်ရာသီအတွက် ရွှေဘိုပေါစန်နှင့် မနောသုခ အကောင်းဆုံးဖြစ်ပါတယ်။",
    adviceEn: "Shwebo Pawsan and Manaw Thukha are best for dry season.",
    upvotes: 203,
    downvotes: 7,
    rating: 5.0,
    paddyType: "all",
    verified: true,
  },
];

export const MOCK_DETAILED_GUIDE: DetailedGuideContent = {
  title: "ရွှေဘိုပေါစန်",
  titleEn: "Shwebo Pawsan - Complete Growing Guide",
  upvotes: 120,
  rating: 4.8,
  comments: [
    {
      id: 1,
      author: "U Tin Maung",
      content:
        "အရမ်းကောင်းတဲ့ အကြံပြုချက်ပါ။ စမ်းသုံးကြည့်ပြီး အောင်မြင်ပါတယ်။",
      contentEn: "Excellent advice! I tried it and it worked well.",
      verified: true,
      timePosted: "၂ ရက် အရင်က",
    },
    {
      id: 2,
      author: "Daw Aye Aye",
      content:
        "အပူချိန် ၃၅ ဒဂရီအထက်တက်ရင် မြေသြဇာပေးချိန်ကို ပြောင်းလဲရမလား?",
      contentEn:
        "Should I adjust fertilizer timing if temperature exceeds 35°C?",
      verified: false,
      timePosted: "၁ ရက် အရင်က",
    },
    {
      id: 3,
      author: "U Kyaw Htun",
      content:
        "အပူချိန်မြင့်ရင် မနက်စောစောပဲ ပေးသင့်ပါတယ်။ နေ့လည်မှာ ရှောင်ပါ။",
      contentEn:
        "For high temperatures, apply in early morning. Avoid midday.",
      verified: true,
      timePosted: "၁ ရက် အရင်က",
    },
  ],
  timeline: [
    {
      icon: "sprout",
      days: "0-15",
      daysMM: "၀-၁၅",
      stage: "အပင်ငယ်ကာလ",
      stageEn: "Seedling Stage",
      tip: "ရေတစ်လက်မ ထားပါ (Keep 1 inch water)",
    },
    {
      icon: "leaf",
      days: "15-30",
      daysMM: "၁၅-၃၀",
      stage: "အပင်ကြီးထွားကာလ",
      stageEn: "Vegetative Growth",
      tip: "ပထမမြေသြဇာပေးရန် (First fertilizer dose)",
    },
    {
      icon: "wheat",
      days: "30-60",
      daysMM: "၃၀-၆၀",
      stage: "ပန်းပွင့်ကာလ",
      stageEn: "Flowering Stage",
      tip: "ရေနည်းနည်းထိန်းပါ (Keep shallow water)",
    },
    {
      icon: "wheat",
      days: "60-90",
      daysMM: "၆၀-၉၀",
      stage: "ဆန်ရင့်ကာလ",
      stageEn: "Grain Filling",
      tip: "ရေကိုဖြည်းလျှော့ပါ (Gradually reduce water)",
    },
    {
      icon: "tractor",
      days: "90-120",
      daysMM: "၉၀-၁၂၀",
      stage: "ရိတ်သိမ်းကာလ",
      stageEn: "Harvest Time",
      tip: "မြေခြောက်စေပါ (Dry the field)",
    },
  ],
  howToSteps: [
    {
      step: "၁",
      stepEn: "1",
      title: "မြေပြင်ဆင်ခြင်း",
      titleEn: "Land Preparation",
      desc: "မြေကို နက်နက်ရှိုင်း ထွန်ယက်ပါ",
      descEn: "Deep plowing required",
    },
    {
      step: "၂",
      stepEn: "2",
      title: "မျိုးစေ့ရွေးချယ်ခြင်း",
      titleEn: "Seed Selection",
      desc: "ဆားရည်တွင် စမ်းသပ်ပါ",
      descEn: "Test in salt water",
    },
    {
      step: "၃",
      stepEn: "3",
      title: "စိုက်ပျိုးခြင်း",
      titleEn: "Planting",
      desc: "၆ လက်မ အကွာစိုက်ပါ",
      descEn: "Space 6 inches apart",
    },
    {
      step: "၄",
      stepEn: "4",
      title: "မြေသြဇာပေးခြင်း",
      titleEn: "Fertilizing",
      desc: "၂၀ ရက်အကြာတွင် NPK ပေးပါ",
      descEn: "Apply NPK at day 20",
    },
  ],
  fertilizerSchedule: [
    {
      titleMM: "ရက် ၁၅ - NPK 15-15-15",
      detailMM: "၁ ဧကလျှင် ၁ အိတ်",
      detailEn: "1 bag per acre at day 15",
    },
    {
      titleMM: "ရက် ၃၀ - NPK 15-15-15",
      detailMM: "၁ ဧကလျှင် ၁ အိတ်",
      detailEn: "1 bag per acre at day 30",
    },
    {
      titleMM: "ရက် ၄၅ - NPK 15-15-15",
      detailMM: "၁ ဧကလျှင် ၀.၅ အိတ်",
      detailEn: "0.5 bag per acre at day 45",
    },
  ],
  pestRows: [
    {
      icon: "beetle",
      pest: "ပိုးညို",
      pestEn: "Brown Planthopper",
      treatment: "Imidacloprid 17.8% ဖြန်းပါ",
      treatmentEn: "Spray Imidacloprid 17.8%",
    },
    {
      icon: "hopper",
      pest: "ပိုးစိမ်း",
      pestEn: "Green Leafhopper",
      treatment: "Thiamethoxam 25% အသုံးပြုပါ",
      treatmentEn: "Use Thiamethoxam 25%",
    },
    {
      icon: "borer",
      pest: "ကျဉ်းကောင်",
      pestEn: "Stem Borer",
      treatment: "Chlorantraniliprole 18.5% ဖြန်းပါ",
      treatmentEn: "Spray Chlorantraniliprole 18.5%",
    },
  ],
  naturalTipMM: "နင်းသီးဆိပ် ၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ",
  naturalTipEn: "Natural Method: Spray neem oil every 10 days",
};

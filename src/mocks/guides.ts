import type {
  DetailedGuideContent,
  GuideCard,
  GuideComment,
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
    title: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
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
    title: "မနောသုခစိုက်ပျိုးနည်း",
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
    title: "(၉၀)ရက်ကိုးဆယ်ဆန်စိုက်ပျိုးနည်း",
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
    title: "စင်သုခဆန်စိုက်ပျိုးနည်း",
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

/** MM/EN titles per variety — Paddy list cards + DetailedGuide header. */
export const GUIDE_CANONICAL_TITLES: Record<string, { mm: string; en: string }> = {
  "shwebo-pawsan": {
    mm: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
    en: "Shwebo Pawsan Cultivation Guide",
  },
  "manaw-thukha": {
    mm: "မနောသုခစိုက်ပျိုးနည်း",
    en: "Manaw Thukha Cultivation Guide",
  },
  "90-day": {
    mm: "(၉၀)ရက်ကိုးဆယ်ဆန်စိုက်ပျိုးနည်း",
    en: "90-Day Rice (Yetkoese) Cultivation Guide",
  },
  sinthukha: {
    mm: "စင်သုခဆန်စိုက်ပျိုးနည်း",
    en: "Sinthukha Rice Cultivation Guide",
  },
  all: {
    mm: "ရာသီဥတုခံနိုင်ရည် မြင့်သောမျိုးများစိုက်ပျိုးနည်း",
    en: "Climate-resilient varieties cultivation method",
  },
};

const MOCK_GUIDE_COMMENTS: GuideComment[] = [
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
];

/** Variety-specific content for Shwebo Pawsan (extended duration, water stages, IPM). */
export const MOCK_DETAILED_GUIDE_SHWEBO_PAWSAN: DetailedGuideContent = {
  title: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
  titleEn: "Shwebo Pawsan Cultivation Guide",
  upvotes: 120,
  rating: 4.8,
  comments: MOCK_GUIDE_COMMENTS.map((c) => ({ ...c })),
  sectionHeadings: {
    weatherMM: "🌦️ ရာသီဥတုနှင့် မြေဆီလွှာ",
    weatherEn: "🌦️ Weather & Soil Conditions",
    timelineMM: "🌱 ကြီးထွားအဆင့်များနှင့် ရေစီမံခန့်ခွဲမှု",
    timelineEn: "🌱 Growth Stages & Water Management",
    howToMM: "🚜 လုပ်ဆောင်ရမည့် အဆင့်များ",
    howToEn: "🚜 Step-by-Step Instructions",
    fertilizerMM: "🌿 မြေသြဇာအချိန်ဇယား",
    fertilizerEn: "🌿 Fertilizer Schedule",
    pestMM: "🐛 ပိုးမွှားစီမံခန့်ခွဲမှု",
    pestEn: "🐛 Pest Management",
  },
  weatherSoil: {
    tempMM: "အပူချိန် — ၂၅–၃၅°C",
    tempEn: "Temperature: 25–35°C",
    phMM: "မြေဆီ pH — ၅.၅ – ၆.၅",
    phEn: "Soil pH: 5.5 – 6.5",
    soilTypeMM: "မြေအမျိုးအစား — ရေထိန်းသိမ်းကောင်းသော မြေချောမွှေး (Clay loam)",
    soilTypeEn:
      "Soil type: Clay loam (best for water retention)",
  },
  growingDurationMM:
    "📅 စိုက်ပျိုးကာလ — ၁၃၅ – ၁၅၀ ရက် (ရက်ရှည်စပါးမျိုးစိတ်)",
  growingDurationEn:
    "📅 Growing duration: 135 – 150 days (long-duration variety)",
  timeline: [
    {
      icon: "sprout",
      days: "0-20",
      daysMM: "၀-၂၀",
      stage: "အပင်ငယ်ကာလ",
      stageEn: "0–20 days (Seedling stage)",
      tip: "",
      tipMM:
        "ရေ ၁–၂ လက်မ ထိန်းသိမ်း၍ မွေးခန်းတွင် အပင်ငယ်ကြီးထွားပါ။",
      tipEn:
        "Maintain 1–2 inches of water. Raise seedlings in nursery.",
    },
    {
      icon: "leaf",
      days: "20-40",
      daysMM: "၂၀-၄၀",
      stage: "ပြောင်းရွေ့စိုက်ပျိုးနှင့် အစောပိုင်း ကြီးထွားမှု",
      stageEn: "20–40 days (Transplanting & early growth)",
      tip: "",
      tipMM:
        "အပင်ငယ် ၂၀–၂၅ ရက်သား ပြောင်းရွေ့စိုက်ပါ။ အကွာ ၂၀×၂၀ စင်တီမီတာ။ ရေ နိမ့်နိမ့် သာ ထားပါ။",
      tipEn:
        "Transplant seedlings (20–25 days old). Spacing: 20 × 20 cm. Keep shallow water.",
    },
    {
      icon: "wheat",
      days: "40-70",
      daysMM: "၄၀-၇၀",
      stage: "အသီးအပွင့်မတိုင်မီ ကြီးထွားကာလ",
      stageEn: "40–70 days (Vegetative stage)",
      tip: "",
      tipMM:
        "မြေသြဇာပေးပါ။ ရေပေးခြင်း ကြားဖြတ်လုပ်ပြီး ခဏခဏ ရေချပါ။",
      tipEn:
        "Apply fertilizer. Maintain intermittent irrigation. Drain water occasionally.",
    },
    {
      icon: "wheat",
      days: "70-100",
      daysMM: "၇၀-၁၀၀",
      stage: "ပန်းပွင့်ကာလ",
      stageEn: "70–100 days (Flowering stage)",
      tip: "",
      tipMM:
        "အရေးကြီးဆုံးအဆင့် ⚠️ ရေဓာတ်ညီညွတ်စေရန် ထိန်းသိမ်း၍ ရေရှားမှုကို ရှောင်ပါ။",
      tipEn:
        "Critical stage ⚠️ Keep consistent moisture. Avoid water stress.",
    },
    {
      icon: "wheat",
      days: "100-130",
      daysMM: "၁၀၀-၁၃၀",
      stage: "ဆန် ဖြည့်သည့်ကာလ",
      stageEn: "100–130 days (Grain filling)",
      tip: "",
      tipMM: "ရေကို တဖြည်းဖြည်း လျှော့ချပါ။",
      tipEn: "Reduce water gradually.",
    },
    {
      icon: "tractor",
      days: "130-150",
      daysMM: "၁၃၀-၁၅၀",
      stage: "ရိတ်သိမ်းကာလ",
      stageEn: "130–150 days (Harvesting)",
      tip: "",
      tipMM:
        "လယ်ကို လုံးဝ ခြောက်အောင် လုပ်ပါ။ ဆန်စေ့ ၈၀–၈၅% ငွေရောင် ဖြစ်မှ ရိတ်သိမ်းပါ။",
      tipEn:
        "Drain field completely. Harvest when 80–85% of grains turn golden.",
    },
  ],
  howToSteps: [
    {
      step: "၁",
      stepEn: "1",
      title: "မြေပြင်ဆင်ခြင်း",
      titleEn: "Land preparation",
      desc:
        "နက်ရှိုင်းစွာ ထွန်ယက် (၂–၃ ကြိမ်)။ လယ်ကို ပြေပြစွာ ညီညွတ်စေရန် ညီညာအောင် ပြုလုပ်ပါ။",
      descEn:
        "Deep plowing (2–3 times). Level the field properly.",
    },
    {
      step: "၂",
      stepEn: "2",
      title: "မျိုးစေ့ရွေးချယ်ခြင်း",
      titleEn: "Seed selection",
      desc:
        "ကျန်းမာသော မျိုးစေ့ သုံးပါ။ ဆားရည်ဖြင့် စမ်းသပ်ပြီး ပေါလာသော မျိုးစေ့များကို ဖယ်ပါ။",
      descEn:
        "Use healthy seeds. Salt water test (remove floating seeds).",
    },
    {
      step: "၃",
      stepEn: "3",
      title: "မွေးခန်းပြင်ဆင်ခြင်း",
      titleEn: "Nursery preparation",
      desc:
        "မျိုးစေ့ခင်း ပြင်ဆင်ပြီး အပင်ငယ် ၂၀–၂၅ ရက် ကြီးထွားအောင် စိုက်ပါ။",
      descEn:
        "Prepare seedbed. Grow seedlings for 20–25 days.",
    },
    {
      step: "၄",
      stepEn: "4",
      title: "ပြောင်းရွေ့စိုက်ပျိုးခြင်း",
      titleEn: "Transplanting",
      desc:
        "အကွာ ၂၀ × ၂၀ စင်တီမီတာ။ တောင်တစ်ခုလျှင် အပင်ငယ် ၂–၃ ပင်။",
      descEn:
        "Spacing: 20 × 20 cm. 2–3 seedlings per hill.",
    },
  ],
  fertilizerSchedule: [
    {
      titleMM: "အခြေခံမြေသြဇာ (စိုက်ပျိုးမီ)",
      detailMM:
        "မြေဩဇာ — NPK (၁၅:၁၅:၁၅) သို့မဟုတ် သဘာဝမြေဩဇာ အသုံးပြုပါ။",
      detailEn:
        "Basal (before planting) — Apply: NPK (15:15:15) or organic manure.",
    },
    {
      titleMM: "ထပ်ဖြည့်မြေသြဇာ",
      detailMM:
        "ရက် ၂၀–၂၅ — နိုက်ထရိုဂျင် (ယူရီယာ)။ ရက် ၄၀–၄၅ — NPK။ ရက် ၆၀ — နိုက်ထရိုဂျင် အနည်းငယ်။",
      detailEn:
        "Top dressing — Day 20–25: Nitrogen (urea). Day 40–45: NPK. Day 60: Nitrogen (small dose).",
    },
  ],
  fertilizerFootnoteMM:
    "👉 မြေသြဇာကို ခွဲပြီး ပေးခြင်းသည် အသီးအနှံထွက်ရှိမှုကို မြင့်တက်စေသည်။",
  fertilizerFootnoteEn: "👉 Split application improves yield.",
  pestIntroMM: "အတွေ့ရများသော ပိုးများ -",
  pestIntroEn: "Common pests:",
  pestRows: [
    {
      icon: "beetle",
      pest: "ပိုးညို",
      pestEn: "1. Brown planthopper",
      treatment: "အသုံးပြုရန် — Imidacloprid 17.8%",
      treatmentEn: "Use: Imidacloprid 17.8%",
    },
    {
      icon: "hopper",
      pest: "ပိုးစိမ်း",
      pestEn: "2. Green leafhopper",
      treatment: "အသုံးပြုရန် — Thiamethoxam 25%",
      treatmentEn: "Use: Thiamethoxam 25%",
    },
    {
      icon: "borer",
      pest: "ကျဉ်းကောင်",
      pestEn: "3. Stem borer",
      treatment: "အသုံးပြုရန် — Chlorantraniliprole 18.5%",
      treatmentEn: "Use: Chlorantraniliprole 18.5%",
    },
  ],
  naturalHeadingMM: "🌿 သဘာဝနည်းလမ်း",
  naturalHeadingEn: "🌿 Natural method",
  naturalTipMM: "နီမ်ဆီကို ၇–၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
  naturalTipEn: "Neem oil spray every 7–10 days.",
  pestImportantMM:
    "⚠️ သတိပေး — ပိုးပမာဏ သတ်မှတ်ချက်ထက် ကျော်လွန် လာမှ သာ ဖြန်းပါ။ ဓာတုပစ္စည်း အသုံးပြုမှုကို အလွန်အကျွံ မလုပ်ပါနှင့်။",
  pestImportantEn:
    "⚠️ Important — Spray only when pests exceed threshold. Avoid overuse of chemicals.",
};

/** Variety-specific content for Manaw Thukha (medium duration, AWD, N split). */
export const MOCK_DETAILED_GUIDE_MANAW_THUKHA: DetailedGuideContent = {
  title: "မနောသုခစိုက်ပျိုးနည်း",
  titleEn: "Manaw Thukha Cultivation Guide",
  upvotes: 89,
  rating: 4.7,
  comments: MOCK_GUIDE_COMMENTS.map((c) => ({ ...c })),
  sectionHeadings: {
    weatherMM: "🌦️ ရာသီဥတုနှင့် မြေဆီလွှာ",
    weatherEn: "🌦️ Weather & Soil Conditions",
    timelineMM: "🌱 ကြီးထွားအဆင့်များနှင့် ရေစီမံခန့်ခွဲမှု",
    timelineEn: "🌱 Growth Stages & Water Management",
    howToMM: "🚜 လုပ်ဆောင်ရမည့် အဆင့်များ",
    howToEn: "🚜 Step-by-Step Instructions",
    fertilizerMM: "🌿 မြေသြဇာအချိန်ဇယား",
    fertilizerEn: "🌿 Fertilizer Schedule",
    pestMM: "🐛 ပိုးမွှားစီမံခန့်ခွဲမှု",
    pestEn: "🐛 Pest Management",
  },
  weatherSoil: {
    tempMM: "အပူချိန် — ၂၅–၃၅°C",
    tempEn: "Temperature: 25–35°C",
    phMM: "မြေဆီ pH — ၅.၅ – ၆.၅",
    phEn: "Soil pH: 5.5 – 6.5",
    soilTypeMM:
      "မြေအမျိုးအစား — ချောမွှေးမှ ရွှံ့ချောမွှေးမြေ (Clay loam to loamy soil)",
    soilTypeEn: "Soil type: Clay loam to loamy soil",
  },
  growingDurationMM:
    "📅 စိုက်ပျိုးကာလ — ၁၁၀ – ၁၂၅ ရက် (ရက်လတ်စပါး၊ ရွှေဘိုပေါ်ဆန်ထက် တိုသည်)",
  growingDurationEn:
    "📅 Growing duration: 110 – 125 days (medium-duration variety; shorter than Shwebo Pawsan)",
  timeline: [
    {
      icon: "sprout",
      days: "0-15",
      daysMM: "၀-၁၅",
      stage: "အပင်ငယ်ကာလ",
      stageEn: "0–15 days (Seedling stage)",
      tip: "",
      tipMM:
        "ရေ ၁–၂ လက်မ ထိန်းသိမ်း၍ မွေးခန်းပြင်ဆင်ပါ။",
      tipEn:
        "Maintain 1–2 inches of water. Prepare nursery.",
    },
    {
      icon: "leaf",
      days: "15-30",
      daysMM: "၁၅-၃၀",
      stage: "ပြောင်းရွေ့စိုက်ပျိုးကာလ",
      stageEn: "15–30 days (Transplanting stage)",
      tip: "",
      tipMM:
        "အပင်ငယ် ၁၈–၂၂ ရက်သား ပြောင်းရွေ့စိုက်ပါ။ အကွာ ၂၀ × ၁၅ စင်တီမီတာ (သို့ ၂၀ × ২০)။ ရေ နိမ့်နိမ့် သာ ထားပါ။",
      tipEn:
        "Transplant 18–22 day seedlings. Spacing: 20 × 15 cm (or 20 × 20 cm) for better yield and airflow. Keep shallow water.",
    },
    {
      icon: "wheat",
      days: "30-60",
      daysMM: "၃၀-၆၀",
      stage: "အစိမ်းရင့် ကြီးထွားကာလ",
      stageEn: "30–60 days (Vegetative stage)",
      tip: "",
      tipMM:
        "မြေသြဇာပေးပါ။ ရေလှောင်ခြင်းမရှိပဲ ရေတိုးရေလျှော့ (AWD) လုပ်ပါ။",
      tipEn:
        "Apply fertilizers. Use alternate wetting & drying (AWD). Avoid continuous flooding.",
    },
    {
      icon: "wheat",
      days: "60-85",
      daysMM: "၆၀-၈၅",
      stage: "ပန်းပွင့်ကာလ",
      stageEn: "60–85 days (Flowering stage)",
      tip: "",
      tipMM:
        "အရေးကြီးဆုံးအဆင့် ⚠️ ရေဓာတ်ညီညွတ်စေရန် ထိန်းသိမ်းပါ။",
      tipEn:
        "Very sensitive stage ⚠️ Maintain consistent moisture.",
    },
    {
      icon: "wheat",
      days: "85-105",
      daysMM: "၈၅-၁၀၅",
      stage: "ဆန် ဖြည့်သည့်ကာလ",
      stageEn: "85–105 days (Grain filling)",
      tip: "",
      tipMM: "ရေကို တဖြည်းဖြည်း လျှော့ချပါ။",
      tipEn: "Gradually reduce water.",
    },
    {
      icon: "tractor",
      days: "105-125",
      daysMM: "၁၀၅-၁၂၅",
      stage: "ရိတ်သိမ်းကာလ",
      stageEn: "105–125 days (Harvesting)",
      tip: "",
      tipMM:
        "လယ်ကို ရေခန်းအောင် လုပ်ပါ။ ဆန်စေ့ ရွှေညိုဖြစ်မှ ရိတ်သိမ်းပါ။",
      tipEn:
        "Drain field. Harvest when grains turn golden.",
    },
  ],
  howToSteps: [
    {
      step: "၁",
      stepEn: "1",
      title: "မြေပြင်ဆင်ခြင်း",
      titleEn: "Land preparation",
      desc:
        "နက်ရှိုင်းစွာ ထွန်ယက် (၂–၃ ကြိမ်)။ လယ်ကို ပြေပြစွာ ညီညွတ်စေရန် ညီညာအောင် ပြုလုပ်ပါ။",
      descEn:
        "Plow 2–3 times. Level the field properly.",
    },
    {
      step: "၂",
      stepEn: "2",
      title: "မျိုးစေ့ရွေးချယ်ခြင်း",
      titleEn: "Seed selection",
      desc:
        "ကျန်းမာသော မျိုးစေ့ သုံးပါ။ ဆားရည်ဖြင့် စမ်းသပ်ပြီး ပေါလာသော မျိုးစေ့များကို ဖယ်ပါ။",
      descEn:
        "Use healthy seeds. Salt water test (discard floaters).",
    },
    {
      step: "၃",
      stepEn: "3",
      title: "မွေးခန်းပြင်ဆင်ခြင်း",
      titleEn: "Nursery preparation",
      desc:
        "အပင်ငယ် ၁၈–၂၂ ရက် ကြီးထွားအောင် မွေးခန်းတွင် စိုက်ပါ။",
      descEn:
        "Grow seedlings for 18–22 days in the nursery.",
    },
    {
      step: "၄",
      stepEn: "4",
      title: "ပြောင်းရွေ့စိုက်ပျိုးခြင်း",
      titleEn: "Transplanting",
      desc:
        "အကွာ ၂၀ × ၁၅ စင်တီမီတာ (သို့ ၂၀ × ၂၀)။ တောင်တစ်ခုလျှင် အပင်ငယ် ၂–၃ ပင်။",
      descEn:
        "Spacing: 20 × 15 cm (or 20 × 20 cm). 2–3 seedlings per hill.",
    },
  ],
  fertilizerSchedule: [
    {
      titleMM: "အခြေခံမြေသြဇာ (စိုက်ပျိုးမီ)",
      detailMM:
        "သဘာဝမြေဩဇာ သို့မဟုတ် NPK ထည့်သွင်းပါ။",
      detailEn:
        "Basal (before planting) — Apply: organic manure or NPK.",
    },
    {
      titleMM: "ထပ်ဖြည့်မြေသြဇာ (နိုက်ထရိုဂျင် ခွဲထည့်ခြင်း)",
      detailMM:
        "ရက် ၁၅–၂၀ — ယူရီယာ (နိုက်ထရိုဂျင်)။ ရက် ၃၀–၃၅ — NPK (၁၅:၁၅:၁၅)။ ရက် ၅၀–၅၅ — ယူရီယာ (အနည်းငယ်)။",
      detailEn:
        "Top dressing — Day 15–20: Urea (nitrogen). Day 30–35: NPK (15:15:15). Day 50–55: Urea (small dose).",
    },
  ],
  fertilizerFootnoteMM:
    "👉 နိုက်ထရိုဂျင်ကို ခွဲပြီး ပေးခြင်းဖြင့် ထွက်နှုန်း မြင့်လာသည်။",
  fertilizerFootnoteEn: "👉 Split nitrogen applications = higher yield.",
  pestIntroMM: "အတွေ့ရများသော ပိုးများ -",
  pestIntroEn: "Common pests:",
  pestRows: [
    {
      icon: "beetle",
      pest: "ပိုးညို",
      pestEn: "Brown planthopper",
      treatment: "အသုံးပြုရန် — Imidacloprid 17.8%",
      treatmentEn: "Use: Imidacloprid 17.8%",
    },
    {
      icon: "hopper",
      pest: "ပိုးစိမ်း",
      pestEn: "Green leafhopper",
      treatment: "အသုံးပြုရန် — Thiamethoxam 25%",
      treatmentEn: "Use: Thiamethoxam 25%",
    },
    {
      icon: "borer",
      pest: "ကျဉ်းကောင်",
      pestEn: "Stem borer",
      treatment: "အသုံးပြုရန် — Chlorantraniliprole 18.5%",
      treatmentEn: "Use: Chlorantraniliprole 18.5%",
    },
  ],
  naturalHeadingMM: "🌿 သဘာဝနည်းလမ်း",
  naturalHeadingEn: "🌿 Natural method",
  naturalTipMM: "နီမ်ဆီကို ၇–၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
  naturalTipEn: "Neem oil spray every 7–10 days.",
  pestImportantMM:
    "⚠️ သတိပေး — ပိုးပမာဏ သတ်မှတ်ချက်ထက် ကျော်လွန်မှသာ ဖြန်းပါ။ ဓာတုပစ္စည်း အသုံးပြုမှုကို အလွန်အကျွံ မလုပ်ပါနှင့်။",
  pestImportantEn:
    "⚠️ Important — Spray only when needed (threshold-based). Avoid overuse of chemicals.",
};

/** Short-duration Yetkoese (90-day) — compact timeline, early fertilizer, tight spacing, strict water. */
export const MOCK_DETAILED_GUIDE_90_DAY_YETKOESE: DetailedGuideContent = {
  title: "(၉၀)ရက်ကိုးဆယ်ဆန်စိုက်ပျိုးနည်း",
  titleEn: "90-Day Rice (Yetkoese) Cultivation Guide",
  upvotes: 156,
  rating: 4.6,
  comments: MOCK_GUIDE_COMMENTS.map((c) => ({ ...c })),
  sectionHeadings: {
    weatherMM: "🌦️ ရာသီဥတုနှင့် မြေဆီလွှာ",
    weatherEn: "🌦️ Weather & Soil Conditions",
    timelineMM: "🌱 ကြီးထွားအဆင့်များနှင့် ရေစီမံခန့်ခွဲမှု",
    timelineEn: "🌱 Growth Stages & Water Management",
    howToMM: "🚜 လုပ်ဆောင်ရမည့် အဆင့်များ",
    howToEn: "🚜 Step-by-Step Instructions",
    fertilizerMM: "🌿 မြေသြဇာအချိန်ဇယား",
    fertilizerEn: "🌿 Fertilizer Schedule",
    pestMM: "🐛 ပိုးမွှားစီမံခန့်ခွဲမှု",
    pestEn: "🐛 Pest Management",
  },
  weatherSoil: {
    tempMM: "အပူချိန် — ၂၅–၃၅°C",
    tempEn: "Temperature: 25–35°C",
    phMM: "မြေဆီ pH — ၅.၅ – ၆.၅",
    phEn: "Soil pH: 5.5 – 6.5",
    soilTypeMM:
      "မြေအမျိုးအစား — မြူခနဲ သို့မဟုတ် ချောမွှေးမြေ",
    soilTypeEn: "Soil type: Loamy or clay loam",
  },
  growingDurationMM:
    "📅 စိုက်ပျိုးကာလ — ၈၅ – ၁၀၀ ရက် (ရက်တိုစပါးမျိုး — ရည်ရွယ်ချက်ပါ)",
  growingDurationEn:
    "📅 Growing duration: 85 – 100 days (short-duration variety)",
  timeline: [
    {
      icon: "sprout",
      days: "0-12",
      daysMM: "၀-၁၂",
      stage: "အပင်ငယ်ကာလ",
      stageEn: "0–12 days (Seedling stage)",
      tip: "",
      tipMM:
        "ရေ ၁ လက်မ ထိန်းသိမ်း၍ မွေးခန်းပြင်ဆင်ပါ။",
      tipEn:
        "Maintain 1 inch of water. Prepare nursery.",
    },
    {
      icon: "leaf",
      days: "12-25",
      daysMM: "၁၂-၂၅",
      stage: "ပြောင်းရွေ့စိုက်ပျိုးကာလ",
      stageEn: "12–25 days (Transplanting stage)",
      tip: "",
      tipMM:
        "အပင်ငယ် ၁၅–၁၈ ရက်သား ပြောင်းရွေ့စိုက်ပါ။ အကွာ ၂၀ × ၁၀ စင်တီမီတာ (သို့ ၂၀ × ၁၅)။ ရေ နိမ့်၍ ထိန်းချုပ်ပါ။",
      tipEn:
        "Transplant 15–18 day seedlings. Spacing: 20 × 10 cm (or 20 × 15 cm). Closer spacing suits short-duration rice. Keep shallow, controlled water.",
    },
    {
      icon: "wheat",
      days: "25-50",
      daysMM: "၂၅-၅၀",
      stage: "အမြန်ကြီးထွားကာလ",
      stageEn: "25–50 days (Vegetative stage)",
      tip: "",
      tipMM:
        "အမြန်ကြီးထွား ⚡ မြေသြဇာ အရင်စောပေးပါ။ ရေလှောင်မပြုဘဲ AWD လုပ်ပါ။ ရေအလွန်အကျွံမှ ထွက်နှုန်း ကျနိုင်သည်။",
      tipEn:
        "Rapid growth ⚡ Apply fertilizer early. Use alternate wetting & drying. Too much standing water lowers yield in short-duration rice.",
    },
    {
      icon: "wheat",
      days: "50-70",
      daysMM: "၅၀-၇၀",
      stage: "ပန်းပွင့်ကာလ",
      stageEn: "50–70 days (Flowering stage)",
      tip: "",
      tipMM:
        "အလွန်အရေးကြီးသော အဆင့် ⚠️ ရက်တိုမျိုးတွင် ပန်းပွင့်ချိန် စောသည်။ ရေဓာတ်ညီညွတ်စေရန် ထိန်းသိမ်းပါ။",
      tipEn:
        "Very critical ⚠️ Flowering comes earlier in short-duration rice. Maintain consistent moisture.",
    },
    {
      icon: "wheat",
      days: "70-85",
      daysMM: "၇၀-၈၅",
      stage: "ဆန် ဖြည့်သည့်ကာလ",
      stageEn: "70–85 days (Grain filling)",
      tip: "",
      tipMM: "ရေကို တဖြည်းဖြည်း လျှော့ချပါ။",
      tipEn: "Reduce water gradually.",
    },
    {
      icon: "tractor",
      days: "85-100",
      daysMM: "၈၅-၁၀၀",
      stage: "ရိတ်သိမ်းကာလ",
      stageEn: "85–100 days (Harvesting)",
      tip: "",
      tipMM:
        "လယ်ကို လုံးဝ ရေခန်းအောင် လုပ်ပါ။ ဆန်စေ့ ပြုပြည်စုံမှု ရရှိပြီး ရွှေညိုဖြစ်မှ ရိတ်သိမ်းပါ။",
      tipEn:
        "Drain field completely. Harvest when grains are mature (golden).",
    },
  ],
  howToSteps: [
    {
      step: "၁",
      stepEn: "1",
      title: "မြေပြင်ဆင်ခြင်း",
      titleEn: "Land preparation",
      desc:
        "နက်ရှိုင်းစွာ ထွန်ယက် (၂–၃ ကြိမ်)။ လယ်ကို ကောင်းစွာ ညီညာအောင် ပြုလုပ်ပါ။",
      descEn:
        "Plow 2–3 times. Level properly.",
    },
    {
      step: "၂",
      stepEn: "2",
      title: "မျိုးစေ့ရွေးချယ်ခြင်း",
      titleEn: "Seed selection",
      desc:
        "အရည်အသွေးကောင်းသော မျိုးစေ့ သုံးပါ။ ဆားရည်ဖြင့် စမ်းသပ်ပါ။",
      descEn:
        "Use good quality seeds. Salt water test.",
    },
    {
      step: "၃",
      stepEn: "3",
      title: "မွေးခန်းပြင်ဆင်ခြင်း",
      titleEn: "Nursery preparation",
      desc:
        "အပင်ငယ် ၁၅–၁၈ ရက် ကြီးထွားအောင် မွေးခန်းတွင် စိုက်ပါ။",
      descEn:
        "Grow seedlings for 15–18 days.",
    },
    {
      step: "၄",
      stepEn: "4",
      title: "ပြောင်းရွေ့စိုက်ပျိုးခြင်း",
      titleEn: "Transplanting",
      desc:
        "အကွာ ၂၀ × ၁၀ စင်တီမီတာ။ တောင်တစ်ခုလျှင် အပင်ငယ် ၂–၃ ပင်။",
      descEn:
        "Spacing: 20 × 10 cm. 2–3 seedlings per hill.",
    },
  ],
  fertilizerSchedule: [
    {
      titleMM: "အခြေခံမြေသြဇာ (စိုက်ပျိုးမီ)",
      detailMM:
        "NPK သို့မဟုတ် သဘာဝမြေဩဇာ ထည့်သွင်းပါ။",
      detailEn:
        "Basal (before planting) — Apply: NPK or organic manure.",
    },
    {
      titleMM: "ထပ်ဖြည့်မြေသြဇာ (အရေးကြီး ⚠️ ရက်တိုစိုက်ပျိုးမှု)",
      detailMM:
        "ရက် ၁၀–၁၅ — ယူရီယာ (နိုက်ထရိုဂျင်)။ ရက် ၂၅–၃၀ — NPK (၁၅:၁၅:၁၅)။ ရက် ၄၀–၄၅ — နိုက်ထရိုဂျင် အနည်းငယ်။",
      detailEn:
        "Top dressing (IMPORTANT ⚠️ fast crop) — Day 10–15: Urea (nitrogen). Day 25–30: NPK (15:15:15). Day 40–45: Small nitrogen dose.",
    },
  ],
  fertilizerFootnoteMM:
    "👉 စောစောမြေသြဇာ ပေးခြင်းဖြင့် ထွက်နှုန်း ကောင်းမွန်စေသည်။",
  fertilizerFootnoteEn: "👉 Early feeding = better yield.",
  pestIntroMM: "အတွေ့ရများသော ပိုးများ -",
  pestIntroEn: "Common pests:",
  pestRows: [
    {
      icon: "beetle",
      pest: "ပိုးညို",
      pestEn: "Brown planthopper",
      treatment: "အသုံးပြုရန် — Imidacloprid 17.8%",
      treatmentEn: "Use: Imidacloprid 17.8%",
    },
    {
      icon: "hopper",
      pest: "ပိုးစိမ်း",
      pestEn: "Green leafhopper",
      treatment: "အသုံးပြုရန် — Thiamethoxam 25%",
      treatmentEn: "Use: Thiamethoxam 25%",
    },
    {
      icon: "borer",
      pest: "ကျဉ်းကောင်",
      pestEn: "Stem borer",
      treatment: "အသုံးပြုရန် — Chlorantraniliprole 18.5%",
      treatmentEn: "Use: Chlorantraniliprole 18.5%",
    },
  ],
  naturalHeadingMM: "🌿 သဘာဝနည်းလမ်း",
  naturalHeadingEn: "🌿 Natural method",
  naturalTipMM: "နီမ်ဆီကို ၇–၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
  naturalTipEn: "Neem oil spray every 7–10 days.",
  pestImportantMM:
    "⚠️ သတိပေး — ရက်တိုစိုက်ပျိုးမှုတွင် ပိုးအန္တရာယ် အမြန်တက်နိုင်သည်၊ စနစ်တကျ စောင့်ကြည့်ပါ။ ဓာတ်ဆေးကို အလွန်အကျွံ မဖြန်းပါနှင့်။",
  pestImportantEn:
    "⚠️ Important — Monitor regularly (fast crop = fast pest damage). Avoid excessive spraying.",
};

/** Medium-duration Sinthukha — longer cycle than 90-day; later flowering; AWD; split N. */
export const MOCK_DETAILED_GUIDE_SINTHUKHA: DetailedGuideContent = {
  title: "စင်သုခဆန်စိုက်ပျိုးနည်း",
  titleEn: "Sinthukha Rice Cultivation Guide",
  upvotes: 74,
  rating: 4.9,
  comments: MOCK_GUIDE_COMMENTS.map((c) => ({ ...c })),
  sectionHeadings: {
    weatherMM: "🌦️ ရာသီဥတုနှင့် မြေဆီလွှာ",
    weatherEn: "🌦️ Weather & Soil Conditions",
    timelineMM: "🌱 ကြီးထွားအဆင့်များနှင့် ရေစီမံခန့်ခွဲမှု",
    timelineEn: "🌱 Growth Stages & Water Management",
    howToMM: "🚜 လုပ်ဆောင်ရမည့် အဆင့်များ",
    howToEn: "🚜 Step-by-Step Instructions",
    fertilizerMM: "🌿 မြေသြဇာအချိန်ဇယား",
    fertilizerEn: "🌿 Fertilizer Schedule",
    pestMM: "🐛 ပိုးမွှားစီမံခန့်ခွဲမှု",
    pestEn: "🐛 Pest Management",
  },
  weatherSoil: {
    tempMM: "အပူချိန် — ၂၅–၃၅°C",
    tempEn: "Temperature: 25–35°C",
    phMM: "မြေဆီ pH — ၅.၅ – ၆.၅",
    phEn: "Soil pH: 5.5 – 6.5",
    soilTypeMM:
      "မြေအမျိုးအစား — ရွှံ့ချောမွှေး / မြူခနဲမြေ",
    soilTypeEn: "Soil type: Clay loam / loamy soil",
  },
  growingDurationMM:
    "📅 စိုက်ပျိုးကာလ — ၁၁၅ – ၁၃၀ ရက် (ရက်လတ်စပါး၊ (၉၀)ရက်ကိုးဆယ်ထက် ကြာသည်)",
  growingDurationEn:
    "📅 Growing duration: 115 – 130 days (medium-duration variety; not short like 90-day rice)",
  timeline: [
    {
      icon: "sprout",
      days: "0-15",
      daysMM: "၀-၁၅",
      stage: "အပင်ငယ်ကာလ",
      stageEn: "0–15 days (Seedling stage)",
      tip: "",
      tipMM:
        "ရေ ၁–၂ လက်မ ထိန်းသိမ်း၍ မွေးခန်းပြင်ဆင်ပါ။",
      tipEn:
        "Maintain 1–2 inches of water. Prepare nursery.",
    },
    {
      icon: "leaf",
      days: "15-30",
      daysMM: "၁၅-၃၀",
      stage: "ပြောင်းရွေ့စိုက်ပျိုးကာလ",
      stageEn: "15–30 days (Transplanting stage)",
      tip: "",
      tipMM:
        "အပင်ငယ် ၁၈–၂၂ ရက်သား ပြောင်းရွေ့စိုက်ပါ။ အကွာ ၂၀ × ၁၅ စင်တီမီတာ (သို့ ၂၀ × ၂၀)။ ရေ နိမ့်နိမ့် သာ ထားပါ။",
      tipEn:
        "Transplant 18–22 day seedlings. Spacing: 20 × 15 cm (or 20 × 20 cm). Keep shallow water.",
    },
    {
      icon: "wheat",
      days: "30-65",
      daysMM: "၃၀-၆၅",
      stage: "တက်ကြွ ကြီးထွားကာလ",
      stageEn: "30–65 days (Vegetative stage)",
      tip: "",
      tipMM:
        "တက်ကြွစွာ ကြီးထွားမှု 🌱 မြေသြဇာပေးပါ။ ရေလှောင်ခြင်းမပြုပဲ ရေတိုးရေလျှော့ (AWD) လုပ်ပါ။",
      tipEn:
        "Active growth 🌱 Apply fertilizers. Use alternate wetting & drying. Avoid continuous flooding.",
    },
    {
      icon: "wheat",
      days: "65-90",
      daysMM: "၆၅-၉၀",
      stage: "ပန်းပွင့်ကာလ",
      stageEn: "65–90 days (Flowering stage)",
      tip: "",
      tipMM:
        "အရေးကြီးဆုံးအဆင့် ⚠️ ရက်ကြာမျိုးဖြစ်သောကြောင့် ပန်းပွင့်ကာလ နောက်ကျပါသည်။ ရေဓာတ်ညီညွတ်စေရန် ထိန်းသိမ်းပါ။",
      tipEn:
        "Critical stage ⚠️ Flowering is later than short-duration rice. Maintain consistent moisture.",
    },
    {
      icon: "wheat",
      days: "90-110",
      daysMM: "၉၀-၁၁၀",
      stage: "ဆန် ဖြည့်သည့်ကာလ",
      stageEn: "90–110 days (Grain filling)",
      tip: "",
      tipMM: "ရေကို တဖြည်းဖြည်း လျှော့ချပါ။",
      tipEn: "Gradually reduce water.",
    },
    {
      icon: "tractor",
      days: "110-130",
      daysMM: "၁၁၀-၁၃၀",
      stage: "ရိတ်သိမ်းကာလ",
      stageEn: "110–130 days (Harvesting)",
      tip: "",
      tipMM:
        "လယ်ကို ရေခန်းအောင် လုပ်ပါ။ ဆန်စေ့ ရွှေညိုဖြစ်မှ ရိတ်သိမ်းပါ။",
      tipEn:
        "Drain field. Harvest when grains are golden.",
    },
  ],
  howToSteps: [
    {
      step: "၁",
      stepEn: "1",
      title: "မြေပြင်ဆင်ခြင်း",
      titleEn: "Land preparation",
      desc:
        "နက်ရှိုင်းစွာ ထွန်ယက် (၂–၃ ကြိမ်)။ လယ်ကို ညီညာအောင် ပြုလုပ်ပါ။",
      descEn:
        "Plow 2–3 times. Level field.",
    },
    {
      step: "၂",
      stepEn: "2",
      title: "မျိုးစေ့ရွေးချယ်ခြင်း",
      titleEn: "Seed selection",
      desc:
        "ကျန်းမာသော မျိုးစေ့သာ သုံးပါ။ ဆားရည်ဖြင့် စမ်းသပ်ပါ။",
      descEn:
        "Healthy seeds only. Salt water test.",
    },
    {
      step: "၃",
      stepEn: "3",
      title: "မွေးခန်းပြင်ဆင်ခြင်း",
      titleEn: "Nursery preparation",
      desc:
        "အပင်ငယ် ၁၈–၂၂ ရက် ကြီးထွားအောင် မွေးခန်းတွင် စိုက်ပါ။",
      descEn:
        "Grow seedlings for 18–22 days.",
    },
    {
      step: "၄",
      stepEn: "4",
      title: "ပြောင်းရွေ့စိုက်ပျိုးခြင်း",
      titleEn: "Transplanting",
      desc:
        "အကွာ ၂၀ × ၁၅ စင်တီမီတာ (သို့ ၂၀ × ၂၀)။ တောင်တစ်ခုလျှင် အပင်ငယ် ၂–၃ ပင်။",
      descEn:
        "Spacing: 20 × 15 cm (or 20 × 20 cm). 2–3 seedlings per hill.",
    },
  ],
  fertilizerSchedule: [
    {
      titleMM: "အခြေခံမြေသြဇာ (စိုက်ပျိုးမီ)",
      detailMM:
        "သဘာဝမြေဩဇာ သို့မဟုတ် NPK ထည့်သွင်းပါ။",
      detailEn:
        "Basal (before planting) — Apply: organic manure or NPK.",
    },
    {
      titleMM: "ထပ်ဖြည့်မြေသြဇာ (နိုက်ထရိုဂျင် ခွဲထည့်ခြင်း)",
      detailMM:
        "ရက် ၂၀–၂၅ — ယူရီယာ (နိုက်ထရိုဂျင်)။ ရက် ၄၀–၄၅ — NPK (၁၅:၁၅:၁၅)။ ရက် ၆၀–၆၅ — နိုက်ထရိုဂျင် အနည်းငယ်။ ရက်တိုမျိုးထက် စေ့စေ့နှေးသော အချိန်။",
      detailEn:
        "Top dressing — Day 20–25: Urea (nitrogen). Day 40–45: NPK (15:15:15). Day 60–65: Small nitrogen dose. Slightly later than short-duration rice.",
    },
  ],
  fertilizerFootnoteMM:
    "👉 မြေသြဇာ သင့်တင့်မျှတစွာ ခွဲပေးခြင်းဖြင့် ထွက်နှုန်း မြင့်လာသည်။",
  fertilizerFootnoteEn: "👉 Balanced feeding (split nitrogen) = higher yield.",
  pestIntroMM: "အတွေ့ရများသော ပိုးများ -",
  pestIntroEn: "Common pests:",
  pestRows: [
    {
      icon: "beetle",
      pest: "ပိုးညို",
      pestEn: "Brown planthopper",
      treatment: "အသုံးပြုရန် — Imidacloprid 17.8%",
      treatmentEn: "Use: Imidacloprid 17.8%",
    },
    {
      icon: "hopper",
      pest: "ပိုးစိမ်း",
      pestEn: "Green leafhopper",
      treatment: "အသုံးပြုရန် — Thiamethoxam 25%",
      treatmentEn: "Use: Thiamethoxam 25%",
    },
    {
      icon: "borer",
      pest: "ကျဉ်းကောင်",
      pestEn: "Stem borer",
      treatment: "အသုံးပြုရန် — Chlorantraniliprole 18.5%",
      treatmentEn: "Use: Chlorantraniliprole 18.5%",
    },
  ],
  naturalHeadingMM: "🌿 သဘာဝနည်းလမ်း",
  naturalHeadingEn: "🌿 Natural method",
  naturalTipMM: "နီမ်ဆီကို ၇–၁၀ ရက်တစ်ကြိမ် ဖြန်းပါ။",
  naturalTipEn: "Neem oil spray every 7–10 days.",
  pestImportantMM:
    "⚠️ သတိပေး — ပိုးများကို ပုံမှန်စောင့်ကြည့်ပါ။ ဓာတ်ဆေးကို အလွန်အကျွံ မသုံးပါနှင့်။",
  pestImportantEn:
    "⚠️ Important — Monitor pests regularly. Avoid excessive pesticide use.",
};

export const MOCK_DETAILED_GUIDE: DetailedGuideContent = {
  title: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
  titleEn: "Shwebo Pawsan cultivation method",
  upvotes: 120,
  rating: 4.8,
  comments: MOCK_GUIDE_COMMENTS.map((c) => ({ ...c })),
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

export function getDetailedGuideForPaddyType(
  paddyType: string
): DetailedGuideContent {
  const base =
    paddyType === "shwebo-pawsan"
      ? MOCK_DETAILED_GUIDE_SHWEBO_PAWSAN
      : paddyType === "manaw-thukha"
        ? MOCK_DETAILED_GUIDE_MANAW_THUKHA
        : paddyType === "90-day"
          ? MOCK_DETAILED_GUIDE_90_DAY_YETKOESE
          : paddyType === "sinthukha"
            ? MOCK_DETAILED_GUIDE_SINTHUKHA
            : MOCK_DETAILED_GUIDE;
  const titles = GUIDE_CANONICAL_TITLES[paddyType];
  const card = MOCK_GUIDES.find((g) => g.paddyType === paddyType);
  return {
    ...base,
    title: titles?.mm ?? card?.title ?? base.title,
    titleEn: titles?.en ?? card?.titleEn ?? base.titleEn,
    upvotes: card?.upvotes ?? base.upvotes,
    rating: card?.rating ?? base.rating,
  };
}

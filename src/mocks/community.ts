import type { KnowledgeArticle } from "./types";

export const KNOWLEDGE_CATEGORY_LABELS: Record<
  KnowledgeArticle["category"],
  { mm: string; en: string }
> = {
  planting: { mm: "စိုက်ပျိုးရေး", en: "Planting" },
  fertilizer: { mm: "မြေသြဇာ", en: "Fertilizer" },
  pest: { mm: "ပိုးမွှား", en: "Pests" },
  soil: { mm: "မြေဆီလွှာ", en: "Soil" },
  weather: { mm: "ရာသီဥတု", en: "Weather" },
  general: { mm: "အထွေထွေ", en: "General" },
};

export const MOCK_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "m1",
    category: "fertilizer",
    titleMM: "မနော်သုခအတွက် ယူရီယာ လုပ်ငန်းစဉ်",
    titleEn: "Urea schedule for Manaw Thukha",
    summaryMM:
      "မနော်သုခမျိုးအတွက် စာရင်းအင်းနှင့် အချိန်ကိုက်မြေသြဇာထည့်ခြင်း",
    summaryEn:
      "Apply Urea fertilizer in three timed applications for Manaw Thukha.",
    bodyMM:
      "မနော်သုခမျိုး အတွက် ယူရီးယား မြေသြဇာကို စိုက်ပြီးနောက် စပေါင်းကာလအလိုက် အကြိမ်ပေါင်း ၃ ကြိမ် ထည့်ပေးရန် လိုအပ်ပါသည်။ ပထမအကြိမ် စိုက်ပြီးနောက် ၁၀–၁၄ ရက်အကြာတွင် ဆီး၏ ၃ ပုံ ၁ ပုံ၊ ဒုတိယ ၂၅–၃၀ ရက်တွင် ဆီး၏ ၂ ပုံ ၁ ပုံ၊ တတိယ ပြုတ်ချိန်အနီးတွင် ကျန်ဆီး ထည့်ပေးပါ။ မြေနှင့် ရေအခြေအနေအရ တိုးချဲ့ သို့ လျှော့ချနိုင်ပါသည်။",
    bodyEn:
      "For Manaw Thukha, split Urea into three main applications after transplanting: roughly one-third at tillering (10–14 days after planting), one-third at panicle initiation (25–30 days), and the remainder near heading—adjust for field moisture and soil tests.",
    attributionMM: "နိဒါန်း ဝန်ဆောင်မှု · Pyoe Com",
    attributionEn: "Extension desk · Pyoe Com",
    publishedAt: "မတ် ၂၈ / Mar 28",
  },
  {
    id: "m2",
    category: "pest",
    titleMM: "အညိုရောင် စားပိုးမွှားများ စီမံခြင်း",
    titleEn: "Managing brown planthoppers",
    summaryMM:
      "Buprofezin 25% SC နှင့်ဖျန်းမှု၊ စောင့်ကြည့်ရမည့် အချက်များ",
    summaryEn:
      "Spray rates for Buprofezin 25% SC and monitoring tips.",
    bodyMM:
      "အညိုရောင် ပေါက်စားပိုးများကို စောစောဖော်ထုတ်ပါ။ Buprofezin 25% SC ကို ရေ ၂၀ လီတာလျှင် ၄၀ ml နှုန်းဖြင့် ဖျန်းပေးပါ။ ဖျန်းပြီးနောက် နှစ်ရက်မှ သုံးရက် စိစစ်ပါ။ တစ်ခုတည်းသော ကုန်အမျိုးအစားကို မကြာခဏမပြောင်းပါနှင့် (ပြဋ္ဌာန်းချက်အရ)။ သစ်ရွက်ဖျဉ်ရောင်ပြောင်းခြင်း သို့မဟုတ် မီးခိုးခိုးပုံ ပေါ်လာပါက ဆက်လက်ဆောင်ရွက်ပါ။",
    bodyEn:
      "Scout fields early for brown planthoppers. Apply Buprofezin 25% SC at about 40 ml per 20 liters of water; reassess after 2–3 days. Rotate modes of action responsibly per local guidance. Watch for hopperburn (drying patches) and act quickly.",
    attributionMM: "နိဒါန်း ဝန်ဆောင်မှု · Pyoe Com",
    attributionEn: "Extension desk · Pyoe Com",
    publishedAt: "မတ် ၂၇ / Mar 27",
  },
  {
    id: "m3",
    category: "soil",
    titleMM: "ရွှေဘိုပေါ်ဆန်အတွက် မြေဆီလွှာ pH",
    titleEn: "Soil pH for Shwebo Pawsan",
    summaryMM: "pH ၅.၅ မှ ၆.၅ ထိ ထိန်းချုပ်ခြင်းနှင့် စောင့်ကြည့်မှု",
    summaryEn: "Keep pH between 5.5 and 6.5 and test regularly.",
    bodyMM:
      "ရွှေဘိုပေါ်ဆန် အတွက် မြေဆီလွှာ pH ကို ၅.၅ မှ ၆.၅ အကြား ထားပေးပါ။ စိုက်မီးအနည်းဆုံး တစ်နှစ်တစ်ကြိမ် သို့မဟုတ် တစ်နှစ်လျှင်နှစ်ကြိမ် မြေဆီလွှာစမ်းသပ်ပါ။ သုဿမ်ပမာဏမမျှခြင်း၊ တည်နေရာရေးရာ ရေထုတ်မည့်အချိန်တို့ကို မှတ်သားပါ။",
    bodyEn:
      "Maintain soil pH roughly 5.5–6.5 for Shwebo Pawsan. Test soil at least once per season (twice is better): this guides lime or organic matter corrections and helps avoid nutrient lock-up.",
    attributionMM: "နိဒါန်း ဝန်ဆောင်မှု · Pyoe Com",
    attributionEn: "Extension desk · Pyoe Com",
    publishedAt: "မတ် ၂၆ / Mar 26",
  },
  {
    id: "m4",
    category: "weather",
    titleMM: "မိုးကြီးချိန်တွင် မြေသြဇာမထည့်သင့်သည့်အကြောင်း",
    titleEn: "Avoid fertilizing in heavy rain",
    summaryMM: "ရေစီးကျမှုကြောင့် ပိုဆုံးမည့်အချိန်များ",
    summaryEn: "Why nutrients wash away and what to do instead.",
    bodyMM:
      "မိုးကြီးတဲ့အချိန် မြေသြဇာမထည့်သင့်ပါ။ မြေသြဇာ ရေနဲ့စီးသွားနိုင်ပြီး ထိရောက်မှု နည်းပါးသွားမည်။ မိုးလုံးဝပြေသွားပြီး ကြားရေထဲ နှစ်သက်မည့်အချိန်တွင် သို့မဟုတ် မြေခြေအေး၍ မိုးမှုန်မရှိသောနေ့တွင် ထည့်ပါ။",
    bodyEn:
      "Heavy rain leaches surface-applied fertilizer and lowers efficiency. Wait until runoff subsides and the field can hold nutrients—often a half-day to a day after the storm, depending on drainage.",
    attributionMM: "နိဒါန်း ဝန်ဆောင်မှု · Pyoe Com",
    attributionEn: "Extension desk · Pyoe Com",
    publishedAt: "မတ် ၂၅ / Mar 25",
  },
  {
    id: "m5",
    category: "planting",
    titleMM: "ပြန်လည်စိုက်ပျိုးသည့်အခါ မျိုးရွေးချယ်မှု",
    titleEn: "Variety choice for replanting",
    summaryMM:
      "ရာသီဥတုခံ မြှုပ်နှံရွေးချယ်ခြင်းနှင့် စိုက်ပျိုးချိန်",
    summaryEn: "Climate-resilient choices and timing after loss.",
    bodyMM:
      "မိုးခေါင် သို့မဟုတ် ပေါက်ပျက်ကျမှုအတွက် ပြန်စိုက်မည်ဆိုပါက ရာသီဥတုခံနိုင်သည့်မျိုးများ (ဥပမာ—ရွှေဘိုပေါ်ဆန်၊ မနော်သုခ) ကိုဦးစားပေးပါ။ စိုက်ပျိုးမည့်နေ့ကို ရေကောင်းစာနှုန်းနှင့် ပိုးစူမည့် အန္တရာယ်အရ ပြောင်းလဲနိုင်ပါသည်။ အနီးအနားစိုက်ပျိုးရေးရုံးနှင့် တိုင်ပင်ပါ။",
    bodyEn:
      "After field loss, favor climate-resilient varieties suited to your agro-ecology (for dry spells, local favorites like Shwebo Pawsan or Manaw Thukha are common examples). Align planting date with water availability and pest calendars; confirm with your extension post.",
    attributionMM: "နိဒါန်း ဝန်ဆောင်မှု · Pyoe Com",
    attributionEn: "Extension desk · Pyoe Com",
    publishedAt: "မတ် ၂၄ / Mar 24",
  },
  {
    id: "m6",
    category: "general",
    titleMM: "အသိပညာ အပ်ဒိတ်များ ဘယ်လိုရယူမလဲ",
    titleEn: "How knowledge updates reach you",
    summaryMM:
      "ဤအပိုင်းတွင် အက်မင်များမှ စိုက်ပျိုးရေးသတင်းအချက်အလက်များ မျှဝေပါသည်",
    summaryEn:
      "This section shares planting information curated by admins.",
    bodyMM:
      "ဤ 'သုတမျှဝေရေး' အပိုင်းတွင် စိုက်ပျိုးရေးအတွက် လိုအပ်သည့်အချက်အလက်များကို Pyoe Com အက်မင် တာဝန်များက တင်ပြပါသည်။ လမ်းညွှန်ကတ်များနှင့် ယှဉ်လေ့လုံး၍ စိုက်ပျိုးရေးဆုံးဖြတ်ချက်များချပါ။ သင်ကြားရေးပို့စ်အသစ်များ ထပ်မံထည့်သွင်းပါက ဤစာရင်းအပေါ်တွင် ပေါ်လာပါလိမ့်မည်။",
    bodyEn:
      "The Knowledge tab is curated by Pyoe Com admins for reliable planting and farm management notes. Use it together with the Guide cards; new posts appear at the top when admins publish them.",
    attributionMM: "Pyoe Com အက်မင်",
    attributionEn: "Pyoe Com admin",
    publishedAt: "မတ် ၂၃ / Mar 23",
  },
];

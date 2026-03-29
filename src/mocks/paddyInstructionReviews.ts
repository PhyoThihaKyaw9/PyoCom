/**
 * Mock farmer feedback tied to လမ်းညွှန် instruction cards (frontend demo).
 * In a real app these would come from an API when users tap ကြိုက်နှစ်သက်သည် / leave comments.
 */
export type PaddyInstructionReview = {
  id: string;
  submittedAtMM: string;
  submittedAtEn: string;
  farmerName: string;
  /** Masked phone e.g. 09••••1234 */
  phoneMasked: string;
  paddyType: string;
  guideTitleMM: string;
  guideTitleEn: string;
  /** User tapped positive feedback (လမ်းညွှန် card). */
  liked: boolean;
  commentMM?: string;
  commentEn?: string;
};

export const MOCK_PADDY_INSTRUCTION_REVIEWS: PaddyInstructionReview[] = [
  {
    id: "rev-1",
    submittedAtMM: "မတ် ၂၈၊ ၂၀၂၆ · နံနက် ၁၀:၄၂",
    submittedAtEn: "Mar 28, 2026 · 10:42 AM",
    farmerName: "ဦးတင်မောင်",
    phoneMasked: "09••••7891",
    paddyType: "shwebo-pawsan",
    guideTitleMM: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
    guideTitleEn: "Shwebo Pawsan cultivation method",
    liked: true,
    commentMM: "အကြံပြုချက်က သိသာပါတယ်။ ကျွန်တော် ကျိန်းသေစာရင်းယူပြီးပါပြီ။",
    commentEn: "Clear advice — I’ve adjusted my fertilizer timing.",
  },
  {
    id: "rev-2",
    submittedAtMM: "မတ် ၂၇၊ ၂၀၂၆ · ညနေ ၄:၁၅",
    submittedAtEn: "Mar 27, 2026 · 4:15 PM",
    farmerName: "ဒေါ်အေးအေးမြင့်",
    phoneMasked: "09••••2044",
    paddyType: "manaw-thukha",
    guideTitleMM: "မနောသုခစိုက်ပျိုးနည်း",
    guideTitleEn: "Manaw Thukha cultivation method",
    liked: true,
    commentMM: "ကြိုက်နှစ်သက်ပါတယ်၊ နောက်နှစ်လည်း အသုံးချမယ်။",
    commentEn: "Very helpful — will use again next season.",
  },
  {
    id: "rev-3",
    submittedAtMM: "မတ် ၂၆၊ ၂၀၂၆ · နံနက် ၇:၃၀",
    submittedAtEn: "Mar 26, 2026 · 7:30 AM",
    farmerName: "ဦးမြင့်ဆန်း",
    phoneMasked: "09••••5512",
    paddyType: "90-day",
    guideTitleMM: "(၉၀)ရက်ကိုးဆယ်ဆန်စိုက်ပျိုးနည်း",
    guideTitleEn: "90-day (Yetkoese) cultivation method",
    liked: true,
    commentMM: "ရေထိန်းချုပ်မှု အပိုင်းကို ရှင်းလင်းသည်။",
    commentEn: "Water section is especially clear.",
  },
  {
    id: "rev-4",
    submittedAtMM: "မတ် ၂၅၊ ၂၀၂၆ · မနက် ၉:၀၅",
    submittedAtEn: "Mar 25, 2026 · 9:05 AM",
    farmerName: "ဦးကျော်ဇင်",
    phoneMasked: "09••••9930",
    paddyType: "sinthukha",
    guideTitleMM: "စင်သုခဆန်စိုက်ပျိုးနည်း",
    guideTitleEn: "Sinthukha cultivation method",
    liked: true,
  },
  {
    id: "rev-5",
    submittedAtMM: "မတ် ၂၄၊ ၂၀၂၆ · ည ၈:၂၂",
    submittedAtEn: "Mar 24, 2026 · 8:22 PM",
    farmerName: "ဒေါ်ခင်သင်း",
    phoneMasked: "09••••1188",
    paddyType: "all",
    guideTitleMM: "ရာသီဥတုခံနိုင်ရည် မြင့်သောမျိုးများစိုက်ပျိုးနည်း",
    guideTitleEn: "Climate-resilient varieties cultivation method",
    liked: true,
    commentMM: "မိုးခေါင်အတွက် ရွေးချယ်စရာ အကြံပြုချက်များက ကောင်းပါတယ်။",
    commentEn: "Good variety suggestions for dry spells.",
  },
  {
    id: "rev-6",
    submittedAtMM: "မတ် ၂၄၊ ၂၀၂၆ · နေ့လည် ၁:၄၀",
    submittedAtEn: "Mar 24, 2026 · 1:40 PM",
    farmerName: "ဦးဝင်းဆိုင်",
    phoneMasked: "09••••4420",
    paddyType: "shwebo-pawsan",
    guideTitleMM: "ရွှေဘိုပေါ်ဆန်းစိုက်ပျိုးနည်း",
    guideTitleEn: "Shwebo Pawsan cultivation method",
    liked: true,
    commentMM: "ကြိုက်နှစ်သက်သည် ခလုတ်နှိပ်ပြီး မှတ်သားထားပါတယ်။",
    commentEn: "Pressed like and saved the card.",
  },
];

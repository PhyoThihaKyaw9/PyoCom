import type { PestScanResult } from "./types";

/** Simulated classifier output until a real model/API is wired. */
export const MOCK_PEST_SCAN_RESULT: PestScanResult = {
  name: "Brown Planthopper",
  nameMM: "ပိုးညို (သွားကောင်)",
  confidence: 87,
  treatment: [
    "Apply Imidacloprid 17.8% SL",
    "Spray in the evening (4-6 PM)",
    "Repeat after 7 days if needed",
  ],
  treatmentMM: [
    "Imidacloprid 17.8% SL ဖြန်းပါ",
    "ညနေ ၄-၆ နာရီတွင် ဖြန်းပါ",
    "လိုအပ်ရင် ၇ ရက်အကြာ ထပ်ဖြန်းပါ",
  ],
};

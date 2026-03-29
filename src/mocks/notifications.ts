import { AlertTriangle, BookOpen, Cloud, MessageCircle } from "lucide-react";
import type { ActiveAlertItem } from "./types";

export const MOCK_ACTIVE_ALERTS: ActiveAlertItem[] = [
  {
    tone: "warning",
    titleMM: "မိုးသည်းထန်စွာ ရွာသွန်းမှု သတိပေးချက်",
    titleEn: "Heavy Rain Warning",
    detailMM: "ယနေ့ညနေ ၃:၀၀ နာရီ မှ ၆:၀၀ နာရီ",
    detailEn: "Today 3:00 PM - 6:00 PM",
  },
  {
    tone: "success",
    titleMM: "မြေသြဇာထည့်သွင်းရန် အကြံပြုချက်",
    titleEn: "Fertilizer Application Reminder",
    detailMM: "မနက်ဖြန်",
    detailEn: "Tomorrow",
  },
];

export const MOCK_NOTIFICATION_TYPE_DEFS = [
  {
    id: "weatherAlerts" as const,
    icon: Cloud,
    title: "မိုးလေဝသ သတိပေးချက်",
    titleEn: "Weather Alerts",
    description:
      "မိုးသည်းထန်စွာရွာသွန်းမှု၊ မုန်တိုင်းသတိပေးချက်များ",
    descriptionEn: "Heavy rain, storm warnings, and weather updates",
  },
  {
    id: "instructionUpdates" as const,
    icon: BookOpen,
    title: "လမ်းညွှန်ချက် အပ်ဒိတ်များ",
    titleEn: "Instruction Updates",
    description: "စပါးစိုက်ပျိုးမှု လမ်းညွှန်ချက် အသစ်များ",
    descriptionEn: "New paddy cultivation guidelines and updates",
  },
  {
    id: "climateAlerts" as const,
    icon: AlertTriangle,
    title: "ရာသီဥတု သတိပေးချက်",
    titleEn: "Climate Alerts",
    description:
      "ရာသီဥတု ပြောင်းလဲမှု၊ ခြောက်သွေ့မှု သတိပေးချက်များ",
    descriptionEn: "Climate change impacts and drought warnings",
  },
  {
    id: "communityMentions" as const,
    icon: MessageCircle,
    title: "လူမှုကွန်ရက် အကြောင်းကြားချက်",
    titleEn: "Community Mentions",
    description: "သင့်အား အမည်ညွှန်းဆိုမှု၊ ပြန်စာများ",
    descriptionEn: "Mentions, replies, and community interactions",
  },
];

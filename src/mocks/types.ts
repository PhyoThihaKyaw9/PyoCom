export interface ForecastDay {
  day: string;
  dayEn: string;
  temp: string;
  icon: string;
}

export interface LocationSummary {
  nameMM: string;
  subtitleEn: string;
}

export interface WeatherAlertBanner {
  titleMM: string;
  titleEn: string;
}

export interface GrowingSeasonSummary {
  dayLabelMM: string;
  dayLabelEn: string;
}

export interface PaddyTypeOption {
  value: string;
  label: string;
}

export interface GuideCard {
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

export interface GuideComment {
  id: number;
  author: string;
  content: string;
  contentEn: string;
  verified: boolean;
  timePosted: string;
}

export interface GrowingTimelineStage {
  icon: string;
  days: string;
  daysMM: string;
  stage: string;
  stageEn: string;
  tip: string;
  /** When set (with tipEn), DetailedGuide shows Myanmar and English on separate lines. */
  tipMM?: string;
  tipEn?: string;
}

export interface HowToStep {
  step: string;
  stepEn: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

export interface FertilizerMilestone {
  titleMM: string;
  detailMM: string;
  detailEn: string;
}

export interface PestTreatmentRow {
  icon: string;
  pest: string;
  pestEn: string;
  treatment: string;
  treatmentEn: string;
}

/** Optional weather/soil body; when set, DetailedGuide uses this instead of defaults. */
export interface WeatherSoilContent {
  tempMM: string;
  tempEn: string;
  phMM: string;
  phEn: string;
  soilTypeMM?: string;
  soilTypeEn?: string;
}

/** Optional H2 + subtitle; use for variety-specific labels (e.g. emoji + EN subtitle). */
export interface GuideSectionHeadings {
  weatherMM?: string;
  weatherEn?: string;
  timelineMM?: string;
  timelineEn?: string;
  howToMM?: string;
  howToEn?: string;
  fertilizerMM?: string;
  fertilizerEn?: string;
  pestMM?: string;
  pestEn?: string;
}

export interface DetailedGuideContent {
  title: string;
  titleEn: string;
  upvotes: number;
  rating: number;
  comments: GuideComment[];
  timeline: GrowingTimelineStage[];
  howToSteps: HowToStep[];
  fertilizerSchedule: FertilizerMilestone[];
  pestRows: PestTreatmentRow[];
  naturalTipMM: string;
  naturalTipEn: string;
  weatherSoil?: WeatherSoilContent;
  sectionHeadings?: GuideSectionHeadings;
  /** Shown under the growing-timeline section title (e.g. total crop duration). */
  growingDurationMM?: string;
  growingDurationEn?: string;
  fertilizerFootnoteMM?: string;
  fertilizerFootnoteEn?: string;
  pestIntroMM?: string;
  pestIntroEn?: string;
  naturalHeadingMM?: string;
  naturalHeadingEn?: string;
  pestImportantMM?: string;
  pestImportantEn?: string;
}

export interface PestScanResult {
  name: string;
  nameMM: string;
  confidence: number;
  treatment: string[];
  treatmentMM: string[];
}

export type KnowledgeCategory =
  | "planting"
  | "fertilizer"
  | "pest"
  | "soil"
  | "weather"
  | "general";

/** Curated article shown in the Knowledge tab (admin-sourced content). */
export interface KnowledgeArticle {
  id: string;
  category: KnowledgeCategory;
  titleMM: string;
  titleEn: string;
  summaryMM: string;
  summaryEn: string;
  bodyMM: string;
  bodyEn: string;
  attributionMM: string;
  attributionEn: string;
  publishedAt: string;
}

export type ActiveAlertTone = "warning" | "success";

export interface ActiveAlertItem {
  tone: ActiveAlertTone;
  titleMM: string;
  titleEn: string;
  detailMM: string;
  detailEn: string;
}

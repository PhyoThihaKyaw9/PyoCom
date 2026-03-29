import type {
  ForecastDay,
  GrowingSeasonSummary,
  LocationSummary,
  WeatherAlertBanner,
} from "./types";

export const MOCK_LOCATION: LocationSummary = {
  nameMM: "ရွှေဘို",
  subtitleEn: "Shwebo, Sagaing",
};

export const MOCK_FORECAST_DAYS: ForecastDay[] = [
  { day: "တနင်္ဂနွေ", dayEn: "Sun", temp: "32°", icon: "sun" },
  { day: "တနင်္လာ", dayEn: "Mon", temp: "31°", icon: "cloud-sun" },
  { day: "အင်္ဂါ", dayEn: "Tue", temp: "28°", icon: "cloud-rain" },
  { day: "ဗုဒ္ဓဟူး", dayEn: "Wed", temp: "29°", icon: "cloud-rain" },
  { day: "ကြာသပတေး", dayEn: "Thu", temp: "30°", icon: "cloud" },
];

export const MOCK_WEATHER_ALERT: WeatherAlertBanner = {
  titleMM: "မနက်ဖြန် မိုးကြီးမည်",
  titleEn: "Heavy Rain Tomorrow",
};

/** Demo: pest classifier runs aggregated for admin home (local mock). */
export const MOCK_ADMIN_PEST_SCANS_MONTH = 156;

export const MOCK_GROWING_SEASON: GrowingSeasonSummary = {
  dayLabelMM: "စိုက်ပျိုးရက် ၄၅",
  dayLabelEn: "Day 45 - Growing Season",
};

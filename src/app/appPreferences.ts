export const APP_PREFS_KEY = "pyoe-com-app-prefs-v1";

export type AppPrefs = {
  weatherAlerts: boolean;
  instructionUpdates: boolean;
  climateAlerts: boolean;
  communityMentions: boolean;
  morningAlertsEnabled: boolean;
  emergencyAlwaysOn: boolean;
  soundAlerts: boolean;
  vibrationAlerts: boolean;
  badgeCount: boolean;
};

const defaults: AppPrefs = {
  weatherAlerts: true,
  instructionUpdates: true,
  climateAlerts: true,
  communityMentions: false,
  morningAlertsEnabled: true,
  emergencyAlwaysOn: true,
  soundAlerts: true,
  vibrationAlerts: true,
  badgeCount: false,
};

export function loadAppPrefs(): AppPrefs {
  try {
    const raw = localStorage.getItem(APP_PREFS_KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<AppPrefs>;
    return { ...defaults, ...parsed };
  } catch {
    return { ...defaults };
  }
}

export function saveAppPrefs(prefs: AppPrefs) {
  localStorage.setItem(APP_PREFS_KEY, JSON.stringify(prefs));
}

export function clearAppPrefs() {
  localStorage.removeItem(APP_PREFS_KEY);
}

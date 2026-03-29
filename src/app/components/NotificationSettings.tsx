import { useEffect, useState } from "react";
import {
  Settings,
  Bell,
  BookOpen,
  AlertTriangle,
  LogOut,
  User,
  Smartphone,
  Trash2,
  Info,
  LifeBuoy,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../auth/AuthContext";
import {
  broadcastContentAdminUpdated,
  clearContentAdminState,
} from "../../admin/contentAdminState";
import { clearCustomKnowledgeArticles } from "../../admin/knowledgeSharingState";
import {
  loadAppPrefs,
  saveAppPrefs,
  clearAppPrefs,
  type AppPrefs,
} from "../appPreferences";
import { MOCK_ACTIVE_ALERTS, MOCK_NOTIFICATION_TYPE_DEFS } from "../../mocks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export type SettingsMainTab = "account" | "notifications" | "app";

type NotificationSettingsProps = {
  /** Default tab when opening Settings (avatar → account, nav → notifications). */
  initialTab?: SettingsMainTab;
};

const appVersion = "0.0.1";

export function NotificationSettings({
  initialTab = "notifications",
}: NotificationSettingsProps) {
  const {
    user,
    signOut,
    updateDisplayName,
    changePassword,
    clearAllLocalAccounts,
  } = useAuth();

  const [mainTab, setMainTab] = useState<SettingsMainTab>(initialTab);

  useEffect(() => {
    setMainTab(initialTab);
  }, [initialTab]);

  const [prefs, setPrefs] = useState<AppPrefs>(() => loadAppPrefs());

  useEffect(() => {
    saveAppPrefs(prefs);
  }, [prefs]);

  const setPref = <K extends keyof AppPrefs>(key: K, value: AppPrefs[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const [nameEdit, setNameEdit] = useState("");
  useEffect(() => {
    if (user?.displayName) setNameEdit(user.displayName);
  }, [user?.displayName]);

  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  const handleSaveName = async () => {
    try {
      await updateDisplayName(nameEdit);
      toast.success("Updated", { description: "အမည် ပြင်ဆင်ပြီးပါပြီ" });
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "INVALID_NAME") {
        toast.error("Invalid name", { description: "အမည် ထည့်ပါ" });
      } else {
        toast.error("Could not update", { description: "ပြင်ဆင်မရပါ" });
      }
    }
  };

  const handleChangePassword = async () => {
    if (pwdNew.length < 6) {
      toast.error("Password too short", {
        description: "စကားဝေါ် အနည်းဆုံး ၆ လုံး",
      });
      return;
    }
    if (pwdNew !== pwdConfirm) {
      toast.error("Mismatch", { description: "စကားဝေါ်အသစ် မတူညီပါ" });
      return;
    }
    try {
      await changePassword(pwdCurrent, pwdNew);
      setPwdCurrent("");
      setPwdNew("");
      setPwdConfirm("");
      toast.success("Password changed", {
        description: "စကားဝေါ် ပြောင်းလဲပြီးပါပြီ",
      });
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "INVALID_CREDENTIALS") {
        toast.error("Wrong password", {
          description: "လက်ရှိ စကားဝေါ် မမှန်ပါ",
        });
      } else if (msg === "WEAK_PASSWORD") {
        toast.error("Too short", { description: "စကားဝေါ် အနည်းဆုံး ၆ လုံး" });
      } else {
        toast.error("Could not change", { description: "မအောင်မြင်ပါ" });
      }
    }
  };

  const handleClearAllData = () => {
    clearAppPrefs();
    clearCustomKnowledgeArticles();
    clearContentAdminState();
    broadcastContentAdminUpdated();
    clearAllLocalAccounts();
    toast.info("Data cleared", {
      description: "အကောင့်နှင့် ဆက်တင်များ ဖျက်ပြီးပါပြီ",
    });
  };

  const notificationOptions = MOCK_NOTIFICATION_TYPE_DEFS.map((def) => ({
    ...def,
    enabled: prefs[
      def.id as keyof Pick<
        AppPrefs,
        | "weatherAlerts"
        | "instructionUpdates"
        | "climateAlerts"
        | "communityMentions"
      >
    ] as boolean,
  }));

  const fieldClass =
    "h-11 text-base border-2 border-[#1B4332]/25 focus-visible:border-[#16a34a]";

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#f0fdf4] pb-8">
      <header className="bg-[#1B4332] px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] text-white shadow-md sm:p-4">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Settings className="size-6 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-wide">ဆက်တင်များ</h1>
            <p className="text-xs opacity-90 sm:text-sm">Settings · Account &amp; app</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-3 py-3 sm:p-4">
        <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as SettingsMainTab)}>
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white border-2 border-[#1B4332]/20 rounded-xl mb-4">
            <TabsTrigger
              value="account"
              className="flex flex-col gap-0.5 py-2 rounded-lg data-[state=active]:bg-[#16a34a] data-[state=active]:text-white text-[#1B4332]"
            >
              <User className="w-4 h-4 mx-auto" />
              <span className="text-[10px] leading-tight">အကောင့်</span>
              <span className="text-[9px] opacity-80">Account</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex flex-col gap-0.5 py-2 rounded-lg data-[state=active]:bg-[#16a34a] data-[state=active]:text-white text-[#1B4332]"
            >
              <Bell className="w-4 h-4 mx-auto" />
              <span className="text-[10px] leading-tight">အကြောင်းကြား</span>
              <span className="text-[9px] opacity-80">Alerts</span>
            </TabsTrigger>
            <TabsTrigger
              value="app"
              className="flex flex-col gap-0.5 py-2 rounded-lg data-[state=active]:bg-[#16a34a] data-[state=active]:text-white text-[#1B4332]"
            >
              <Smartphone className="w-4 h-4 mx-auto" />
              <span className="text-[10px] leading-tight">အက်ပ်</span>
              <span className="text-[9px] opacity-80">App</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-0 space-y-4">
            <Card className="border-4 border-[#1B4332]/25 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">သင့်အမှတ်တင်</CardTitle>
                <p className="text-sm text-gray-500 font-normal">Profile</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profile-phone" className="text-gray-700">
                    ဖုန်းနံပါတ် <span className="text-gray-400">(မပြောင်းနိုင်)</span>
                  </Label>
                  <Input
                    id="profile-phone"
                    readOnly
                    value={user?.phone ?? ""}
                    className={`${fieldClass} mt-1 bg-gray-50 text-gray-700`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Phone cannot be changed in this demo. / ဒီဗားရှင်းတွင် ဖုန်းနံပါတ်
                    မပြင်ဆင်နိုင်ပါ။
                  </p>
                </div>
                <div>
                  <Label htmlFor="profile-name">အမည် ပြင်ဆင်ရန်</Label>
                  <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                    <Input
                      id="profile-name"
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                      className={fieldClass}
                      autoComplete="name"
                    />
                    <Button
                      type="button"
                      className="h-11 shrink-0 bg-[#16a34a] hover:bg-[#15803d] sm:h-auto"
                      onClick={() => void handleSaveName()}
                    >
                      သိမ်းမည်
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-[#1B4332]/25 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">စကားဝေါ် ပြောင်းရန်</CardTitle>
                <p className="text-sm text-gray-500 font-normal">Change password</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="pwd-old">လက်ရှိ စကားဝေါ်</Label>
                  <Input
                    id="pwd-old"
                    type="password"
                    autoComplete="current-password"
                    value={pwdCurrent}
                    onChange={(e) => setPwdCurrent(e.target.value)}
                    className={`${fieldClass} mt-1`}
                  />
                </div>
                <div>
                  <Label htmlFor="pwd-new">စကားဝေါ် အသစ်</Label>
                  <Input
                    id="pwd-new"
                    type="password"
                    autoComplete="new-password"
                    value={pwdNew}
                    onChange={(e) => setPwdNew(e.target.value)}
                    className={`${fieldClass} mt-1`}
                  />
                </div>
                <div>
                  <Label htmlFor="pwd-confirm">စကားဝေါ် အသစ် အတည်ပြု</Label>
                  <Input
                    id="pwd-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={pwdConfirm}
                    onChange={(e) => setPwdConfirm(e.target.value)}
                    className={`${fieldClass} mt-1`}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-[#1B4332] text-[#1B4332]"
                  onClick={() => void handleChangePassword()}
                >
                  စကားဝေါ် အသစ်သို့ ပြောင်းမည်
                </Button>
              </CardContent>
            </Card>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-4 border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white font-semibold"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              ထွက်မည် · Log out
            </Button>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">
                      အကြောင်းကြားချက် လိုက်၍ ဖွင့်/ပိတ်ပါ
                    </p>
                    <p className="text-sm text-blue-800">
                      Toggles are saved on this device.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  အကြောင်းကြားချက် အမျိုးအစားများ
                  <span className="block text-sm font-normal text-gray-500">
                    Notification types
                  </span>
                </CardTitle>
                <CardDescription>
                  သင်လိုချင်သော သတိပေးချက်များသာ ရွေးချယ်ပါ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {notificationOptions.map((option) => {
                  const Icon = option.icon;
                  const key = option.id as
                    | "weatherAlerts"
                    | "instructionUpdates"
                    | "climateAlerts"
                    | "communityMentions";
                  return (
                    <div
                      key={option.id}
                      className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 min-h-[44px]"
                    >
                      <div className="flex gap-3 flex-1">
                        <div
                          className={`rounded-full p-2 shrink-0 ${
                            option.enabled ? "bg-[#16a34a]/10" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              option.enabled ? "text-[#16a34a]" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={option.id} className="cursor-pointer">
                            <p className="font-medium">{option.title}</p>
                            <p className="text-sm text-gray-500">{option.titleEn}</p>
                          </Label>
                        </div>
                      </div>
                      <Switch
                        id={option.id}
                        checked={option.enabled}
                        onCheckedChange={(c) => setPref(key, c)}
                        className="ml-3 shrink-0"
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  အချိန်ဇယား
                  <span className="block text-sm font-normal text-gray-500">
                    Schedule
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#16a34a]/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">မနက်ပိုင်း သတိပေးချက်များ</p>
                      <p className="text-sm text-gray-600">Morning window</p>
                    </div>
                    <Switch
                      checked={prefs.morningAlertsEnabled}
                      onCheckedChange={(c) => setPref("morningAlertsEnabled", c)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    မနက် ၆:၀၀ မှ ၇:၀၀ / 6:00–7:00 AM
                  </p>
                </div>
                <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#16a34a]/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">အရေးပေါ် သတိပေးချက်များ</p>
                      <p className="text-sm text-gray-600">Emergency</p>
                    </div>
                    <Switch
                      checked={prefs.emergencyAlwaysOn}
                      onCheckedChange={(c) => setPref("emergencyAlwaysOn", c)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    အချိန်မရွေး / Anytime when enabled
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  လက်ရှိ သတိပေးချက်များ (မော်ဒယ်)
                  <span className="block text-sm font-normal text-gray-500">
                    Sample alerts
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_ACTIVE_ALERTS.map((alert, i) =>
                  alert.tone === "warning" ? (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#92400e]">{alert.titleMM}</p>
                        <p className="text-sm text-[#78350f]">{alert.titleEn}</p>
                        <p className="text-xs text-[#92400e] mt-1">
                          {alert.detailMM} / {alert.detailEn}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <BookOpen className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#15803d]">{alert.titleMM}</p>
                        <p className="text-sm text-[#16a34a]">{alert.titleEn}</p>
                        <p className="text-xs text-[#15803d] mt-1">
                          {alert.detailMM} / {alert.detailEn}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  အသံ နှင့် တုန်ခါမှု
                  <span className="block text-sm font-normal text-gray-500">
                    Sound &amp; vibration
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
                  <div>
                    <p className="font-medium">အသံသတိပေးချက်</p>
                    <p className="text-sm text-gray-500">Sound</p>
                  </div>
                  <Switch
                    checked={prefs.soundAlerts}
                    onCheckedChange={(c) => setPref("soundAlerts", c)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
                  <div>
                    <p className="font-medium">တုန်ခါမှု</p>
                    <p className="text-sm text-gray-500">Vibration</p>
                  </div>
                  <Switch
                    checked={prefs.vibrationAlerts}
                    onCheckedChange={(c) => setPref("vibrationAlerts", c)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
                  <div>
                    <p className="font-medium">Badge အရေအတွက်</p>
                    <p className="text-sm text-gray-500">Badge count</p>
                  </div>
                  <Switch
                    checked={prefs.badgeCount}
                    onCheckedChange={(c) => setPref("badgeCount", c)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app" className="mt-0 space-y-4">
            <Card className="border-4 border-[#1B4332]/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#16a34a]" />
                  <CardTitle className="text-base">အက်ပ်အကြောင်း</CardTitle>
                </div>
                <p className="text-sm text-gray-500 font-normal">About</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-semibold text-[#1B4332]">Pyoe Com</p>
                <p className="text-sm text-gray-600">
                  စပါးစိုက်ပျိုးသူများအတွက် မိုးလေဝသ၊ လမ်းညွှန်ချက်များ၊ ပိုးစိစစ်ခြင်း နှင့်
                  ဉာဏ်မျှဝေရေး (အက်မင်မှ တင်သော သတင်းများ)။
                </p>
                <p className="text-xs text-gray-500">
                  Version {appVersion} · Demo build
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-[#16a34a]" />
                  <CardTitle className="text-base">အကူအညီ</CardTitle>
                </div>
                <p className="text-sm text-gray-500 font-normal">Help</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>• ပင်မစာမျက်နှာရှိ မိုးလေဝသ နှင့် သတိပေးချက်များကို နေ့စဉ် စစ်ပါ။</p>
                <p>• လမ်းညွှန်တွင် စပါးအမျိုးအစား ရွေးပြီး ကျွမ်းကျင်သူ အကြံပြုချက်များ ဖတ်ပါ။</p>
                <p>• ပိုးစကင်ဖြင့် ပုံမှ အရေးပေါ် ကုသနည်းလမ်းများ ရယူပါ။</p>
                <p>• ဉာဏ်မျှဝေရေးတွင် စိုက်ပျိုးရေးသတင်းနှင့် အက်မင် မှတ်ချက်များ ဖတ်ပါ။</p>
                <p className="text-xs text-gray-500 pt-1">
                  Check weather, browse guides by variety, scan pests, and read Knowledge posts
                  shared by admins.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-700" />
                  <CardTitle className="text-base">ကိုယ်ရေးလုံခြုံမှု</CardTitle>
                </div>
                <p className="text-sm text-amber-900/80 font-normal">Privacy (demo)</p>
              </CardHeader>
              <CardContent className="text-sm text-amber-950/90 space-y-2">
                <p>
                  ဤနှစ်ဆင့်ဖော်ပြချက်တွင် အကောင့်နှင့် ဆက်တင်များကို သင့်ဘရောင်ဇာတွင် သိမ်းသည်။
                  စကားဝေါ်များ လုံးဝ လုံခြုံစွာ ကူးသွင်းမထားပါ။
                </p>
                <p className="text-xs opacity-90">
                  Accounts and preferences stay in your browser only. Passwords are not hashed in
                  this demo — do not use real passwords.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-900">အန္တရာယ်ဇုန်</CardTitle>
                <p className="text-sm text-red-800/90 font-normal">
                  Danger zone — ဤဖုန်းပေါ်ရှိ ဒေတာအားလုံး ဖျက်မည်
                </p>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      ဒေတာအားလုံး ရှင်းလင်းမည်
                      <span className="text-xs font-normal opacity-90">
                        Clear all local data
                      </span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md rounded-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>အားလုံး ဖျက်မလား?</AlertDialogTitle>
                      <AlertDialogDescription className="text-left space-y-2">
                        <span className="block">
                          အကောင့်များ၊ စကားဝေါ်များ၊ ဆက်တင်၊ ဉာဏ်မျှဝေရေး ပိုစ်များ၊ လမ်းညွှန် အက်မင်
                          ပြင်ဆင်ချက်များပါ ပျက်သွားပါမည်။
                        </span>
                        <span className="block text-xs">
                          Accounts, passwords, preferences, custom Knowledge posts, and admin guide
                          overrides on this browser will be removed.
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-0">
                      <AlertDialogCancel className="mt-0">မလုပ်တော့ပါ</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleClearAllData}
                      >
                        ဖျက်မည် · Clear
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

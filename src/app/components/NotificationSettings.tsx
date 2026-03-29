import { Settings, Bell, Cloud, BookOpen, AlertTriangle, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    weatherAlerts: true,
    instructionUpdates: true,
    climateAlerts: true,
    communityMentions: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationOptions = [
    {
      id: "weatherAlerts",
      icon: Cloud,
      title: "မိုးလေဝသ သတိပေးချက်",
      titleEn: "Weather Alerts",
      description: "မိုးသည်းထန်စွာရွာသွန်းမှု၊ မုန်တိုင်းသတိပေးချက်များ",
      descriptionEn: "Heavy rain, storm warnings, and weather updates",
      enabled: settings.weatherAlerts,
    },
    {
      id: "instructionUpdates",
      icon: BookOpen,
      title: "လမ်းညွှန်ချက် အပ်ဒိတ်များ",
      titleEn: "Instruction Updates",
      description: "စပါးစိုက်ပျိုးမှု လမ်းညွှန်ချက် အသစ်များ",
      descriptionEn: "New paddy cultivation guidelines and updates",
      enabled: settings.instructionUpdates,
    },
    {
      id: "climateAlerts",
      icon: AlertTriangle,
      title: "ရာသီဥတု သတိပေးချက်",
      titleEn: "Climate Alerts",
      description: "ရာသီဥတု ပြောင်းလဲမှု၊ ခြောက်သွေ့မှု သတိပေးချက်များ",
      descriptionEn: "Climate change impacts and drought warnings",
      enabled: settings.climateAlerts,
    },
    {
      id: "communityMentions",
      icon: MessageCircle,
      title: "လူမှုကွန်ရက် အကြောင်းကြားချက်",
      titleEn: "Community Mentions",
      description: "သင့်အား အမည်ညွှန်းဆိုမှု၊ ပြန်စာများ",
      descriptionEn: "Mentions, replies, and community interactions",
      enabled: settings.communityMentions,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Header */}
      <header className="bg-[#16a34a] text-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6" />
          <div>
            <h1 className="text-lg">အကြောင်းကြားချက် ဆက်တင်များ</h1>
            <p className="text-sm opacity-90">Notification Settings</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Settings Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">
                  အကြောင်းကြားချက်များကို စိတ်ကြိုက်ပြင်ဆင်ပါ
                </p>
                <p className="text-sm text-blue-800">
                  Customize your notification preferences
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  သင်လိုအပ်သော သတင်းအချက်အလက်များသာ လက်ခံရရှိမည်
                </p>
                <p className="text-xs text-blue-600">
                  Receive only the information you need
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Controls */}
        <Card>
          <CardHeader>
            <CardTitle>
              အကြောင်းကြားချက် အမျိုးအစားများ
              <br />
              <span className="text-sm font-normal text-gray-500">Notification Types</span>
            </CardTitle>
            <CardDescription>
              လိုအပ်သော အကြောင်းကြားချက်များကို ဖွင့်/ပိတ်ပါ
              <br />
              Toggle notifications on or off
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {notificationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  <div className="flex gap-3 flex-1">
                    <div className={`rounded-full p-2 flex-shrink-0 ${
                      option.enabled ? "bg-[#16a34a]/10" : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        option.enabled ? "text-[#16a34a]" : "text-gray-400"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor={option.id}
                        className="cursor-pointer block"
                      >
                        <p className="font-medium">{option.title}</p>
                        <p className="text-sm text-gray-500 font-normal">{option.titleEn}</p>
                        <p className="text-xs text-gray-600 mt-1 font-normal">
                          {option.description}
                        </p>
                        <p className="text-xs text-gray-500 font-normal">
                          {option.descriptionEn}
                        </p>
                      </Label>
                    </div>
                  </div>
                  <Switch
                    id={option.id}
                    checked={option.enabled}
                    onCheckedChange={() => toggleSetting(option.id as keyof typeof settings)}
                    className="ml-3"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notification Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>
              အကြောင်းကြားချက် အချိန်ဇယား
              <br />
              <span className="text-sm font-normal text-gray-500">Notification Schedule</span>
            </CardTitle>
            <CardDescription>
              အကြောင်းကြားချက်များ လက်ခံရရှိမည့် အချိန်
              <br />
              When to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#16a34a]/20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">စောစောသတိပေးချက်များ</p>
                  <p className="text-sm text-gray-600">Early Morning Alerts</p>
                </div>
                <Switch checked={true} />
              </div>
              <p className="text-sm text-gray-600">မနက် ၆:၀၀ မှ ၇:၀၀ / 6:00 AM - 7:00 AM</p>
            </div>

            <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#16a34a]/20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">အရေးပေါ် သတိပေးချက်များ</p>
                  <p className="text-sm text-gray-600">Emergency Alerts</p>
                </div>
                <Switch checked={true} disabled />
              </div>
              <p className="text-sm text-gray-600">
                အချိန်မရွေး / Anytime (အမြဲဖွင့်ထားသည် / Always On)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts Summary */}
        <Card>
          <CardHeader>
            <CardTitle>
              လက်ရှိ သတိပေးချက်များ
              <br />
              <span className="text-sm font-normal text-gray-500">Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#92400e]">
                  မိုးသည်းထန်စွာ ရွာသွန်းမှု သတိပေးချက်
                </p>
                <p className="text-sm text-[#78350f]">Heavy Rain Warning</p>
                <p className="text-xs text-[#92400e] mt-1">
                  ယနေ့ညနေ ၃:၀၀ နာရီ မှ ၆:၀၀ နာရီ / Today 3:00 PM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <BookOpen className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#15803d]">
                  မြေသြဇာထည့်သွင်းရန် အကြံပြုချက်
                </p>
                <p className="text-sm text-[#16a34a]">Fertilizer Application Reminder</p>
                <p className="text-xs text-[#15803d] mt-1">
                  မနက်ဖြန် / Tomorrow
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>
              အခြား ဆက်တင်များ
              <br />
              <span className="text-sm font-normal text-gray-500">Additional Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
              <div>
                <p className="font-medium">အသံသတိ���ေးချက်</p>
                <p className="text-sm text-gray-500">Sound Alerts</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
              <div>
                <p className="font-medium">တုန်ခါမှု သတိပေးချက်</p>
                <p className="text-sm text-gray-500">Vibration Alerts</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 min-h-[44px]">
              <div>
                <p className="font-medium">Badge အရေအတွက်ပြသမှု</p>
                <p className="text-sm text-gray-500">Show Badge Count</p>
              </div>
              <Switch checked={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

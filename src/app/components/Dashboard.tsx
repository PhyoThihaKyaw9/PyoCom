import { MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface DashboardProps {
  onNavigateToPest?: () => void;
  onNavigateToGuides?: () => void;
}

export function Dashboard({ onNavigateToPest, onNavigateToGuides }: DashboardProps) {
  const forecastDays = [
    { day: "တနင်္ဂနွေ", dayEn: "Sun", temp: "32°", icon: "☀️" },
    { day: "တနင်္လာ", dayEn: "Mon", temp: "31°", icon: "🌤️" },
    { day: "အင်္ဂါ", dayEn: "Tue", temp: "28°", icon: "🌧️" },
    { day: "ဗုဒ္ဓဟူး", dayEn: "Wed", temp: "29°", icon: "🌧️" },
    { day: "ကြာသပတေး", dayEn: "Thu", temp: "30°", icon: "⛅" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header with Clean Design */}
      <header className="bg-[#1B4332] text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-7 h-7" strokeWidth={2.5} />
          <div>
            <h1 className="text-4xl font-bold tracking-wide">ရွှေဘို</h1>
            <p className="text-lg opacity-90 mt-1">Shwebo, Sagaing</p>
          </div>
        </div>

        {/* 5-Day Forecast - Horizontal Row */}
        <div className="flex gap-3 justify-between">
          {forecastDays.map((day, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1 text-center border-2 border-white/20"
            >
              <p className="text-lg font-bold mb-2">{day.day}</p>
              <p className="text-sm opacity-80 mb-3">{day.dayEn}</p>
              <div className="text-4xl mb-2">{day.icon}</div>
              <p className="text-xl font-bold">{day.temp}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Predictive Alert Banner - Burnt Harvest Orange #D97706 */}
      <div className="bg-[#D97706] px-6 py-8 shadow-lg">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
            <div className="text-5xl">✋</div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">
              မနက်ဖြန် မိုးကြီးမည်
            </h2>
            <p className="text-lg text-white/90 mb-4">Heavy Rain Tomorrow</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
              <p className="text-xl font-bold text-white">
                ⚠️ မြေသြဇာမကျွေးပါနှင့်
              </p>
              <p className="text-base text-white/90 mt-1">Do Not Fertilize</p>
            </div>
          </div>
        </div>
      </div>

      {/* The "Big Two" Buttons - Bottom Half */}
      <div className="px-6 py-8">
        {/* Two massive square cards side-by-side */}
        <div className="grid grid-cols-2 gap-5">
          {/* Pest Scan Button */}
          <Card 
            onClick={onNavigateToPest}
            className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
          >
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[220px]">
              {/* Woodcut-style Beetle Icon */}
              <div className="w-20 h-20 bg-[#1B4332] rounded-2xl flex items-center justify-center mb-4">
                <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="25" r="12" fill="white" stroke="white" strokeWidth="3"/>
                  <circle cx="25" cy="23" r="3" fill="#1B4332"/>
                  <circle cx="35" cy="23" r="3" fill="#1B4332"/>
                  <ellipse cx="30" cy="42" rx="15" ry="10" fill="white" stroke="white" strokeWidth="3"/>
                  <line x1="15" y1="35" x2="8" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="45" y1="35" x2="52" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="18" y1="25" x2="10" y2="25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="42" y1="25" x2="50" y2="25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1B4332] text-center mb-1">
                ပိုးမွှားစကင်
              </h3>
              <p className="text-base text-gray-600 text-center">Pest Scan</p>
            </CardContent>
          </Card>

          {/* Community Guides Button */}
          <Card 
            onClick={onNavigateToGuides}
            className="border-4 border-[#1B4332] hover:shadow-xl cursor-pointer active:scale-98 transition-all bg-[#F8FAFC]"
          >
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[220px]">
              {/* Woodcut-style Grain Sack Icon */}
              <div className="w-20 h-20 bg-[#1B4332] rounded-2xl flex items-center justify-center mb-4">
                <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 20 L15 45 L35 45 L25 20 Z" fill="white" stroke="white" strokeWidth="2"/>
                  <ellipse cx="25" cy="20" rx="10" ry="4" fill="white"/>
                  <line x1="42" y1="45" x2="42" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M42 30 Q35 25 35 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M42 30 Q49 25 49 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1B4332] text-center mb-1">
                လမ်းညွှန်များ
              </h3>
              <p className="text-base text-gray-600 text-center">Community Guides</p>
            </CardContent>
          </Card>
        </div>

        {/* Growing Season Info */}
        <Card className="border-4 border-[#D97706] bg-white mt-6">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🌾</div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B4332]">
                  စိုက်ပျိုးရက် ၄၅
                </h3>
                <p className="text-lg text-gray-600">Day 45 - Growing Season</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Home, BookOpen, Camera, Users, Settings, ArrowLeft } from "lucide-react";
import { Dashboard } from './components/Dashboard';
import { PaddyInstructions } from './components/PaddyInstructions';
import { DetailedGuide } from './components/DetailedGuide';
import { PestClassifier } from './components/PestClassifier';
import { CommunityFeed } from './components/CommunityFeed';
import { NotificationSettings } from './components/NotificationSettings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'paddy' | 'guide-detail' | 'scanner' | 'community' | 'settings'>('home');

  const navItems = [
    { id: 'home' as const, icon: Home, label: "ပင်မ", labelEn: "Home" },
    { id: 'paddy' as const, icon: BookOpen, label: "လမ်းညွှန်", labelEn: "Guide" },
    { id: 'scanner' as const, icon: Camera, label: "စကင်န်", labelEn: "Scan" },
    { id: 'community' as const, icon: Users, label: "လူမှု", labelEn: "Community" },
    { id: 'settings' as const, icon: Settings, label: "ဆက်တင်", labelEn: "Settings" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f0fdf4]">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {currentPage === 'home' && (
          <Dashboard 
            onNavigateToPest={() => setCurrentPage('scanner')}
            onNavigateToGuides={() => setCurrentPage('paddy')}
          />
        )}
        {currentPage === 'paddy' && <PaddyInstructions onGuideClick={() => setCurrentPage('guide-detail')} />}
        {currentPage === 'guide-detail' && <DetailedGuide />}
        {currentPage === 'scanner' && <PestClassifier />}
        {currentPage === 'community' && <CommunityFeed />}
        {currentPage === 'settings' && <NotificationSettings />}
      </main>

      {/* Bottom Navigation */}
      {currentPage !== 'guide-detail' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center h-20 max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors ${
                    isActive
                      ? "text-[#16a34a]"
                      : "text-gray-500 hover:text-[#16a34a]"
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs">{item.label}</span>
                  <span className="text-[10px] text-gray-400">{item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Back Button for DetailedGuide */}
      {currentPage === 'guide-detail' && (
        <button
          onClick={() => setCurrentPage('paddy')}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#16a34a] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 min-h-[44px] z-50"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>နောက်သို့ (Back)</span>
        </button>
      )}
    </div>
  );
}
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  Camera,
  Library,
  Settings,
  Shield,
} from "lucide-react";
import { useAuth } from '../auth/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { PaddyInstructions } from './components/PaddyInstructions';
import { DetailedGuide } from './components/DetailedGuide';
import { PestClassifier } from './components/PestClassifier';
import { CommunityFeed } from './components/CommunityFeed';
import { AdminDashboard } from './components/AdminDashboard';
import {
  NotificationSettings,
  type SettingsMainTab,
} from './components/NotificationSettings';

type AppPage =
  | 'home'
  | 'paddy'
  | 'guide-detail'
  | 'scanner'
  | 'community'
  | 'settings'
  | 'admin';

function initialPageFromPath(): AppPage {
  if (typeof window === 'undefined') return 'home';
  const p = window.location.pathname.replace(/\/$/, '') || '/';
  if (p === '/AdminDashboard' || p.toLowerCase() === '/admindashboard') {
    return 'admin';
  }
  if (p === '/settings' || p === '/settings/') return 'settings';
  return 'home';
}

export default function App() {
  const { user, ready } = useAuth();
  const [currentPage, setCurrentPage] = useState<AppPage>(initialPageFromPath);
  const [settingsTab, setSettingsTab] = useState<SettingsMainTab>('notifications');
  const [guideDetailPaddyType, setGuideDetailPaddyType] = useState("shwebo-pawsan");

  /** Before paint: avoid empty main when admin page is invalid for current role. */
  useLayoutEffect(() => {
    if (!ready || !user) return;
    if (currentPage === 'admin' && user.role !== 'admin') {
      setCurrentPage('home');
      window.history.replaceState(null, '', '/');
    }
  }, [ready, user, currentPage]);

  useEffect(() => {
    if (!ready || !user || user.role !== 'admin') return;
    const blocked: AppPage[] = ['paddy', 'guide-detail', 'scanner', 'community'];
    if (blocked.includes(currentPage)) {
      setCurrentPage('admin');
    }
  }, [ready, user, currentPage]);

  useEffect(() => {
    if (!ready || !user || user.role !== 'admin') return;
    const target =
      currentPage === 'admin'
        ? '/AdminDashboard'
        : currentPage === 'settings'
          ? '/settings'
          : '/';
    if (window.location.pathname !== target) {
      window.history.replaceState(null, '', target);
    }
  }, [ready, user, currentPage]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const farmerNav = [
    { id: 'home' as const, icon: Home, label: "ပင်မ", labelEn: "Home" },
    { id: 'paddy' as const, icon: BookOpen, label: "လမ်းညွှန်", labelEn: "Guide" },
    { id: 'scanner' as const, icon: Camera, label: "စကင်န်", labelEn: "Scan" },
    { id: 'community' as const, icon: Library, label: "ဉာဏ်မျှဝေ", labelEn: "Knowledge" },
    { id: 'settings' as const, icon: Settings, label: "ဆက်တင်", labelEn: "Settings" },
  ];

  const adminNav = [
    { id: 'home' as const, icon: Home, label: "ပင်မ", labelEn: "Home" },
    { id: 'admin' as const, icon: Shield, label: "အက်မင်", labelEn: "Admin" },
    { id: 'settings' as const, icon: Settings, label: "ဆက်တင်", labelEn: "Settings" },
  ];

  const navItems = user.role === 'admin' ? adminNav : farmerNav;
  const isFarmer = user.role !== 'admin';

  /** Avoid blank main: admin URL/tab with non-admin user shows home until state syncs. */
  const effectivePage: AppPage =
    ready && user && user.role !== 'admin' && currentPage === 'admin'
      ? 'home'
      : currentPage;

  return (
    <div className="flex min-h-dvh min-h-[100svh] flex-col bg-[#f0fdf4]">
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
        {effectivePage === 'home' && (
          <Dashboard
            variant={user.role === 'admin' ? 'admin' : 'farmer'}
            onNavigateToPest={() => setCurrentPage('scanner')}
            onNavigateToGuides={() => setCurrentPage('paddy')}
            onNavigateToSettings={() => {
              setSettingsTab('account');
              setCurrentPage('settings');
            }}
            onNavigateToAdmin={() => setCurrentPage('admin')}
          />
        )}
        {effectivePage === 'admin' && user.role === 'admin' && (
          <AdminDashboard onBack={() => setCurrentPage('home')} />
        )}
        {effectivePage === 'paddy' && isFarmer && (
          <PaddyInstructions
            onGuideClick={(paddyType) => {
              setGuideDetailPaddyType(paddyType);
              setCurrentPage('guide-detail');
            }}
          />
        )}
        {effectivePage === 'guide-detail' && isFarmer && (
          <DetailedGuide
            paddyType={guideDetailPaddyType}
            onBack={() => setCurrentPage('paddy')}
          />
        )}
        {effectivePage === 'scanner' && isFarmer && <PestClassifier />}
        {effectivePage === 'community' && isFarmer && <CommunityFeed />}
        {effectivePage === 'settings' && (
          <NotificationSettings initialTab={settingsTab} />
        )}
      </main>

      {effectivePage !== 'guide-detail' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-lg">
          <div className="mx-auto flex h-16 min-h-[4.5rem] w-full max-w-lg items-center justify-around px-0 sm:h-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = effectivePage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'settings') {
                      setSettingsTab('notifications');
                    }
                    setCurrentPage(item.id);
                  }}
                  className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors ${
                    isActive
                      ? "text-[#16a34a]"
                      : "text-gray-500 hover:text-[#16a34a]"
                  }`}
                >
                  <Icon className="mb-0.5 size-5 sm:mb-1 sm:size-6" />
                  <span className="max-w-[4.25rem] truncate text-center text-[11px] leading-tight sm:max-w-none sm:text-xs">
                    {item.label}
                  </span>
                  <span className="hidden text-[10px] text-gray-400 sm:block">
                    {item.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}

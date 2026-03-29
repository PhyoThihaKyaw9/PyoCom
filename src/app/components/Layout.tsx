import { Outlet, Link, useLocation } from "react-router";
import { Home, BookOpen, Camera, Library, Settings } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "ပင်မ", labelEn: "Home" },
    { path: "/paddy", icon: BookOpen, label: "လမ်းညွှန်", labelEn: "Guide" },
    { path: "/scanner", icon: Camera, label: "စကင်န်", labelEn: "Scan" },
    { path: "/community", icon: Library, label: "ဉာဏ်မျှဝေ", labelEn: "Knowledge" },
    { path: "/settings", icon: Settings, label: "ဆက်တင်", labelEn: "Settings" },
  ];

  return (
    <div className="flex min-h-dvh min-h-[100svh] flex-col bg-[#f0fdf4]">
      {/* Main Content */}
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-lg">
        <div className="mx-auto flex h-16 min-h-[4.5rem] w-full max-w-lg items-center justify-around sm:h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
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
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

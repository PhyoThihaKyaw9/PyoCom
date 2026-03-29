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
    <div className="flex flex-col h-screen bg-[#f0fdf4]">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto">
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
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
                <span className="text-[10px] text-gray-400">{item.labelEn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

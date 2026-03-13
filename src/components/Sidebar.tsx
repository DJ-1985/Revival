"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Music,
  Megaphone,
  Image as ImageIcon,
  Presentation,
  Settings,
  Activity,
  LogOut,
  X,
  Building2,
  Book,
  ListMusic,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scripture", href: "/scripture", icon: BookOpen },
  { name: "Lyrics", href: "/lyrics", icon: Music },
  { name: "Announcements", href: "/announcements", icon: Megaphone },
  { name: "Media", href: "/media", icon: ImageIcon },
  { name: "Presentations", href: "/presentations", icon: Presentation },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Session", href: "/controller", icon: Activity },
];

const systemAdminNav = [
  { name: "Churches", href: "/system-admin/churches", icon: Building2 },
  { name: "Bible Versions", href: "/system-admin/bible-versions", icon: Book },
  { name: "Songs", href: "/system-admin/songs", icon: ListMusic },
];

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Main role-based filtering
  const navItems = mainNavItems.filter((item) => {
    if (!userRole) return false;

    switch (userRole) {
      case "System Admin":
        return item.name !== "Announcements" && item.name !== "Media";

      case "Church Admin":
        return true;

      case "Controller":
        return item.name !== "Settings";

      case "Band User":
        return item.name === "Dashboard" || item.name === "Lyrics";

      case "General User":
        return (
          item.name === "Dashboard" ||
          item.name === "Scripture" ||
          item.name === "Lyrics"
        );

      default:
        return false;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userChurch");
    localStorage.removeItem("isAuthenticated");
    router.push("/");
  };

  const SidebarContent = (
    <>
      {/* Logo */}
      <div className="p-2 xl:p-3 flex items-center justify-between mb-3">
        <div className="max-w-[190px] lg:max-w-none">
          <Image
            src="/revival-centres-logo.svg"
            alt="Logo"
            width={212}
            height={40}
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.href);

                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          );
        })}

        {/* SYSTEM ADMIN SECTION */}
        {userRole === "System Admin" && (
          <>
            <div className="pt-6 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              System Admin
            </div>

            {systemAdminNav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href);

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);

                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-2 xl:p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl px-4 py-3 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        {isSidebarOpen && (
          <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col h-screen">
            {SidebarContent}
          </aside>
        )}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              className="fixed lg:hidden w-[260px] bg-white border-r border-gray-100 flex flex-col h-screen z-40 shadow-2xl"
            >
              {SidebarContent}
            </motion.aside>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

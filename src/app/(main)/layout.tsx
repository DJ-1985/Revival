"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // AUTH + ROLE GUARD
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");

    // Not logged in
    if (!isAuth) {
      router.push("/");
      return;
    }

    if (role) {
      const roleRoutes: Record<string, string[]> = {
        "System Admin": [
          "/dashboard",
          "/scripture",
          "/lyrics",
          "/announcements",
          "/media",
          "/presentations",
          "/settings",
          "/controller",
          "/session",
          "/system-admin",
        ],
        "Church Admin": [
          "/dashboard",
          "/scripture",
          "/lyrics",
          "/announcements",
          "/media",
          "/presentations",
          "/settings",
          "/controller",
          "/session",
        ],
        Controller: [
          "/dashboard",
          "/scripture",
          "/lyrics",
          "/announcements",
          "/media",
          "/presentations",
          "/controller",
          "/session",
        ],
        "Band User": ["/dashboard", "/lyrics"],
        "General User": ["/dashboard", "/scripture", "/lyrics"],
      };

      const allowedRoutes = roleRoutes[role] || [];

      const isAllowed = allowedRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (!isAllowed) {
        switch (role) {
          case "Controller":
            router.push("/dashboard");
            break;
          case "Band User":
            router.push("/dashboard");
            break;
          case "General User":
            router.push("/dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      }
    }

    setIsChecked(true);
  }, [pathname, router]);

  // Responsive sidebar default behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsSidebarOpen(true); // desktop
      } else {
        setIsSidebarOpen(false); // mobile
      }
    };

    // initial check
    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isChecked) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-900 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-3 md:p-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

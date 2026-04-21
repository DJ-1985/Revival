"use client";

import { Menu, UserCircle, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Header({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [church, setChurch] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // NEW: ref for dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic Title
  const getTitleFromPath = () => {
    if (!pathname) return "Dashboard";

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    const lastSegment = segments[segments.length - 1];

    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const title = getTitleFromPath();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userChurch");
    localStorage.removeItem("liveSession");

    router.push("/");
  };

  // Sync session state
  useEffect(() => {
    const updateSessionState = () => {
      const savedRole = localStorage.getItem("userRole");
      const savedChurch = localStorage.getItem("userChurch");

      setRole(savedRole);
      setChurch(savedChurch);
    };

    updateSessionState();
    window.addEventListener("storage", updateSessionState);

    return () => {
      window.removeEventListener("storage", updateSessionState);
    };
  }, []);

  // NEW: Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Role Badge Color Logic
  const getRoleBadgeStyle = () => {
    switch (role) {
      case "System Admin":
        return "bg-purple-50 text-purple-600";
      case "Church Admin":
        return "bg-blue-50 text-blue-600";
      case "Controller":
        return "bg-green-50 text-green-600";
      case "Band User":
        return "bg-orange-50 text-orange-600";
      case "General User":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-2 md:px-6 z-20">
      {/* Left */}
      <div className="flex items-center space-x-1 md:space-x-4">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <Menu size={20} />
        </button>

        <h2 className="hidden lg:block text-base md:text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <div className="max-w-[130px] lg:hidden block">
          <Image
            src="/revival-centres-logo.svg"
            alt="Logo"
            width={130}
            height={26}
            priority
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-1.5 md:space-x-6 relative">
        {/* Church + Role */}
        <div className="flex flex-col items-end">
          <span
            className="text-xs md:text-sm font-semibold text-gray-900 max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis 
md:max-w-none md:whitespace-normal md:overflow-visible"
          >
            {church || "Church"}
          </span>

          {role && (
            <span
              className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getRoleBadgeStyle()}`}
            >
              {role}
            </span>
          )}
        </div>

        {/* User Icon + Dropdown */}
        {/* IMPORTANT: ref added here */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 cursor-pointer"
          >
            <UserCircle size={20} className="md:w-6 md:h-6" />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/profile");
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <UserCircle size={16} />
                <span>Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

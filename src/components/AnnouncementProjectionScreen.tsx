"use client";

import { useState, useEffect } from "react";

interface AnnouncementProjectionScreenProps {
  title: string;
  text: string;
  onClose: () => void;
}

export default function AnnouncementProjectionScreen({
  title,
  text,
  onClose,
}: AnnouncementProjectionScreenProps) {
  const [isBlank, setIsBlank] = useState(false);

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key.toLowerCase() === "b") {
        setIsBlank((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col">

      {!isBlank ? (
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-20 lg:px-40 py-20 space-y-16">
            {/* Small Top Label */}
            <p className="tracking-[0.4em] text-xs md:text-sm text-gray-400 font-semibold uppercase">
              Announcement
            </p>

            {/* Main Content */}
            <div className="max-w-6xl">
              <p className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-snug text-gray-900 whitespace-pre-line">
                {text}
              </p>
            </div>
          </div>

          {/* Bottom Title Branding */}
          <div className="flex justify-end px-6 md:px-20 pb-8">
            <div className="text-orange-600 text-lg md:text-3xl font-bold italic text-right">
              {title}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-black/80" />
      )}
    </div>
  );
}

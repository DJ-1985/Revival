"use client";

import { useState, useEffect } from "react";

interface LyricsProjectionScreenProps {
  title: string;
  text: string;
  composer: string;
  copyright: string;
  ccli: string;
  onClose: () => void;
}

export default function LyricsProjectionScreen({
  title,
  text,
  composer,
  copyright,
  ccli,
  onClose,
}: LyricsProjectionScreenProps) {
  const [isBlank, setIsBlank] = useState(false);

  // Keyboard Controls (Hidden from UI)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key.toLowerCase() === "b") setIsBlank((prev) => !prev);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col">
      {!isBlank ? (
        <>
          <div className="flex-1 overflow-y-auto scroll-smooth">
            <div className="min-h-full flex flex-col items-center justify-center text-center px-6 md:px-20 lg:px-40 py-20 relative">
              {/* CENTER CONTENT */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {/* Song Name */}
                <p className="text-sm md:text-base tracking-widest text-gray-500 font-semibold uppercase">
                  {title}
                </p>

                {/* Lyrics */}
                <div className="max-w-6xl pb-6">
                  <p className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-[1.25] text-black whitespace-pre-line">
                    {text}
                  </p>
                </div>
              </div>

              {/* BOTTOM LEFT META */}
              <div className="absolute bottom-8 text-start left-12 md:left-12 text-xs md:text-sm text-gray-600 font-semibold space-y-1">
                <p>
                  Number in Database - {title} - {composer}
                </p>
                <p>Scripture Reference - {copyright}</p>
                <p>CCLI Licence number #{ccli}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 bg-black" />
      )}
    </div>
  );
}

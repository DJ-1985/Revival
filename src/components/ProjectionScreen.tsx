"use client";

import { useState, useEffect } from "react";

interface ProjectionProps {
  type: "scripture" | "lyrics";
  title?: string;
  text: string;
  reference?: string;
  version?: string;
  composer?: string;
  copyright?: string;
  ccli?: string;
  slideInfo?: string;
  onClose: () => void;
}

export default function ProjectionScreen({
  type,
  title,
  text,
  reference,
  version,
  copyright,
  ccli,
  onClose,
}: ProjectionProps) {
  const [isBlank, setIsBlank] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  /* ---------------- Load Session ---------------- */

  useEffect(() => {
    const activeSession = localStorage.getItem("liveSessionId");
    setSessionId(activeSession);
  }, []);

  /* ---------------- Blank Screen Sync ---------------- */

  useEffect(() => {
    if (!sessionId) return;

    const checkBlank = () => {
      const savedBlank = localStorage.getItem(`blankScreen_${sessionId}`);
      setIsBlank(savedBlank === "true");
    };

    checkBlank();

    const interval = setInterval(checkBlank, 250);

    return () => clearInterval(interval);
  }, [sessionId]);

  /* ---------------- ESC Close ---------------- */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col">
      {!isBlank ? (
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="min-h-full flex flex-col items-center justify-center text-center px-6 md:px-20 lg:px-40 py-20 relative">
            {/* Lyrics Title */}
            {type === "lyrics" && title && (
              <h1 className="absolute top-8 tracking-[0.4em] text-xs md:text-sm text-gray-400 uppercase">
                {title}
              </h1>
            )}

            {/* Main Text */}
            <p className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-snug text-gray-900 max-w-6xl whitespace-pre-line">
              {text}
            </p>

            {/* Scripture Reference */}
            {type === "scripture" && reference && (
              <div className="mt-10 flex flex-col items-center space-y-3">
                <p className="text-orange-600 text-xl md:text-3xl font-bold">
                  {reference}
                </p>

                {version && (
                  <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase font-bold">
                    {version}
                  </p>
                )}
              </div>
            )}

            {/* Lyrics Footer */}
            {type === "lyrics" && title && (
              <p className="absolute bottom-20 right-20 text-orange-600 text-2xl md:text-3xl font-bold italic">
                {title}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-black" />
      )}
    </div>
  );
}

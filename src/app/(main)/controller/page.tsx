"use client";

import { useState, useEffect } from "react";
import {
  Square,
  MonitorX,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export default function ControllerPage() {
  const [isLive, setIsLive] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const SESSION_TITLE = "Sunday Worship Service";

  /* ---------------- LOAD SESSION ---------------- */

  useEffect(() => {
    const savedSession = localStorage.getItem("liveSessionId");

    if (savedSession) {
      setSessionId(savedSession);
      setIsLive(true);

      const blank = localStorage.getItem(`blankScreen_${savedSession}`);
      const slide = localStorage.getItem(`currentSlideIndex_${savedSession}`);

      if (blank === "true") setIsBlank(true);
      if (slide) setCurrentSlide(Number(slide));
    }
  }, []);

  /* ---------------- SYNC STATE ---------------- */

  useEffect(() => {
    if (!sessionId) return;

    localStorage.setItem(`blankScreen_${sessionId}`, isBlank.toString());
    localStorage.setItem(
      `currentSlideIndex_${sessionId}`,
      currentSlide.toString(),
    );
  }, [isBlank, currentSlide, sessionId]);

  /* ---------------- END SESSION ---------------- */

  const endSession = () => {
    if (sessionId) {
      localStorage.removeItem(`blankScreen_${sessionId}`);
      localStorage.removeItem(`currentSlideIndex_${sessionId}`);
      localStorage.removeItem(`currentProjection_${sessionId}`);
    }

    localStorage.removeItem("liveSessionId");

    setIsLive(false);
    setIsBlank(false);
    setCurrentSlide(0);
    setSessionId(null);
  };

  const nextSlide = () => setCurrentSlide((prev) => prev + 1);

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };

  const resetSlide = () => setCurrentSlide(0);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md border border-gray-100 px-6 py-8 md:p-12 text-center space-y-6 md:space-y-8">
        {/* STATUS */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">
            Status
          </span>

          <div
            className={`px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
              isLive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isLive ? "bg-green-600 animate-pulse" : "bg-gray-400"
              }`}
            />
            <span>{isLive ? "Active" : "Inactive"}</span>
          </div>
        </div>

        {/* NO ACTIVE SESSION */}
        {!isLive && (
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              No Active Session
            </h2>

            <p className="text-gray-500 text-sm">
              Start session to begin broadcasting.
            </p>
          </div>
        )}

        {/* ACTIVE SESSION */}
        {isLive && (
          <>
            <div className="space-y-3">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">
                Session Title
              </span>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {SESSION_TITLE}
              </h1>

              <p className="text-gray-500 text-sm">
                {isBlank
                  ? "Screen is currently blanked."
                  : "This session is currently broadcasting live."}
              </p>
            </div>

            {/* SLIDE CONTROLS */}
            {!isBlank && (
              <div className="flex justify-center items-center space-x-4 md:space-x-6 mt-2">
                <button
                  onClick={prevSlide}
                  className="p-2 md:p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="text-sm md:text-lg font-semibold text-gray-700">
                  Slide {currentSlide + 1}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 md:p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={resetSlide}
                  className="p-2 md:p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
              <button
                onClick={() => setIsBlank(!isBlank)}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold transition text-sm ${
                  isBlank
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <MonitorX size={16} />
                  <span>{isBlank ? "Unblank Screen" : "Blank Screen"}</span>
                </span>
              </button>

              <button
                onClick={endSession}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold bg-gray-800 hover:bg-gray-900 text-white transition text-sm"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Square size={16} />
                  <span>End Session</span>
                </span>
              </button>
            </div>

            {!isBlank && (
              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Broadcasting Live
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

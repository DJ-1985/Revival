"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize, Minimize, Wifi } from "lucide-react";

interface Props {
  onClose: () => void;
}

interface Slide {
  id: number;
  url: string;
}

interface MediaItem {
  id: number;
  type: "Image" | "Video";
  url: string;
}

interface ProjectionData {
  type: "scripture" | "lyrics" | "announcement" | "presentation" | "media";
  text?: string;
  reference?: string;
  version?: string;
  title?: string;

  composer?: string;
  copyright?: string;
  ccli?: string;

  slides?: Slide[];

  mediaItems?: MediaItem[];
  currentIndex?: number;
}

export default function LiveSessionView({ onClose }: Props) {
  const [projection, setProjection] = useState<ProjectionData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeSession = localStorage.getItem("liveSessionId");
    setSessionId(activeSession);

    const loadProjection = () => {
      if (!activeSession) {
        setProjection(null);
        return;
      }

      const stored = localStorage.getItem(`currentProjection_${activeSession}`);
      const blank = localStorage.getItem(`blankScreen_${activeSession}`);
      const slideIndex = localStorage.getItem(
        `currentSlideIndex_${activeSession}`,
      );

      if (stored) {
        setProjection(JSON.parse(stored));
      } else {
        setProjection(null);
      }

      setIsBlank(blank === "true");

      if (slideIndex) {
        setCurrentSlide(Number(slideIndex));
      }
    };

    loadProjection();
    const interval = setInterval(loadProjection, 400);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentSlideData =
    projection?.type === "presentation" &&
    projection.slides &&
    projection.slides[currentSlide];

  const currentMedia =
    projection?.type === "media" &&
    projection.mediaItems &&
    projection.mediaItems[projection.currentIndex ?? 0];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-gray-50 flex flex-col overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-orange-500/30 text-orange-600 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Live Feed
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-white hover:bg-orange-50 hover:text-orange-600 rounded-2xl shadow-md transition-all text-gray-500"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>

          <button
            onClick={onClose}
            className="p-3 bg-white hover:bg-orange-50 hover:text-orange-600 rounded-2xl shadow-md transition-all text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 pt-20 mb-3">
        <AnimatePresence mode="wait">
          {/* Blank Screen */}
          {isBlank ? (
            <motion.div key="blank" className="w-full h-full bg-black" />
          ) : !projection ? (
            <motion.div
              key="waiting"
              className="text-center space-y-6 max-w-md"
            >
              <div className="relative flex justify-center">
                <div className="absolute w-20 h-20 bg-gray-200 rounded-full animate-ping opacity-20" />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100">
                  <Wifi size={32} className="text-gray-300" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                  Waiting for content...
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  The controller has not projected anything yet.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="live"
              className="w-full h-full flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl p-6 md:p-16 text-center"
            >
              {/* Lyrics Title */}
              {projection.type === "lyrics" && projection.title && (
                <h1 className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-10">
                  {projection.title}
                </h1>
              )}

              {/* Announcement */}
              {projection.type === "announcement" && (
                <h1 className="text-2xl md:text-4xl font-black text-orange-600 mb-8">
                  Announcement
                </h1>
              )}

              {/* Presentation */}
              {projection.type === "presentation" && currentSlideData && (
                <div className="flex flex-col items-center">
                  <Image
                    src={currentSlideData.url}
                    alt="slide"
                    width={1200}
                    height={800}
                    className="max-h-[70vh] object-contain rounded-xl"
                  />

                  <p className="text-sm text-gray-400 mt-6 tracking-wide">
                    Slide {currentSlide + 1} / {projection.slides?.length}
                  </p>
                </div>
              )}

              {/* Media */}
              {projection.type === "media" && currentMedia && (
                <div className="flex flex-col items-center">
                  {currentMedia.type === "Image" ? (
                    <Image
                      src={currentMedia.url}
                      alt="media"
                      width={1200}
                      height={800}
                      className="max-h-[70vh] object-contain rounded-xl"
                    />
                  ) : (
                    <video
                      src={currentMedia.url}
                      controls
                      autoPlay
                      className="max-h-[70vh] object-contain rounded-xl"
                    />
                  )}
                </div>
              )}

              {/* Lyrics / Scripture Text */}
              {projection.type !== "presentation" &&
                projection.type !== "media" && (
                  <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 italic leading-snug max-w-6xl whitespace-pre-line">
                    {projection.text}
                  </p>
                )}

              {/* Lyrics Meta */}
              {projection.type === "lyrics" && (
                <div className="mt-10 space-y-2 text-sm text-gray-600 font-semibold">
                  {projection.composer && (
                    <p>
                      Number in Database - {projection.title} -{" "}
                      {projection.composer}
                    </p>
                  )}

                  {projection.copyright && (
                    <p>Scripture Reference - {projection.copyright}</p>
                  )}

                  {projection.ccli && (
                    <p>CCLI Licence number #{projection.ccli}</p>
                  )}
                </div>
              )}

              {/* Scripture Meta */}
              {projection.type === "scripture" && (
                <div className="mt-10 space-y-3">
                  {projection.reference && (
                    <p className="text-orange-600 text-xl md:text-3xl font-bold">
                      {projection.reference}
                    </p>
                  )}

                  {projection.version && (
                    <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase font-bold">
                      {projection.version}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

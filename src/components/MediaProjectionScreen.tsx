"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: number;
  type: "Image" | "Video";
  url: string;
}

interface Props {
  mediaItems: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MediaProjectionScreen({
  mediaItems,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: Props) {
  const currentMedia = mediaItems[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev, onClose]);

  return (
    <div className="fixed inset-0 z-[400] bg-white flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-600 hover:text-black transition z-50"
      >
        <X size={30} />
      </button>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-2 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
      >
        <ChevronRight size={28} />
      </button>

      {/* Media Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {currentMedia?.type === "Image" ? (
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh]">
            <Image
              src={currentMedia.url}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <video
            src={currentMedia?.url}
            controls
            autoPlay
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow"
          />
        )}
      </div>
    </div>
  );
}

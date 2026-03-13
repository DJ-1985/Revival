"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface Slide {
  id: number;
  url: string;
}

interface Props {
  slides: Slide[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PresentationProjectionScreen({
  slides,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: Props) {
  const currentSlide = slides[currentIndex];

  // Keyboard / Bluetooth remote support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        onNext();
      }

      if (e.key === "ArrowLeft") {
        onPrev();
      }

      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev, onClose]);

  if (!currentSlide) return null;

  return (
    <div className="fixed inset-0 z-[400] bg-white flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-600 hover:text-black transition z-50"
      >
        <X size={32} />
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-2 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-[95vw] max-h-[95vh]">
          <Image
            src={currentSlide.url}
            alt="slide"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

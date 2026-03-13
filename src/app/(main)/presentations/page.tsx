"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  FileText,
  Presentation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UploadPresentationModal from "@/components/UploadPresentationModal";
import PresentationProjectionScreen from "@/components/PresentationProjectionScreen";
import Image from "next/image";

interface Slide {
  id: number;
  url: string;
}

interface PresentationItem {
  id: number;
  name: string;
  type: "PPT" | "PDF";
  date: string;
  slides: Slide[];
}

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<PresentationItem[]>([
    {
      id: 1,
      name: "Sunday Morning Service.pptx",
      type: "PPT",
      date: "2024-02-23",
      slides: [
        { id: 1, url: "https://picsum.photos/600/400?1" },
        { id: 2, url: "https://picsum.photos/600/400?2" },
        { id: 3, url: "https://picsum.photos/600/400?3" },
      ],
    },
    {
      id: 2,
      name: "Youth Group Lesson.pdf",
      type: "PDF",
      date: "2024-02-22",
      slides: [
        { id: 1, url: "https://picsum.photos/600/400?4" },
        { id: 2, url: "https://picsum.photos/600/400?5" },
      ],
    },
  ]);

  const [activePresentation, setActivePresentation] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  /* ---------------- SESSION HELPER ---------------- */

  const getOrCreateSession = () => {
    let session = localStorage.getItem("liveSessionId");

    if (!session) {
      session = "session_" + Date.now();
      localStorage.setItem("liveSessionId", session);
    }

    return session;
  };

  useEffect(() => {
    const activeSession = localStorage.getItem("liveSessionId");
    if (activeSession) setSessionId(activeSession);
  }, []);

  const presentation = presentations[activePresentation];
  const slides = presentation?.slides || [];
  const selectedSlide = slides[activeSlide];

  const handlePresent = () => {
    const session = getOrCreateSession();
    setSessionId(session);

    localStorage.setItem(`blankScreen_${session}`, "false");

    const projectionData = {
      type: "presentation",
      slides: slides,
      slideIndex: activeSlide,
    };

    localStorage.setItem(
      `currentProjection_${session}`,
      JSON.stringify(projectionData),
    );

    localStorage.setItem(`currentSlideIndex_${session}`, String(activeSlide));
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl font-bold text-gray-800">Presentations</h2>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
        >
          <Plus size={18} />
          <span className="text-sm">Add Presentation</span>
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT PANEL */}
        <div className="col-span-12 lg:col-span-4 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">File Name</h3>
          </div>

          <div className="divide-y">
            {presentations.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setActivePresentation(index);
                  setActiveSlide(0);
                }}
                className={`px-3 md:px-4 py-2 cursor-pointer flex items-center justify-between border-gray-200 hover:bg-gray-50 ${
                  activePresentation === index ? "bg-orange-50" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      item.type === "PPT"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.type === "PPT" ? (
                      <Presentation size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                  </div>

                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPresentations((prev) =>
                      prev.filter((p) => p.id !== item.id),
                    );
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE PANEL */}
        <div className="col-span-12 lg:col-span-3 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">Slides</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 p-3 md:p-4">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`cursor-pointer border rounded-xl overflow-hidden ${
                  activeSlide === index
                    ? "border-orange-500"
                    : "border-gray-100"
                }`}
              >
                <div className="aspect-video relative">
                  <Image src={slide.url} alt="" fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-12 lg:col-span-5 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-3 md:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">Preview</h3>

            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === 0 ? slides.length - 1 : prev - 1,
                  )
                }
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === slides.length - 1 ? 0 : prev + 1,
                  )
                }
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {selectedSlide && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="p-3 md:p-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={selectedSlide.url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="p-3 md:p-4 bg-gray-50/50 border-t border-gray-100 flex space-x-3">
                <button
                  onClick={() => {
                    handlePresent();
                    setIsPresenting(true);
                  }}
                  className="flex-1 text-sm bg-orange-600 text-white font-semibold px-2 py-3 rounded-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
                >
                  Present Screen
                </button>

                <button className="flex-1 bg-black text-white font-semibold px-2 py-3 text-sm rounded-xl hover:bg-gray-900 transition-all">
                  Blank Screen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isUploadOpen && (
        <UploadPresentationModal
          existingCount={presentations.length}
          onClose={() => setIsUploadOpen(false)}
          onSave={(data) =>
            setPresentations((prev) => [
              {
                ...data,
                slides: [
                  {
                    id: 1,
                    url:
                      "https://picsum.photos/600/400?random=" + Math.random(),
                  },
                  {
                    id: 2,
                    url:
                      "https://picsum.photos/600/400?random=" + Math.random(),
                  },
                  {
                    id: 3,
                    url:
                      "https://picsum.photos/600/400?random=" + Math.random(),
                  },
                ],
              },
              ...prev,
            ])
          }
        />
      )}

      {isPresenting && (
        <PresentationProjectionScreen
          slides={slides}
          currentIndex={activeSlide}
          onClose={() => setIsPresenting(false)}
          onNext={() =>
            setActiveSlide((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1,
            )
          }
          onPrev={() =>
            setActiveSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1,
            )
          }
        />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  Play,
  Presentation,
} from "lucide-react";
import UploadMediaModal from "@/components/UploadMediaModal";
import MediaProjectionScreen from "@/components/MediaProjectionScreen";

interface MediaItem {
  id: number;
  type: "Image" | "Video";
  url: string;
}

interface MediaBundle {
  id: number;
  name: string;
  items: MediaItem[];
}

export default function MediaPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [bundles, setBundles] = useState<MediaBundle[]>([
    {
      id: 1,
      name: "Outreach Photos / Video",
      items: [
        {
          id: 1,
          type: "Image",
          url: "https://picsum.photos/600/400?random=11",
        },
        {
          id: 2,
          type: "Image",
          url: "https://picsum.photos/600/400?random=12",
        },
        {
          id: 3,
          type: "Video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ],
    },
    {
      id: 2,
      name: "Youth Group Camp",
      items: [
        {
          id: 4,
          type: "Image",
          url: "https://picsum.photos/600/400?random=13",
        },
        {
          id: 5,
          type: "Image",
          url: "https://picsum.photos/600/400?random=14",
        },
        {
          id: 6,
          type: "Video",
          url: "https://www.w3schools.com/html/movie.mp4",
        },
      ],
    },
    {
      id: 3,
      name: "BBQ Event Photos",
      items: [
        {
          id: 7,
          type: "Image",
          url: "https://picsum.photos/600/400?random=15",
        },
        {
          id: 8,
          type: "Image",
          url: "https://picsum.photos/600/400?random=16",
        },
        {
          id: 9,
          type: "Image",
          url: "https://picsum.photos/600/400?random=17",
        },
      ],
    },
  ]);

  const [activeBundleIndex, setActiveBundleIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);

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

  const activeBundle = bundles[activeBundleIndex];
  const mediaItems = activeBundle?.items || [];
  const selectedMedia = mediaItems[currentIndex];

  const handleNext = () => {
    if (!mediaItems.length) return;
    const next = (currentIndex + 1) % mediaItems.length;
    setCurrentIndex(next);
  };

  const handlePrev = () => {
    if (!mediaItems.length) return;
    const prev = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setCurrentIndex(prev);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl font-bold text-gray-800">Media Library</h2>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
        >
          <Upload size={18} />
          <span className="text-sm">Upload Media</span>
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANEL */}
        <div className="lg:col-span-3 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">
              Media Bundles
            </h3>
          </div>

          <div className="space-y-2 p-2">
            {bundles.map((bundle, index) => (
              <button
                key={bundle.id}
                onClick={() => {
                  setActiveBundleIndex(index);
                  setCurrentIndex(0);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm font-medium truncate text-gray-600 ${
                  index === activeBundleIndex
                    ? "bg-orange-50 border border-orange-100 text-gray-900"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                {bundle.name}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE PANEL */}
        <div className="lg:col-span-4 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">Media Items</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 p-3 md:p-4">
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer rounded-xl overflow-hidden border ${
                  index === currentIndex
                    ? "border-orange-500"
                    : "border-gray-100"
                }`}
              >
                <div className="aspect-video relative bg-gray-100">
                  {item.type === "Image" ? (
                    <Image
                      src={item.url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {item.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play
                        size={28}
                        className="text-white bg-black/50 rounded-full p-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-5 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-3 md:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">
              Media Preview
            </h3>

            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {selectedMedia && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="p-3 md:p-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  {selectedMedia.type === "Image" ? (
                    <Image
                      src={selectedMedia.url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={selectedMedia.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="p-3 md:p-4 bg-gray-50/50 border-t border-gray-100 flex space-x-3">
                {/* PRESENT SCREEN */}
                <button
                  onClick={() => {
                    const session = getOrCreateSession();
                    setSessionId(session);
                    localStorage.setItem(`blankScreen_${session}`, "false");
                    localStorage.setItem(
                      `currentProjection_${session}`,
                      JSON.stringify({
                        type: "media",
                        mediaItems: mediaItems,
                        currentIndex: currentIndex,
                      }),
                    );
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

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadMediaModal
          onClose={() => setIsUploadOpen(false)}
          onSave={({ bundleName, files }) => {
            const newItems: MediaItem[] = files.map((file) => ({
              id: Math.random(),
              type: file.type.startsWith("video") ? "Video" : "Image",
              url: URL.createObjectURL(file),
            }));

            const newBundle: MediaBundle = {
              id: Math.random(),
              name: bundleName,
              items: newItems,
            };

            setBundles((prev) => [...prev, newBundle]);
            setActiveBundleIndex(bundles.length);
            setCurrentIndex(0);
          }}
        />
      )}

      {/* Projection Screen */}
      {isPresenting && (
        <MediaProjectionScreen
          mediaItems={mediaItems}
          currentIndex={currentIndex}
          onClose={() => setIsPresenting(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

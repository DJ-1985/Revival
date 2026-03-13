"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddAnnouncementModal from "@/components/AddAnnouncementModal";
import AnnouncementProjectionScreen from "@/components/AnnouncementProjectionScreen";

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: "Text" | "Image" | "Video";
  date: string;
}

export default function AnnouncementsPage() {
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Sunday Service Update",
      content:
        "Hey Church Family! Don't forget our Potluck & Game Night is this Friday at 6:30 PM in the Fellowship Hall! Bring a dish to share and your favorite board game. Childcare is provided. See you there!",
      type: "Text",
      date: "2024-02-23",
    },
    {
      id: 2,
      title: "Youth Camp Registration",
      content: "Youth Camp registration is now open. Limited seats available.",
      type: "Image",
      date: "2024-02-22",
    },
    {
      id: 3,
      title: "Community Outreach Program",
      content: "Join us for community outreach this weekend.",
      type: "Video",
      date: "2024-02-20",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      type: "Text",
      date: "2024-02-22",
    },
    {
      id: 5,
      title: "It is a long established fact that",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      type: "Text",
      date: "2024-02-20",
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectionOpen, setIsProjectionOpen] = useState(false);
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

  const selectedAnnouncement = announcements[selectedIndex];

  const handlePresent = () => {
    const session = getOrCreateSession();
    setSessionId(session);

    localStorage.setItem(`blankScreen_${session}`, "false");

    const projectionData = {
      type: "announcement",
      title: selectedAnnouncement.title,
      text: selectedAnnouncement.content,
    };

    localStorage.setItem(
      `currentProjection_${session}`,
      JSON.stringify(projectionData),
    );

    setIsProjectionOpen(true);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < announcements.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Announcements</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition shadow-lg shadow-orange-600/20"
          >
            <Plus size={18} />
            <span className="text-sm">Add New</span>
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT TABLE */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/60 border-b border-gray-100">
                  <tr>
                    <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[200px]">
                      Title
                    </th>
                    <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[100px]">
                      Type
                    </th>
                    <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[150px]">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {announcements.map((item, index) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedIndex(index)}
                      className={`cursor-pointer transition ${
                        selectedIndex === index
                          ? "bg-orange-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium text-gray-700">
                        {item.title}
                      </td>

                      <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.type === "Text"
                              ? "bg-blue-50 text-blue-600"
                              : item.type === "Image"
                                ? "bg-purple-50 text-purple-600"
                                : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {item.type === "Text" && <FileText size={12} />}
                          {item.type === "Image" && <ImageIcon size={12} />}
                          {item.type === "Video" && <Video size={12} />}
                          <span>{item.type}</span>
                        </span>
                      </td>

                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="w-full lg:w-96 flex flex-col">
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="p-3 md:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <h3 className="text-sm font-semibold text-gray-700">
                  Announcement Preview
                </h3>

                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={selectedIndex === 0}
                    className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={selectedIndex === announcements.length - 1}
                    className="p-1.5 hover:bg-gray-100 rounded-lg disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-3 md:p-4 flex items-center justify-center text-center">
                <p className="text-base md:text-lg font-medium text-gray-900 leading-relaxed whitespace-pre-line">
                  {selectedAnnouncement.content}
                </p>
              </div>

              {/* Buttons */}
              <div className="p-3 md:p-4 bg-gray-50/50 border-t border-gray-100 flex space-x-3">
                <button
                  onClick={handlePresent}
                  className="flex-1 text-sm bg-orange-600 text-white font-semibold px-2 py-3 rounded-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
                >
                  Present Screen
                </button>

                <button className="flex-1 bg-black text-white font-semibold px-2 py-3 text-sm rounded-xl hover:bg-gray-900 transition-all">
                  Blank Screen
                </button>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <AddAnnouncementModal
            onClose={() => setIsModalOpen(false)}
            onSave={() => {}}
          />
        )}
      </div>

      {isProjectionOpen && (
        <AnnouncementProjectionScreen
          title={selectedAnnouncement.title}
          text={selectedAnnouncement.content}
          onClose={() => setIsProjectionOpen(false)}
        />
      )}
    </>
  );
}

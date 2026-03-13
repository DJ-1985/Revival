"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ProjectionScreen from "@/components/ProjectionScreen";

export default function ScripturePage() {
  const bibleVersions = ["KJV", "AMP", "NIV", "NKJV"];

  const [bibleVersion, setBibleVersion] = useState("KJV");
  const [bibleBook] = useState("John");
  const [bibleChapter, setBibleChapter] = useState("3");
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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

  const mockVerses = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    text: `This is the text for ${bibleBook} ${bibleChapter}:${i + 1}. It contains powerful words of wisdom and grace for all who read and meditate upon it.`,
  }));

  useEffect(() => {
    setSelectedVerseIndex(0);
  }, [bibleBook, bibleChapter]);

  const updateProjection = (index: number, session: string) => {
    const projectionData = {
      type: "scripture",
      text: mockVerses[index].text,
      reference: `${bibleBook} ${bibleChapter}:${mockVerses[index].number}`,
      version: bibleVersion,
    };

    localStorage.setItem(
      `currentProjection_${session}`,
      JSON.stringify(projectionData),
    );
  };

  /* ---------------- Chapter Navigation ---------------- */

  const handlePrevChapter = () => {
    const chapter = Number(bibleChapter);
    if (chapter > 1) {
      setBibleChapter(String(chapter - 1));
    }
  };

  const handleNextChapter = () => {
    const chapter = Number(bibleChapter);
    setBibleChapter(String(chapter + 1));
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Scriptures, Bible, Verses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Chapter Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={handlePrevChapter}
          className="px-4 md:px-6 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-80"
        >
          Previous Chapter
        </button>

        <button
          onClick={handleNextChapter}
          className="px-4 md:px-6 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-80"
        >
          Next Chapter
        </button>
      </div>

      {/* Version Tabs */}
      <div className="flex justify-center gap-3 flex-wrap">
        {bibleVersions.map((version) => (
          <button
            key={version}
            onClick={() => {
              setBibleVersion(version);

              if (!sessionId) return;

              updateProjection(selectedVerseIndex, sessionId);
            }}
            className={`px-4 md:px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              bibleVersion === version
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "bg-black text-white hover:opacity-80"
            }`}
          >
            {version}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Panel */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">
              {bibleBook} {bibleChapter}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-1 custom-scrollbar">
            {mockVerses.map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedVerseIndex(i);

                  if (!sessionId) return;

                  localStorage.setItem(`blankScreen_${sessionId}`, "false");

                  updateProjection(i, sessionId);
                }}
                className={`w-full text-left p-3 md:p-4 rounded-xl transition-all ${
                  selectedVerseIndex === i
                    ? "bg-orange-50 border border-orange-100"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <span
                    className={`text-xs font-bold mt-1 ${
                      selectedVerseIndex === i
                        ? "text-orange-600"
                        : "text-gray-400"
                    }`}
                  >
                    {v.number}
                  </span>

                  <p
                    className={`text-sm leading-relaxed ${
                      selectedVerseIndex === i
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {v.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Preview */}
        <div className="w-full lg:w-96 flex flex-col">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Live Preview
              </h3>
              <span className="text-[12px] font-bold text-orange-600 uppercase tracking-widest">
                {bibleVersion}
              </span>
            </div>

            <div className="flex-1 p-3 md:p-4 flex flex-col items-center lg:justify-center text-center space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl font-medium leading-tight text-gray-900 italic">
                  &quot; {mockVerses[selectedVerseIndex].text} &quot;
                </p>

                <p className="text-orange-600 text-sm font-bold tracking-wide">
                  — {bibleBook} {bibleChapter}:
                  {mockVerses[selectedVerseIndex].number}
                </p>
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

                  updateProjection(selectedVerseIndex, session);

                  setIsProjectionOpen(true);
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
        </div>
      </div>

      {isProjectionOpen && (
        <ProjectionScreen
          type="scripture"
          text={mockVerses[selectedVerseIndex].text}
          reference={`${bibleBook} ${bibleChapter}:${mockVerses[selectedVerseIndex].number}`}
          version={bibleVersion}
          onClose={() => setIsProjectionOpen(false)}
        />
      )}
    </div>
  );
}

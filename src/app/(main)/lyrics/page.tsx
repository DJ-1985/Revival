"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import LyricsProjectionScreen from "@/components/LyricsProjectionScreen";

type Song = {
  id: number;
  number: string;
  title: string;
  composer: string;
  copyright: string;
  ccli: string;
  verses: string[];
};

const mockSongs: Song[] = [
  {
    id: 1,
    number: "001",
    title: "Amazing Grace",
    composer: "John Newton",
    copyright: "Public Domain",
    ccli: "123456",
    verses: [
      `Amazing grace! how sweet the sound,
      That saved a wretch; like me!
      I once was lost, but now am found,
      Was blind, but now I see.`,
      "Verse 2 sample text...",
      "Verse 3 sample text...",
      "Verse 4 sample text...",
    ],
  },
  {
    id: 2,
    number: "002",
    title: "How Great Thou Art",
    composer: "Carl Boberg",
    copyright: "Public Domain",
    ccli: "654321",
    verses: ["How great Thou art..."],
  },
  {
    id: 3,
    number: "003",
    title: "10,000 Reasons (Bless the Lord)",
    composer: "Matt Redman",
    copyright: "© 2011",
    ccli: "777888",
    verses: ["Bless the Lord O my soul..."],
  },
];

export default function LyricsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongId, setSelectedSongId] = useState(1);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
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

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.number.includes(searchQuery),
  );

  const selectedSong =
    mockSongs.find((s) => s.id === selectedSongId) ?? mockSongs[0];

  useEffect(() => {
    setCurrentVerseIndex(0);
  }, [selectedSongId]);

  const updateProjection = (verseIndex: number, session: string) => {
    localStorage.setItem(
      `currentProjection_${session}`,
      JSON.stringify({
        type: "lyrics",
        number: selectedSong.number,
        title: selectedSong.title,
        text: selectedSong.verses[verseIndex],
        composer: selectedSong.composer,
        copyright: selectedSong.copyright,
        ccli: selectedSong.ccli,
      }),
    );
  };

  return (
    <div className="flex flex-col h-full space-y-4 md:space-y-6">
      {/* Search */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by song name or song number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="flex-1 flex flex-col xl:flex-row gap-4 md:gap-6 xl:min-h-0">
        {/* LEFT - Songs */}
        <div className="w-full xl:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-auto max-xl:max-h-[300px] xl:max-h-none xl:min-h-none min-xl:min-h-[300px]">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">
              Songs ({filteredSongs.length})
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredSongs.map((song) => {
              const isActive = selectedSongId === song.id;
              return (
                <button
                  key={song.id}
                  onClick={() => {
                    setSelectedSongId(song.id);
                    setCurrentVerseIndex(0);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-orange-50 border border-orange-100"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-orange-200 text-orange-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {song.number}
                    </span>
                    <span
                      className={`text-sm font-medium truncate ${
                        isActive ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {song.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE - Verses */}
        <div className="w-full xl:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-auto max-xl:max-h-[300px] xl:max-h-none xl:min-h-none min-xl:min-h-[300px]">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">Verses</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {selectedSong.verses.map((verse, index) => {
              const isActive = index === currentVerseIndex;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentVerseIndex(index)}
                  className={`w-full text-left p-3 rounded-xl text-sm transition ${
                    isActive
                      ? "bg-gray-200 font-semibold"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {verse.substring(0, 60)}...
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT - Preview */}
        <div className="w-full xl:flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden xl:min-h-none min-xl:min-h-[300px]">
          <div className="p-3 md:p-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-sm font-semibold text-gray-700">
              Lyrics Preview
            </h3>
          </div>
          <div className="flex-1 p-3 md:p-4 flex flex-col items-center xl:justify-center text-center space-y-4 overflow-y-auto">
            <h2 className="text-1xl md:text-2xl font-bold">
              {selectedSong.title}
            </h2>
            <p className="text-1xl md:text-xl italic text-gray-700 whitespace-pre-line">
              {selectedSong.verses[currentVerseIndex]}
            </p>
            <div className="text-xs uppercase tracking-widest text-gray-400">
              Slide {currentVerseIndex + 1} / {selectedSong.verses.length}
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
                updateProjection(currentVerseIndex, session);
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

      {isProjectionOpen && (
        <LyricsProjectionScreen
          title={selectedSong.title}
          text={selectedSong.verses[currentVerseIndex]}
          composer={selectedSong.composer}
          copyright={selectedSong.copyright}
          ccli={selectedSong.ccli}
          onClose={() => setIsProjectionOpen(false)}
        />
      )}
    </div>
  );
}

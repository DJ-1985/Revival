"use client";

import {
  Activity,
  BookOpen,
  Music,
  Megaphone,
  Image as ImageIcon,
  Search,
  Play,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import LiveSessionView from "@/components/LiveSessionView";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const router = useRouter();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const isBandUser = userRole === "Band User";
  const isGeneralUser = userRole === "General User";
  const isAdmin = !isBandUser && !isGeneralUser;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
      {/* Active Session */}
      <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                Active Session Status
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Currently broadcasting to main sanctuary
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLiveOpen(true)}
            className="px-4 md:px-6 py-2 md:py-2.5 bg-orange-600 text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            Join Session
          </button>
        </div>
      </div>

      {/* Scripture Quick Search */}
      {(isGeneralUser || isAdmin) && (
        <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 mb-4">
            <BookOpen size={18} className="text-orange-600" />
            <span>Scripture Quick Search</span>
          </h3>

          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search verse (e.g. John 3:16)"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm"
              />
            </div>

            <button className="bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Lyrics Quick Search */}
      <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2 mb-4">
          <Music size={18} className="text-orange-600" />
          <span>Lyrics Quick Search</span>
        </h3>

        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search song title or lyrics..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            />
          </div>

          <button className="bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Admin Only Sections */}
      {isAdmin && (
        <>
          {/* Recent Announcements */}
          <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Megaphone size={18} className="text-orange-600" />
                <span>Recent Announcements</span>
              </h3>
              <button
                onClick={() => router.push("/announcements")}
                className="text-xs font-semibold text-orange-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {[
                { title: "Sunday Service Update", date: "2 hours ago" },
                { title: "Youth Camp Registration", date: "Yesterday" },
                { title: "Community Outreach Program", date: "2 days ago" },
                { title: "Lorem Ipsum is dummy text", date: "3 days ago" },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push("/announcements")}
                  className="flex items-center justify-between p-2 md:p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Media */}
          <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <ImageIcon size={18} className="text-orange-600" />
                <span>Recent Media</span>
              </h3>
              <button
                onClick={() => router.push("/media")}
                className="text-xs font-semibold text-orange-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  onClick={() => router.push("/media")}
                  className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer"
                >
                  <Image
                    src={`https://picsum.photos/seed/${i}/400/225`}
                    alt="Media preview"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={20} className="text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Presentations */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Monitor size={18} className="text-orange-600" />
                <span>Recent Presentations</span>
              </h3>
              <button
                onClick={() => router.push("/presentations")}
                className="text-xs font-semibold text-orange-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {[
                {
                  title: "Sunday Service Update",
                  slides: 4,
                  time: "2 hours ago",
                },
                {
                  title: "Youth Camp Registration",
                  slides: 1,
                  time: "Yesterday",
                },
                {
                  title: "Community Outreach Program",
                  slides: 3,
                  time: "3 days ago",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push("/presentations")}
                  className="flex items-center justify-between flex-wrap gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                >
                  <div className="flex items-center space-x-3 sm:min-w-3xs min-w-auto">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 md:flex hidden">
                    <span className="px-3 py-1 bg-orange-50 border border-orange-100 text-black/80 text-xs rounded-full">
                      {item.slides} Slides
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isLiveOpen && <LiveSessionView onClose={() => setIsLiveOpen(false)} />}
    </div>
  );
}

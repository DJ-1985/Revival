"use client";

import { useState } from "react";
import { Plus, Trash2, X, Pencil, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface Sheet {
  id: number;
  name: string;
  file: File;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  sheets: Sheet[];
}

export default function GlobalSongsPage() {
  const [songs, setSongs] = useState<Song[]>([
    { id: 1, title: "Amazing Grace", artist: "John Newton", sheets: [] },
    { id: 2, title: "How Great Thou Art", artist: "Carl Boberg", sheets: [] },
  ]);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [sheets, setSheets] = useState<Sheet[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSongId, setEditingSongId] = useState<number | null>(null);

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setSheets([]);
    setEditingSongId(null);
  };

  const addSong = () => {
    if (!title.trim()) return;

    const newSong: Song = {
      id: Date.now(),
      title,
      artist,
      sheets: [],
    };

    setSongs((prev) => [...prev, newSong]);

    resetForm();
    setIsModalOpen(false);
  };

  const updateSong = () => {
    if (!editingSongId) return;

    setSongs((prev) =>
      prev.map((song) =>
        song.id === editingSongId ? { ...song, title, artist, sheets } : song,
      ),
    );

    resetForm();
    setIsEditModalOpen(false);
  };

  const deleteSong = (id: number) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: Sheet[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file,
    }));

    setSheets((prev) => [...prev, ...newFiles]);
  };

  const removeSheet = (id: number) => {
    setSheets((prev) => prev.filter((f) => f.id !== id));
  };

  const openEditModal = (song: Song) => {
    setEditingSongId(song.id);
    setTitle(song.title);
    setArtist(song.artist);
    setSheets(song.sheets);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl font-bold text-gray-800">Songs</h2>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
        >
          <Plus size={18} />
          <span className="text-sm">Add Song</span>
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[150px]">
                  Song Title
                </th>

                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[150px]">
                  Artist
                </th>

                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[150px]">
                  Music Sheet
                </th>

                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {songs.map((song) => (
                <tr key={song.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 text-sm text-gray-700">
                    {song.title}
                  </td>

                  <td className="px-3 md:px-6 py-4 text-sm text-gray-500">
                    {song.artist}
                  </td>

                  <td className="px-3 md:px-6 py-4 text-sm text-gray-500">
                    {song.sheets.length} attachment
                  </td>

                  <td className="px-3 md:px-6 py-4 flex justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(song)}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteSong(song.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(isModalOpen || isEditModalOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {isEditModalOpen ? "Edit Song" : "Add Song"}
              </h3>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="p-2 hover:bg-gray-200 rounded-full text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Song Title
                </label>

                <input
                  type="text"
                  placeholder="Song Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Artist / Composer
                </label>

                <input
                  type="text"
                  placeholder="Artist / Composer"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>

              {isEditModalOpen ? (
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Music Sheet
                  </label>

                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
                    <Upload size={32} className="text-gray-400 mb-2" />

                    <p className="text-sm font-medium text-gray-700">
                      Drag & drop file here
                    </p>

                    <p className="text-xs text-gray-400">or click to upload</p>

                    <input
                      type="file"
                      multiple
                      accept=".xls,.xlsx,.csv"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Supported formats: xls, xlsx, csv
                  </p>

                  <div className="space-y-2">
                    {sheets.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg text-sm"
                      >
                        <span>{file.name}</span>

                        <button
                          onClick={() => removeSheet(file.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Song File
                  </label>

                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
                    <Upload size={32} className="text-gray-400 mb-2" />

                    <p className="text-sm font-medium text-gray-700">
                      Drag & drop song file
                    </p>

                    <p className="text-xs text-gray-400">or click to upload</p>

                    <input
                      type="file"
                      accept=".mp3,.wav,.aac"
                      className="hidden"
                    />
                  </label>

                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Supported formats: mp3, wav, aac
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 border-t border-gray-100 flex justify-end space-x-4 bg-gray-50/30">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="px-6 py-2.5 text-sm font-bold text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={isEditModalOpen ? updateSong : addSong}
                className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 shadow-xl shadow-orange-600/30"
              >
                {isEditModalOpen ? "Update Song" : "Save Song"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

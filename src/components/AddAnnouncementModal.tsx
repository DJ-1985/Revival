"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";

interface AddAnnouncementModalProps {
  onClose: () => void;
  onSave: (data: {
    title: string;
    text: string;
    type: "Text" | "Image" | "Video";
    backgroundImage: File | null;
  }) => void;
}

export default function AddAnnouncementModal({
  onClose,
  onSave,
}: AddAnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState<"Text" | "Image" | "Video">("Text");
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackgroundImage(file);
    }
  };

  const handleSave = () => {
    if (type === "Text" && !title.trim()) return;

    onSave({
      title,
      text,
      type,
      backgroundImage,
    });

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Add New Announcement
          </h3>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Announcement Type (TOP) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Announcement Type
            </label>

            <div className="flex space-x-3">
              {(["Text", "Image", "Video"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    type === t
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* TEXT TYPE */}
          {type === "Text" && (
            <>
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Announcement Text
                </label>
                <textarea
                  placeholder="Enter content..."
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                />
              </div>

              {/* Background Image */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Background Image
                </label>

                <div
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:border-orange-500/50 hover:bg-orange-50/30 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-white transition-all">
                    <Upload size={20} />
                  </div>

                  <span className="text-xs font-medium text-gray-500">
                    {backgroundImage ? backgroundImage.name : "Upload Image"}
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </>
          )}

          {/* IMAGE TYPE */}
          {type === "Image" && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Upload Image
              </label>

              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:border-orange-500/50 hover:bg-orange-50/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-white transition-all">
                  <Upload size={20} />
                </div>

                <span className="text-xs font-medium text-gray-500">
                  {backgroundImage ? backgroundImage.name : "Upload Image"}
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* VIDEO TYPE */}
          {type === "Video" && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Upload Video
              </label>

              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:border-orange-500/50 hover:bg-orange-50/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-white transition-all">
                  <Upload size={20} />
                </div>

                <span className="text-xs font-medium text-gray-500">
                  {backgroundImage ? backgroundImage.name : "Upload Video"}
                </span>
              </div>

              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-100 flex items-center justify-end space-x-4 bg-gray-50/30">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 active:scale-[0.98]"
          >
            Save Announcement
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

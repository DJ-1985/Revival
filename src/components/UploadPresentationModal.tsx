"use client";

import { useState } from "react";
import { X, Upload, Presentation, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  onSave: (data: {
    id: number;
    name: string;
    type: "PPT" | "PDF";
    date: string;
  }) => void;
  existingCount: number;
}

export default function UploadPresentationModal({
  onClose,
  onSave,
  existingCount,
}: Props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<{
    name: string;
    type: "PPT" | "PDF";
  } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const type = selected.name.toLowerCase().endsWith(".pdf") ? "PDF" : "PPT";

    setFile({
      name: selected.name,
      type,
    });

    if (!title) {
      const cleanName = selected.name.replace(/\.[^/.]+$/, "");
      setTitle(cleanName);
    }
  };

  const handleSave = () => {
    if (!file || !title) return;

const extension = file.type === "PDF" ? ".pdf" : ".pptx";

const newItem = {
  id: existingCount + 1,
  name: title + extension,
  type: file.type,
  date: new Date().toISOString().split("T")[0],
};

    onSave(newItem);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Add New Presentation
          </h3>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Presentation Title
            </label>

            <input
              type="text"
              placeholder="Enter presentation title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* File Upload */}
          {!file ? (
            <label className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-orange-500/50 hover:bg-orange-50/30 transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-white transition-all">
                <Upload size={28} />
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">
                  Drag & drop file here
                </p>
                <p className="text-xs text-gray-400 mt-1">or click to upload</p>
              </div>

              <input
                type="file"
                accept=".ppt,.pptx,.pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center space-x-4">
              <div
                className={`p-3 rounded-xl ${
                  file.type === "PPT"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {file.type === "PPT" ? (
                  <Presentation size={24} />
                ) : (
                  <FileText size={24} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {file.name}
                </p>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  {file.type} File
                </p>
              </div>

              <button
                onClick={() => setFile(null)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}

          <div className="text-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              Supported formats: PPTX, PDF
            </span>
          </div>
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
            disabled={!file || !title}
            onClick={handleSave}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-[0.98] ${
              file && title
                ? "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/30"
                : "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
            }`}
          >
            Save Presentation
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

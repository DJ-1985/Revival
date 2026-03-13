"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";

interface UploadMediaModalProps {
  onClose: () => void;
  onSave: (data: { bundleName: string; files: File[] }) => void;
}

export default function UploadMediaModal({
  onClose,
  onSave,
}: UploadMediaModalProps) {
  const [bundleName, setBundleName] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleSave = () => {
    if (!bundleName.trim() || files.length === 0) return;

    onSave({
      bundleName,
      files,
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
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            Upload Media
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
          {/* Bundle Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Bundle Name
            </label>

            <input
              type="text"
              placeholder="Enter bundle name..."
              value={bundleName}
              onChange={(e) => setBundleName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Upload Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Upload Files
            </label>

            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 hover:border-orange-500/50 hover:bg-orange-50/30 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-white transition-all">
                <Upload size={22} />
              </div>

              <span className="text-sm font-medium text-gray-500">
                Click to upload images or videos
              </span>

              <input
                type="file"
                multiple
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </label>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="space-y-1 mt-3">
                {files.map((file, index) => (
                  <p key={index} className="text-xs text-gray-500 truncate">
                    {file.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-100 flex items-center justify-end space-x-4 bg-gray-50/30">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 active:scale-[0.98]"
          >
            Upload
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
interface BibleVersion {
  id: number;
  name: string;
}

export default function BibleVersionsPage() {
  const [versions, setVersions] = useState<BibleVersion[]>([
    { id: 1, name: "KJV" },
    { id: 2, name: "NIV" },
    { id: 3, name: "NKJV" },
    { id: 4, name: "AMP" },
  ]);

  const [newVersion, setNewVersion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addVersion = () => {
    if (!newVersion.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newVersion,
    };

    setVersions((prev) => [...prev, newItem]);
    setNewVersion("");
    setIsModalOpen(false);
  };

  const deleteVersion = (id: number) => {
    setVersions((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl font-bold text-gray-800">Bible Versions</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700"
        >
          <Plus size={18} />
          <span className="text-sm">Add Version</span>
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Version Name
                </th>

                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {versions.map((version) => (
                <tr key={version.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    {version.name}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-right">
                    <button
                      onClick={() => deleteVersion(version.id)}
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

      {/* Modal */}
      {isModalOpen && (
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
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                Add Bible Version
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Version Name
                </label>
                <input
                  type="text"
                  placeholder="Enter version name (e.g. KJV)"
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-gray-100 flex items-center justify-end space-x-4 bg-gray-50/30">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={addVersion}
                className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 active:scale-[0.98]"
              >
                Save Version
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

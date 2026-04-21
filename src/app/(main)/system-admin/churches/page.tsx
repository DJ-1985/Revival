"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, X, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Church {
  id: string;
  name: string;
  ccli: string;
  password: string;
  status: "Active" | "Inactive";
}

export default function ChurchesPage() {
  const [churches, setChurches] = useState<Church[]>([
    {
      id: "CH001",
      name: "Grace Community Church",
      ccli: "12245",
      password: "123456",
      status: "Active",
    },
    {
      id: "CH002",
      name: "Bellarine RCC",
      ccli: "6789",
      password: "123456",
      status: "Inactive",
    },
  ]);

  const [churchName, setChurchName] = useState("");
  const [ccli, setCcli] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = churches.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedChurches = churches.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Page fix after delete
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [churches]);

  const resetForm = () => {
    setChurchName("");
    setCcli("");
    setPassword("");
    setConfirmPassword("");
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (church: Church) => {
    setChurchName(church.name);
    setCcli(church.ccli);
    setPassword(church.password);
    setConfirmPassword(church.password);
    setEditingId(church.id);
    setIsModalOpen(true);
  };

  const saveChurch = () => {
    if (!churchName.trim() || !ccli.trim()) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (editingId) {
      setChurches((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, name: churchName, ccli, password } : c,
        ),
      );
    } else {
      const newChurch: Church = {
        id: `CH${Math.floor(Math.random() * 900 + 100)}`,
        name: churchName,
        ccli,
        password,
        status: "Active",
      };

      setChurches((prev) => [...prev, newChurch]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const deleteChurch = (id: string) => {
    setChurches((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleStatus = (id: string) => {
    setChurches((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
            }
          : c,
      ),
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-base md:text-xl font-bold text-gray-800">
          Churches
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-[220px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search church"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700 w-full sm:w-auto"
          >
            <Plus size={18} />
            <span className="text-sm">Add Church</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  S.No
                </th>
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase min-w-[200px]">
                  <span className="flex items-center gap-2">
                    Church Name
                    <span className="text-[10px] text-gray-400">⇅</span>
                  </span>
                </th>
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  <span className="flex items-center gap-2">
                    CCLI
                    <span className="text-[10px] text-gray-400">⇅</span>
                  </span>
                </th>
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  <span className="flex items-center gap-2">
                    Status
                    <span className="text-[10px] text-gray-400">⇅</span>
                  </span>
                </th>
                <th className="px-3 md:px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedChurches.map((church, index) => (
                <tr key={church.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-700">
                    {church.name}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-500">
                    {church.ccli}
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4">
                    <button
                      onClick={() => toggleStatus(church.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        church.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {church.status}
                    </button>
                  </td>

                  <td className="px-3 md:px-6 py-2 md:py-4 flex justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(church)}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteChurch(church.id)}
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

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  currentPage === i + 1
                    ? "bg-orange-600 text-white"
                    : "border border-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
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
                {editingId ? "Edit Church" : "Add Church"}
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
                  Church Name
                </label>
                <input
                  type="text"
                  placeholder="Enter church name"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  CCLI Number
                </label>
                <input
                  type="text"
                  placeholder="Enter CCLI Number"
                  value={ccli}
                  onChange={(e) => setCcli(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={saveChurch}
                className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 active:scale-[0.98]"
              >
                {editingId ? "Update Church" : "Add Church"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

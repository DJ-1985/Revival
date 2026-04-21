"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState<"general" | "password">("general");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="md:text-xl font-bold text-gray-800">Admin Profile</h2>
        <p className="md:text-sm text-xs text-gray-500">
          Manage your account settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "general"
              ? "text-orange-600 border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "password"
              ? "text-orange-600 border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          Password
        </button>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {activeTab === "general" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Role */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-gray-900 font-medium">System Admin</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="text-gray-900 font-medium">adminds@yopmail.com</p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className="text-gray-900 font-medium">Active</p>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="space-y-5">
            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter New password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
                <Eye
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
                <Eye
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-2">
              <button className="px-5 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition disabled:opacity-50">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

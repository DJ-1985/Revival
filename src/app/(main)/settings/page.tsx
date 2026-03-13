"use client";

import { useState } from "react";
import { Shield, Lock, Church, Save, Info } from "lucide-react";

export default function SettingsPage() {
  const [adminName, setAdminName] = useState("System Admin");
  const [adminEmail, setAdminEmail] = useState("admin@church.com");

  const [churchName, setChurchName] = useState("Grace Community Church");
  const [ccliNumber, setCcliNumber] = useState("1234567");

  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [controllerPassword, setControllerPassword] = useState("123456");
  const [bandPassword, setBandPassword] = useState("123456");
  const [generalPassword, setGeneralPassword] = useState("123456");

  return (
    <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl font-bold text-gray-800">Settings</h2>

        <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-orange-700">
          <Save size={18} />
          <span className="text-sm">Save Settings</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8">
        {/* ================= Church Information ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/40 flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <Church size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Church Information</h3>
              <p className="text-xs text-gray-400">
                Manage church identity and admin access
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Admin Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* Admin Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* Church Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Church Name
              </label>
              <input
                type="text"
                value={churchName}
                onChange={(e) => setChurchName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* CCLI */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                CCLI License Number
              </label>
              <input
                type="text"
                value={ccliNumber}
                onChange={(e) => setCcliNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* ================= Role Password Management ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gray-50/40 flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                Role Password Management
              </h3>
              <p className="text-xs text-gray-400">
                Set access codes for different user levels
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controller */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between gap-2">
                  Controller Password
                  <div className="relative group normal-case font-normal">
                    <Info size={14} className="text-gray-400 cursor-pointer" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
                      Used for controller device login
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={controllerPassword}
                    onChange={(e) => setControllerPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  />
                </div>
              </div>

              {/* Band */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between gap-2">
                  Band Password
                  <div className="relative group normal-case font-normal">
                    <Info size={14} className="text-gray-400 cursor-pointer" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
                      Used for band user login
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={bandPassword}
                    onChange={(e) => setBandPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  />
                </div>
              </div>

              {/* General */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between gap-2">
                  General User Password
                  <div className="relative group normal-case font-normal">
                    <Info size={14} className="text-gray-400 cursor-pointer" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
                      Used for general audience login
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={generalPassword}
                    onChange={(e) => setGeneralPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

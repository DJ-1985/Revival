"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, UserCircle, Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const churches = [
    "Grace Community Church",
    "Revival Centre Sydney",
    "Revival Centre Melbourne",
  ];

  const roles = [
    "System Admin",
    "Church Admin",
    "Controller",
    "Band User",
    "General User",
  ];

  const [church, setChurch] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!role || !password) return;

    //  Store clean keys for whole app usage
    localStorage.setItem("userRole", role);
    localStorage.setItem("userChurch", church || "");
    localStorage.setItem("isAuthenticated", "true");

    //  Role-based routing (clean structure)
    switch (role) {
      case "System Admin":
        router.push("/dashboard");
        break;

      case "Church Admin":
        router.push("/dashboard");
        break;

      case "Controller":
        router.push("/dashboard");
        break;

      case "Band User":
        router.push("/dashboard");
        break;

      case "General User":
        router.push("/dashboard");
        break;

      default:
        router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f5f8] flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Background Image */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 z-10 mt-4"
      >
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-4">
              <Image
                src="/revival-centres-logo.svg"
                alt="Logo"
                width={300}
                height={55}
                priority
              />
            </div>

            <h1 className="text-xl font-medium text-gray-900">
              Church Presentation
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            {/* Role Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                Select Role
              </label>

              <div className="relative group">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block p-3.5 appearance-none transition-all outline-none cursor-pointer hover:bg-gray-100"
                >
                  <option value="" disabled>
                    Choose your role
                  </option>

                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                  <UserCircle size={18} />
                </div>
              </div>
            </div>

            {/* Church Select (hidden for System Admin) */}
            {role !== "System Admin" && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                  Select Church
                </label>

                <div className="relative group">
                  <select
                    value={church}
                    onChange={(e) => setChurch(e.target.value)}
                    required={role !== "System Admin"}
                    className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block p-3.5 appearance-none transition-all outline-none cursor-pointer hover:bg-gray-100"
                  >
                    <option value="" disabled>
                      Choose your church
                    </option>

                    {churches.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
                Password
              </label>

              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block p-3.5 transition-all outline-none placeholder:text-gray-300"
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                  <Lock size={18} />
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-500/50 font-semibold rounded-xl text-sm px-5 py-4 text-center transition-all duration-200 shadow-lg shadow-orange-600/20 active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-6 mb-6 text-[10px] uppercase tracking-[0.3em] font-medium z-10 text-gray-500">
        © {new Date().getFullYear()} Church Presentation
      </footer>
    </div>
  );
}

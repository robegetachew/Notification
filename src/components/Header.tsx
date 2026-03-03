"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useSidebar } from "@/contexts/SidebarContext";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { NotificationBell } from "./NotificationBell";

type MockUser = {
  fullName: string;
  role: string;
};

export const Header = () => {
  const { toggleMobile } = useSidebar();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [user] = useState<MockUser>({
    fullName: "Dr. Jane Doe",
    role: "Consultant",
  });
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // No real auth integration yet – just a placeholder
    setProfileOpen(false);
    // eslint-disable-next-line no-console
    console.log("Logout clicked (mock)");
  };

  return (
    <header className="h-14 sm:h-16 bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-between px-4 sm:px-6 lg:px-8 border border-white shrink-0 gap-3">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={toggleMobile}
        className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        aria-label="Open menu"
      >
        <FaBars className="w-6 h-6" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 min-w-0 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-slate-400 group-focus-within:text-[#1692b3] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full bg-transparent border-none rounded-lg py-2 pl-12 pr-4 focus:ring-2 focus:ring-[#1692b3]/10 transition-all text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 border-l border-slate-100 pl-4">
        {/* Language/Global Toggle */}
        <button
          type="button"
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </button>

        {/* Notifications (mock data, no integration) */}
        <NotificationBell />

        {/* User Profile */}
        <div
          className="relative pl-4 border-l border-slate-100"
          ref={profileRef}
        >
          <button
            type="button"
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-4 rounded-lg p-1 -m-1 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <div className="text-right flex flex-col">
              <span className="text-sm font-bold text-slate-800 leading-tight">
                {user.fullName}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {user.role}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm ring-2 ring-slate-100 ring-offset-2">
              <Image
                src="https://api.dicebear.com/7.x/lorelei/png?seed=woman&backgroundColor=e8e8e8"
                alt="Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-3 py-1.5 w-48 bg-white rounded-lg shadow-lg border border-slate-100 z-[100]">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  setIsChangePasswordOpen(true);
                }}
                className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 shrink-0 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15c1.657 0 3-1.343 3-3m-3 3a3 3 0 110-6m0 6v2m0-8V7m7 5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
              >
                <FaSignOutAlt className="w-4 h-4 shrink-0 text-slate-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </header>
  );
};


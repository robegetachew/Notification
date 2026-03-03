"use client";

import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

// -----------------------------------------------------------------------------
// Optional: use this type when you add notification data (e.g. from API)
// -----------------------------------------------------------------------------
export type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category?: "info" | "warning" | "success";
};

// -----------------------------------------------------------------------------
// NotificationBell – clicking the bell opens an empty dropdown.
// Build the notification UI inside the panel below (header, list, empty state).
// -----------------------------------------------------------------------------
export const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors relative cursor-pointer"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <FaBell className="w-6 h-6" />
        {/* Optional: show unread count when you have notification data */}
        {/* <span className="absolute ...">count</span> */}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden"
          role="dialog"
          aria-label="Notifications"
        >
          {/* TODO: Add panel header (e.g. title, "Mark all as read") */}
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Notifications
            </h3>
          </div>

          {/* TODO: Add notification list or empty state here */}
          <div className="min-h-[120px] max-h-80 overflow-y-auto p-4">
            {/* Build your notification UI here */}
          </div>
        </div>
      )}
    </div>
  );
};

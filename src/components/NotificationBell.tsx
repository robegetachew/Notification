"use client";

import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

export type Notification = {
  id: number;
  user?: string;
  initials?: string;
  avatar?: string;
  message: string;
  detail?: string;
  time: string;
  read: boolean;
  category: "All" | "License" | "Cross Border ID";
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    user: "Ashwin Bose",
    message: "is requesting access to - work together as a support.",
    time: "2m",
    read: false,
    category: "All",
  },
  {
    id: 2,
    initials: "L",
    message: "Patrick added a comment on ",
    detail: "License Document Assets : Rejection Reason",
    time: "8h",
    read: true,
    category: "License",
  },
  {
    id: 3,
    initials: "ID",
    message: "New Feature Alert!",
    detail: "We're pleased to introduce the latest enhancements in our License Transport experience.",
    time: "14h",
    read: true,
    category: "Cross Border ID",
  },
];

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = mockNotifications.filter(
    (n) => activeTab === "All" || n.category === activeTab
  );

  return (
    <div className="relative inline-block">
      {/* Bell Icon with Badge */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <FaBell className="w-6 h-6" />
        <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1 min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white">
          4
        </span>
      </button>

      {open && (
        <>
          {/* Backdrop to close on click outside */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          <div className="absolute right-0 mt-3 w-[400px] max-w-[90vw] bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
            </div>

            {/* Tabs */}
            <div className="flex px-5 border-b border-slate-100">
              {["All", "License", "Cross Border ID"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-2 text-xs font-semibold mr-4 transition-all relative ${
                    activeTab === tab ? "text-cyan-600" : "text-slate-500"
                  }`}
                >
                  {tab} {tab === "All" && <span className="ml-1 text-[10px]">1</span>}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div className="max-h-[450px] overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !n.read ? "bg-blue-50/30" : ""
                    }`}
                  >
                    {/* Avatar / Initials */}
                    <div className="flex-shrink-0">
                      {n.user ? (
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-100">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${n.user}&background=random`} 
                            alt={n.user} 
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200">
                          {n.initials}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-700 leading-snug">
                        {n.user && <span className="font-bold text-slate-900">{n.user} </span>}
                        {n.message}
                        {n.detail && (
                          <span className="block mt-1 font-semibold text-slate-800 italic">
                            {n.detail}
                          </span>
                        )}
                      </p>
                      
                      {/* Sub-detail for Rejection/Description */}
                      {n.id === 2 && (
                        <div className="mt-2 pl-2 border-l-2 border-red-500 text-[12px] text-slate-500">
                          License ID image is not clearly uploaded from here
                        </div>
                      )}
                      
                      {n.id === 3 && (
                        <p className="mt-1 text-[12px] text-slate-500 leading-relaxed">
                          {n.detail}
                        </p>
                      )}
                    </div>

                    {/* Time & Indicator */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400">{n.time}</span>
                      {!n.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-slate-400 text-sm">
                  No notifications in this category
                </div>
              )}
            </div>

            {/* Footer */}
            <button className="w-full py-3 text-cyan-600 font-bold text-xs hover:bg-slate-50 transition-colors border-t border-slate-100">
              View All
            </button>
          </div>
        </>
      )}
    </div>
  );
};
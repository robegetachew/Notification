"use client";

import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner"; // 1. Import Sonner

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

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, user: "Ashwin Bose", initials: "AB", message: "is requesting access to - work together as a support.", time: "2m", read: false, category: "All" },
  { id: 2, initials: "L", message: "Patrick added a comment on ", detail: "License Document Assets : Rejection Reason", time: "8h", read: true, category: "License" },
  { id: 3, initials: "ID", message: "New Feature Alert!", detail: "We're pleased to introduce the latest enhancements in our License Transport experience.", time: "14h", read: true, category: "Cross Border ID" },
  { id: 4, user: "Sarah Chen", initials: "SC", message: "uploaded a new document for verification.", time: "1d", read: false, category: "License" },
  { id: 5, initials: "SYS", message: "System Update: Server maintenance scheduled for 2:00 AM UTC.", time: "2d", read: true, category: "All" },
  { id: 6, user: "Marcus Wright", initials: "MW", message: "approved your cross-border permit request.", time: "3d", read: true, category: "Cross Border ID" },
  { id: 7, initials: "L", message: "Urgent: Your license is expiring in 5 days.", detail: "Renew now to avoid service interruption.", time: "5d", read: false, category: "License" },
];

export const NotificationBell = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    const unreadExist = notifications.some(n => !n.read);
    if (unreadExist) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      // 2. Trigger Success Toast
      toast.success("All notifications marked as read");
    }
  };

  const markAsRead = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      // 3. Trigger Info Toast
      toast.info("Notification marked as read", {
        description: notification.message.substring(0, 50) + "..."
      });
    }
  };

  const handleViewAll = () => {
    setOpen(false);
    toast("Redirecting...", {
      description: "Taking you to your notification history.",
    });
    // router.push("/notifications");
  };

  const filteredNotifications = notifications.filter(
    (n) => activeTab === "All" || n.category === activeTab
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative inline-block">
      {/* 4. Place Toaster component at the root level of your component or layout */}
      <Toaster position="top-right" richColors closeButton />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer focus:outline-none"
      >
        <FaBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1 min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          <div className="absolute right-0 mt-3 w-[400px] max-w-[90vw] h-[550px] flex flex-col bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="px-5 py-4 border-b border-slate-100 shrink-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>
            </div>

            <div className="flex px-5 border-b border-slate-100 shrink-0 bg-white">
              {["All", "License", "Cross Border ID"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-2 text-xs font-semibold mr-4 transition-all relative cursor-pointer ${
                    activeTab === tab ? "text-cyan-600" : "text-slate-500"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`flex items-start gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !n.read ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border border-slate-100 ${
                        n.id === 1 ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-600"
                      }`}>
                        {n.initials}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-700 leading-snug">
                        {n.user && <span className="font-bold text-slate-900">{n.user} </span>}
                        {n.message}
                        {n.detail && (
                          <span className="block mt-1 font-bold text-slate-800">
                            {n.detail}
                          </span>
                        )}
                      </p>
                      {n.id === 2 && (
                        <div className="mt-2 pl-2 border-l-2 border-red-500 text-[12px] text-slate-500">
                          License ID image is not clearly uploaded from here
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                      {!n.read && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-sm" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-10">
                   <p className="text-sm">No notifications in {activeTab}</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleViewAll}
              className="w-full py-3 text-cyan-600 font-bold text-xs hover:bg-slate-50 transition-colors border-t border-slate-100 shrink-0 bg-white cursor-pointer"
            >
              View All
            </button>
          </div>
        </>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
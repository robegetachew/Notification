"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaDatabase,
  FaFileAlt,
  FaFlask,
  FaPrescriptionBottle,
  FaTimes,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { useSidebar } from "@/contexts/SidebarContext";

const HOME_ICON =
  "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
const ROLES_ICON =
  "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z";

type NavItem = {
  name: string;
  path: string;
  icon?: string;
  Icon?: React.ComponentType<{ className?: string }>;
};

const SIDEBAR_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "",
    items: [{ name: "Dashboard", path: "/dashboard", icon: HOME_ICON }],
  },
  {
    title: "Applications",
    items: [
      { name: "Users Management", path: "/users", Icon: FaUsers },
      { name: "Roles Management", path: "/roles", icon: ROLES_ICON },
      { name: "Base data", path: "/base-data", Icon: FaDatabase },
    ],
  },
  {
    title: "CONSULTATION",
    items: [
      { name: "Consultation Request", path: "/consultation-request", Icon: FaUserFriends },
      { name: "Investigation", path: "/investigation", Icon: FaCog },
      { name: "Prescribed Request", path: "/prescribed-request", Icon: FaFileAlt },
    ],
  },
  {
    title: "PATIENT MANAGEMENT",
    items: [
      { name: "Patient Register", path: "/patient-register", Icon: FaUserFriends },
      { name: "Request Consultation", path: "/request-consultation", Icon: FaCog },
    ],
  },
  {
    title: "LAB MANAGEMENT",
    items: [{ name: "Lab Request", path: "/lab-request", Icon: FaFlask }],
  },
  {
    title: "PRESCRIPTION MANAGEMENT",
    items: [{ name: "Prescription", path: "/prescription", Icon: FaPrescriptionBottle }],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, setMobileOpen, mobileOpen, toggleCollapsed } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const showFullUI = isMobile || !collapsed;

  const isActive = (itemPath: string) =>
    pathname === itemPath || (pathname?.startsWith(itemPath + "/") ?? false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const navContent = (
    <>
      <div
        className={`relative flex flex-col items-center ${
          showFullUI ? "px-6 pt-6 pb-4" : "px-2 pt-6 pb-4"
        }`}
      >
        {showFullUI && (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden lg:flex absolute right-2 top-6 p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Collapse sidebar"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
        )}
        <div
          className={`rounded-full flex items-center justify-center overflow-hidden relative bg-slate-100 ${
            showFullUI ? "w-24 h-24 mb-3" : "w-12 h-12 mb-2"
          }`}
        >
          <Image
            src="/next.svg"
            alt="App logo"
            fill
            className="object-contain p-4"
            sizes={showFullUI ? "80px" : "48px"}
          />
        </div>
        {showFullUI && (
          <h2 className="text-[13px] font-semibold text-[#1692b3] leading-tight whitespace-nowrap text-center">
            ETHIO TELE HEALTH
          </h2>
        )}
        {!showFullUI && (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden lg:flex mt-1 p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Expand sidebar"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div
        className={`border-t border-slate-200 my-2 ${
          showFullUI ? "mx-4" : "mx-2"
        }`}
      />

      <nav
        className={`flex-1 py-3 space-y-1 overflow-y-auto overflow-x-hidden ${
          showFullUI ? "px-3" : "px-2"
        }`}
      >
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.title}>
            {showFullUI && section.title && (
              <div className="pt-4 pb-2 first:pt-0">
                <span
                  className="px-2 uppercase tracking-widest text-[12px] text-slate-500"
                >
                  {section.title}
                </span>
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  title={showFullUI ? undefined : item.name}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer ${
                    showFullUI ? "" : "justify-center px-3 py-3"
                  } ${
                    isActive(item.path)
                      ? "bg-[#1692b3] text-white hover:bg-[#137494]"
                      : ""
                  }`}
                >
                  {"Icon" in item && item.Icon ? (
                    <item.Icon className="w-5 h-5 shrink-0" />
                  ) : (
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  )}
                  {showFullUI && (
                    <span className="font-normal text-[15px] leading-[22px] tracking-normal text-inherit truncate">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 shrink-0
          bg-white rounded-none lg:rounded-lg
          shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
          flex flex-col overflow-hidden border-0 lg:border border-white h-full
          lg:mt-6 lg:mb-6 lg:h-[calc(100vh-3rem)]
          transition-[width,transform] duration-300 ease-in-out
          w-72
          ${collapsed ? "lg:w-[72px]" : "lg:w-80"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 lg:hidden">
          <span className="text-sm font-semibold text-slate-800">Menu</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">{navContent}</div>
      </aside>
    </>
  );
};


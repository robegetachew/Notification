"use client";

import React from "react";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl border border-slate-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Change password
        </h2>
        <p className="text-sm text-slate-600">
          This is a placeholder modal. Hook it up to your real change-password
          flow later.
        </p>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600">
              Current password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1692b3]/30 focus:border-[#1692b3]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600">
              New password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1692b3]/30 focus:border-[#1692b3]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600">
              Confirm new password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1692b3]/30 focus:border-[#1692b3]"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-semibold text-white bg-[#1692b3] hover:bg-[#137494] rounded-md shadow-sm cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


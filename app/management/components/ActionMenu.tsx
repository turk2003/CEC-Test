"use client";

import React, { useState } from "react";

interface ActionMenuProps {
  status: number;
  onEdit?: () => void;
  onReset?: () => void;
}

export default function ActionMenu({ status, onEdit, onReset }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const isDisabled = status === 3;

  return (
    <div className="relative">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setOpen(!open)}
        className={`p-1 rounded ${
          isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <img src="/compo.png" alt="menu" className="w-6 h-6" />
      </button>

      {!isDisabled && open && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <button
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          >
            {/* SVG icon */}
            <div className="px-3 text-purple-700">แก้ไข</div>
          </button>

          <button
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              onReset?.();
            }}
          >
            {/* SVG icon */}
            <div className="px-3 text-purple-700">รีเซ็ต</div>
          </button>
        </div>
      )}
    </div>
  );
}
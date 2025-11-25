import React from "react";

interface StatusButtonProps {
  status: string | number;
}

export default function StatusButton({ status }: StatusButtonProps) {
  let statusStr = "";

  const statusMap: Record<string, string> = {
    "UNLINKED": "เชื่อมประมาณการ",
    "ADDED": "ยังไม่เชื่อมประมาณการ",
    "ACTIVE": "กำลังดำเนินการ",
    "COMPLETED": "ตรวจสอบผ่าน",
    "FAILED": "ตรวจสอบไม่ผ่าน",
  };

  const key = String(status).toUpperCase();
  statusStr = statusMap[key] || "ไม่ระบุสถานะ";

  const getColorClass = () => {
    switch (statusStr) {
      case "ตรวจสอบผ่าน": return "bg-green-100 text-green-700";
      case "กำลังดำเนินการ": return "bg-yellow-100 text-yellow-700";
      case "ตรวจสอบไม่ผ่าน": return "bg-red-100 text-red-700";
      case "เชื่อมประมาณการ": return "bg-blue-100 text-blue-700";
      case "ยังไม่เชื่อมประมาณการ": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getColorClass()}`}>
      {statusStr}
    </span>
  );
}
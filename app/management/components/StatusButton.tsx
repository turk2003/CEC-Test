import React from "react";

interface StatusButtonProps {
  status: string | number;
}

export default function StatusButton({ status }: StatusButtonProps) {
  let statusStr = "";

  if (typeof status === "number") {
    switch (status) {
      case 0: statusStr = "เชื่อมประมาณการ"; break;
      case 1: statusStr = "กำลังดำเนินการ"; break;
      case 2: statusStr = "ตรวจสอบผ่าน"; break;
      case 3: statusStr = "ตรวจสอบไม่ผ่าน"; break;
      default: statusStr = "ไม่ระบุสถานะ";
    }
  } else {
    statusStr = status;
  }

  const getColorClass = () => {
    switch (statusStr) {
      case "ตรวจสอบผ่าน": return "bg-green-100 text-green-700";
      case "กำลังดำเนินการ": return "bg-yellow-100 text-yellow-700";
      case "ตรวจสอบไม่ผ่าน": return "bg-red-100 text-red-700";
      case "เชื่อมประมาณการ": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getColorClass()}`}>
      {statusStr}
    </span>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import { DataItem } from "@/types";
import api from "@/lib/api";
/* ------------------------- 1) ActionMenu (ข้างนอกสุด) ------------------------- */

function ActionMenu({ status }: { status: number }) {
  const [open, setOpen] = useState(false);

  const isDisabled = status === 3; // ถ้าสถานะ = 3 ไม่ให้กด

  return (
    <div className="relative">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setOpen(!open)}
        className={`p-1 rounded ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
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
              alert("แก้ไข");
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clip-rule="evenodd" d="M15.5858 4.41421C16.3668 3.63317 17.6332 3.63317 18.4142 4.41421L19.5858 5.58579C20.3668 6.36684 20.3668 7.63316 19.5858 8.41421L8.58579 19.4142C8.21071 19.7893 7.70201 20 7.17157 20L4 20L4 16.8284C4 16.298 4.21071 15.7893 4.58579 15.4142L15.5858 4.41421Z" stroke="#821890" stroke-width="2" stroke-linejoin="round" />
              <path d="M14 6L18 10" stroke="#821890" stroke-width="2" stroke-linejoin="round" />
            </svg>
            <div className="px-3 text-purple-700">แก้ไข</div>
          </button>

          <button
            className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              alert("รีเซ็ต");
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6H5" stroke="#821890" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 5H10" stroke="#821890" stroke-linecap="round" />
              <path d="M6 10V21H18C18 20 18 10 18 10" stroke="#821890" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className="px-3 text-purple-700">รีเซ็ต</div>
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------- 2) StatusButton ------------------------- */

function StatusButton({ status }: { status: string | number }) {
  let statusStr = "";

  if (typeof status === "number") {
    switch (status) {
      case 0:
        statusStr = "เชื่อมประมาณการ";
        break;
      case 1:
        statusStr = "กำลังดำเนินการ";
        break;
      case 2:
        statusStr = "ตรวจสอบผ่าน";
        break;
      case 3:
        statusStr = "ตรวจสอบไม่ผ่าน";
        break;
      default:
        statusStr = "ไม่ระบุสถานะ";
    }
  } else {
    statusStr = status;
  }

  let colorClass = "";
  switch (statusStr) {
    case "ตรวจสอบผ่าน":
      colorClass = "bg-green-100 text-green-700";
      break;
    case "กำลังดำเนินการ":
      colorClass = "bg-yellow-100 text-yellow-700";
      break;
    case "ตรวจสอบไม่ผ่าน":
      colorClass = "bg-red-100 text-red-700";
      break;
    case "เชื่อมประมาณการ":
      colorClass = "bg-blue-100 text-blue-700";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
      {statusStr}
    </span>
  );
}

/* ------------------------- 3) ManagementPage ------------------------- */

export default function ManagementPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/list');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          ตรวจสอบมาตรฐานงานก่อสร้าง
        </h1>
        <nav className="flex space-x-1 text-sm text-gray-500">
          <span>จัดการงานก่อสร้าง</span>
          <span>&gt;</span>
          <span className="text-gray-900">จัดการงานก่อสร้าง</span>
        </nav>
      </div>

      <div className="bg-white rounded-lg border-2 border-blue-200 p-8 min-h-[200px]">
        {loading ? (
          <div className="text-center text-black">กำลังโหลดข้อมูล...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black text-black">
                <th className="py-2 px-4">ลำดับ</th>
                <th className="py-2 px-11">หมายเลข WBS</th>
                <th className="py-2 px-33">ชื่องาน</th>
                <th className="py-2 px-3">ช่างควบคุมงาน</th>
                <th className="py-2 px-3">คณะกรรมการ</th>
                <th className="py-2 px-6">สถานะงาน</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-black">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} text-black`}
                  >
                    <td className="py-2 px-7">{index + 1}</td>
                    <td className="py-2 px-3">{item.wbs}</td>
                    <td className="py-2 px-3">{item.con_name}</td>
                    <td className="py-2 px-5">{item.con_sup}</td>
                    <td className="py-2 px-7">{item.board}</td>
                    <td className="py-2 px-3">
                      <StatusButton status={item.status} />
                    </td>
                    <ActionMenu status={Number(item.status)} />

                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
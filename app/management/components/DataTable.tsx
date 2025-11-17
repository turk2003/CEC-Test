import React from "react";
import { DataItem } from "@/types";
import StatusButton from "./StatusButton";
import ActionMenu from "./ActionMenu";

interface DataTableProps {
  data: DataItem[];
  loading: boolean;
}

export default function DataTable({ data, loading }: DataTableProps) {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-gray-700">ลำดับ</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">WBS</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">ชื่องาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">ช่างควบคุมงาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">คณะกรรมการ</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">สถานะงาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                ไม่มีข้อมูล
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-gray-900">{index + 1}</td>
                <td className="py-4 px-4 text-gray-900">{item.wbs}</td>
                <td className="py-4 px-4 text-gray-900">{item.con_name}</td>
                <td className="py-4 px-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-600">👤</span>
                    </div>
                    {item.con_sup}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-900">{item.board}</td>
                <td className="py-4 px-4">
                  <StatusButton status={item.status} />
                </td>
                <td className="py-4 px-4">
                  <ActionMenu 
                    status={Number(item.status)} 
                    onEdit={() => console.log(`แก้ไข ${item.con_name}`)}
                    onReset={() => console.log(`รีเซ็ต ${item.con_name}`)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
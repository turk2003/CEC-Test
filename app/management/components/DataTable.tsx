import React from "react";
import { useRouter } from "next/navigation";
import { DataItem } from "@/types";
import StatusButton from "./StatusButton";
import ActionMenu from "./ActionMenu";

type TableFilters = {
  search: string;
  wbs: string;
  supervisor: string;
  committee: string;
  status: string;
};

interface DataTableProps {
  data: DataItem[];
  loading: boolean;
  filters: TableFilters;
  onFilterChange: (filters: TableFilters) => void;
  page: number;
  itemsPerPage: number;
}

export default function DataTable({ data, loading, filters, onFilterChange, page, itemsPerPage }: DataTableProps) {
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleRowClick = (itemId: string) => {
    router.push(`/management/constructions/${itemId}`);
  };

  const currentPage = page || 1;
  const currentItemsPerPage = itemsPerPage || 10;

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
          {/* Header Row */}
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-gray-700">ลำดับ</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">WBS</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">ชื่องาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">ช่างควบคุมงาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">คณะกรรมการ</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">สถานะงาน</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
          </tr>

          {/* Filter Row */}
          <tr className="border-b border-gray-200 bg-white">
            <th className="py-2 px-4">
              {/* Empty for row number */}
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ค้นหา"
                value={filters.wbs}
                onChange={(e) => handleInputChange('wbs', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ค้นหา"
                value={filters.search}
                onChange={(e) => handleInputChange('search', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ชื่อ/รหัสพนักงาน"
                value={filters.supervisor}
                onChange={(e) => handleInputChange('supervisor', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ชื่อ/รหัสพนักงาน"
                value={filters.committee}
                onChange={(e) => handleInputChange('committee', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400"
              />
            </th>
            <th className="py-2 px-4">
              <select
                value={filters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
              >
                <option value="">ทั้งหมด</option>
                <option value="UNLINKED">เชื่อมประมาณการ</option>
                <option value="ADDED">ยังไม่เชื่อมประมาณการ</option>
                <option value="ACTIVE">กำลังดำเนินการ</option>
                <option value="COMPLETED">ตรวจสอบผ่าน</option>
                <option value="FAILED">ตรวจสอบไม่ผ่าน</option>
              </select>
            </th>
            <th className="py-2 px-4">
              {/* Empty column for actions */}
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-purple-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(item.id)}
              >
                <td className="py-4 px-4 text-gray-900">{(currentPage - 1) * currentItemsPerPage + index + 1}</td>
                <td className="py-4 px-4 text-gray-900">{item.wbs}</td>
                <td className="py-4 px-4 text-gray-900">{item.jobName}</td>
                <td className="py-4 px-4 text-gray-600">
                  {item.supervisor ? item.supervisor : "ไม่มีช่างควบคุมงาน"}
                </td>
                <td className="py-4 px-4 text-gray-900">
                  {(item.chairman || item.firstCommittee || item.secondCommittee)
                    ? `${item.chairman || ''} ${item.firstCommittee || ''} ${item.secondCommittee || ''}`.trim()
                    : "ไม่มีคณะกรรมการ"}
                </td>
                <td className="py-4 px-4">
                  <StatusButton status={item.jobStatus} />
                </td>
                <td
                  className="py-4 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ActionMenu
                    id={item.id}
                    status={String(item.jobStatus)}
                    onEdit={() => console.log(`แก้ไข ${item.jobName}`)}
                    onReset={() => console.log(`รีเซ็ต ${item.jobName}`)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                ไม่มีข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
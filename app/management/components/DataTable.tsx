import React, { useCallback, useRef } from "react";
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
  const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleInputChange = useCallback((field: string, value: string) => {
    // อัปเดตค่าใน UI ทันที
    const newFilters = {
      ...filters,
      [field]: value
    };
    
    // ล้าง timer เก่าของ field นี้
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }

    // สำหรับ dropdown (status) ให้เรียก API ทันที
    if (field === 'status') {
      onFilterChange(newFilters);
      return;
    }

    // สำหรับ text input ให้ใช้ debounce
    onFilterChange(newFilters);
    debounceTimers.current[field] = setTimeout(() => {
      // การเรียก API จะเกิดขึ้นที่ parent component ผ่าน useEffect
    }, 500);
  }, [filters, onFilterChange]);

  const handleRowClick = (wbs: string) => { 
    router.push(`/management/edit/${wbs}`);
  };

  const handleEdit = (wbs: string) => {
    console.log('กดแก้ไข WBS:', wbs);
    router.push(`/management/edit/${wbs}`);
  };

  const clearAllFilters = () => {
    onFilterChange({
      search: "",
      wbs: "",
      supervisor: "",
      committee: "",
      status: "",
    });
  };

  const currentPage = page || 1;
  const currentItemsPerPage = itemsPerPage || 10;

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
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
          </tr>

          {/* Filter Row */}
          <tr className="border-b border-gray-200 bg-white">
            <th></th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ค้นหา WBS"
                value={filters.wbs}
                onChange={(e) => handleInputChange('wbs', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ค้นหาชื่องาน"
                value={filters.search}
                onChange={(e) => handleInputChange('search', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ชื่อ/รหัสช่าง"
                value={filters.supervisor}
                onChange={(e) => handleInputChange('supervisor', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </th>
            <th className="py-2 px-4">
              <input
                type="text"
                placeholder="ชื่อ/รหัสกรรมการ"
                value={filters.committee}
                onChange={(e) => handleInputChange('committee', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </th>
            <th className="py-2 px-4">
              <select
                value={filters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">ทั้งหมด</option>
                <option value="UNLINKED">เชื่อมประมาณการ</option>
                <option value="ADDED">ยังไม่เชื่อมประมาณการ</option>
                <option value="ACTIVE">กำลังดำเนินการ</option>
                <option value="COMPLETED">ตรวจสอบผ่าน</option>
                <option value="FAILED">ตรวจสอบไม่ผ่าน</option>
              </select>
            </th>
            
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.wbs}
                className="border-b border-gray-100 hover:bg-purple-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(item.wbs)}
              >
                <td className="py-4 px-4 text-gray-900">{(currentPage - 1) * currentItemsPerPage + index + 1}</td>
                <td className="py-4 px-4 text-gray-900 font-mono text-sm">{item.wbs}</td>
                <td className="py-4 px-4 text-gray-900">{item.jobName}</td>
                 <td className="py-4 px-4 text-gray-600">
                  {item.supervisor 
                    ? `${item.supervisor.title}${item.supervisor.firstName} ${item.supervisor.lastName}` 
                    : "ไม่มีช่างควบคุมงาน"}
                </td>
                <td className="py-4 px-4 text-gray-900">
                  {(item.chairman || item.firstCommittee || item.secondCommittee)
                    ? [
                        item.chairman ? `${item.chairman.title}${item.chairman.firstName} ${item.chairman.lastName}` : '',
                        item.firstCommittee ? `${item.firstCommittee.title}${item.firstCommittee.firstName} ${item.firstCommittee.lastName}` : '',
                        item.secondCommittee ? `${item.secondCommittee.title}${item.secondCommittee.firstName} ${item.secondCommittee.lastName}` : ''
                      ].filter(name => name).join(', ')
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
                    id={item.wbs}
                    status={String(item.jobStatus)}
                    onEdit={() => handleEdit(item.wbs)}
                    onReset={() => console.log(`รีเซ็ต ${item.wbs}`)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p>ไม่พบข้อมูลที่ค้นหา</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
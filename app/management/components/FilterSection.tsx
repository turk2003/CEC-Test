import React from "react";

interface FilterSectionProps {
  filters: {
    search: string;
    wbs: string;
    supervisor: string;
    committee: string;
    status: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  const handleInputChange = (field: string, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-5 gap-4">
        {/* ลำดับ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ลำดับ
          </label>
          <input
            type="text"
            placeholder="ค้นหา"
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400"
          />
        </div>

        {/* WBS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WBS
          </label>
          <input
            type="text"
            placeholder="ค้นหา"
            value={filters.wbs}
            onChange={(e) => handleInputChange('wbs', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400"
          />
        </div>

        {/* ชื่องาน */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ชื่องาน
          </label>
          <input
            type="text"
            placeholder="ค้นหา"
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400"
          />
        </div>

        {/* ช่างควบคุมงาน */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ช่างควบคุมงาน
          </label>
          <input
            type="text"
            placeholder="ชื่อ/รหัสพนักงาน"
            value={filters.supervisor}
            onChange={(e) => handleInputChange('supervisor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400"
          />
        </div>

        {/* คณะกรรมการ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            คณะกรรมการ
          </label>
          <input
            type="text"
            placeholder="ชื่อ/รหัสพนักงาน"
            value={filters.committee}
            onChange={(e) => handleInputChange('committee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400"
          />
        </div>

        {/* สถานะงาน */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            สถานะงาน
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="">ทั้งหมด</option>
            <option value="0">เชื่อมประมาณการ</option>
            <option value="1">กำลังดำเนินการ</option>
            <option value="2">ตรวจสอบผ่าน</option>
            <option value="3">ตรวจสอบไม่ผ่าน</option>
          </select>
        </div>
      </div>
    </div>
  );
}
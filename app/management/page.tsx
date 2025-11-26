"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState, useCallback } from "react";
import { DataItem } from "@/types";
import api from "@/lib/api";
import DataTable from "./components/DataTable";
import TabSection from "./components/TabSection";

export default function ManagementPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending">("pending");
  const [filters, setFilters] = useState({
    search: "",
    wbs: "",
    supervisor: "",
    committee: "",
    status: "",
  });
  
  // เพิ่ม region filters
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBusinessArea, setSelectedBusinessArea] = useState("");
  
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // ...existing code...
const fetchData = useCallback(async () => {
  setLoading(true);
  try {
    // สร้าง parameters สำหรับ API
    const params: any = {
      page,
      limit: itemsPerPage,
      all: activeTab === 'all',
    };

    // การจัดการ region และ business area filter
    if (selectedRegion && !selectedBusinessArea) {
      // เลือกแค่เขต ไม่เลือกการไฟฟ้า - ส่ง deptArea เป็น region
      params.deptarea = selectedRegion;
      console.log('กรองตาม deptArea (เขต):', selectedRegion);
    } else if (selectedBusinessArea) {
      // เลือกการไฟฟ้าเฉพาะ - ส่ง ba
      params.ba = selectedBusinessArea;
      console.log('กรองตาม ba (การไฟฟ้า):', selectedBusinessArea);
    }
    
    // เพิ่ม filter parameters อื่นๆ
    if (filters.wbs.trim()) {
      params.wbs = filters.wbs.trim();
    }
    
    if (filters.search.trim()) {
      params.jobName = filters.search.trim();
    }
    
    if (filters.supervisor.trim()) {
      params.supervisor = filters.supervisor.trim();
    }
    
    if (filters.committee.trim()) {
      params.committees = filters.committee.trim();
    }
    
    if (filters.status) {
      params.jobStatus = filters.status;
    }

    console.log('Final API Parameters:', params);

    const response = await api.get("/api/v3/jobs", { params });
    console.log("/api/v3/jobs", { params })
    console.log("API Response:", response.data);

    const raw = response.data;
    const arr = raw.data || [];
    const total = raw.total || 0;

    console.log('จำนวนข้อมูลที่ได้:', arr.length);
    console.log('Total จาก API:', total);

    setData(arr);
    setTotalPages(Math.ceil(total / itemsPerPage));
    setTotalItems(total);
  } catch (error) {
    console.error("Error fetching data:", error);
    setData([]);
    setTotalPages(1);
    setTotalItems(0);
  } finally {
    setLoading(false);
  }
}, [page, itemsPerPage, filters, activeTab, selectedRegion, selectedBusinessArea]);
// ...existing code...

  // เรียก fetchData เมื่อ dependencies เปลี่ยน
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleTabChange = (tab: "all" | "pending") => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleRegionChange = (region: string, ba: string) => {
    setSelectedRegion(region);
    setSelectedBusinessArea(ba);
    setPage(1);
  };

  const handleBusinessAreaChange = (ba: string) => {
    setSelectedBusinessArea(ba);
    setPage(1);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">จัดการงานก่อสร้าง</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {/* Tabs with Region Filters */}
        <TabSection
          activeTab={activeTab}
          onTabChange={handleTabChange}
          allCount={totalItems}
          pendingCount={data.filter((item) => item.jobStatus !== "COMPLETED").length}
          selectedRegion={selectedRegion}
          selectedBusinessArea={selectedBusinessArea}
          onRegionChange={handleRegionChange}
          onBusinessAreaChange={handleBusinessAreaChange}
        />

        {/* Data Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <DataTable
            data={data}
            loading={loading}
            filters={filters}
            onFilterChange={handleFilterChange}
            page={page}
            itemsPerPage={itemsPerPage}
          />
          
          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              แสดง {data.length} รายการ จากทั้งหมด {totalItems} รายการ
              {totalPages > 1 && ` (หน้า ${page} จาก ${totalPages})`}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Pagination buttons */}
              <button
                onClick={() => setPage(1)}
                disabled={page === 1 || loading}
                className="px-3 py-1 text-sm text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                «« แรก
              </button>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="px-3 py-1 text-sm text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹ ก่อนหน้า
              </button>

              <span className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                {page}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="px-3 py-1 text-sm text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ถัดไป ›
              </button>

              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages || loading}
                className="px-3 py-1 text-sm text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ท้าย »»
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 px-3 py-1 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              disabled={loading}
            >
              <option value={10}>10 รายการ</option>
              <option value={20}>20 รายการ</option>
              <option value={50}>50 รายการ</option>
              <option value={100}>100 รายการ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
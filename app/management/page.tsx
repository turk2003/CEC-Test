"use client";
// import Cookies from "js-cookie";
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
      params.deptarea = selectedRegion;
    } else if (selectedBusinessArea) {
      params.ba = selectedBusinessArea;
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

    console.log('API Request:', `/api/v3/jobs`, params);

    // เพิ่ม timeout สำหรับ request นี้โดยเฉพาะ
    const response = await api.get("/api/v3/jobs", { 
      params,
      timeout: 30000 // 30 วินาที
    });
    
    // เช็คว่า response มีข้อมูลหรือไม่
    if (!response.data) {
      throw new Error('No data received from API');
    }

    const raw = response.data;
    console.log('Raw API Response:', raw);

    // ตรวจสอบ structure ของ response
    if (typeof raw !== 'object') {
      throw new Error('Invalid response format');
    }

    const arr = Array.isArray(raw.data) ? raw.data : [];
    

    console.log('Processed data:', { count: arr.length, total: raw. total });

    setData(arr);
    setTotalPages(Math.ceil(raw.total / itemsPerPage));
    setTotalItems(raw.total);

  } catch (error: any) {
    console.error("Error fetching data:", error);
    
    // จัดการ error แต่ละประเภท
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - API ใช้เวลานานเกินไป');
    } else if (error.response) {
      console.error("Server Error:", {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('Network Error - ไม่สามารถเชื่อมต่อ API ได้');
    } else {
      console.error('Unknown Error:', error.message);
    }
    
    setData([]);
    setTotalPages(1);
    setTotalItems(0);
  } finally {
    setLoading(false);
  }
}, [page, itemsPerPage, filters, activeTab, selectedRegion, selectedBusinessArea]);

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
          
          {/* Pagination and Items Per Page */}
          <div className="flex justify-center items-center gap-6 p-4 border-t bg-gray-50">
            {/* New Numbered Pagination */}
            <div className="flex items-center gap-1">
              {/* First Page */}
              <button
                onClick={() => setPage(1)}
                disabled={page === 1 || loading}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"
              >
                ««
              </button>

              {/* Previous Page */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"
              >
                ‹
              </button>

              {/* Page Numbers with Ellipsis */}
              {(() => {
                const pages = [];
                const total = totalPages;

                const add = (p) =>
                  pages.push(
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 rounded ${
                        page === p
                          ? "bg-white border-1 border-gray-300 text-black font-semibold"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  );

                if (total <= 5) {
                  for (let p = 1; p <= total; p++) add(p);
                } else {
                  add(1);

                  if (page > 3) {
                    pages.push(
                      <span key="start-ellipsis" className="px-2 text-gray-500">
                        …
                      </span>
                    );
                  }

                  const start = Math.max(2, page - 1);
                  const end = Math.min(total - 1, page + 1);
                  for (let p = start; p <= end; p++) add(p);

                  if (page < total - 2) {
                    pages.push(
                      <span key="end-ellipsis" className="px-2 text-gray-500">
                        …
                      </span>
                    );
                  }

                  add(total);
                }

                return pages;
              })()}

              {/* Next Page */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"
              >
                ›
              </button>

              {/* Last Page */}
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages || loading}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30"
              >
                »»
              </button>
            </div>

            <div className="ml-4">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="border 
                border-gray-300 
                px-3 py-1 rounded 
                text-sm 
                text-gray-700
                bg-white 
                focus:outline-none 
                focus:ring-1 
                focus:ring-purple-500"
                disabled={loading}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
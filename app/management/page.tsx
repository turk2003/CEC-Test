"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { DataItem } from "@/types";
import api from "@/lib/api";
import DataTable from "./components/DataTable";
import TabSection from "./components/TabSection";
import axios from "axios";

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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/v3/jobs", {
          params: {
            page,
            limit: itemsPerPage,
            // TODO: add filters params if API supports
          },
        });

        const raw = response.data;

        const arr = raw.data || [];
        const total = raw.total || 0;

        setData(arr);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, itemsPerPage]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">จัดการงานก่อสร้าง</h1>
      </div>
      <div className="mb-6 ml-1">
        <h1 className="text-lg text-gray-900 mb-2">จัดการงานก่อสร้าง</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Tabs */}
        {/* <TabSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allCount={data.length}
          pendingCount={data.filter((item) => item.status !== 2).length}
        /> */}

        {/* Data Table with embedded filters */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <DataTable
            data={data}
            loading={loading}
            filters={filters}
            onFilterChange={handleFilterChange}
            page={page}
            itemsPerPage={itemsPerPage}
          />
          <div className="flex justify-center items-center p-4 border-t gap-6">
            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-2 py-1 text-gray-600 disabled:opacity-30"
              >
                «
              </button>

              {/* Previous Page */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-2 py-1 text-gray-600 disabled:opacity-30"
              >
                ‹
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - page) <= 1) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-1 rounded ${page === pageNumber ? "bg-purple-600 text-white" : "bg-white border text-gray-700"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                if (pageNumber === page - 2 || pageNumber === page + 2) {
                  return (
                    <span key={pageNumber} className="px-2 text-gray-500">
                      …
                    </span>
                  );
                }
                return null;
              })}

              {/* Next Page */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-2 py-1 text-gray-600 disabled:opacity-30"
              >
                ›
              </button>

              {/* Last Page */}
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-2 py-1 text-gray-600 disabled:opacity-30"
              >
                »
              </button>
            </div>

            {/* Items Per Page Dropdown */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border px-2 py-1 rounded text-gray-700"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
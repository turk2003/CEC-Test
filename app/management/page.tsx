"use client";

import React, { useEffect, useState } from "react";
import { DataItem } from "@/types";
import api from "@/lib/api";
import DataTable from "./components/DataTable";
import TabSection from "./components/TabSection";
import FilterSection from "./components/FilterSection";

export default function ManagementPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('pending');
  const [filters, setFilters] = useState({
    search: '',
    wbs: '',
    supervisor: '',
    committee: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/list');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on active tab and filters
  useEffect(() => {
    let filtered = [...data];

    // Tab filter
    if (activeTab === 'pending') {
      filtered = filtered.filter(item => item.status !== 2); // ไม่ใช่ "ตรวจสอบผ่าน"
    }

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(item => 
        item.con_name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.wbs) {
      filtered = filtered.filter(item => 
        item.wbs.toLowerCase().includes(filters.wbs.toLowerCase())
      );
    }

    if (filters.supervisor) {
      filtered = filtered.filter(item => 
        item.con_sup.toLowerCase().includes(filters.supervisor.toLowerCase())
      );
    }

    if (filters.committee) {
      filtered = filtered.filter(item => 
        item.board.toLowerCase().includes(filters.committee.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(item => 
        item.status.toString() === filters.status
      );
    }

    setFilteredData(filtered);
  }, [data, activeTab, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          จัดการงานก่อสร้าง
        </h1>
      </div>

      {/* Tabs */}
      <TabSection 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        allCount={data.length}
        pendingCount={data.filter(item => item.status !== 2).length}
      />

      {/* Filter Section */}
      <FilterSection 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <DataTable data={filteredData} loading={loading} />
      </div>
    </div>
  );
}
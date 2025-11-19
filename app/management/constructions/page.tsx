"use client";

import React, { useState } from "react";
import ConstructionHeader from "./components/ConstructionHeader";
import ConstructionTable from "./components/ConstructionTable";
import ConstructionFooter from "./components/ConstructionFooter";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
interface ConstructionItem {
  id: number;
  type: string;
  code: string;
  name: string;
  status: string;
  icon: string;
  documents?: any[];
}

export default function ConstructionsPage() {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const constructionData = {
    title: "test",
    wbs: "C-65-C-CBD65.0079",
    status: "กำลังดำเนินการ",
    progress: {
      total: 62,
      complete: 30
    }
  };

  const items: ConstructionItem[] = [
    { id: 1, type: "SP", code: "1", name: "คันดิ่งไดแก่น", status: "กำลังดำเนินการ", icon: "🔧" },
    { id: 2, type: "DDE", code: "2", name: "", status: "กำลังดำเนินการ", icon: "🔧" },
    { id: 3, type: "CCB", code: "3", name: "เลาฟ้าชองฟูปิน", status: "กำลังดำเนินการ", icon: "🔨" },
    { id: 4, type: "CCB", code: "4", name: "เลาฟ้าชองฟูปิน", status: "รอตรวจสอบ", icon: "🔨" },
    { id: 5, type: "CCB", code: "5", name: "เลาฟ้าชองฟูปิน", status: "รอตรวจสอบ", icon: "🔨" },
    { id: 6, type: "DDE", code: "6", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน", icon: "🔧" },
    { id: 7, type: "CSC", code: "7", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบไม่ผ่าน", icon: "⚡" },
    { id: 8, type: "CSC", code: "8", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบไม่ผ่าน", icon: "⚡" },
    { id: 9, type: "BA", code: "9", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน", icon: "🔧" },
    { id: 10, type: "TR", code: "10", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน", icon: "📊" },
  ];

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleAddItem = () => {
    console.log("เพิ่มข้มีย์");
  };

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/management" className="hover:text-purple-600">
          จัดการพนักงานขวะบิน
        </Link>
        <ChevronRight size={16} />
        <span>C-65-C-CBD65.0079</span>
        <ChevronRight size={16} />
        <span>จัดการข้มีย์</span>
      </div>
      <ConstructionHeader constructionData={constructionData} />
      
      <ConstructionTable 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentItems={currentItems}
        onAddItem={handleAddItem}
      />
      
      <ConstructionFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}
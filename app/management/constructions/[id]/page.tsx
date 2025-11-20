"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ConstructionHeader from "../components/ConstructionHeader";
import ConstructionTable from "../components/ConstructionTable";
import ConstructionFooter from "../components/ConstructionFooter";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
interface ConstructionItem {
  id: number;
  type: string;
  code: string;
  name: string;
  status: string;
  documents?: any[];
}
interface ConstructionData {
  title: string;
  wbs: string;
  status: string;
  progress: {
    total: number;
    complete: number;
  };
}

export default function ConstructionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [activeTab, setActiveTab] = useState('details');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [constructionData, setConstructionData] = useState<ConstructionData | null>(null);

  // Fetch data based on ID
  useEffect(() => {
    const fetchConstructionData = async () => {
      try {
        // Replace with your actual API call
        // const response = await api.get(`/constructions/${id}`);
        
        // Mock data for now
        const mockData = {
          title: `บบ.ลานตากพื้นผลาถิพยุ์ภิพย์ - ${id}`,
          wbs: "C-65-C-CBD65.0079",
          status: "กำลังดำเนินการ",
          progress: {
            total: 62,
            complete: 30

          }
        };
        
        setConstructionData(mockData);
      } catch (error) {
        console.error('Error fetching construction data:', error);
      }
    };

    if (id) {
      fetchConstructionData();
    }
  }, [id]);

  const items: ConstructionItem[] = [
    { id: 1, type: "SP", code: "1", name: "คันดิ่งไดแก่น", status: "กำลังดำเนินการ"},
    { id: 2, type: "DDE", code: "2", name: "", status: "กำลังดำเนินการ" },
    { id: 3, type: "CCB", code: "3", name: "เลาฟ้าชองฟูปิน", status: "กำลังดำเนินการ" },
    { id: 4, type: "CCB", code: "4", name: "เลาฟ้าชองฟูปิน", status: "รอตรวจสอบ" },
    { id: 5, type: "CCB", code: "5", name: "เลาฟ้าชองฟูปิน", status: "รอตรวจสอบ" },
    { id: 6, type: "DDE", code: "6", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน" },
    { id: 7, type: "CSC", code: "7", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบไม่ผ่าน" },
    { id: 8, type: "CSC", code: "8", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบไม่ผ่าน" },
    { id: 9, type: "BA", code: "9", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน" },
    { id: 10, type: "TR", code: "10", name: "เลาฟ้าชองฟูปิน", status: "ตรวจสอบผ่าน" },
  ];

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleAddItem = () => {
    console.log("เพิ่มข้มีย์");
  };

  if (!constructionData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-8 text-gray-500">
          กำลังโหลดข้อมูล...
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <h1 className="text-black text-xl">จัดการพื้นที่ตรวจนับ</h1>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/management" className="hover:text-purple-600">
          จัดการงานก่อสร้าง
        </Link>
        <ChevronRight size={16} />
        <span>{constructionData.wbs}</span>
        <ChevronRight size={16} />
        <span>จัดการข้อมูลงาน</span>
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
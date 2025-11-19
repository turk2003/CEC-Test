import React from "react";
import { ChevronLeft, ChevronRight, Download, Upload } from "lucide-react";

interface ConstructionFooterProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}

export default function ConstructionFooter({
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage
}: ConstructionFooterProps) {
  
  return (
    <div className="bg-white rounded-lg shadow-sm mt-4">
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span>กำลังดำเนินการ</span>
            
            <span className="w-3 h-3 bg-blue-400 rounded-full ml-4"></span>
            <span>รอแกไขจากการตรวจสอบ</span>
            
            <span className="w-3 h-3 bg-orange-400 rounded-full ml-4"></span>
            <span>ข้อสองภายใจคือ</span>
            
            <span className="w-3 h-3 bg-red-400 rounded-full ml-4"></span>
            <span>ขิบบิรอจจายณเภียใจลี</span>
            
            <span className="w-3 h-3 bg-green-400 rounded-full ml-4"></span>
            <span>ข้อสองแกรรบำพบอม</span>
            
            <Upload size={14} className="ml-4 text-blue-500" />
            <span>ง่ายไปีลีมนี่ดีใค้สี</span>
            
            <Download size={14} className="ml-2 text-gray-500" />
            <span>ดิงดิงภล่อย</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          
          {[1, 2, 3].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <span className="px-2">...</span>
          
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="ml-4 px-2 py-1 border border-gray-300 rounded text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
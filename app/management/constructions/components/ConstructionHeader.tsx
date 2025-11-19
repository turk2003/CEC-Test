import React from "react";
import Link from "next/link";
import { ChevronRight, Download, Upload } from "lucide-react";

interface ConstructionHeaderProps {
  constructionData: {
    title: string;
    wbs: string;
    status: string;
    progress: {
      total: number;
      complete: number;
    };
  };
}

export default function ConstructionHeader({ constructionData }: ConstructionHeaderProps) {
  return (
    <>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between">
          {/* Left side - Title and WBS */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {constructionData.title}
            </h1>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600">WBS:</span>
              <span className="font-medium text-gray-900">{constructionData.wbs}</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                กำลังดำเนินการ
              </span>
            </div>
          </div>

          {/* Right side - Progress bars */}
          <div className="flex flex-col gap-4 min-w-[300px]">
            <div>
              <div className="text-sm text-gray-600 mb-2">ก่อสร้างสำเร็จ</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${constructionData.progress.total}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-white bg-purple-500 px-2 py-1 rounded">
                  {constructionData.progress.total}%
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-2">ตรวจสอบสำเร็จ</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${constructionData.progress.complete}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-white bg-purple-500 px-2 py-1 rounded">
                  {constructionData.progress.complete}%
                </span>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
}
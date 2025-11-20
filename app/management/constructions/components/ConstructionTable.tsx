import React from "react";
import { Download, Upload, AlertTriangle } from "lucide-react";

interface ConstructionItem {
  id: number;
  type: string;
  code: string;
  name: string;
  status: string;
  documents?: any[];
}

interface ConstructionTableProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentItems: ConstructionItem[];
  onAddItem: () => void;
}

export default function ConstructionTable({ 
  activeTab, 
  setActiveTab, 
  currentItems, 
  onAddItem 
}: ConstructionTableProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ตรวจสอบผ่าน": return "text-green-600";
      case "กำลังดำเนินการ": return "text-yellow-600";
      case "รอตรวจสอบ": return "text-blue-600";
      case "ตรวจสอบไม่ผ่าน": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ตรวจสอบผ่าน": return "✅";
      case "กำลังดำเนินการ": return "🟡";
      case "รอตรวจสอบ": return "🔵";
      case "ตรวจสอบไม่ผ่าน": return "❌";
      default: return "⚪";
    }
  };

  const getTypeIcon = (type: string) => {
  const icons = {
    "SP": "/construction_icon/sp.png",
    "DDE": "/construction_icon/dde.png", 
    "CCB": "/construction_icon/ccb.png",
    "CSC": "/construction_icon/csc.png",
    "BA": "/construction_icon/ba.png",
    "TR": "/construction_icon/tr.png"
  };
  return icons[type as keyof typeof icons] || "/icons/default.png";
};

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            งานติดตั้งใหม่
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            งานรื้อถอน
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'progress'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            สรุปงานติดตั้งใหม่
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'summary'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            สรุปงานรื้อถอน
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 font-medium text-gray-700">ประเภทเลา</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">สำเดิน</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">รายละเอียด</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">สถานะ</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12  bg-blue-800 rounded flex items-center justify-center">
                      <img 
                        src={getTypeIcon(item.type)}
                        alt={item.type}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-900">{item.code}</td>
                <td className="py-4 px-4 text-gray-900">{item.name}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                    {item.status === "ตรวจสอบไม่ผ่าน" && (
                      <div className="flex gap-1">
                        <AlertTriangle size={16} className="text-red-500" />
                        <Download size={16} className="text-blue-500" />
                      </div>
                    )}
                    {item.status === "กำลังดำเนินการ" && item.type === "DDE" && (
                      <div className="flex gap-1">
                        <Download size={16} className="text-blue-500" />
                        <Upload size={16} className="text-green-500" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="text-lg">⋮</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Button */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onAddItem}
          className="w-full py-3 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
        >
          + เพิ่มพื้นท่ี
        </button>
      </div>
    </div>
  );
}
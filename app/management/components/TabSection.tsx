import React from "react";

interface TabSectionProps {
  activeTab: 'all' | 'pending';
  onTabChange: (tab: 'all' | 'pending') => void;
  allCount: number;
  pendingCount: number;
}

export default function TabSection({ activeTab, onTabChange, allCount, pendingCount }: TabSectionProps) {
  return (
    <div className="flex items-center gap-6 mb-6">
      {/* Left side tabs */}
      <div className="flex">
        <button
          onClick={() => onTabChange('all')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'text-gray-600 border-gray-400'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          งานก่อสร้างทั้งหมด
          <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
            {allCount}
          </span>
        </button>

        <button
          onClick={() => onTabChange('pending')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'text-purple-600 border-purple-600'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          งานก่อสร้างของตนเอง
          <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            {pendingCount}
          </span>
        </button>
      </div>

      {/* Right side dropdowns */}
      <div className="flex gap-4 ml-auto">
        <select className="px-4 py-2 border border-purple-700 text-purple-700  rounded-lg text-sm bg-white">
          <option>กพฟ.3</option>
          <option>กพฟ.1</option>
          <option>กพฟ.2</option>
        </select>

        <select className="px-4 py-2 border border-purple-700  text-purple-700  rounded-lg text-sm bg-white min-w-[200px]">
          <option>การไฟฟ้าส่วนภูมิภาคภาคอีสานตกลาง</option>
          <option>การไฟฟ้าส่วนภูมิภาคภาคเหนือ</option>
          <option>การไฟฟ้าส่วนภูมิภาคภาคใต้</option>
        </select>
      </div>
    </div>
  );
}
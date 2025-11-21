"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

interface UserData {
  businessArea: string;
  businessAreaName: string;
  deptChangeCode: string;
  employeeId: string;
  firstName: string;
  id: number;
  lastName: string;
  position: string;
  positionWithDeptName: string;
  title: string;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/v1/employees/me');
        setUserData(response.data);
        console.log('User data:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ฟังก์ชัน logout
  const handleLogout = () => {
    // ลบ token และ redirect
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onToggleSidebar}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7H18" stroke="#454545" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 12H18" stroke="#454545" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 17H18" stroke="#454545" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <img src="/CECLogo3 2.svg" alt="CEC Logo" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PEA Construction Equipment Checking</h1>
            <p className="text-sm text-gray-500">ระบบตรวจสอบพัสดุ อุปกรณ์ก่อสร้างขององค์กร</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          ) : userData ? (
            <>
              {/* ชื่อผู้ใช้ */}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {userData.title} {userData.firstName} {userData.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {userData.position}
                </div>
              </div>
              
              {/* Avatar */}
              <div 
                className={`w-8 h-8  bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold`}
              >
                
              </div>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">ไม่สามารถโหลดข้อมูลผู้ใช้</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
            </>
          )}

          {/* Divider */}
          <svg width="2" height="32" viewBox="0 0 2 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="4.37112e-08" x2="0.999999" y2="32" stroke="#454545" strokeWidth="2" strokeLinejoin="round" />
          </svg>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="ออกจากระบบ"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15 4V20H4L4 4L15 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 12H21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 15L21.5 12L18.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Cookies from "js-cookie";
import { ssoLogoutUrl } from "@/service/index"; 
import Image from "next/image"; 

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { userData, userRegionName, loading } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const ssoLogoutUrl1 = `${ssoLogoutUrl}/${Cookies.get("token")}`;
  const profileImageUrl = userData?.employeeId 
    ? `https://pictureapi.pea.co.th/MyphotoAPI/api/v1/Main/GetPicImg?EmpCode=${userData.employeeId}` 
    : null;

  // ฟังก์ชัน logout ใหม่
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      window.location.href = ssoLogoutUrl1;
      
      // ลบ token และข้อมูลในเครื่อง
      Cookies.remove("token", { path: "/" });
      Cookies.remove("token", { path: "/management" });
      Cookies.remove("token");
      
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('Redirecting to home...');
    } catch (error) {
      console.error('Error during logout:', error);
      Cookies.remove("token", { path: "/" });
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    } finally {
      setLoggingOut(false);
    }
  };

  // Avatar Component
  const ProfileAvatar = ({ userData }: { userData: any }) => {
    if (profileImageUrl && !imageError) {
      return (
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={profileImageUrl}
            alt={`${userData.firstName} ${userData.lastName}`}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      );
    }

    return (
      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        {userData.title?.charAt(0) || userData.firstName?.charAt(0) || '?'}
      </div>
    );
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
                  {userData.title}{userData.firstName} {userData.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {userData.position}
                </div>
              </div>
              
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">
                <ProfileAvatar userData={userData} />
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

          <svg width="2" height="32" viewBox="0 0 2 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="4.37112e-08" x2="0.999999" y2="32" stroke="#454545" strokeWidth="2" strokeLinejoin="round" />
          </svg>

          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className={`text-gray-400 hover:text-gray-600 transition-colors ${loggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="ออกจากระบบ"
          >
            {loggingOut ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 4V20H4L4 4L15 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 12H21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 15L21.5 12L18.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
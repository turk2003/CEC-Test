"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ssoLoginUrl } from "@/service/index";

export default function LandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // ตรวจสอบ token ใน URL และ cookies
  useEffect(() => {
    const handleTokenFromUrl = () => {
      const tokenFromUrl = searchParams.get("token");
      const existingToken = Cookies.get("token");

      console.log("Token from URL:", tokenFromUrl);
      console.log("Existing token:", existingToken);

      // ถ้ามี token จาก URL
      if (tokenFromUrl) {
        try {
          // ตรวจสอบว่า token เป็น JWT format ที่ถูกต้องหรือไม่
          const tokenParts = tokenFromUrl.split('.');
          if (tokenParts.length === 3) {
            // เซ็ต token ใน cookies
            Cookies.set("token", tokenFromUrl, {
              path: "/",
              expires: 1, // 1 วัน
            });

            // ล้าง URL parameter
            const cleanUrl = window.location.pathname;
            window.history.replaceState(null, "", cleanUrl);

            console.log("Token saved successfully, redirecting to management...");
            
            // รอสักครู่แล้ว redirect
            setTimeout(() => {
              router.push("/management");
            }, 100);
            
            return;
          } else {
            console.error("Invalid token format received");
          }
        } catch (error) {
          console.error("Error processing token:", error);
        }
      }

      // ถ้ามี token ใน cookies อยู่แล้ว
      if (existingToken && !tokenFromUrl) {
        console.log("Existing token found, redirecting to management...");
        router.push("/management");
        return;
      }

      // ไม่มี token เลย แสดงหน้า login
      setLoading(false);
    };

    handleTokenFromUrl();
  }, [searchParams, router]);

  const handleLogin = () => {
    try {
      console.log("Redirecting to Keycloak login:", ssoLoginUrl);
      
      // สร้าง redirect URL ที่ถูกต้อง
      const redirectUri = encodeURIComponent(window.location.origin);
      const loginUrl = ssoLoginUrl.includes('?') 
        ? `${ssoLoginUrl}&redirect_uri=${redirectUri}`
        : `${ssoLoginUrl}?redirect_uri=${redirectUri}`;
      
      console.log("Full login URL:", loginUrl);
      
      // redirect ไปหน้า login
      window.location.href = loginUrl;
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setLoading(false);
    console.log("Logged out successfully");
  };

  // แสดง loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบการเข้าสู่ระบบ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100">
      {/* Left Section (Image) */}
      <div className="relative w-full h-60 lg:h-auto lg:w-1/2">
        <Image
          src="/pea_logo_test.jpg"
          alt="Welcome"
          style={{ objectFit: "cover" }}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full"
        />
      </div>

      {/* Right Section (Login) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white space-y-6 lg:space-y-8">
        <div className="text-center">
          <h1 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center justify-center space-x-2 mb-4">
            <span className="flex items-center text-purple-500">
              <Image
                src="/next.svg"
                alt="Logo"
                width={40}
                height={32}
                className="dark:invert"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
              <span className="ml-2">CEC-DEMO</span>
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            CEC System
          </p>
          
          <p className="text-gray-500 text-base md:text-lg mb-8">
            เข้าสู่ระบบเพื่อดำเนินการต่อไป
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-lg flex items-center justify-center space-x-2 transition text-sm md:text-base min-w-[250px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>เข้าสู่ระบบด้วย Keycloak</span>
          </button>
        </div>
      </div>
    </div>
  );
}
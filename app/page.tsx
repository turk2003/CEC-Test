"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ssoLoginUrl } from "@/service/index";
// กำหนด Keycloak Login URL
const keycloakLoginUrl = ssoLoginUrl;
const LandingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("keycloakLoginUrl", keycloakLoginUrl);
  }, []);


  //   const handleLogin = () => {
  //   // เพิ่ม redirect_uri parameter
  //   const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
  //   const loginUrl = `${keycloakLoginUrl}?redirect_uri=${redirectUri}`;

  //   console.log("Redirecting to:", loginUrl);
  //   window.location.href = loginUrl;
  // };
  const handleLogin = () => {
    // ตอนนี้ให้ไป dashboard เลย ไม่ต้องใช้ Keycloak จริง
    // window.location.href = keycloakLoginUrl;

    // เซ็ต dummy token
    Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3NzUsImVtcGxveWVlSWQiOiI5MDExMDY1IiwidGl0bGUiOiLguJnguLLguKIiLCJmaXJzdE5hbWUiOiLguJjguJnguIHguKTguJUiLCJsYXN0TmFtZSI6IuC4nuC4tOC4oeC4nuC5jOC4meC5ieC4reC4oiIsInBvc2l0aW9uIjoi4LiK4Lia4LiELiIsImJ1c2luZXNzQXJlYSI6IkkwNzIiLCJidXNpbmVzc0FyZWFOYW1lIjoi4LiB4Lif4LiqLuC4quC4reC4h-C4nuC4teC5iOC4meC5ieC4reC4hyIsImRlcHRDaGFuZ2VDb2RlIjoiNDMwMzcwNTAxMDEwNDAwIiwicG9zaXRpb25XaXRoRGVwdE5hbWUiOiIiLCJpc3MiOiJodHRwczovL2FwaS1jZWMtZGV2LnBlYS5jby50aCIsInN1YiI6IjkwMTEwNjUiLCJhdWQiOlsicGVhLWNtY2QiXSwiZXhwIjoxNzY0MDcyNzc5LCJpYXQiOjE3NjQwNTgzNzksImp0aSI6ImQ0aW1hMnI4bGRiZWl1ajAxaHEwIn0.rnykjnJQfbe-RnPH0pazvnGfN8N1VxdJMQT-WIXY3tY", {

      path: "/",
      expires: 1 / 24, // 1 ชั่วโมง
    });

    // ไป dashboard
    router.push("/management");
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const code = searchParams.get("code"); // Keycloak returns 'code' parameter

    if (token) {
      Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3NzUsImVtcGxveWVlSWQiOiI5MDExMDY1IiwidGl0bGUiOiLguJnguLLguKIiLCJmaXJzdE5hbWUiOiLguJjguJnguIHguKTguJUiLCJsYXN0TmFtZSI6IuC4nuC4tOC4oeC4nuC5jOC4meC5ieC4reC4oiIsInBvc2l0aW9uIjoi4LiK4Lia4LiELiIsImJ1c2luZXNzQXJlYSI6IkkwNzIiLCJidXNpbmVzc0FyZWFOYW1lIjoi4LiB4Lif4LiqLuC4quC4reC4h-C4nuC4teC5iOC4meC5ieC4reC4hyIsImRlcHRDaGFuZ2VDb2RlIjoiNDMwMzcwNTAxMDEwNDAwIiwicG9zaXRpb25XaXRoRGVwdE5hbWUiOiIiLCJpc3MiOiJodHRwczovL2FwaS1jZWMtZGV2LnBlYS5jby50aCIsInN1YiI6IjkwMTEwNjUiLCJhdWQiOlsicGVhLWNtY2QiXSwiZXhwIjoxNzY0MDcyNzc5LCJpYXQiOjE3NjQwNTgzNzksImp0aSI6ImQ0aW1hMnI4bGRiZWl1ajAxaHEwIn0.rnykjnJQfbe-RnPH0pazvnGfN8N1VxdJMQT-WIXY3tY", {

        path: "/",
        expires: 1 / 24, // 1 ชั่วโมงeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3ODMsImVtcGxveWVlSWQiOiI1MTIzMjUiLCJ0aXRsZSI6IuC4meC4suC4oiIsImZpcnN0TmFtZSI6IuC4iuC4seC4iuC4nuC4pSIsImxhc3ROYW1lIjoi4LiK4Li54Lin4LiH4Lio4LmM4Lin4Li44LiS4Li0IiwicG9zaXRpb24iOiLguJ7guIrguIcuMyjguK7guKUpIiwiYnVzaW5lc3NBcmVhIjoiSDA5MSIsImJ1c2luZXNzQXJlYU5hbWUiOiLguIHguJ_guK0u4LmB4LiB4Lil4LiHIiwiZGVwdENoYW5nZUNvZGUiOiI0MzAyNTIxMDIwMDAyMDAiLCJwb3NpdGlvbldpdGhEZXB0TmFtZSI6IiIsImlzcyI6Imh0dHBzOi8vYXBpLWNlYy1kZXYucGVhLmNvLnRoIiwic3ViIjoiNTEyMzI1IiwiYXVkIjpbInBlYS1jbWNkIl0sImV4cCI6MTc2MzY2NjMyMCwiaWF0IjoxNzYzNjUxOTIwLCJqdGkiOiJkNGZqMmsxYWMycGpvZ2lvcWNmZyJ9.Tsaic4RtUi5S7yxUw9zxX6XIIUBU5IzfZgfdz-4fdK8
      });

      const cleanUrl = window.location.pathname;
      window.history.replaceState(null, "", cleanUrl);

      setTimeout(() => {
        router.push("/management");
      }, 100);
    } else if (code) {
      // Handle Keycloak authorization code
      // You might want to exchange this code for a token
      console.log("Authorization code received:", code);

      console.log("Token", token)
      // For now, redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center space-x-2">
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
        <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 text-center">
          CEC
        </p>
        <p className="text-gray-500 text-base md:text-lg mt-2 text-center">
          เข้าสู่ระบบเพื่อดำเนินการต่อไป
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-lg mt-8 flex items-center space-x-2 transition text-sm md:text-base"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>เข้าสู่ระบบด้วย Keycloak</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
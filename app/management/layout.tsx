"use client";
import { useState } from 'react';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        {sidebarOpen && (
          <div className="w-64">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { UserProvider } from '@/contexts/UserContext';

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
    <UserProvider>
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
    </UserProvider>
  );
}
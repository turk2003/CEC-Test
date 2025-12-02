"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

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
  region: string;
}

interface RegionData {
  dept: string;
  ba: string;
  region: string;
  name: string;
}

interface UserContextType {
  userData: UserData | null;
  regions: RegionData[];
  userRegionName: string | null;
  userBusinessAreaName: string | null; 
  loading: boolean;
  regionsLoading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
  refreshRegions: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userBusinessAreaName = React.useMemo(() => {
    if (!userData || !userData.businessAreaName) return null;
    return userData.businessAreaName;
  }, [userData]);

  // หา region name ของ user
  const userRegionName = React.useMemo(() => {
    if (!userData || !userData.region || regions.length === 0) return null;
    const userRegion = regions.find(region => region.region === userData.region);
    return userRegion ? userRegion.name : null;
  }, [userData, regions]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/v1/employees/me');
      setUserData(response.data);
      console.log('User data loaded:', response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async () => {
    try {
      setRegionsLoading(true);
      const response = await api.get('/api/v1/region');
      setRegions(response.data || []);
      console.log('Regions data loaded:', response.data);
    } catch (err) {
      console.error('Error fetching regions:', err);
      setRegions([]);
    } finally {
      setRegionsLoading(false);
    }
  };

  useEffect(() => {
    // โหลดข้อมูลทั้งสองแบบ parallel
    Promise.all([
      fetchUserData(),
      fetchRegions()
    ]);
  }, []);

  const refreshUserData = async () => {
    await fetchUserData();
  };

  const refreshRegions = async () => {
    await fetchRegions();
  };

  return (
    <UserContext.Provider value={{
      userData,
      regions,
      userRegionName,
      loading,
      regionsLoading,
      error,
      userBusinessAreaName,
      refreshUserData,
      refreshRegions
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
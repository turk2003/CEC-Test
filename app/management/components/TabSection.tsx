import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import api from "@/lib/api";

interface PeaUnit {
  ba: string;
  baName: string;
  trsg: string;
  trsgName: string;
}

interface TabSectionProps {
  activeTab: 'all' | 'pending';
  onTabChange: (tab: 'all' | 'pending') => void;
  allCount: number;
  pendingCount: number;
  selectedRegion: string;
  selectedBusinessArea: string;
  onRegionChange: (region: string, ba: string) => void;
  onBusinessAreaChange: (ba: string) => void;
}

export default function TabSection({ 
  activeTab, 
  onTabChange, 
  allCount, 
  pendingCount,
  selectedRegion,
  selectedBusinessArea,
  onRegionChange,
  onBusinessAreaChange
}: TabSectionProps) {
  const { userData, regions, userRegionName, regionsLoading, userBusinessAreaName } = useUser();
  const [peaUnits, setPeaUnits] = useState<PeaUnit[]>([]);
  const [peaLoading, setPeaLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  console.log('User Business Area Name:', userBusinessAreaName);



  // Get unique regions และใช้ Map เพื่อป้องกันการซ้ำ
  const uniqueRegions = React.useMemo(() => {
    const regionMap = new Map<string, any>();
    regions.forEach(region => {
      if (!regionMap.has(region.region)) {
        regionMap.set(region.region, region);
      }
    });
    return Array.from(regionMap.values());
  }, [regions]);

  // Get unique PEA units และใช้ Map เพื่อป้องกันการซ้ำ
  const uniquePeaUnits = React.useMemo(() => {
    const peaMap = new Map<string, PeaUnit>();
    peaUnits.forEach(unit => {
      if (!peaMap.has(unit.ba)) {
        peaMap.set(unit.ba, unit);
      }
    });
    return Array.from(peaMap.values());
  }, [peaUnits]);
  

  // Load PEA units when region changes OR on initial load with user's region
  useEffect(() => {
    const fetchPeaUnits = async () => {
      // ถ้ามี selectedRegion ให้โหลดตาม selectedRegion
      if (selectedRegion) {
        try {
          setPeaLoading(true);
          const response = await api.get(`/api/v2/pealist?ba=${selectedRegion}`);
          console.log('PEA Units data:', response.data);
          setPeaUnits(response.data || []);
        } catch (error) {
          console.error('Error fetching PEA units:', error);
          setPeaUnits([]);
        } finally {
          setPeaLoading(false);
        }
        return;
      }

      // ถ้ายังไม่มี selectedRegion แต่มี userData.region ให้โหลดตาม user's region
      if (!selectedRegion && userData?.region && !hasInteracted) {
        try {
          setPeaLoading(true);
          const response = await api.get(`/api/v2/pealist?ba=${userData.region}`);
          console.log('Initial PEA Units data for user region:', response.data);
          setPeaUnits(response.data || []);
        } catch (error) {
          console.error('Error fetching initial PEA units:', error);
          setPeaUnits([]);
        } finally {
          setPeaLoading(false);
        }
        return;
      }

      // ถ้าไม่มีทั้งสองอย่าง ให้ clear
      setPeaUnits([]);
    };

    fetchPeaUnits();
  }, [selectedRegion, userData, hasInteracted]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionValue = e.target.value;
    setHasInteracted(true);
    
    if (regionValue === '') {
      onRegionChange('', '');
      setPeaUnits([]);
      return;
    }
    
    onRegionChange(regionValue, '');
  };

  const handleBusinessAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const baValue = e.target.value;
    setHasInteracted(true);
    onBusinessAreaChange(baValue);
  };

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
        {/* Region Dropdown */}
        <select 
          value={selectedRegion}
          onChange={handleRegionChange}
          disabled={regionsLoading}
          className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg text-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          <option value="">
            {regionsLoading 
              ? "กำลังโหลด..." 
              : !hasInteracted && userRegionName
                ? userRegionName
                : "เลือกเขต (ทั้งหมด)"}
          </option>
          {!regionsLoading && uniqueRegions.map((region, index) => (
            <option key={`region-${region.region}-${index}`} value={region.region}>
              {region.name}
            </option>
          ))}
        </select>

        {/* Business Area Dropdown */}
        <select 
          value={selectedBusinessArea}
          onChange={handleBusinessAreaChange}
          disabled={regionsLoading || peaLoading || (!selectedRegion && (hasInteracted || !userData?.region))}
          className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg text-sm bg-white min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedRegion 
              ? (!hasInteracted && userBusinessAreaName ? userBusinessAreaName : "เลือกเขตก่อน")
              : peaLoading 
                ? "กำลังโหลด..." 
                : (!hasInteracted && userBusinessAreaName ? userBusinessAreaName : "เลือกการไฟฟ้า (ทั้งหมด)")}
          </option>
          {!regionsLoading && !peaLoading && uniquePeaUnits.length > 0 && (
            uniquePeaUnits.map((unit, index) => (
              <option key={`pea-${unit.ba}-${index}`} value={unit.ba}>
                {unit.baName} ({unit.ba})
                {userData && userData.businessArea === unit.ba ? " (การไฟฟ้าของคุณ)" : ""}
              </option>
            ))
          )}
        </select>

        {/* Clear Filter Button */}
        {(selectedRegion || selectedBusinessArea) && (
          <button
            onClick={() => {
              setHasInteracted(false);
              onRegionChange('', '');
              setPeaUnits([]);
            }}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 hover:border-red-500 rounded-lg transition-colors"
            title="ล้างตัวกรอง"
          >
            ล้าง
          </button>
        )}
      </div>
    </div>
  );
}
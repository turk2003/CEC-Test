import React, { useEffect, useState } from "react";
import api from "@/lib/api";

interface Region {
  dept: string;
  ba: string;
  region: string;
  name: string;
}

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
  const [regions, setRegions] = useState<Region[]>([]);
  const [peaUnits, setPeaUnits] = useState<PeaUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [peaLoading, setPeaLoading] = useState(false);
  
  // Get unique regions และใช้ Map เพื่อป้องกันการซ้ำ
  const uniqueRegions = React.useMemo(() => {
    const regionMap = new Map<string, Region>();
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

  // Load regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/v1/region');
        console.log('Regions data:', response.data);
        setRegions(response.data || []);
      } catch (error) {
        console.error('Error fetching regions:', error);
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  // Load PEA units when region changes
  useEffect(() => {
    const fetchPeaUnits = async () => {
      if (!selectedRegion) {
        setPeaUnits([]);
        return;
      }

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
    };

    fetchPeaUnits();
  }, [selectedRegion]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionValue = e.target.value;
    
    if (regionValue === '') {
      onRegionChange('', '');
      setPeaUnits([]); // Clear PEA units
      return;
    }
    
    // เมื่อเลือกเขตใหม่ ให้ส่งค่า region และ clear BA
    onRegionChange(regionValue, '');
  };

  const handleBusinessAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const baValue = e.target.value;
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
          disabled={loading}
          className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg text-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
        >
          <option value="">เลือกเขต</option>
          {loading ? (
            <option disabled>กำลังโหลด...</option>
          ) : (
            uniqueRegions.map((region, index) => (
              <option key={`region-${region.region}-${index}`} value={region.region}>
                {region.name}
              </option>
            ))
          )}
        </select>

        {/* Business Area Dropdown */}
        <select 
          value={selectedBusinessArea}
          onChange={handleBusinessAreaChange}
          disabled={loading || peaLoading || !selectedRegion}
          className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg text-sm bg-white min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {!selectedRegion 
              ? "เลือกเขตก่อน" 
              : peaLoading 
                ? "กำลังโหลด..." 
                : "เลือกการไฟฟ้า (ทั้งหมด)"}
          </option>
          {!loading && !peaLoading && uniquePeaUnits.length > 0 && (
            uniquePeaUnits.map((unit, index) => (
              <option key={`pea-${unit.ba}-${index}`} value={unit.ba}>
                {unit.baName} ({unit.ba})
              </option>
            ))
          )}
        </select>

        {/* Clear Filter Button */}
        {(selectedRegion || selectedBusinessArea) && (
          <button
            onClick={() => {
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
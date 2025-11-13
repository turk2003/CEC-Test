export default function ManagementPage() {
  return (
    <div>
      <div className="mb-6">
        <nav className="flex space-x-1 text-sm text-gray-500">
          <span>ข้อมูลพื้นฐานทั่วไป</span>
          <span>&gt;</span>
          <span className="text-gray-900">จัดการระบบข้อมูล</span>
        </nav>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ตรวจสอบข้อมูลตรวจสอบพัสดุครั้ง</h1>
      
      <div className="bg-white rounded-lg border-2 border-blue-200 p-8 min-h-96">
        {/* Content area */}
        <div className="text-center text-gray-400">
          <p>เนื้อหาหลักจะแสดงที่นี่</p>
        </div>
      </div>
    </div>
  );
}
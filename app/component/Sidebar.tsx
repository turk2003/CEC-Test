const Sidebar = () => {
  const menuItems = [
    { icon: "📊", title: "ข้อมูลทั่วไป", active: false },
    { icon: "📋", title: "พัสดุทั่วไป", active: false },
    { icon: "🏗️", title: "พัสดุก่อสร้าง", active: false },
    { icon: "🔍", title: "ตรวจสอบ", active: false },
    { icon: "📄", title: "รายงาน", active: false },
    { icon: "⚙️", title: "จัดการระบบ", hasSubmenu: true, active: true }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <div className="mb-6">
          <button className="w-full flex items-center justify-between p-2 text-purple-600 bg-purple-50 rounded">
            <span className="text-sm font-medium">ข้อมูลพื้นฐานทั่วไป</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button className={`w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-50 ${
                item.active ? 'bg-gray-50 text-purple-600' : 'text-gray-700'
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {item.hasSubmenu && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 text-gray-700">
            <span className="text-lg">👤</span>
            <span className="text-sm font-medium">คู่มือการใช้งาน</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 text-gray-700">
            <span className="text-lg">📞</span>
            <span className="text-sm font-medium">แจ้งปัญหาการใช้งาน</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
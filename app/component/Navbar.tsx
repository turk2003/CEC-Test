const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7H18" stroke="#454545" stroke-width="2" stroke-linecap="round" />
            <path d="M6 12H18" stroke="#454545" stroke-width="2" stroke-linecap="round" />
            <path d="M6 17H18" stroke="#454545" stroke-width="2" stroke-linecap="round" />
          </svg>

          <img src="/CECLogo3 2.svg" alt="CEC Logo" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PEA Construction Equipment Checking</h1>
            <p className="text-sm text-gray-500">ระบบตรวจสอบพัสดุ อุปกรณ์ก่อสร้างขององค์กร</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">ชาติชาปณ์ ชูวงศ์วุฒิ</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
          <svg width="2" height="32" viewBox="0 0 2 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="4.37112e-08" x2="0.999999" y2="32" stroke="#454545" stroke-width="2" stroke-linejoin="round" />
          </svg>

          <button className="text-gray-400 hover:text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4V20H4L4 4L15 4Z" stroke="#454545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 12H21.5" stroke="#454545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.5 15L21.5 12L18.5 9" stroke="#454545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
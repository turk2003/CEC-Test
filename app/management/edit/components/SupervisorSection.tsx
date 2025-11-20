import React from "react";

type SupervisorInfo = {
  employeeId: string;
  fullName: string;
  position: string;
};

type SupervisorSectionProps = {
  supervisor: SupervisorInfo;
  onAddSupervisor?: () => void;
};

const readOnlyInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed text-gray-500";

export default function SupervisorSection({ supervisor, onAddSupervisor }: SupervisorSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 20.2L1.0004 16.5996C1.00063 14.6115 2.61234 13 4.6004 13H10.6M17.6286 12.1L20.2 14.5M20.2 14.5L17.6286 16.9M20.2 14.5H13.6M13 4.6C13 6.58822 11.3882 8.2 9.4 8.2C7.41177 8.2 5.8 6.58822 5.8 4.6C5.8 2.61177 7.41177 1 9.4 1C11.3882 1 13 2.61177 13 4.6Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">ช่างผู้ควบคุมงาน</h2>
      </div>

      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 sm:col-span-3 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเลขพนักงาน <span className="text-red-500">*</span>
          </label>
          <input type="text" value={supervisor.employeeId} className={readOnlyInputClass} disabled />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อ - สกุล <span className="text-red-500">*</span>
          </label>
          <input type="text" value={"นายนพนันต์ พรหมศรี"} className={readOnlyInputClass} disabled />
          {/* <input type="text" value={supervisor.fullName} className={readOnlyInputClass} disabled /> */}
        </div>

        <div className="col-span-12 sm:col-span-3 lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ตำแหน่ง <span className="text-red-500">*</span>
          </label>
          <input type="text" value={supervisor.position} className={readOnlyInputClass} disabled />
        </div>

        <div className="col-span-12">
          <button
            type="button"
            onClick={onAddSupervisor}
            className="w-full px-6 py-3 border border-dashed border-purple-300 rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 flex items-center justify-center gap-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.3999 21.5999C1.39984 22.1522 1.84751 22.6 2.39979 22.6C2.95207 22.6001 3.39984 22.1524 3.3999 21.6001L2.3999 21.6L1.3999 21.5999ZM2.40031 17.9996L3.40031 17.9997L2.40031 17.9996ZM12.5999 15.4C13.1522 15.4 13.5999 14.9523 13.5999 14.4C13.5999 13.8477 13.1522 13.4 12.5999 13.4V14.4V15.4ZM21.5999 16.6C22.1522 16.6 22.5999 16.1523 22.5999 15.6C22.5999 15.0477 22.1522 14.6 21.5999 14.6V15.6V16.6ZM16.1999 14.6C15.6476 14.6 15.1999 15.0477 15.1999 15.6C15.1999 16.1523 15.6476 16.6 16.1999 16.6V15.6V14.6ZM17.8999 18.2999C17.8999 18.8522 18.3476 19.2999 18.8999 19.2999C19.4522 19.2999 19.8999 18.8522 19.8999 18.2999H18.8999H17.8999ZM19.8999 12.8999C19.8999 12.3476 19.4522 11.8999 18.8999 11.8999C18.3476 11.8999 17.8999 12.3476 17.8999 12.8999H18.8999H19.8999ZM17.8889 1.52772C17.4071 1.25767 16.7976 1.4293 16.5276 1.91107C16.2575 2.39283 16.4292 3.00229 16.9109 3.27233L17.3999 2.40002L17.8889 1.52772ZM16.9109 8.72772C16.4292 8.99776 16.2575 9.60722 16.5276 10.089C16.7976 10.5707 17.4071 10.7424 17.8889 10.4723L17.3999 9.60002L16.9109 8.72772ZM14.3999 6.00002H13.3999C13.3999 7.43596 12.2358 8.60002 10.7999 8.60002V9.60002V10.6C13.3404 10.6 15.3999 8.54053 15.3999 6.00002H14.3999ZM10.7999 9.60002V8.60002C9.36396 8.60002 8.1999 7.43596 8.1999 6.00002H7.1999H6.1999C6.1999 8.54053 8.25939 10.6 10.7999 10.6V9.60002ZM7.1999 6.00002H8.1999C8.1999 4.56408 9.36396 3.40002 10.7999 3.40002V2.40002V1.40002C8.25939 1.40002 6.1999 3.45951 6.1999 6.00002H7.1999ZM10.7999 2.40002V3.40002C12.2358 3.40002 13.3999 4.56408 13.3999 6.00002H14.3999H15.3999C15.3999 3.45951 13.3404 1.40002 10.7999 1.40002V2.40002ZM2.3999 21.6L3.3999 21.6001L3.40031 17.9997L2.40031 17.9996L1.40031 17.9995L1.3999 21.5999L2.3999 21.6ZM6.00031 14.4V13.4C3.46 13.4 1.40059 15.4592 1.40031 17.9995L2.40031 17.9996L3.40031 17.9997C3.40047 16.5639 4.56448 15.4 6.00031 15.4V14.4ZM6.00031 14.4V15.4H12.5999V14.4V13.4H6.00031V14.4ZM21.5999 15.6V14.6H18.8999V15.6V16.6H21.5999V15.6ZM18.8999 15.6V14.6H16.1999V15.6V16.6H18.8999V15.6ZM18.8999 18.2999H19.8999V15.6H18.8999H17.8999V18.2999H18.8999ZM18.8999 15.6H19.8999V12.8999H18.8999H17.8999V15.6H18.8999ZM17.3999 2.40002L16.9109 3.27233C18.1486 3.96606 18.7999 4.98568 18.7999 6.00002H19.7999H20.7999C20.7999 4.06412 19.5637 2.46654 17.8889 1.52772L17.3999 2.40002ZM19.7999 6.00002H18.7999C18.7999 7.01437 18.1486 8.03399 16.9109 8.72772L17.3999 9.60002L17.8889 10.4723C19.5637 9.53351 20.7999 7.93592 20.7999 6.00002H19.7999Z"
                fill="#821890"
              />
            </svg>
            <span>เพิ่มช่างผู้ควบคุมงาน</span>
          </button>
        </div>
      </div>
    </section>
  );
}


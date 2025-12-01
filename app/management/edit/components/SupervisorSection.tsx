import api from "@/lib/api";
import React, { useState, useEffect, useRef } from "react";

type SupervisorInfo = {
  employeeId: string;
  fullName: string;
  position: string;
};

type SupervisorSectionProps = {
  supervisor: SupervisorInfo;
  onAddSupervisor?: () => void;
  onSupervisorChange?: (newSupervisor: SupervisorInfo) => void;
};

const readOnlyInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed text-gray-500";

const editableInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900";

export default function SupervisorSection({
  supervisor,
  onAddSupervisor,
  onSupervisorChange,
}: SupervisorSectionProps) {
  const [supervisorList, setSupervisorList] = useState<SupervisorInfo[]>([supervisor]);
  const [debounceId, setDebounceId] = useState<{ [key: number]: string }>({});
  const [debounceName, setDebounceName] = useState<{ [key: number]: string }>({});
  const requestCounterRef = useRef<{ [key: number]: number }>({});
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

  async function fetchEmployeeById(employeeId: string, index: number, reqId?: number) {
    if (!employeeId) return;
    try {
      const response = await api.get(`/api/v1/employees/${employeeId}`);
      const data = response.data;

      // If a newer request was made for this index, ignore this stale response
      if (typeof reqId !== 'undefined' && requestCounterRef.current[index] !== reqId) return;

      setSupervisorList((prev) => {
        const updated = [...prev];
        updated[index] = {
          employeeId: data.employeeId,
          fullName: `${data.firstName} ${data.lastName}`,
          position: data.position,
        };
        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchEmployeeByName(name: string, index: number, reqId?: number) {
    if (!name) return;
    try {
      const response = await api.get(`/api/v1/employees/name/${name}`);
      const data = response.data;
      if (!Array.isArray(data) || data.length === 0) return;

      // If a newer request was made for this index, ignore this stale response
      if (typeof reqId !== 'undefined' && requestCounterRef.current[index] !== reqId) return;

      const e = data[0];
      setSupervisorList((prev) => {
        const updated = [...prev];
        updated[index] = {
          employeeId: e.employeeId,
          fullName: `${e.firstName} ${e.lastName}`,
          position: e.position,
        };
        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timers: number[] = [];

    Object.keys(debounceId).forEach((key) => {
      const idx = Number(key);
      const handler = window.setTimeout(() => {
        // bump request counter for this index to mark this as the latest
        requestCounterRef.current[idx] = (requestCounterRef.current[idx] || 0) + 1;
        const reqId = requestCounterRef.current[idx];
        fetchEmployeeById(debounceId[idx], idx, reqId);
      }, 600);
      timers.push(handler);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [debounceId]);

  useEffect(() => {
    const timers: number[] = [];

    Object.keys(debounceName).forEach((key) => {
      const idx = Number(key);
      const handler = window.setTimeout(() => {
        requestCounterRef.current[idx] = (requestCounterRef.current[idx] || 0) + 1;
        const reqId = requestCounterRef.current[idx];
        fetchEmployeeByName(debounceName[idx], idx, reqId);
      }, 900);
      timers.push(handler);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [debounceName]);

  useEffect(() => {
    if (confirmDeleteIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setConfirmDeleteIndex(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmDeleteIndex]);

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

      {supervisorList.map((sup, index) => (
        <div key={index} className="grid grid-cols-12 gap-6 items-end mb-4">
          <div className="col-span-12 sm:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมายเลขพนักงาน <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sup.employeeId}
              onChange={(e) => {
                setSupervisorList((prev) => {
                  const updated = [...prev];
                  updated[index] = { ...updated[index], employeeId: e.target.value };
                  return updated;
                });
                setDebounceId((prev) => ({ ...prev, [index]: e.target.value }));
              }}
              className={editableInputClass}
            />
          </div>

          <div className="col-span-12 sm:col-span-5 lg:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ - สกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sup.fullName}
              onChange={(e) => {
                setSupervisorList((prev) => {
                  const updated = [...prev];
                  updated[index] = { ...updated[index], fullName: e.target.value };
                  return updated;
                });
                setDebounceName((prev) => ({ ...prev, [index]: e.target.value }));
              }}
              className={editableInputClass}
            />
          </div>

          <div className="col-span-12 sm:col-span-3 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ตำแหน่ง <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={sup.position}
              className={readOnlyInputClass}
              disabled
            />
          </div>
          {index > 0 && (
            <div className="col-span-12 sm:col-span-1 lg:col-span-1 flex justify-end items-end">
              <button
                type="button"
                onClick={() => setConfirmDeleteIndex(index)}
                className="p-1 rounded-md"
              >
                <svg width="40" height="40" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="56" height="50" rx="8" fill="#FEE4E2" />
                  <path d="M17.3999 34.5998C17.3998 35.1521 17.8475 35.5998 18.3998 35.5999C18.9521 35.6 19.3998 35.1523 19.3999 34.6L18.3999 34.5999L17.3999 34.5998ZM18.4003 30.9995L19.4003 30.9996L18.4003 30.9995ZM29.1999 28.3999C29.7522 28.3999 30.1999 27.9522 30.1999 27.3999C30.1999 26.8476 29.7522 26.3999 29.1999 26.3999V27.3999V28.3999ZM36.8928 31.107C37.2833 31.4975 37.9165 31.4975 38.307 31.107C38.6975 30.7165 38.6975 30.0833 38.307 29.6928L37.5999 30.3999L36.8928 31.107ZM34.4886 25.8744C34.0981 25.4839 33.4649 25.4839 33.0744 25.8744C32.6839 26.2649 32.6839 26.8981 33.0744 27.2886L33.7815 26.5815L34.4886 25.8744ZM33.0745 29.6927C32.684 30.0832 32.684 30.7164 33.0745 31.1069C33.465 31.4974 34.0982 31.4974 34.4887 31.1069L33.7816 30.3998L33.0745 29.6927ZM38.3071 27.2885C38.6976 26.898 38.6976 26.2648 38.3071 25.8743C37.9166 25.4838 37.2834 25.4838 36.8929 25.8743L37.6 26.5814L38.3071 27.2885ZM30.3999 18.9999H29.3999C29.3999 20.4358 28.2358 21.5999 26.7999 21.5999V22.5999V23.5999C29.3404 23.5999 31.3999 21.5404 31.3999 18.9999H30.3999ZM26.7999 22.5999V21.5999C25.364 21.5999 24.1999 20.4358 24.1999 18.9999H23.1999H22.1999C22.1999 21.5404 24.2594 23.5999 26.7999 23.5999V22.5999ZM23.1999 18.9999H24.1999C24.1999 17.564 25.364 16.3999 26.7999 16.3999V15.3999V14.3999C24.2594 14.3999 22.1999 16.4594 22.1999 18.9999H23.1999ZM26.7999 15.3999V16.3999C28.2358 16.3999 29.3999 17.564 29.3999 18.9999H30.3999H31.3999C31.3999 16.4594 29.3404 14.3999 26.7999 14.3999V15.3999ZM18.3999 34.5999L19.3999 34.6L19.4003 30.9996L18.4003 30.9995L17.4003 30.9994L17.3999 34.5998L18.3999 34.5999ZM22.0003 27.3999V26.3999C19.46 26.3999 17.4006 28.4591 17.4003 30.9994L18.4003 30.9995L19.4003 30.9996C19.4005 29.5638 20.5645 28.3999 22.0003 28.3999V27.3999ZM22.0003 27.3999V28.3999H29.1999V27.3999V26.3999H22.0003V27.3999Z" fill="#F04438" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="col-span-12">
        <button
          type="button"
          onClick={() => {
            setSupervisorList([...supervisorList, { employeeId: "", fullName: "", position: "" }]);
          }}
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
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <svg width="80" height="80" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
              <path d="M75.189 75.1889L49.2618 49.2617" stroke="#F04438" strokeWidth="5" strokeLinecap="round" />
              <path d="M49.2622 75.1889L75.1894 49.2617" stroke="#F04438" strokeWidth="5" strokeLinecap="round" />
              <path fillRule="evenodd" clipRule="evenodd" d="M36.2983 88.1526C50.6176 102.472 73.8336 102.472 88.1528 88.1526C102.472 73.8334 102.472 50.6173 88.1528 36.2981C73.8336 21.9789 50.6176 21.9789 36.2983 36.2981C21.9791 50.6173 21.9791 73.8334 36.2983 88.1526Z" stroke="#F04438" strokeWidth="5" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">ยกเลิกช่างควบคุมงานคนนี้หรือไม่ ?</h2>
            <p className="text-gray-600 mb-6">กดยืนยันเพื่อลบสิทธิ์ช่างควบคุมงานคนนี้ออก</p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setConfirmDeleteIndex(null)}
                className="flex-1 py-2 border rounded-md text-gray-700 bg-white"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={() => {
                  setSupervisorList((prev) => prev.filter((_, i) => i !== confirmDeleteIndex));
                  setConfirmDeleteIndex(null);
                }}
                className="flex-1 py-2 rounded-md text-white bg-red-500"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
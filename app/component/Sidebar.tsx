"use client";
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [openConstruction, setOpenConstruction] = React.useState(true);
  const [openDesign, setOpenDesign] = React.useState(false);

  return (
    <div className="w-64 bg-white border-r shadow h-[calc(100vh-80px)] flex flex-col">
      {/* Scrollable content area */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main Dropdown: จัดการงานก่อสร้าง */}
        <div>
          <button
            onClick={() => setOpenConstruction(!openConstruction)}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-medium
              ${openConstruction
                ? 'bg-purple-100 text-purple-700'
                : 'bg-transparent text-black'}`}
          >
            <div className="flex items-center gap-3">
              {/* SVG Icon */}
              <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1176 7.6H19.1333C19.7224 7.6 20.2 8.07756 20.2 8.66667V14.898V15.2C20.2 16.3046 19.3046 17.2 18.2 17.2H3.4M1 2.06667V15.1C1 16.2598 1.9402 17.2 3.1 17.2C4.2598 17.2 5.2 16.2598 5.2 15.1V8.66667C5.2 8.07756 5.67756 7.6 6.26667 7.6H18.0667V5.07843C18.0667 4.48933 17.5891 4.01176 17 4.01176H9.97255L8.3426 1.48797C8.14612 1.18375 7.80871 1 7.44656 1H2.06667C1.47756 1 1 1.47756 1 2.06667Z" stroke={openConstruction ? "#821890" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className={openConstruction ? "text-purple-700" : "text-black"}>จัดการงานก่อสร้าง</span>
            </div>
            {openConstruction ? <ChevronDown className="text-purple-700" /> : <ChevronRight className="text-black" />}
          </button>

          {openConstruction && (
            <div className="mt-4 ml-7 space-y-5">
              <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.8215 5.05L9.91075 1L1 5.05V13.15L9.91075 17.2M18.8215 5.05L9.91075 9.60625M18.8215 5.05V9.1M9.91075 17.2V9.60625M9.91075 17.2L11.8394 16.3234M9.91075 9.60625L1.55074 5.55625M13.7692 7.075L5.4092 3.025M15.0554 14.1625L16.3415 15.175L20.2 12.1375" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-black">ประมาณการ</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.16809 17.1284H3.38935C2.06974 17.1284 0.999992 16.2258 1 15.1124L1.00009 3.01605C1.0001 1.90261 2.06985 1 3.38945 1H14.1419C15.4615 1 16.5312 1.90262 16.5312 3.01606V7.04818M5.18176 5.03212H12.3498M5.18176 8.05621H12.3498M5.18176 11.0803H8.7658M11.7523 14.3489L16.8209 10.0722L20.2 12.9233L15.1314 17.2H11.7523V14.3489Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="text-black">พัสดุงานก่อสร้าง</span>
              </div>

              <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.8 3.66301V4.66301C6.14329 4.66301 6.46259 4.48692 6.64576 4.19657L5.8 3.66301ZM7.48 1V0C7.1367 0 6.81741 0.176094 6.63424 0.466439L7.48 1ZM13.72 1L14.5658 0.466439C14.3826 0.176094 14.0633 0 13.72 0V1ZM15.4 3.66301L14.5542 4.19657C14.7374 4.48692 15.0567 4.66301 15.4 4.66301V3.66301ZM1 14.9808H2V5.88219H1H0V14.9808H1ZM3.4 3.66301V4.66301H5.8V3.66301V2.66301H3.4V3.66301ZM5.8 3.66301L6.64576 4.19657L8.32576 1.53356L7.48 1L6.63424 0.466439L4.95424 3.12945L5.8 3.66301ZM7.48 1V2H13.72V1V0H7.48V1ZM13.72 1L12.8742 1.53356L14.5542 4.19657L15.4 3.66301L16.2458 3.12945L14.5658 0.466439L13.72 1ZM15.4 3.66301V4.66301H17.8V3.66301V2.66301H15.4V3.66301ZM20.2 5.88219H19.2V14.9808H20.2H21.2V5.88219H20.2ZM20.2 14.9808H19.2C19.2 15.5818 18.6484 16.2 17.8 16.2V17.2V18.2C19.6026 18.2 21.2 16.831 21.2 14.9808H20.2ZM17.8 3.66301V4.66301C18.6484 4.66301 19.2 5.28117 19.2 5.88219H20.2H21.2C21.2 4.03197 19.6026 2.66301 17.8 2.66301V3.66301ZM1 5.88219H2C2 5.28117 2.5516 4.66301 3.4 4.66301V3.66301V2.66301C1.59743 2.66301 0 4.03197 0 5.88219H1ZM3.4 17.2V16.2C2.5516 16.2 2 15.5818 2 14.9808H1H0C0 16.831 1.59743 18.2 3.4 18.2V17.2ZM14.2 9.87671H13.2C13.2 11.0905 12.1111 12.2055 10.6 12.2055V13.2055V14.2055C13.0653 14.2055 15.2 12.3397 15.2 9.87671H14.2ZM10.6 13.2055V12.2055C9.08886 12.2055 8 11.0905 8 9.87671H7H6C6 12.3397 8.13469 14.2055 10.6 14.2055V13.2055ZM7 9.87671H8C8 8.66288 9.08886 7.54795 10.6 7.54795V6.54795V5.54795C8.13469 5.54795 6 7.41369 6 9.87671H7ZM10.6 6.54795V7.54795C12.1111 7.54795 13.2 8.66288 13.2 9.87671H14.2H15.2C15.2 7.41369 13.0653 5.54795 10.6 5.54795V6.54795ZM17.8 17.2V16.2H3.4V17.2V18.2H17.8V17.2Z" fill="black" />
                </svg>

                <span className="text-black">ภาพงานทั้งหมด</span>
              </div>

              <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.8 13.15V11.125M10.6 13.15V9.1M15.4 13.15V5.05M3.4 17.2C2.07451 17.2 1 16.2934 1 15.175V3.025C1 1.90662 2.07452 1 3.4 1H17.8C19.1255 1 20.2 1.90662 20.2 3.025V15.175C20.2 16.2934 19.1255 17.2 17.8 17.2H3.4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="text-black">รายงาน</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13.1982V7.09911M13.6 10.9804V4.88125M1 14.8857V1L6.84348 3.31429L13.5217 1L20.2 3.31429V17.2L13.5217 14.8857L6.84348 17.2L1 14.8857Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span className="text-black">แผนผังงาน</span>
              </div>


              {/* เพิ่มเมนูอื่นๆ ตามต้องการ */}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setOpenDesign(!openDesign)}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-medium
              ${openDesign
                ? 'bg-purple-100 text-purple-700'
                : 'bg-transparent text-black'}`}
          >
            <div className="flex items-center gap-3">
              {/* SVG Icon */}
              <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M15.1176 7.6H19.1333C19.7224 7.6 20.2 8.07756 20.2 8.66667V14.898V15.2C20.2 16.3046 19.3046 17.2 18.2 17.2H3.4M1 2.06667V15.1C1 16.2598 1.9402 17.2 3.1 17.2C4.2598 17.2 5.2 16.2598 5.2 15.1V8.66667C5.2 8.07756 5.67756 7.6 6.26667 7.6H18.0667V5.07843C18.0667 4.48933 17.5891 4.01176 17 4.01176H9.97255L8.3426 1.48797C8.14612 1.18375 7.80871 1 7.44656 1H2.06667C1.47756 1 1 1.47756 1 2.06667Z" stroke={openDesign ? "#821890" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className={openDesign ? "text-purple-700" : "text-black"}>จัดการงานออกแบบ</span>
            </div>
            {openDesign ? <ChevronDown className="text-purple-700" /> : <ChevronRight className="text-black" />}
          </button>

          {openDesign && (
            <div className="mt-4 ml-7 space-y-5">
             {/* เพิ่มเมนูย่อยตามต้องการ */}
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="w-full flex items-center justify-between p-3 rounded-xl font-medium">
          <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6001 17.2C10.6001 17.2 10.6001 3.025 10.6001 3.025C10.6001 3.025 8.46675 1 6.33342 1C4.20009 1 1.0001 3.025 1.0001 3.025C1.0001 3.025 1.0001 17.2 1.0001 17.2C1.0001 17.2 4.20008 15.175 6.33342 15.175C8.46676 15.175 10.6001 17.2 10.6001 17.2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6001 17.2C10.6001 17.2 10.6001 3.025 10.6001 3.025C10.6001 3.025 12.7334 1 14.8668 1C17.0001 1 20.2001 3.025 20.2001 3.025C20.2001 3.025 20.2001 17.2 20.2001 17.2C20.2001 17.2 17.0001 15.175 14.8668 15.175C12.7334 15.175 10.6001 17.2 10.6001 17.2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span className="text-black">คู่มือการใช้งาน</span>
          </div>
        </div>

        <div className="w-full flex items-center justify-between p-3 rounded-xl font-medium">
          <div className="flex items-center gap-3 cursor-pointer hover:text-purple-600">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.2002 1H21.2002C21.2002 0.447715 20.7525 0 20.2002 0V1ZM20.2002 13.3887V14.3887C20.7525 14.3887 21.2002 13.941 21.2002 13.3887H20.2002ZM11.667 13.3887V12.3887C11.4869 12.3887 11.3101 12.4373 11.1553 12.5295L11.667 13.3887ZM5.2666 17.2002H4.2666C4.2666 17.5599 4.45976 17.8918 4.77247 18.0696C5.08517 18.2473 5.46923 18.2434 5.77826 18.0594L5.2666 17.2002ZM5.2666 13.3887H6.2666C6.2666 12.8364 5.81889 12.3887 5.2666 12.3887V13.3887ZM1 13.3887H0C0 13.941 0.447715 14.3887 1 14.3887L1 13.3887ZM1 1V0C0.447715 0 0 0.447715 0 1L1 1ZM20.2002 1H19.2002V13.3887H20.2002H21.2002V1H20.2002ZM20.2002 13.3887V12.3887H11.667V13.3887V14.3887H20.2002V13.3887ZM11.667 13.3887L11.1553 12.5295L4.75494 16.341L5.2666 17.2002L5.77826 18.0594L12.1787 14.2479L11.667 13.3887ZM5.2666 17.2002H6.2666V13.3887H5.2666H4.2666V17.2002H5.2666ZM5.2666 13.3887V12.3887H1V13.3887V14.3887H5.2666V13.3887ZM1 13.3887H2V1H1H0V13.3887H1ZM1 1V2H20.2002V1V0H1V1Z" fill="black" />
            </svg>

            <span className="text-black">แจ้งปัญหาการใช้งาน</span>
          </div>
        </div>
      </div>
    </div>
  );
}
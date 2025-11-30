import React from "react";
import { DataItem } from "@/types";

type ConstructionDetailsSectionProps = {
  formData: Partial<DataItem>;
  onFieldChange?: (field: keyof DataItem, value: string | number) => void;
  onLinkOldEstimate: () => void;
  onLinkNewEstimate: () => void;
};

const readOnlyInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed text-gray-500";

const editableInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";

const enableBtnOld =
  "px-6 py-2 border border-purple-500 rounded-md text-purple-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"

const enableBtnNew =
  "px-6 py-2 border border-purple-800 rounded-md text-white bg-purple-800 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-gray-200"

const disabledBtn =
  "px-6 py-2 border border-gray-300 rounded-md text-gray-500 bg-gray-200 "

export default function ConstructionDetailsSection({
  formData,
  onFieldChange,
  onLinkOldEstimate,
  onLinkNewEstimate
}: ConstructionDetailsSectionProps) {
  console.log({ "อยากให้แสดงข้อมูลของหน้านี้ มี wbs:": formData.wbs })
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.2 20.1999H3.39999C2.0745 20.1999 0.999991 19.1254 1 17.7999L1.00009 3.39999C1.0001 2.07451 2.07462 1 3.40009 1H14.2004C15.5258 1 16.6004 2.07452 16.6004 3.4V10M17.8004 17.7574L15.3461 20.2M15.3461 20.2L13.0004 17.8678M15.3461 20.2V14.2M5.20037 5.8H12.4004M5.20037 9.4H12.4004M5.20037 13H8.80038"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">รายละเอียดงานก่อสร้าง</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ">
            WBS <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.wbs || ""}
            onChange={(e) => onFieldChange?.("wbs", e.target.value)}
            className={readOnlyInputClass}
            placeholder="กรอก WBS"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่องาน <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.jobName || ""}
            onChange={(e) => onFieldChange?.("jobName", e.target.value)}
            className={readOnlyInputClass}
            placeholder="กรอกชื่องาน"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเลขผังงาน <span className="text-red-500">*</span>
          </label>
          <input

            type="text"
            value={formData.planNo}
            onChange={(e) => onFieldChange?.("planNo", e.target.value)}
            className={formData.jobStatus === "UNLINKED" ? editableInputClass : readOnlyInputClass}
            placeholder="กรอก WBS"
            disabled={formData.jobStatus === "UNLINKED" ? false : true}
          />
        </div>

        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onLinkOldEstimate}
            className={formData.jobStatus === "UNLINKED" ? enableBtnOld : disabledBtn}
            disabled={formData.jobStatus === "UNLINKED" ? false : true}
          >
            เชื่อมประมาณการเก่า
          </button>
          <button
            type="button"
            onClick={onLinkNewEstimate}
            className={formData.jobStatus === "UNLINKED" ? enableBtnNew : disabledBtn}
            disabled={formData.jobStatus === "UNLINKED" ? false : true}
          >
            เชื่อมประมาณการใหม่
          </button>
        </div>
      </div>
    </section>
  );
}


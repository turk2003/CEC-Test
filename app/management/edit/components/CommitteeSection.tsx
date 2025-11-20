import React from "react";
import { CommitteeMember } from "@/types";


type CommitteeSectionProps = {
  members: CommitteeMember[];
  onMemberChange?: (id: string, field: keyof CommitteeMember, value: string) => void;
};
const editableInputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";

export default function CommitteeSection({ members, onMemberChange }: CommitteeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0253 20.5707L16.0256 17.3569C16.0258 15.5818 14.5867 14.1426 12.8115 14.1426H5.61432C3.83939 14.1426 2.40046 15.5814 2.40026 17.3563L2.3999 20.5707M21.5996 20.5709L21.5999 17.3571C21.6001 15.5819 20.161 14.1428 18.3858 14.1428M15.4062 4.06048C16.1955 4.64612 16.7071 5.58498 16.7071 6.64331C16.7071 7.70164 16.1955 8.64049 15.4062 9.22613M12.4937 6.64313C12.4937 8.41821 11.0547 9.85719 9.27964 9.85719C7.50457 9.85719 6.06559 8.41821 6.06559 6.64313C6.06559 4.86806 7.50457 3.42908 9.27964 3.42908C11.0547 3.42908 12.4937 4.86806 12.4937 6.64313Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">คณะกรรมการตรวจสอบมาตรฐานงานก่อสร้าง</h2>
      </div>

      <div className="space-y-6">
        {members.map((member) => (
          <div key={member.id} className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 sm:col-span-3 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมายเลขพนักงาน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={"หมายเลขพนักงาน"}
                onChange={(e) => onMemberChange?.(member.id, "employeeId", e.target.value)}
                className={editableInputClass}
              />
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {member.roleLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={"ชื่อ - สกุล พนักงาน"}
                onChange={(e) => onMemberChange?.(member.id, "name", e.target.value)}
                className={editableInputClass}
              />
            </div>

            <div className="col-span-12 sm:col-span-3 lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ตำแหน่ง <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={member.position || ""}
                onChange={(e) => onMemberChange?.(member.id, "position", e.target.value)}
                className={editableInputClass}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


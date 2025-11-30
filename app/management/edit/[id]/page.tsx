"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CommitteeMember, DataItem, Person } from "@/types";
import api from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ConstructionDetailsSection from "../components/ConstructionDetailsSection";
import SupervisorSection from "../components/SupervisorSection";
import CommitteeSection from "../components/CommitteeSection";


  
  const formatFullName = (person?: Person) => {
    if (!person) return "";
    return `${person.title || ""}${person.firstName || ""} ${person.lastName || ""}`.trim();
  };

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<DataItem>>({
        wbs: "",
        jobName: "",
        supervisor: "",
        board: "",
        status: 0,
    });
    const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await api.get(`/api/v3/jobs`, {
                    params: {
                        ba: 'ALL',
                        wbs: id
                    }
                });

                // ตรวจสอบ structure ของ response
                const rawData = response.data;

                // ดึงข้อมูล payload
                const payload =
                    Array.isArray(rawData?.data) && rawData.data.length > 0
                        ? rawData.data[0]
                        : rawData?.data ?? rawData ?? {};

                // Map ข้อมูล supervisor
                const supervisorName = formatFullName(payload.supervisor);

                // Map ข้อมูล chairman/board
                const chairmanName = formatFullName(payload.chairman) || payload.board || "";

                setFormData({
                    wbs: payload.wbs ?? "",
                    jobName: payload.jobName ?? "",
                    supervisor: supervisorName,
                    firstCommittee: chairmanName,
                    jobStatus: payload.jobStatus ?? payload.status ?? "",
                    // เก็บ supervisor object ไว้ด้วย
                    supervisorObject: payload.supervisor || null,
                    planNo: payload.planNo ?? "",
                });

                setCommitteeMembers([
                    {
                        id: "chair",
                        roleLabel: "ชื่อ - สกุล (ประธานคณะกรรมการ)",
                        employeeId: payload.chairman?.employeeId || "",
                        name: chairmanName,
                        position: payload.chairman?.position || "ระดับพนักงาน"
                    },
                    {
                        id: "member-1",
                        roleLabel: "ชื่อ - สกุล (คณะกรรมการ)",
                        employeeId: payload.firstCommittee?.employeeId || "",
                        name: formatFullName(payload.firstCommittee),
                        position: payload.firstCommittee?.position || "ระดับพนักงาน"
                    },
                    {
                        id: "member-2",
                        roleLabel: "ชื่อ - สกุล (คณะกรรมการ)",
                        employeeId: payload.secondCommittee?.employeeId || "",
                        name: formatFullName(payload.secondCommittee),
                        position: payload.secondCommittee?.position || "ระดับพนักงาน",

                    }
                ]);

            } catch (error: any) {
                console.error("=== Error Fetching Data ===");
                console.error("Error:", error);
                console.error("Error Message:", error.message);
                console.error("Error Response:", error.response?.data);
                alert("ไม่สามารถโหลดข้อมูลได้");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (field: keyof DataItem, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        try {
            setSaving(true);
            await api.put(`/list/${id}`, formData);
            alert("บันทึกข้อมูลสำเร็จ");
            router.push("/management");
        } catch (error) {
            console.error("Error updating data:", error);
            alert("ไม่สามารถบันทึกข้อมูลได้");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push("/management");
    };

    const supervisorInfo = useMemo(() => {
        const supervisor = (formData as any).supervisorObject;
        return {
            employeeId: supervisor?.employeeId || "",
            fullName: formData.supervisor || supervisor
                ? `${supervisor?.title || ''}${supervisor?.firstName || ''} ${supervisor?.lastName || ''}`.trim()
                : "ไม่พบข้อมูล",
            position: supervisor?.position || supervisor?.positionWithDeptName || ""
        };
    }, [formData]);

    const handleLinkOldEstimate = () => {
    };

    const handleLinkNewEstimate = () => {
    };

    const handleAddSupervisor = () => {
    };

    const handleCommitteeMemberChange = (id: string, field: keyof CommitteeMember, value: string) => {
        setCommitteeMembers((prev) =>
            prev.map((member) => (member.id === id ? { ...member, [field]: value } : member))
        );
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center py-8 text-gray-500">
                    กำลังโหลดข้อมูล...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    แก้ไขข้อมูลงานก่อสร้าง
                </h1>
                <p className="mb-4 text-sm text-gray-600">WBS: {id}</p>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href="/management" className="hover:text-purple-600">
                    จัดการงานก่อสร้าง
                </Link>
                <ChevronLeft size={16} className="rotate-180" />
                <span>เชื่อมประมาณการ</span>
            </div>


            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <ConstructionDetailsSection
                        formData={formData}
                        onFieldChange={handleInputChange}
                        onLinkOldEstimate={handleLinkOldEstimate}
                        onLinkNewEstimate={handleLinkNewEstimate}
                    />

                    <SupervisorSection supervisor={supervisorInfo} onAddSupervisor={handleAddSupervisor} />

                    <CommitteeSection members={committeeMembers} onMemberChange={handleCommitteeMemberChange} />


                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-purple-500 rounded-md text-purple-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 border border-purple-800 rounded-md text-white bg-purple-800 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            {saving ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

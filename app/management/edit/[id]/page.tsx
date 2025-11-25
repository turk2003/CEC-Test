"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CommitteeMember, DataItem } from "@/types";
import api from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ConstructionDetailsSection from "../components/ConstructionDetailsSection";
import SupervisorSection from "../components/SupervisorSection";
import CommitteeSection from "../components/CommitteeSection";

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<DataItem>>({
        wbs: "",
        jobName: "",
        con_sup: "",
        board: "",
        status: 0,
    });
    const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await api.get(`/list/${id}`);
                setFormData(response.data);
                setCommitteeMembers([
                    {
                        id: "chair",
                        roleLabel: "ชื่อ - สกุล (ประธานคณะกรรมการ)",
                        employeeId: "",
                        name: response.data?.board || "",
                        position: "ระดับพนักงาน"
                    },
                    {
                        id: "member-1",
                        roleLabel: "ชื่อ - สกุล (คณะกรรมการ)",
                        employeeId: "",
                        name: "",
                        position: "ระดับพนักงาน"
                    },
                    {
                        id: "member-2",
                        roleLabel: "ชื่อ - สกุล (คณะกรรมการ)",
                        employeeId: "",
                        name: "",
                        position: "ระดับพนักงาน"
                    }
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    const supervisorInfo = useMemo(
        () => ({
            employeeId: "497735",
            fullName: formData.con_sup || "ไม่พบข้อมูล",
            position: "วศก.6 กฟส.สองพี่น้อง"
        }),
        [formData.con_sup]
    );

    const handleLinkOldEstimate = () => {
        console.log("เชื่อมประมาณการเก่า");
    };

    const handleLinkNewEstimate = () => {
        console.log("เชื่อมประมาณการใหม่");
    };

    const handleAddSupervisor = () => {
        console.log("เพิ่มช่างผู้ควบคุมงาน");
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
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

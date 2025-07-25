// import Sidebar from "@/components/Sidebar";
import NavbarAdmin from '@/components/NavbarAdmin';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'หน้าผู้จัดการ | นกหมูกระทะ',
    description: 'หน้าผู้จัดการสำหรับการจัดการและควบคุมระบบ',
};

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full overflow-x-hidden">
            {/* <Sidebar /> */}
            <NavbarAdmin textHeader="ผู้จัดการ" />
            <div className="h-full">{children}</div>
        </div>
    );
}

export default AdminLayout;

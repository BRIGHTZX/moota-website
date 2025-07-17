// import Sidebar from "@/components/Sidebar";
import MenuAdmin from '@/components/MenuAdmin';
import NavbarAdmin from '@/components/NavbarAdmin';
import React from 'react';

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* <Sidebar /> */}
            <NavbarAdmin textHeader="พนักงาน" />
            <div className="h-full">{children}</div>
            <MenuAdmin />
        </div>
    );
}

export default AdminLayout;

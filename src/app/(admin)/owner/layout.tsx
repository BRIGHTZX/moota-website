// import Sidebar from "@/components/Sidebar";
import NavbarAdmin from "@/components/NavbarAdmin";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full overflow-x-hidden">
            {/* <Sidebar /> */}
            <NavbarAdmin />
            <div className="h-full">{children}</div>
        </div>
    );
}

export default AdminLayout;

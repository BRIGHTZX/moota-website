// import Sidebar from "@/components/Sidebar";
import MenuAdmin from "@/components/MenuAdmin";
import NavbarAdmin from "@/components/NavbarAdmin";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full overflow-x-hidden min-h-screen">
            {/* <Sidebar /> */}
            <NavbarAdmin />
            <div className="h-full">{children}</div>
            <MenuAdmin />
        </div>
    );
}

export default AdminLayout;

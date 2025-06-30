import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default HomeLayout;

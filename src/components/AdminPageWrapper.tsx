import { cn } from "@/lib/utils";
import React from "react";

type AdminPageWrapperProps = {
    children: React.ReactNode;
    className?: string;
};

function AdminPageWrapper({ children, className }: AdminPageWrapperProps) {
    return (
        <div
            className={cn(
                "p-4 pt-20 pb-24 relative bg-gray-[#FEFDFE] min-h-screen",
                className
            )}
        >
            {children}
        </div>
    );
}

export default AdminPageWrapper;

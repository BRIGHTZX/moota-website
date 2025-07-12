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
                "p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto",
                className
            )}
        >
            {children}
        </div>
    );
}

export default AdminPageWrapper;

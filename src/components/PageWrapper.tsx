import React from "react";

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 pt-24 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            {children}
        </div>
    );
}

export default PageWrapper;

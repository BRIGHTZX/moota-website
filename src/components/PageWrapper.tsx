import React from "react";

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 pt-24 pb-8 relative min-h-screen">{children}</div>
    );
}

export default PageWrapper;

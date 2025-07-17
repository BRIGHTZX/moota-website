import React from 'react';

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative container mx-auto min-h-screen p-4 px-4 pt-24 pb-8">
            {children}
        </div>
    );
}

export default PageWrapper;

import { Loader2Icon } from 'lucide-react';
import React from 'react';

function SuspenseLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-white">
                <Loader2Icon className="h-10 w-10 animate-spin" />
                <span className="text-sm">กำลังโหลด...</span>
            </div>
        </div>
    );
}

export default SuspenseLoading;

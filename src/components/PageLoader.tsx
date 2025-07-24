import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

function PageLoader({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex h-screen flex-col items-center justify-center gap-2',
                className
            )}
        >
            <Loader2 className="size-10 animate-spin" />
            <span className="text-sm">กำลังโหลด...</span>
        </div>
    );
}

export default PageLoader;

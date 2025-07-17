import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

function PageLoader({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex h-screen items-center justify-center',
                className
            )}
        >
            <Loader2 className="size-10 animate-spin" />
        </div>
    );
}

export default PageLoader;

'use client';

import AdminPageWrapper from '@/components/AdminPageWrapper';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import TakeAwayForm from '@/features/(admin)/take-away/components/TakeAwayForm';
import { HistoryIcon } from 'lucide-react';

function TakeAwayPage() {
    return (
        <AdminPageWrapper>
            <div className="flex items-center justify-between">
                <TextHeader text="สั่งกลับบ้าน" />

                <Button size="sm" variant="outline" className="gap-2">
                    <HistoryIcon />
                    <span className="text-xs">ซื้อกลับบ้าน</span>
                </Button>
            </div>

            <div className="mt-10 h-full w-full">
                <TakeAwayForm />
            </div>
        </AdminPageWrapper>
    );
}

export default TakeAwayPage;

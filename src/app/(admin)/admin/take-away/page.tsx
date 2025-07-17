'use client';

import AdminPageWrapper from '@/components/AdminPageWrapper';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import TakeAwayForm from '@/features/(admin)/take-away/components/TakeAwayForm';
import { HistoryIcon } from 'lucide-react';
import Link from 'next/link';

function TakeAwayPage() {
    return (
        <AdminPageWrapper>
            <div className="flex items-center justify-between">
                <TextHeader text="สั่งกลับบ้าน" />

                <Button asChild size="sm" variant="outline">
                    <Link href="/admin/take-away/history">
                        <HistoryIcon />
                        <span className="text-xs">ประวัติการสั่งซื้อ</span>
                    </Link>
                </Button>
            </div>

            <div className="mt-10 h-full w-full">
                <TakeAwayForm />
            </div>
        </AdminPageWrapper>
    );
}

export default TakeAwayPage;

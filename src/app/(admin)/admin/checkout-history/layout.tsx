import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'ประวัติการชำระเงิน | นกหมูกระทะ',
    description: 'ประวัติการชำระเงินสำหรับการจัดการและควบคุมระบบ',
};

function AdminCheckoutHistoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}

export default AdminCheckoutHistoryLayout;

import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'สั่งซื้อกลับบ้าน | นกหมูกระทะ',
    description: 'ประวัติการชำระเงินสำหรับการจัดการและควบคุมระบบ',
};

function AdminTakeAwayLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default AdminTakeAwayLayout;

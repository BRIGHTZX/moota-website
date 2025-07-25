import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'ออเดอร์จองทั้งหมด | นกหมูกระทะ',
    description: 'ออเดอร์จองทั้งหมดสำหรับการจัดการและควบคุมระบบ',
};

function AdminPreOrdersLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default AdminPreOrdersLayout;

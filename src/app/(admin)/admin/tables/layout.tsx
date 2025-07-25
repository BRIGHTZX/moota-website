import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'โต๊ะทั้งหมด | นกหมูกระทะ',
    description: 'ตารางนั่งสำหรับการจัดการและควบคุมระบบ',
};

function AdminTablesLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default AdminTablesLayout;

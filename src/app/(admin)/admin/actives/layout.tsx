import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'โต๊ะที่ทำงาน | นกหมูกระทะ',
    description: 'โต๊ะที่เปิดสำหรับการจัดการและควบคุมระบบ',
};

function AdminActivesLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default AdminActivesLayout;

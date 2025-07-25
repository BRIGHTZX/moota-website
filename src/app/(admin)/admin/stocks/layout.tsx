import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'สต๊อกสินค้า | นกหมูกระทะ',
    description: 'สต๊อกสินค้าสำหรับการจัดการและควบคุมระบบ',
};

function AdminStocksLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default AdminStocksLayout;

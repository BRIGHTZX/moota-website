import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'รายละเอียดสต็อกสินค้า | นกหมูกระทะ',
    description: 'รายละเอียดสต็อกสินค้าสำหรับการจัดการและควบคุมระบบ',
};

function AdminStockDetailLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default AdminStockDetailLayout;

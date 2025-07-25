import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'ประวัติการนำเข้านำออกสินค้า | นกหมูกระทะ',
    description: 'ประวัติการนำเข้านำออกสินค้าสำหรับการจัดการและควบคุมระบบ',
};

function AdminStockHistoryLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default AdminStockHistoryLayout;

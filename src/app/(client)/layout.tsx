import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'หน้าหลัก | นกหมูกระทะ',
    description: 'นกหมูกระทะ - สุดยอดหมูกระทะที่คุณต้องลอง',
};

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default HomeLayout;

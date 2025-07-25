import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'ประวัติการจอง | นกหมูกระทะ',
    description: 'ประวัติการจองที่นกหมูกระทะ',
};

function PreOrderLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default PreOrderLayout;

import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'รายละเอียดการจองโต๊ะ | นกหมูกระทะ',
    description: 'รายละเอียดการจองโต๊ะที่นกหมูกระทะ',
};

function ReservationInfoLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default ReservationInfoLayout;

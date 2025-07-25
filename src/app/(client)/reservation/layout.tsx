import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'จองโต๊ะ | นกหมูกระทะ',
    description: 'จองโต๊ะที่นกหมูกระทะ',
};

function ReservationLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default ReservationLayout;

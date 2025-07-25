import { checkIfActiveClosed } from '@/services/checkIfActiveClosed';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { Fragment } from 'react';

export const metadata: Metadata = {
    title: 'ชำระเงิน | นกหมูกระทะ',
    description: 'ชำระเงินสำหรับการจัดการและควบคุมระบบ',
};

async function CheckoutLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ activeId: string }>;
}) {
    const { activeId } = await params;
    const isActiveClosed = await checkIfActiveClosed(activeId);

    if (isActiveClosed) {
        return redirect('/admin/actives');
    }
    return <Fragment>{children}</Fragment>;
}

export default CheckoutLayout;

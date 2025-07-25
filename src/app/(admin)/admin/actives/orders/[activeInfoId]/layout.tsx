import { getTableNumber } from '@/features/(admin)/actives/hooks/getTableNumber';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

type Props = {
    params: { activeInfoId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const tableNumber = await getTableNumber(params.activeInfoId);

    return {
        title: tableNumber ? `ออเดอร์โต๊ะ ${tableNumber}` : 'ออเดอร์',
        description: `รายละเอียดออเดอร์ของโต๊ะ ${tableNumber ?? ''}`,
    };
}

function AdminOrdersLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default AdminOrdersLayout;

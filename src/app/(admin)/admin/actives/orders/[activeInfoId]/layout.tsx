import { getTableNumber } from '@/features/(admin)/actives/hooks/getTableNumber';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ activeInfoId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { activeInfoId } = await params;
    const tableNumber = await getTableNumber(activeInfoId);

    return {
        title: tableNumber ? `ออเดอร์โต๊ะ ${tableNumber}` : 'ออเดอร์',
        description: `รายละเอียดออเดอร์ของโต๊ะ ${tableNumber ?? ''}`,
    };
}

function AdminOrdersLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default AdminOrdersLayout;

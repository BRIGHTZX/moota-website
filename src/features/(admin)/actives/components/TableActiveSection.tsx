import { TextCardInfo } from '@/components/TextCardInfo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ActiveType } from '../types';

type TableActiveSectionProps = {
    active: ActiveType;
    setOpenAlertDialog: (open: boolean) => void;
    setOpenCancelDialog: (open: boolean) => void;
    setActiveId: (activeId: string) => void;
};

function TableActiveSection({
    active,
    setOpenAlertDialog,
    setOpenCancelDialog,
    setActiveId,
}: TableActiveSectionProps) {
    const {
        customerName,
        customerPhone,
        openTime,
        activeInfos,
        adultNumber,
        childNumber,
    } = active;

    return (
        <div className="relative rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
            {/* Time Info */}
            <div className="text-right">
                <p className="text-xs font-bold text-gray-500">
                    เปิดโต๊ะเวลา {openTime} น.
                </p>
            </div>

            {/* Customer Info */}
            <div className="mt-4 flex flex-col gap-2">
                <TextCardInfo text="ชื่อลูกค้า :" value={customerName} />
                <TextCardInfo
                    text="เบอร์โทรศัพท์ :"
                    value={customerPhone || '-'}
                />
                <TextCardInfo
                    text="จำนวนผู้ใหญ่ :"
                    value={adultNumber.toString()}
                />
                <TextCardInfo
                    text="จำนวนเด็ก :"
                    value={childNumber.toString()}
                />
            </div>
            {/* Table Info */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                {activeInfos?.map(info => (
                    <HaveTable
                        key={info.activeInfoId}
                        activeInfoId={info.activeInfoId}
                        tableNumber={info.tableNumber}
                    />
                ))}
            </div>

            <div className="mt-4 flex gap-4">
                <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                        setOpenCancelDialog(true);
                        setActiveId(active.activeId);
                    }}
                >
                    ยกเลิก
                </Button>
                <Button
                    size="sm"
                    variant="greenPrimary"
                    className="flex-1"
                    onClick={() => {
                        setOpenAlertDialog(true);
                        setActiveId(active.activeId);
                    }}
                >
                    ชำระเงิน
                </Button>
            </div>
        </div>
    );
}

export default TableActiveSection;

const HaveTable = ({
    activeInfoId,
    tableNumber,
}: {
    activeInfoId: string;
    tableNumber: string;
}) => {
    return (
        <Link href={`/admin/actives/orders/${activeInfoId}`}>
            <div className="cursor-pointer rounded-lg border border-black bg-blue-300 p-4 transition-all duration-300 hover:bg-blue-400">
                <p className="text-center text-xs font-bold text-black">
                    {tableNumber}
                </p>
            </div>
        </Link>
    );
};

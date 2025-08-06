import { TextCardInfo } from '@/components/TextCardInfo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckoutHistoryType } from '../types';
import { formattedDateTimeThai } from '@/services/formattedDateTimeThai';

function CheckoutHistoryCard({
    checkoutHistory,
}: {
    checkoutHistory: CheckoutHistoryType;
}) {
    return (
        <div className="flex flex-col gap-2 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-gray-500">
                    {new Date(checkoutHistory.updatedAt).toLocaleDateString(
                        'th-TH',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }
                    )}
                </p>

                <p className="text-xs text-gray-500">
                    {formattedDateTimeThai(checkoutHistory.updatedAt)}
                </p>
            </div>
            <TextCardInfo
                text="ชื่อลูกค้า"
                value={checkoutHistory.customerName}
            />
            <TextCardInfo
                text="จำนวนผู้ใหญ่"
                value={`${checkoutHistory.paidAdultNumber.toString()} คน`}
            />
            <TextCardInfo
                text="จำนวนเด็ก"
                value={`${checkoutHistory.paidChildNumber.toString()} คน`}
            />
            <TextCardInfo
                text="ราคาเครื่องดื่ม"
                value={`${checkoutHistory.totalOrderPrice.toString()} บาท`}
            />
            <TextCardInfo
                text="ราคารวม"
                value={`${checkoutHistory.totalAmount.toString()} บาท`}
            />

            <Button asChild variant="outline" className="w-full" size="sm">
                <Link href={`/admin/checkout-history/${checkoutHistory.id}`}>
                    <span className="text-sm font-medium">ดูรายละเอียด</span>
                </Link>
            </Button>
        </div>
    );
}

export default CheckoutHistoryCard;

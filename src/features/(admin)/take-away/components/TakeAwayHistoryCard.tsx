import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PaymentMethod as PaymentMethodType } from '../../checkout/types';
import { TakeAwayHistory } from '../types';

function TakeAwayHistoryCard({ takeAway }: { takeAway: TakeAwayHistory }) {
    const { totalAmount, paymentMethod, updatedAt } = takeAway;
    return (
        <div className="rounded-md border border-gray-300 p-4 shadow-sm">
            <div>
                <p className="text-xs text-gray-500">
                    {new Date(updatedAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}{' '}
                    {new Date(updatedAt).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <PaymentMethodBadge
                    paymentMethod={paymentMethod as PaymentMethodType}
                />

                <p className="text-lg font-bold text-green-500">
                    + {totalAmount.toLocaleString()} บาท
                </p>
            </div>
        </div>
    );
}

export default TakeAwayHistoryCard;

type PaymentMethodBadgeProps = {
    paymentMethod: PaymentMethodType;
};

function PaymentMethodBadge({ paymentMethod }: PaymentMethodBadgeProps) {
    const badgeColor = {
        cash: 'bg-green-600',
        promptpay: 'bg-blue-500',
    };
    return (
        <Badge className={cn(badgeColor[paymentMethod])}>{paymentMethod}</Badge>
    );
}

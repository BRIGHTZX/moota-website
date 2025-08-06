import { Badge } from '@/components/ui/badge';

type PaymentBadgeProps = {
    paymentMethod: string;
};

function PaymentBadge({ paymentMethod }: PaymentBadgeProps) {
    const paymentMethodText = {
        cash: 'เงินสด',
        promptpay: 'พร้อมเพย์',
    };
    return (
        <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">
                {
                    paymentMethodText[
                        paymentMethod as keyof typeof paymentMethodText
                    ]
                }
            </Badge>
        </div>
    );
}

export default PaymentBadge;

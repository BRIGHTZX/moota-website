import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PaymentBadgeProps = {
    paymentMethod: string;
    textClassName?: string;
};

function PaymentBadge({ paymentMethod, textClassName }: PaymentBadgeProps) {
    const paymentMethodText = {
        cash: "เงินสด",
        promptpay: "พร้อมเพย์",
    };
    return (
        <div className="flex items-center gap-2 justify-between">
            <p className={cn("font-semibold text-xs", textClassName)}>
                ชำระเงินด้วย
            </p>
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

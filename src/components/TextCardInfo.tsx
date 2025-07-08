import { cn } from "@/lib/utils";

export const TextCardInfo = ({
    text,
    value,
    status,
    className,
    textClassName,
    valueClassName,
}: {
    text: string;
    value: string;
    status?: string;
    className?: string;
    textClassName?: string;
    valueClassName?: string;
}) => {
    const statusColor = {
        paid: "bg-green-500",
        pending: "bg-yellow-500",
        success: "bg-green-500",
        failed: "bg-red-500",
    };
    const statusText = {
        paid: "จ่ายแล้ว",
        pending: "รอยืนยัน",
        success: "ยืนยันแล้ว",
        failed: "ยกเลิก",
    };
    return (
        <div
            className={cn("flex justify-between items-center gap-2", className)}
        >
            <p className={cn("font-semibold text-xs", textClassName)}>{text}</p>
            {value && <p className={cn("text-xs", valueClassName)}>{value}</p>}
            {status && (
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            statusColor[status as keyof typeof statusColor]
                        )}
                    />
                    <p className="text-xs">
                        {statusText[status as keyof typeof statusText]}
                    </p>
                </div>
            )}
        </div>
    );
};

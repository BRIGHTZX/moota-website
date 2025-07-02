import { cn } from "@/lib/utils";

export const TextCardInfo = ({
    text,
    value,
    status,
}: {
    text: string;
    value: string;
    status?: string;
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
        <div className="flex justify-between gap-2">
            <p className="font-semibold">{text}</p>
            {value && <p>{value}</p>}
            {status && (
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "size-2 rounded-full",
                            statusColor[status as keyof typeof statusColor]
                        )}
                    />
                    <p>{statusText[status as keyof typeof statusText]}</p>
                </div>
            )}
        </div>
    );
};

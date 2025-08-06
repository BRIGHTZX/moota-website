import { cn } from '@/lib/utils';

export const TextCardInfo = ({
    text,
    subText,
    value,
    status,
    className,
    textClassName,
    valueClassName,
}: {
    text: string | React.ReactNode;
    subText?: string | React.ReactNode;
    value: string | React.ReactNode;
    status?: string;
    className?: string;
    textClassName?: string;
    valueClassName?: string;
}) => {
    const statusColor = {
        unpaid: 'bg-yellow-500',
        paid: 'bg-green-500',
        pending: 'bg-yellow-500',
        confirmed: 'bg-green-500',
        canceled: 'bg-red-500',
    };
    const statusText = {
        unpaid: 'ยังไม่ชำระ',
        paid: 'จ่ายแล้ว',
        pending: 'รอยืนยัน',
        confirmed: 'ยืนยันแล้ว',
        canceled: 'ยกเลิก',
    };
    return (
        <div
            className={cn('flex items-center justify-between gap-2', className)}
        >
            <div
                className={cn(
                    'sm:text-md text-sm font-semibold text-nowrap md:text-lg',
                    textClassName
                )}
            >
                {text}{' '}
                {subText && (
                    <span className="text-xs font-light text-gray-500">
                        {subText}
                    </span>
                )}
            </div>
            {value && (
                <p
                    className={cn(
                        'sm:text-md text-xs text-nowrap md:text-lg',
                        valueClassName
                    )}
                >
                    {value}
                </p>
            )}
            {status && (
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            'size-2 rounded-full',
                            statusColor[status as keyof typeof statusColor]
                        )}
                    />
                    <p className="sm:text-md text-xs text-nowrap md:text-lg">
                        {statusText[status as keyof typeof statusText]}
                    </p>
                </div>
            )}
        </div>
    );
};

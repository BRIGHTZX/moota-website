import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { BellIcon } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useGetLimitNotification } from '../api/use-get-limit-notification';
import PageLoader from '@/components/PageLoader';
import { cn } from '@/lib/utils';

function LimitNotification() {
    const [alerted, setAlerted] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: limitNotification, isLoading: isLoadingLimitNotification } =
        useGetLimitNotification();

    useEffect(() => {
        if (limitNotification && limitNotification.length > 0) {
            setAlerted(true);

            setTimeout(() => {
                setAlerted(false);
            }, 3000);
        }
    }, [limitNotification]);

    return (
        <Fragment>
            <div className="relative">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                >
                    <BellIcon className="size-3" />
                    {limitNotification && limitNotification.length > 0 && (
                        <>
                            <div
                                className={cn(
                                    'absolute top-1/2 -left-26 -translate-y-1/2 rounded-md border border-red-700 bg-red-500 px-2 py-1 shadow-lg transition-all duration-500 ease-in-out',
                                    alerted
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-1/2 opacity-0'
                                )}
                            >
                                <p className="text-xs text-white">
                                    สินค้าใกล้จะหมด
                                </p>
                            </div>
                            <span className="absolute top-1.5 right-2 size-2 animate-ping rounded-full bg-red-500" />
                            <span className="absolute top-1.5 right-2 size-2 rounded-full bg-red-500" />
                        </>
                    )}
                </Button>
            </div>

            {/* Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <p className="text-sm font-medium text-black">
                                จำนวนสินค้าที่ใกล้จะหมด
                            </p>
                        </DialogTitle>

                        {isLoadingLimitNotification ? (
                            <PageLoader />
                        ) : (
                            <div className="h-[calc(100vh-150px)] overflow-y-auto p-4">
                                {limitNotification?.map(product => (
                                    <LimitText
                                        key={product.id}
                                        name={product.name}
                                        unit={product.unit}
                                        stocks={product.stocks}
                                    />
                                ))}
                            </div>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default LimitNotification;

type LimitTextProps = {
    name: string;
    unit: string;
    stocks: number;
};

const LimitText = ({ name, unit, stocks }: LimitTextProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-black">{name}</p>

            <span className="text-sm font-medium text-red-500">
                {stocks} {unit}
            </span>
        </div>
    );
};

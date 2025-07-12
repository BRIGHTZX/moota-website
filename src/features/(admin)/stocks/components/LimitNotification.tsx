import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BellIcon } from "lucide-react";
import React, { Fragment, useState } from "react";
import { useGetLimitNotification } from "../api/use-get-limit-notification";
import PageLoader from "@/components/PageLoader";

function LimitNotification() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: limitNotification, isLoading: isLoadingLimitNotification } =
        useGetLimitNotification();

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
                        <span className="absolute top-1.5 right-2 size-2 bg-red-500 rounded-full" />
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
                            <div className=" h-[calc(100vh-150px)] p-4 overflow-y-auto">
                                {limitNotification?.map((product) => (
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

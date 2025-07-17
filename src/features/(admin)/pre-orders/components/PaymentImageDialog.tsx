import React from 'react';
import { useGetPaymentImage } from '../api/use-get-payment-image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PageLoader from '@/components/PageLoader';
import Image from 'next/image';
import { IMAGE_PLACEHOLDER } from '@/constant';

type PaymentImageDialogProps = {
    preOrderId: string;
    setPreOrderId: (preOrderId: string | null) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};
function PaymentImageDialog({
    preOrderId,
    setPreOrderId,
    isOpen,
    setIsOpen,
}: PaymentImageDialogProps) {
    const { data: paymentImage, isLoading: isPaymentImageLoading } =
        useGetPaymentImage(preOrderId, isOpen);

    const handleOpenDialog = (open: boolean) => {
        setIsOpen(open);

        if (!open) {
            setPreOrderId(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>สลิปการจ่ายเงิน</DialogTitle>
                </DialogHeader>
                {isPaymentImageLoading ? (
                    <PageLoader className="h-full" />
                ) : (
                    <div className="h-[400px] w-full">
                        <Image
                            src={
                                paymentImage?.paymentImage || IMAGE_PLACEHOLDER
                            }
                            alt="Payment Image"
                            width={1000}
                            height={1000}
                            className="size-full object-cover"
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default PaymentImageDialog;

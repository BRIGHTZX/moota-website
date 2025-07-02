import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlertDialogCustom from "@/components/AlertDialogCustom";

type ConfirmOrderProps = {
    orderId: string;
};

function ConfirmOrder({ orderId }: ConfirmOrderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <AlertDialogCustom
                title="ยืนยันการจอง"
                description="ยืนยันการจองที่นั่ง"
                open={isOpen}
                setOpen={setIsOpen}
                cancelAction={() => {
                    setIsOpen(false);
                }}
                action={() => {}}
                buttonActionText="ยืนยันการจอง"
            />
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}
                variant="coffeePrimary"
                className="rounded-full w-full"
            >
                ยืนยันการจอง
            </Button>
        </div>
    );
}

export default ConfirmOrder;

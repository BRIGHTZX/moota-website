import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlertDialogCustom from "@/components/AlertDialogCustom";
import { useCreateActiveFromOrder } from "../api/use-create-active-from-order";

type ConfirmOrderProps = {
    orderId: string;
};

function ConfirmOrder({ orderId }: ConfirmOrderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutate: createActive } = useCreateActiveFromOrder();

    const handleCreateActive = () => {
        createActive({ json: { preOrderId: orderId } });
    };

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
                action={handleCreateActive}
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

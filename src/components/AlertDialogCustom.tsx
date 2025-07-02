import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertDialogCustomProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    action: () => void;
    cancelAction?: () => void;
    title: string;
    description: string;
    buttonActionText: string;
};

function AlertDialogCustom({
    open,
    setOpen,
    action,
    cancelAction,
    title,
    description,
    buttonActionText,
}: AlertDialogCustomProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancelAction}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={action}>
                        {buttonActionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertDialogCustom;

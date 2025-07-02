import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type ActiveTableDialogProps = {
    orderId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const formSchema = z.object({
    name: z.string().min(1),
    adultNumber: z.number().min(1),
    childNumber: z.number().min(0),
    openTime: z.string().min(1),
});

function ActiveTableDialog({ orderId, open, setOpen }: ActiveTableDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            adultNumber: 0,
            childNumber: 0,
            openTime: "",
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle asChild>
                            <p className="text-coffee-dark">เปิดโต๊ะ</p>
                        </DialogTitle>
                    </DialogHeader>
                    <div></div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ActiveTableDialog;

"use client";
import AlertDialogCustom from "@/components/AlertDialogCustom";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActives } from "@/features/(admin)/actives/api/use-get-actives";
import TableActiveSection from "@/features/(admin)/actives/components/TableActiveSection";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ActivePage() {
    const router = useRouter();
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const { data: activesData, isLoading, isError } = useGetActives();

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Error</div>;

    const handleCloseActive = () => {
        router.push(`/admin/actives/checkout/${activeId}`);
    };

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <TextHeader text="โต๊ะที่กำลังทำงาน" />
            <div className="mt-4 flex flex-col gap-2">
                {activesData?.map((active) => (
                    <TableActiveSection
                        key={active.activeId}
                        active={active}
                        setOpenAlertDialog={setOpenAlertDialog}
                        setActiveId={setActiveId}
                    />
                ))}
            </div>
            <AlertDialogCustom
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                action={handleCloseActive}
                title={"ยืนยันการปิดโต๊ะ"}
                description={"คุณต้องการปิดโต๊ะนี้หรือไม่"}
                buttonActionText={"ยืนยัน"}
            />
        </div>
    );
}

export default ActivePage;

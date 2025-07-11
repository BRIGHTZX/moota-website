"use client";
import AdminPageWrapper from "@/components/AdminPageWrapper";
import AlertDialogCustom from "@/components/AlertDialogCustom";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActives } from "@/features/(admin)/actives/api/use-get-actives";
import TableActiveSection from "@/features/(admin)/actives/components/TableActiveSection";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

function ActivePage() {
    const router = useRouter();
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const {
        data: activesData,
        isLoading: isLoadingActives,
        isError: isErrorActives,
    } = useGetActives();

    const handleCloseActive = () => {
        router.push(`/admin/actives/checkout/${activeId}`);
    };

    const isError = isErrorActives;
    const isLoading = isLoadingActives;

    if (isError) return <div>Error</div>;

    return (
        <AdminPageWrapper>
            <TextHeader text="โต๊ะที่กำลังทำงาน" />
            {isLoading ? (
                <PageLoader className="h-[400px]" />
            ) : (
                <Fragment>
                    <div className="mt-4 flex flex-col gap-2">
                        {activesData?.length === 0 ? (
                            <div className="flex items-center justify-center h-[400px]">
                                <TextHeader
                                    text="ไม่มีโต๊ะที่กำลังทำงาน"
                                    className="text-lg text-gray-400"
                                />
                            </div>
                        ) : (
                            activesData?.map((active) => (
                                <TableActiveSection
                                    key={active.activeId}
                                    active={active}
                                    setOpenAlertDialog={setOpenAlertDialog}
                                    setActiveId={setActiveId}
                                />
                            ))
                        )}
                    </div>
                    <AlertDialogCustom
                        open={openAlertDialog}
                        setOpen={setOpenAlertDialog}
                        action={handleCloseActive}
                        title={"ยืนยันการปิดโต๊ะ"}
                        description={"คุณต้องการปิดโต๊ะนี้หรือไม่"}
                        buttonActionText={"ยืนยัน"}
                    />
                </Fragment>
            )}
        </AdminPageWrapper>
    );
}

export default ActivePage;

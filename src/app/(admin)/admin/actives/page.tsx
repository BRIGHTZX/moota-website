'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import AlertDialogCustom from '@/components/AlertDialogCustom';
import ErrorPage from '@/components/errors/ErrorPage';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useCancelActive } from '@/features/(admin)/actives/api/use-cancel-active';
import { useGetActives } from '@/features/(admin)/actives/api/use-get-actives';
import EditTableActiveModal from '@/features/(admin)/actives/components/EditTableActiveModal';
import TableActiveSection from '@/features/(admin)/actives/components/TableActiveSection';
import { HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

function ActivePage() {
    const router = useRouter();
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    const {
        data: activesData,
        isLoading: isLoadingActives,
        isError: isErrorActives,
    } = useGetActives();

    const {
        mutate: cancelActive,
        isPending: isPendingCancelActive,
        isError: isErrorCancelActive,
    } = useCancelActive();

    const handleCloseActive = () => {
        router.push(`/admin/actives/checkout/${activeId}`);
    };

    const handleCancelActive = () => {
        cancelActive({ json: { activeId: activeId ?? '' } });
    };

    const isError = isErrorActives || isErrorCancelActive;
    const isLoading = isLoadingActives || isPendingCancelActive;

    if (isError) return <ErrorPage />;

    return (
        <AdminPageWrapper>
            <div className="flex items-center justify-between">
                <TextHeader text="โต๊ะที่กำลังทำงาน" />

                <Button asChild size="sm" variant="outline" className="gap-2">
                    <Link href="/admin/checkout-history">
                        <HistoryIcon />
                        <span className="text-xs">ประวัติการชำระเงิน</span>
                    </Link>
                </Button>
            </div>
            {isLoading ? (
                <PageLoader className="h-[calc(100dvh-30dvh)]" />
            ) : (
                <Fragment>
                    <div className="mt-4 flex flex-col gap-2">
                        {activesData?.length === 0 ? (
                            <div className="flex h-[400px] items-center justify-center">
                                <TextHeader
                                    text="ไม่มีโต๊ะที่กำลังทำงาน"
                                    className="text-lg text-gray-400"
                                />
                            </div>
                        ) : (
                            activesData?.map(active => (
                                <TableActiveSection
                                    key={active.activeId}
                                    active={active}
                                    setOpenAlertDialog={setOpenAlertDialog}
                                    setOpenCancelDialog={setOpenCancelDialog}
                                    setOpenEditDialog={setOpenEditDialog}
                                    setActiveId={setActiveId}
                                />
                            ))
                        )}
                    </div>
                    <EditTableActiveModal
                        activeId={activeId}
                        isOpen={openEditDialog}
                        setIsOpen={setOpenEditDialog}
                    />
                    <AlertDialogCustom
                        isLoading={isLoading}
                        open={openAlertDialog}
                        setOpen={setOpenAlertDialog}
                        action={handleCloseActive}
                        title={'ยืนยันการปิดโต๊ะ'}
                        description={'คุณต้องการปิดโต๊ะนี้หรือไม่'}
                        buttonActionText={'ยืนยัน'}
                    />
                    <AlertDialogCustom
                        isLoading={isLoading}
                        open={openCancelDialog}
                        setOpen={setOpenCancelDialog}
                        action={handleCancelActive}
                        title={'ยินยันการยกเลิก'}
                        description={'คุณต้องการยกเลิกโต๊ะนี้หรือไม่'}
                        buttonActionText={'ยืนยัน'}
                    />
                </Fragment>
            )}
        </AdminPageWrapper>
    );
}

export default ActivePage;

'use client';
import AdminPageWrapper from '@/components/AdminPageWrapper';
import AlertDialogCustom from '@/components/AlertDialogCustom';
import PageLoader from '@/components/PageLoader';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetActives } from '@/features/(admin)/actives/api/use-get-actives';
import TableActiveSection from '@/features/(admin)/actives/components/TableActiveSection';
import { HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

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
                <PageLoader className="h-[400px]" />
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
                                    setActiveId={setActiveId}
                                />
                            ))
                        )}
                    </div>
                    <AlertDialogCustom
                        open={openAlertDialog}
                        setOpen={setOpenAlertDialog}
                        action={handleCloseActive}
                        title={'ยืนยันการปิดโต๊ะ'}
                        description={'คุณต้องการปิดโต๊ะนี้หรือไม่'}
                        buttonActionText={'ยืนยัน'}
                    />
                </Fragment>
            )}
        </AdminPageWrapper>
    );
}

export default ActivePage;

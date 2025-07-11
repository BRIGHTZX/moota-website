"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActiveInfoTableNumber } from "@/features/(admin)/orders/api/use-get-activeInfo-tableNumber";
import OrderProductSection from "@/features/(admin)/orders/components/OrderProductSection";
import React, { use, useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminPageWrapper from "@/components/AdminPageWrapper";

function OrdersPage({ params }: { params: Promise<{ activeInfoId: string }> }) {
    const { activeInfoId } = use(params);

    const {
        data: activeInfo,
        isLoading: isLoadingActiveInfo,
        isError: isErrorActiveInfo,
    } = useGetActiveInfoTableNumber(activeInfoId);

    useEffect(() => {}, [activeInfo]);

    if (isLoadingActiveInfo) return <PageLoader />;
    if (isErrorActiveInfo) return <div>Error</div>;

    return (
        <AdminPageWrapper>
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" className="size-8">
                    <Link href="/admin/actives">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                </Button>

                <TextHeader
                    text={`ออเดอร์โต๊ะ ${activeInfo?.diningTable?.tableNumber}`}
                />
            </div>

            {/* Order Product Section */}
            <div className="mt-4">
                <OrderProductSection activeInfoId={activeInfoId} />
            </div>
        </AdminPageWrapper>
    );
}

export default OrdersPage;

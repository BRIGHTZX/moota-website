'use client';

import ErrorPage from '@/components/errors/ErrorPage';
import PageLoader from '@/components/PageLoader';
import PageWrapper from '@/components/PageWrapper';
import TextHeader from '@/components/TextHeader';
import { Button } from '@/components/ui/button';
import { useGetPreOrders } from '@/features/(client)/pre-orders/api/use-get-preOrders';
import PreOrderCard from '@/features/(client)/pre-orders/components/PreOrderCard';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function OrdersPage() {
    const {
        data: preOrdersData,
        isLoading: isLoadingPreOrders,
        error,
    } = useGetPreOrders();

    if (error) {
        return <ErrorPage />;
    }

    return (
        <PageWrapper>
            <div className="flex items-center gap-4">
                <Button asChild variant="outline">
                    <Link href="/reservation">
                        <ArrowLeftIcon />
                    </Link>
                </Button>
                <TextHeader
                    text="ประวัติการจอง"
                    className="text-2xl md:text-4xl"
                />
            </div>

            {isLoadingPreOrders ? (
                <PageLoader className="h-[400px]" />
            ) : preOrdersData?.length ? (
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {preOrdersData?.map(preOrder => (
                        <PreOrderCard key={preOrder.id} preOrder={preOrder} />
                    ))}
                </div>
            ) : (
                <div className="mt-20 text-center">
                    <p className="text-gray-500">ไม่มีรายการจอง</p>
                </div>
            )}
        </PageWrapper>
    );
}

export default OrdersPage;

import React, { Suspense } from "react";
import StockHistoryClient from "./client";
import PageLoader from "@/components/PageLoader";

function StockHistoryPage() {
    return (
        <Suspense fallback={<PageLoader />}>
            <StockHistoryClient />
        </Suspense>
    );
}

export default StockHistoryPage;

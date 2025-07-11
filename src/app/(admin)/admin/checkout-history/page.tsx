import React, { Suspense } from "react";
import CheckoutHistoryClient from "./client";
import PageLoader from "@/components/PageLoader";

function CheckoutHistoryPage() {
    return (
        <Suspense fallback={<PageLoader />}>
            <CheckoutHistoryClient />
        </Suspense>
    );
}

export default CheckoutHistoryPage;

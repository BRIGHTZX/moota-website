import PageLoader from "@/components/PageLoader";
import DashboardClient from "./client";
import { Suspense } from "react";

function OwnerDashboardPage() {
    return (
        <Suspense fallback={<PageLoader className="h-[calc(100vh-10rem)]" />}>
            <DashboardClient />;
        </Suspense>
    );
}

export default OwnerDashboardPage;

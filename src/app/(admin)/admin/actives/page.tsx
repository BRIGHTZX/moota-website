"use client";
import PageLoader from "@/components/PageLoader";
import TextHeader from "@/components/TextHeader";
import { useGetActives } from "@/features/(admin)/actives/api/use-get-actives";
import TableActiveSection from "@/features/(admin)/actives/components/TableActiveSection";
import React from "react";

function ActivePage() {
    const { data: activesData, isLoading, isError } = useGetActives();

    if (isLoading) return <PageLoader />;
    if (isError) return <div>Error</div>;

    return (
        <div className="p-4 pt-20 pb-8 relative h-[calc(100vh-5rem)]  overflow-y-auto">
            <TextHeader text="โต๊ะที่กำลังทำงาน" />
            <div className="mt-4 flex flex-col gap-2">
                {activesData?.map((active) => (
                    <TableActiveSection key={active.activeId} active={active} />
                ))}
            </div>
        </div>
    );
}

export default ActivePage;

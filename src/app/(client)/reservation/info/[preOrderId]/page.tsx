"use client";
import { useGetPreOrderId } from "@/features/(client)/reservation/hooks/get-preOrderId";
import React from "react";

function ReservationInfoPage() {
    const preOrderId = useGetPreOrderId();

    return <div>page</div>;
}

export default ReservationInfoPage;

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import React from "react";
import StockTable from "./StockTable";
import { useGetStockHistory } from "../api/use-get-stock-history";

type StockSectionProps = {
    startDate: string;
    endDate: string;
};
function StockSection({ startDate, endDate }: StockSectionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>เครื่องดื่มขายดี</CardTitle>
            </CardHeader>

            <CardContent></CardContent>
        </Card>
    );
}

export default StockSection;

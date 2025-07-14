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
    const { data } = useGetStockHistory(startDate, endDate);

    return (
        <Card>
            <CardHeader>
                <CardTitle>ประวัติการนำเข้า/นำออกสินค้า</CardTitle>
                <CardDescription>
                    {format(new Date(startDate), "dd MMM yyyy", { locale: th })}{" "}
                    - {format(new Date(endDate), "dd MMM yyyy", { locale: th })}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <StockTable
                    products={
                        data?.map((item) => ({
                            productName: item.productName,
                            total: item.total,
                            totalIn: item.totalIn,
                            totalOut: item.totalOut,
                        })) || []
                    }
                />
            </CardContent>
        </Card>
    );
}

export default StockSection;

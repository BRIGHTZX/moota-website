import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import React, { useState } from "react";
import StockTable from "./StockTable";
import { useGetStockHistory } from "../api/use-get-stock-history";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type StockSectionProps = {
    startDate: string;
    endDate: string;
};
function StockSection({ startDate, endDate }: StockSectionProps) {
    const [category, setCategory] = useState<"วัตถุดิบ" | "เครื่องดื่ม">(
        "วัตถุดิบ"
    );
    const { data, isLoading: isLoadingStockHistory } = useGetStockHistory(
        startDate,
        endDate,
        category
    );

    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>ประวัติการนำเข้า/นำออกสินค้า</CardTitle>
                <CardDescription>
                    {format(new Date(startDate), "dd MMM yyyy", {
                        locale: th,
                    })}{" "}
                    -{" "}
                    {format(new Date(endDate), "dd MMM yyyy", {
                        locale: th,
                    })}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isLoadingStockHistory ? (
                    <Skeleton className="rounded-lg w-full h-[60dvh]" />
                ) : (
                    <>
                        {/* Button Stock Category */}
                        <div className="absolute top-4 right-4 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "bg-white",
                                    category === "วัตถุดิบ" &&
                                        "bg-blue-500 text-white"
                                )}
                                onClick={() => setCategory("วัตถุดิบ")}
                            >
                                <span className="text-xs">วัตถุดิบ</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "bg-white",
                                    category === "เครื่องดื่ม" &&
                                        "bg-blue-500 text-white"
                                )}
                                onClick={() => setCategory("เครื่องดื่ม")}
                            >
                                <span className="text-xs">เครื่องดื่ม</span>
                            </Button>
                        </div>

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
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default StockSection;

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
import { useGetTopDrinks } from "../api/use-get-top-drinks";
import TopDrinkTable from "./TopDrinkTable";

type TopDrinkSectionProps = {
    startDate: string;
    endDate: string;
};
function TopDrinkSection({ startDate, endDate }: TopDrinkSectionProps) {
    const { data } = useGetTopDrinks(startDate, endDate);

    console.log("data", data);
    return (
        <Card>
            <CardHeader>
                <CardTitle>เครื่องดื่มขายดี 10 อันดับแรก</CardTitle>
                <CardDescription>
                    {format(new Date(startDate), "dd MMM yyyy", {
                        locale: th,
                    })}
                    -{" "}
                    {format(new Date(endDate), "dd MMM yyyy", {
                        locale: th,
                    })}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <TopDrinkTable topDrinks={data || []} />
            </CardContent>
        </Card>
    );
}

export default TopDrinkSection;

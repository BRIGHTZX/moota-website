"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Skeleton } from "../ui/skeleton";

type ChartConfigType = Record<
    string,
    { label: string; color: string; key: string }
>;

type ChartLineLabelProps<T> = {
    startDate: string;
    endDate: string;
    title: string;
    data: T[];
    config: ChartConfigType;
    isLoading: boolean;
};

function ChartLineLabel<T>({
    title,
    data,
    config,
    startDate,
    endDate,
    isLoading,
}: ChartLineLabelProps<T>) {
    const chartConfig = config;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {format(new Date(startDate), "dd MMM yyyy", { locale: th })}{" "}
                    - {format(new Date(endDate), "dd MMM yyyy", { locale: th })}
                </CardDescription>
            </CardHeader>

            {isLoading ? (
                <Skeleton className="rounded-lg w-full h-[25dvh]" />
            ) : (
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <Line
                                dataKey={chartConfig.total.key}
                                type="natural"
                                stroke={chartConfig.total.color}
                                strokeWidth={2}
                                dot={{
                                    fill: chartConfig.total.color,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            )}
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}

export default ChartLineLabel;

'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Fragment } from 'react';
import { Skeleton } from '../ui/skeleton';

type ChartConfigType = Record<
    string,
    { label: string; color: string; key: string }
>;

type BarMultipleChartProps<T> = {
    title: string;
    data: T[];
    config: ChartConfigType;
    isLoading: boolean;
};

function BarMultipleChart<T>({
    title,
    data,
    config,
    isLoading,
}: BarMultipleChartProps<T>) {
    const formatNumber = (value: number) => value.toLocaleString();
    const chartConfig = config;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-[25dvh] w-full rounded-lg" />
                ) : (
                    <Fragment>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={data}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    tickMargin={20}
                                    axisLine={false}
                                />
                                <Bar
                                    dataKey={chartConfig.income.key}
                                    fill={chartConfig.income.color}
                                    fontSize={12}
                                    radius={4}
                                >
                                    <LabelList
                                        dataKey={chartConfig.income.key}
                                        position="bottom"
                                        className="fill-black"
                                        formatter={(value: number) =>
                                            formatNumber(value)
                                        }
                                    />
                                </Bar>
                                <Bar
                                    dataKey={chartConfig.outcome.key}
                                    fill={chartConfig.outcome.color}
                                    fontSize={12}
                                    radius={4}
                                >
                                    <LabelList
                                        dataKey={chartConfig.outcome.key}
                                        position="bottom"
                                        className="fill-black"
                                        formatter={(value: number) =>
                                            formatNumber(value)
                                        }
                                    />
                                </Bar>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="dashed" />
                                    }
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </BarChart>
                        </ChartContainer>
                    </Fragment>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    เพิ่มขึ้น 5.2% ในเดือนนี้ <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    แสดงจำนวนผู้เข้าชมทั้งหมดในช่วง 6 เดือนที่ผ่านมา
                </div>
            </CardFooter>
        </Card>
    );
}

export default BarMultipleChart;

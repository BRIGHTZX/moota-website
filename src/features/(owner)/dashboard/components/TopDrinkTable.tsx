import React from "react";
import { TopDrinkType } from "../types";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type TopDrinkTableProps = {
    topDrinks: TopDrinkType[];
};

type rowType = TopDrinkType;

function TopDrinkTable({ topDrinks }: TopDrinkTableProps) {
    const columnHeaderArray: Array<keyof rowType> = [
        "productName",
        "totalAmount",
        "totalPrice",
    ];

    const columnHelper = createColumnHelper<rowType>();

    const columns = [
        ...columnHeaderArray.map((columnName) => {
            return columnHelper.accessor(
                (row) => {
                    return row[columnName];
                },
                {
                    id: columnName,
                    header: () => {
                        if (columnName === "productName") {
                            return <div className="text-start">ชื่อสินค้า</div>;
                        }

                        if (columnName === "totalAmount") {
                            return <div className="text-start">จำนวน</div>;
                        }

                        if (columnName === "totalPrice") {
                            return <div className="text-start">ราคา</div>;
                        }

                        return <div className="text-start">{columnName}</div>;
                    },
                    cell: ({ getValue }) => {
                        const value = getValue();

                        if (columnName === "totalAmount") {
                            return <div className="text-start">{value}</div>;
                        }

                        if (columnName === "totalPrice") {
                            return (
                                <div className="text-start text-green-500">
                                    +{value}
                                </div>
                            );
                        }

                        return <div className="text-start">{value}</div>;
                    },
                }
            );
        }),
    ];

    const table = useReactTable({
        data: topDrinks,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="font-bold"
                                >
                                    <div className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center"
                            >
                                ไม่มีสินค้า
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default TopDrinkTable;

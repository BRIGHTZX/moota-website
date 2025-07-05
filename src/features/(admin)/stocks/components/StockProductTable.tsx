import React from "react";

import {
    CellContext,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon, TableOfContents } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { selectStockProductSchemaType } from "../schemas";
import Image from "next/image";

type StockProductTableType = {
    products: selectStockProductSchemaType[];
};

type rowType = selectStockProductSchemaType;

function StockProductTable({ products }: StockProductTableType) {
    const columnHeaderArray: Array<keyof rowType> = ["products", "stocks"];

    const columnWidths = {
        products: 100,
        stocks: 100,
    };

    const columnHelper = createColumnHelper<rowType>();

    const ActionCell = ({ row }: CellContext<rowType, unknown>) => {
        return (
            <div className="flex items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="grid place-content-center  bg-coffee-light border border-coffee-dark"
                    >
                        <Button variant="ghost" className="size-6">
                            <MoreHorizontalIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/stocks/detail/${row.original.id}`}
                            >
                                <PencilIcon className="size-4" />
                                See Details
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                            className="text-red-500 hover:bg-red-100! hover:text-red-500!"
                            disabled={isDeletingOrder}
                            onClick={() => {
                                setTimeout(() => {
                                    setOpen(true);
                                    setDeleteOrderId(row.original.orderId);
                                }, 0);
                            }}
                        >
                            <TrashIcon className="size-4 text-red-500" />
                            Delete
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    };

    ActionCell.displayName = "ActionCell";

    //  COLUMNS (SET COLUMN)
    const columns = [
        ...columnHeaderArray.map((columnName) => {
            return columnHelper.accessor(
                (row) => {
                    return row[columnName];
                },
                {
                    id: columnName,
                    size:
                        columnWidths[columnName as keyof typeof columnWidths] ??
                        undefined,
                    header: () => {
                        if (columnName === "products") {
                            return (
                                <div className="text-center">
                                    <p>สินค้า</p>
                                </div>
                            );
                        }

                        if (columnName === "stocks") {
                            return (
                                <div className="text-center">
                                    <p>จำนวน</p>
                                </div>
                            );
                        }
                        return (
                            <div className="text-center">
                                {columnName[0].toUpperCase() +
                                    columnName.slice(1)}
                            </div>
                        );
                    },
                    cell: ({ getValue }) => {
                        const value = getValue();

                        if (columnName === "products") {
                            const product = value as {
                                name: string;
                                image: string;
                            };
                            return (
                                <div className="flex items-center gap-2">
                                    <div className="size-10 relative rounded-md overflow-hidden">
                                        <Image
                                            src={
                                                product.image
                                                    ? product.image
                                                    : "/product-default.jpg"
                                            }
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            className="object-cover"
                                        />
                                    </div>
                                    <p>{product.name}</p>
                                </div>
                            );
                        }

                        if (columnName === "stocks") {
                            const stock = value as {
                                stock: number;
                                unit: string;
                            };
                            return (
                                <p>
                                    {stock.stock} {stock.unit}
                                </p>
                            );
                        }
                        return String(value);
                    },
                }
            );
        }),
        columnHelper.display({
            id: "action",
            size: 100,
            header: () => {
                return (
                    <div className="text-center">
                        <TableOfContents />
                    </div>
                );
            },
            cell: ActionCell,
        }),
    ];

    // TABLE (SET TABLE)
    const table = useReactTable({
        data: products,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="border border-coffee-dark rounded-lg p-4 relative">
            <Table className="rounded-lg">
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
                                    <TableCell
                                        key={cell.id}
                                        className={`${
                                            columnWidths[
                                                cell.column
                                                    .id as keyof typeof columnWidths
                                            ]
                                        }`}
                                    >
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

export default StockProductTable;

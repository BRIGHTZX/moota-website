import React, { useState } from 'react';

import {
    CellContext,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    MoreHorizontalIcon,
    PencilLineIcon,
    PlusIcon,
    TableOfContents,
    TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { selectStockProductSchemaType } from '../schemas';
import Image from 'next/image';
import { useDeleteProduct } from '../api/use-delete-product-stock';
import AlertDialogCustom from '@/components/AlertDialogCustom';

type StockProductTableType = {
    products: selectStockProductSchemaType[];
    setIsImportProductFormOpen: () => void;
    setImportProductId: (id: string) => void;
};

type rowType = selectStockProductSchemaType;

function StockProductTable({
    products,
    setIsImportProductFormOpen,
    setImportProductId,
}: StockProductTableType) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productId, setProductId] = useState<string | null>(null);
    const { mutate: deleteProduct } = useDeleteProduct({
        setIsOpen: setIsDeleteDialogOpen,
    });
    const columnHeaderArray: Array<keyof rowType> = ['products', 'stocks'];

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
                        className="grid place-content-center border border-gray-300 bg-blue-100 shadow-sm"
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
                                <PencilLineIcon className="size-4" />
                                แก้ไขสินค้า
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setIsImportProductFormOpen();
                                setImportProductId(row.original.id);
                            }}
                        >
                            <PlusIcon className="size-4" />
                            นำเข้าสินค้า
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setProductId(row.original.id);
                                setIsDeleteDialogOpen(true);
                            }}
                        >
                            <TrashIcon className="size-4" />
                            ลบสินค้า
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    };

    ActionCell.displayName = 'ActionCell';

    //  COLUMNS (SET COLUMN)
    const columns = [
        ...columnHeaderArray.map(columnName => {
            return columnHelper.accessor(
                row => {
                    return row[columnName];
                },
                {
                    id: columnName,
                    size:
                        columnWidths[columnName as keyof typeof columnWidths] ??
                        undefined,
                    header: () => {
                        if (columnName === 'products') {
                            return (
                                <div className="text-start">
                                    <p>สินค้า</p>
                                </div>
                            );
                        }

                        if (columnName === 'stocks') {
                            return (
                                <div className="text-end">
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

                        if (columnName === 'products') {
                            const product = value as {
                                name: string;
                                image: string;
                            };
                            return (
                                <div className="flex items-center gap-2">
                                    <div className="relative size-10 overflow-hidden rounded-md">
                                        <Image
                                            src={
                                                product.image
                                                    ? product.image
                                                    : '/product-default.jpg'
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

                        if (columnName === 'stocks') {
                            const stock = value as {
                                stock: number;
                                unit: string;
                            };
                            return (
                                <p className="text-end">
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
            id: 'action',
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
        <div className="border-coffee-dark relative rounded-lg border p-4">
            <AlertDialogCustom
                open={isDeleteDialogOpen}
                setOpen={setIsDeleteDialogOpen}
                buttonActionText="ยืนยันการลบสินค้า"
                action={() => {
                    deleteProduct({
                        param: {
                            productId: productId ?? '',
                        },
                    });
                }}
                title="ลบสินค้า"
                description="คุณต้องการลบสินค้านี้หรือไม่"
                buttonActionClassName="bg-red-500"
            />
            <Table className="rounded-lg">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
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
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
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

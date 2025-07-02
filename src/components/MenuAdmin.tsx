"use client";
import { cn } from "@/lib/utils";
import {
    HomeIcon,
    PackageIcon,
    ShoppingCartIcon,
    Table2Icon,
    TableIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

function MenuAdmin() {
    const pathname = usePathname();
    return (
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white p-2 rounded-t-md shadow-lg border-t border-gray-200">
            <ul className="flex items-center justify-center overflow-hidden bg-coffee-light rounded-md w-full h-full">
                <MenuItem
                    icon={<HomeIcon />}
                    text="Home"
                    active={pathname.startsWith("/admin/dashboard")}
                />
                <MenuItem
                    icon={<ShoppingCartIcon />}
                    text="Order"
                    active={pathname.startsWith("/admin/orders")}
                />
                <MenuItem
                    icon={<TableIcon />}
                    text="Table"
                    active={pathname.startsWith("/admin/table")}
                />
                <MenuItem
                    icon={<Table2Icon />}
                    text="Active"
                    active={pathname.startsWith("/admin/table")}
                />
                <MenuItem
                    icon={<PackageIcon />}
                    text="Product"
                    active={pathname.startsWith("/admin/product")}
                />
            </ul>
        </div>
    );
}

export default MenuAdmin;

const MenuItem = ({
    icon,
    text,
    active,
}: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
}) => {
    return (
        <li
            className={cn(
                "flex flex-1 size-full items-center flex-col overflow-hidden justify-center bg-coffee-light",
                active && "bg-coffee-brown  rounded-md"
            )}
        >
            <button
                className={cn(
                    "p-2 rounded-md hover:bg-coffee-brown text-coffee-dark",
                    active && "text-coffee-light"
                )}
            >
                {icon}
            </button>
            <span
                className={cn(
                    "text-sm font-medium text-coffee-dark",
                    active && "text-coffee-light"
                )}
            >
                {text}
            </span>
        </li>
    );
};

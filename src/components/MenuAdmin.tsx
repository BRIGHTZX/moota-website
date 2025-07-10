"use client";
import { cn } from "@/lib/utils";
import {
    HistoryIcon,
    PackageIcon,
    ShoppingCartIcon,
    Table2Icon,
    TableIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItems = [
    {
        icon: <ShoppingCartIcon />,
        text: "Pre-Order",
        href: "/admin/pre-orders",
    },
    {
        icon: <TableIcon />,
        text: "Table",
        href: "/admin/tables",
    },
    {
        icon: <Table2Icon />,
        text: "Active",
        href: "/admin/actives",
    },
    {
        icon: <HistoryIcon />,
        text: "History",
        href: "/admin/checkout-history",
    },
    {
        icon: <PackageIcon />,
        text: "Stock",
        href: "/admin/stocks",
    },
];

function MenuAdmin() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 left-0 w-full h-20 bg-white p-2 rounded-t-md shadow-lg border-t border-gray-200">
            <ul className="flex items-center justify-center overflow-hidden bg-coffee-light rounded-md w-full h-full">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.href}
                        icon={item.icon}
                        text={item.text}
                        active={pathname.startsWith(item.href)}
                        href={item.href}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MenuAdmin;

const MenuItem = ({
    icon,
    text,
    active,
    href,
}: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    href: string;
}) => {
    return (
        <Link
            href={href}
            className={cn(
                " cursor-pointer flex-1 size-full overflow-hidden  bg-coffee-light",
                active && "bg-coffee-brown  rounded-md"
            )}
        >
            <li className="flex flex-col items-center justify-center">
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
        </Link>
    );
};

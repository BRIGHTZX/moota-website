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
        text: "จองโต๊ะ",
        href: "/admin/pre-orders",
    },
    {
        icon: <TableIcon />,
        text: "โต๊ะ",
        href: "/admin/tables",
    },
    {
        icon: <Table2Icon />,
        text: "ทำงาน",
        href: "/admin/actives",
    },
    {
        icon: <HistoryIcon />,
        text: "ชำระเงิน",
        href: "/admin/checkout-history",
    },
    {
        icon: <PackageIcon />,
        text: "นำเข้า/ออก",
        href: "/admin/stocks",
    },
];

function MenuAdmin() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 left-0 w-full h-20 bg-white p-2 rounded-t-md shadow-lg border-t border-gray-200">
            <ul className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-md w-full h-full">
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
                " cursor-pointer flex-1 size-full overflow-hidden group hover:bg-primary/80 transition-all duration-300 rounded-md",
                active && "bg-primary  rounded-md"
            )}
        >
            <li className="flex flex-col items-center justify-center">
                <button
                    className={cn(
                        "p-2 rounded-md  text-black group-hover:text-white transition-all duration-300",
                        active && "text-white"
                    )}
                >
                    {icon}
                </button>
                <span
                    className={cn(
                        "text-xs font-medium text-black group-hover:text-white transition-all duration-300",
                        active && "text-white"
                    )}
                >
                    {text}
                </span>
            </li>
        </Link>
    );
};

"use client";

import { USER_IMG } from "@/constant";
import { cn } from "@/lib/utils";
import {
    ChevronFirstIcon,
    MoreVerticalIcon,
    ShoppingCartIcon,
    TableIcon,
    UserIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const sidebarItems = [
    {
        icon: <ShoppingCartIcon />,
        label: "Orders",
        href: "/admin/orders",
    },
    {
        icon: <TableIcon />,
        label: "Table",
        href: "/admin/tables",
    },
    {
        icon: <UserIcon />,
        label: "Users",
        href: "/admin/users",
    },
];

const SidebarContext = createContext<{
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
}>({
    isExpanded: true,
    setIsExpanded: () => {},
});

function Sidebar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const pathname = usePathname();
    return (
        <aside className="h-screen">
            <nav
                className={cn(
                    "h-full flex flex-col bg-coffee-light border-r shadow-sm transition-all duration-300",
                    isExpanded ? "w-52" : "w-16"
                )}
            >
                <div className="p-4 pb-2 flex justify-between items-center">
                    <h1
                        className={cn(
                            "font-bold text-2xl overflow-hidden transition-all duration-300",
                            isExpanded ? "w-32" : "w-0"
                        )}
                    >
                        MENU
                    </h1>
                    <button
                        onClick={() => {}}
                        className="p-1.5 rounded-lg  text-coffee-dark hover:bg-coffee-brown hover:text-coffee-light transition-all duration-300"
                    >
                        <ChevronFirstIcon />
                    </button>
                </div>
                <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
                    <ul className="flex-1 px-3">
                        {sidebarItems.map((item) => (
                            <SiderbarItem
                                key={item.label}
                                icon={item.icon}
                                text={item.label}
                                active={pathname.startsWith(item.href)}
                            />
                        ))}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 cursor-pointer">
                    <Image
                        src="/product/coke.jpg"
                        alt="coke"
                        width={32}
                        height={32}
                    />

                    <div
                        className={cn(
                            "flex justify-between items-center w-52 ml-3 overflow-hidden transition-all duration-300",
                            isExpanded ? "w-52" : "w-0"
                        )}
                    >
                        <div className="leading-4">
                            <p className="text-base font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">
                                john.doe@example.com
                            </p>
                        </div>
                        <MoreVerticalIcon />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;

const SiderbarItem = ({
    icon,
    text,
    active,
}: {
    icon: React.ReactNode;
    text: string;
    active: boolean;
}) => {
    const { isExpanded } = useContext(SidebarContext);
    return (
        <li
            className={cn(
                `relative flex group items-center py-2 px-3 my-1 font-meduim rounded-md cursor-pointer transition-colors duration-300`,
                active
                    ? "bg-coffee-dark text-coffee-light"
                    : "hover:bg-coffee-brown hover:text-coffee-light"
            )}
        >
            {icon}
            <span
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    isExpanded ? "w-52 ml-3" : "w-0"
                )}
            >
                {text}
            </span>

            {!isExpanded && (
                <div
                    className={cn(
                        "absolute left-full rounded-md px-2 py-1 ml-6 bg-coffee-dark text-coffee-light text-sm invisible opacity-0 -translate-x-3 transition-all duration-300  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                >
                    <span className="text-md font-semibold">{text}</span>
                </div>
            )}
        </li>
    );
};

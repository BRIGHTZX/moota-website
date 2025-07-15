'use client';
import { cn } from '@/lib/utils';
import {
    PackageIcon,
    ShoppingCartIcon,
    Table2Icon,
    TableIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoBag } from 'react-icons/io5';

const menuItems = [
    {
        icon: <ShoppingCartIcon />,
        text: 'จองโต๊ะ',
        href: '/admin/pre-orders',
    },
    {
        icon: <TableIcon />,
        text: 'โต๊ะ',
        href: '/admin/tables',
    },
    {
        icon: <Table2Icon />,
        text: 'ทำงาน',
        href: '/admin/actives',
    },
    {
        icon: <IoBag className="text-2xl" />,
        text: 'กลับบ้าน',
        href: '/admin/take-away',
    },
    {
        icon: <PackageIcon />,
        text: 'นำเข้า/ออก',
        href: '/admin/stocks',
    },
];

function MenuAdmin() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 left-0 h-20 w-full rounded-t-md border-t border-gray-200 bg-white p-2 shadow-lg">
            <ul className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-200">
                {menuItems.map(item => (
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
                'group hover:bg-primary/80 size-full flex-1 cursor-pointer overflow-hidden rounded-md transition-all duration-300',
                active && 'bg-primary rounded-md'
            )}
        >
            <li className="flex flex-col items-center justify-center">
                <button
                    className={cn(
                        'rounded-md p-2 text-black transition-all duration-300 group-hover:text-white',
                        active && 'text-white'
                    )}
                >
                    {icon}
                </button>
                <span
                    className={cn(
                        'text-xs font-medium text-black transition-all duration-300 group-hover:text-white',
                        active && 'text-white'
                    )}
                >
                    {text}
                </span>
            </li>
        </Link>
    );
};

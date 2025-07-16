import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { USER_IMG } from '@/constant';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

type HamburgerType = {
    currentUser: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    };
    isAdmin: boolean;
    isOwner: boolean;
};

const arrayLink = [
    {
        name: 'หน้าแรก',
        href: '/',
    },
    {
        name: 'เกี่ยวกับเรา',
        href: '/#about',
    },
    {
        name: 'อาหาร',
        href: '/#food',
    },
    {
        name: 'รีวิว',
        href: '/#review',
    },
    {
        name: 'ติดต่อเรา',
        href: '/#contact',
    },
];

function Hamburger({ currentUser, isAdmin, isOwner }: HamburgerType) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <div className="bg-coffee-light flex h-8 w-12 cursor-pointer items-center justify-center rounded-md md:hidden">
                    <MenuIcon className="text-coffee-dark size-7 p-1" />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle asChild className="text-4xl text-black">
                        <p>เมนู</p>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col px-2">
                        {arrayLink.map(item => (
                            <HamburgerLink
                                key={item.name}
                                {...item}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-center">
                        <ProfilDropdown
                            currentUser={currentUser}
                            isAdmin={isAdmin}
                            isOwner={isOwner}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Hamburger;

const HamburgerLink = ({
    name,
    href,
    setIsOpen,
}: {
    name: string;
    href: string;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const pathname = usePathname(); // จะได้ "/" เสมอ (ไม่รวม hash)
    const [hash, setHash] = useState('');

    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash);
        };

        updateHash(); // Init on mount
        window.addEventListener('hashchange', updateHash);
        return () => window.removeEventListener('hashchange', updateHash);
    }, []);

    const currentFullPath = `${pathname}${hash}`;
    const isActive =
        href === currentFullPath || // ex: "/#about" === "/#about"
        (href === '/' && pathname === '/' && hash === ''); // หน้า Home

    return (
        <Link href={href} onClick={() => setIsOpen(false)}>
            <div
                className={cn(
                    'hover:bg-coffee-light flex items-center justify-start rounded-md px-4 py-4 transition-all duration-200',
                    isActive && 'bg-coffee-light'
                )}
            >
                <p className="text-coffee-dark text-xl font-bold">{name}</p>
            </div>
        </Link>
    );
};

const ProfilDropdown = ({ currentUser, isAdmin, isOwner }: HamburgerType) => {
    const { picture, firstName, email } = currentUser;
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="h-full w-full">
                <div className="flex items-center justify-center gap-2 border border-gray-200 py-2">
                    <div className="size-10 cursor-pointer overflow-hidden rounded-full border">
                        <Image
                            width={40}
                            height={40}
                            src={
                                picture !== null ||
                                picture !== undefined ||
                                picture !== ''
                                    ? picture!
                                    : USER_IMG
                            }
                            alt="User-Image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-coffee-dark text-sm font-bold sm:text-lg">
                            {firstName}
                        </h1>
                        <p className="text-coffee-dark text-xs sm:text-sm">
                            {email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                sideOffset={8}
                className="xs:w-[30] z-[60] sm:w-80"
            >
                {currentUser ? (
                    <>
                        {isOwner && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href={'/admin/pre-orders'}>
                                        เฉพาะเจ้าของร้าน
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href={'/admin/pre-orders'}>
                                        เฉพาะพนักงาน
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={'/'}>กลับหน้าแรก</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem asChild>
                            <Link href={'/pre-orders'}>ประวัติการจอง</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <LogoutLink postLogoutRedirectURL="/">
                                ออกจากระบบ
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <div>
                        <DropdownMenuItem asChild>
                            <Link href={'/login'}>เข้าสู่ระบบ</Link>
                        </DropdownMenuItem>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

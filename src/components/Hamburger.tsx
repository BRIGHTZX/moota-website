import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { USER_IMG } from "@/constant";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type HamburgerType = {
    currentUser: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    };
    isAdmin: boolean;
};

function Hamburger({ currentUser, isAdmin }: HamburgerType) {
    console.log(isAdmin);
    const arrayLink = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "About",
            href: "/about",
        },
        {
            name: "Review",
            href: "/review",
        },
        {
            name: "Contact",
            href: "/contact",
        },
    ];
    return (
        <Sheet>
            <SheetTrigger>
                <div className="w-12 bg-coffee-light h-8 rounded-md flex items-center sm:hidden justify-center cursor-pointer ">
                    <MenuIcon className="size-7 p-1 text-coffee-dark" />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-coffee-dark text-2xl">
                        Menu
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col px-2">
                        {arrayLink.map((item) => (
                            <HamburgerLink key={item.name} {...item} />
                        ))}
                        {isAdmin && (
                            <HamburgerLink
                                name="Admin"
                                href="/admin/pre-orders"
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <ProfilDropdown
                            currentUser={currentUser}
                            isAdmin={isAdmin}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Hamburger;

const HamburgerLink = ({ name, href }: { name: string; href: string }) => {
    const pathname = usePathname();
    return (
        <div
            className={cn(
                "flex items-center justify-start px-4 py-4 rounded-md hover:bg-coffee-light transition-all duration-200",
                pathname.startsWith(href) && "bg-coffee-light"
            )}
        >
            <Link href={href}>
                <h1 className="text-coffee-dark text-xl font-bold">{name}</h1>
            </Link>
        </div>
    );
};

const ProfilDropdown = ({ currentUser, isAdmin }: HamburgerType) => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="w-full h-full">
                <div className="flex items-center justify-center gap-2 border border-gray-200 py-2">
                    <div className="size-10 cursor-pointer overflow-hidden rounded-full">
                        <Image
                            width={40}
                            height={40}
                            src={
                                currentUser?.picture !== null
                                    ? currentUser.picture!
                                    : USER_IMG
                            }
                            alt="User-Image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-coffee-dark text-sm sm:text-lg font-bold">
                            {currentUser?.firstName}
                        </h1>
                        <p className="text-coffee-dark text-xs sm:text-sm">
                            {currentUser?.email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                sideOffset={8}
                className="z-[60] xs:w-[30] sm:w-80"
            >
                {currentUser ? (
                    <>
                        {isAdmin && (
                            <div>
                                <DropdownMenuItem asChild>
                                    <Link href={"/admin/products"}>
                                        Only Admin
                                    </Link>
                                </DropdownMenuItem>
                            </div>
                        )}
                        {isAdmin && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href={"/admin/products"}>
                                        Only Admin
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem asChild>
                            <Link href={"/orders"}>My Orders</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <LogoutLink postLogoutRedirectURL="/">
                                Log out
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <div>
                        <DropdownMenuItem asChild>
                            <Link href={"/login"}>Login</Link>
                        </DropdownMenuItem>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

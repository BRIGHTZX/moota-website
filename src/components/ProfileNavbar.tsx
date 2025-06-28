import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { USER_IMG } from "@/constant";

type ProfileType = {
    currentUser: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        picture: string;
    };
    isAdmin: boolean;
};
export function ProfileNavbar({ currentUser, isAdmin }: ProfileType) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="rounded-full border border-gray-200 focus-visible:ring-0">
                <div className="size-10 cursor-pointer overflow-hidden rounded-full">
                    <Image
                        width={40}
                        height={40}
                        src={currentUser?.picture || USER_IMG}
                        alt="User-Image"
                        className="h-full w-full object-cover"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="z-[60]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={"/admin/products"}>Only Admin</Link>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem asChild>
                    <Link href={"/orders"}>My Orders</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <LogoutLink postLogoutRedirectURL="/">Log out</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

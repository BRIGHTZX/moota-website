import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { USER_IMG } from "@/constant";

type ProfileType = {
    currentUser: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    };
    isAdmin: boolean;
};
export function ProfileNavbar({ currentUser, isAdmin }: ProfileType) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="rounded-full border border-gray-200 focus-visible:ring-0 max-sm:hidden">
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
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="z-[60]">
                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={"/admin/pre-orders"}>
                                เฉพาะผู้ดูแลระบบ
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem asChild>
                    <Link href={"/pre-orders"}>ประวัติการจอง</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <LogoutLink postLogoutRedirectURL="/">
                        ออกจากระบบ
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

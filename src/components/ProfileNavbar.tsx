import { USER_IMG } from '@/constant';
import { cn } from '@/lib/utils';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

type ProfileType = {
    currentUser: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    };
    isAdmin: boolean;
    isOwner: boolean;
    className?: string;
};
export function ProfileNavbar({
    currentUser,
    isAdmin,
    isOwner,
    className,
}: ProfileType) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                className={cn(
                    'rounded-full border border-gray-200 focus-visible:ring-0 max-sm:hidden',
                    className
                )}
            >
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
                {isOwner && (
                    <DropdownMenuItem asChild>
                        <Link href={'/owner/dashboard'}>เฉพาะเจ้าของร้าน</Link>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={'/admin/pre-orders'}>
                                เฉพาะผู้ดูแลระบบ
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

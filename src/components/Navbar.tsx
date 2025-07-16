'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { NavbarContext } from '@/context/NavbarProvider';
import ProfileSkeleton from './Skeleton/ProfileSkeleton';
import { ProfileNavbar } from './ProfileNavbar';
import Hamburger from './Hamburger';

function Navbar() {
    const { user, isAdmin, isLoading, isOwner } = useContext(NavbarContext);
    return (
        <nav className="bg-coffee-brown fixed top-0 z-50 h-16 w-full md:h-20">
            <div className="relative container mx-auto flex size-full items-center justify-between px-8 md:px-0">
                <div className="size-10 md:size-14">
                    <Image
                        src="/logo.png"
                        className="object-cover"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>

                <ul className="text-coffee-light absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:flex">
                    <li>
                        <Link href="/#home">หน้าหลัก</Link>
                    </li>
                    <li>
                        <Link href="/#about">เกี่ยวกับเรา</Link>
                    </li>
                    <li>
                        <Link href="/#food">อาหาร</Link>
                    </li>
                    <li>
                        <Link href="/#review">รีวิว</Link>
                    </li>
                    <li>
                        <Link href="/#contact">ติดต่อ</Link>
                    </li>
                </ul>

                {isLoading ? (
                    <ProfileSkeleton />
                ) : user ? (
                    <div>
                        <Hamburger
                            currentUser={user}
                            isAdmin={isAdmin}
                            isOwner={isOwner}
                        />
                        <ProfileNavbar
                            currentUser={user}
                            isAdmin={isAdmin}
                            isOwner={isOwner}
                        />
                    </div>
                ) : (
                    <ul className="flex items-center gap-2 text-black md:gap-4">
                        <li>
                            <Button
                                variant="coffeeOutline"
                                asChild
                                className="text-xs max-md:w-[60px] md:text-base"
                            >
                                <Link href="/signin">
                                    <p>เข้าสู่ระบบ</p>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="coffeePrimary"
                                asChild
                                className="text-xs max-md:w-[90px] md:text-base"
                            >
                                <Link href="/signup">
                                    <p>สมัครสมาชิก</p>
                                </Link>
                            </Button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { NavbarContext } from "@/context/NavbarProvider";
import ProfileSkeleton from "./Skeleton/ProfileSkeleton";
import { ProfileNavbar } from "./ProfileNavbar";
import Hamburger from "./Hamburger";

function Navbar() {
    const { user, isAdmin, isLoading } = useContext(NavbarContext);
    return (
        <nav className="fixed top-0 z-50 w-full bg-coffee-brown h-16 md:h-20">
            <div className="relative container px-8 md:px-0 mx-auto flex size-full items-center justify-between">
                <div className="size-10 md:size-14">
                    <Image
                        src="/logo.png"
                        className="object-cover"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>

                <ul className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 text-coffee-light">
                    <li>
                        <Link href="/#home">Home</Link>
                    </li>
                    <li>
                        <Link href="/#about">About</Link>
                    </li>
                    <li>
                        <Link href="/#review">Review</Link>
                    </li>
                    <li>
                        <Link href="/#contact">Contact</Link>
                    </li>
                </ul>

                {isLoading ? (
                    <ProfileSkeleton />
                ) : user ? (
                    <div>
                        <Hamburger currentUser={user} isAdmin={isAdmin} />
                        <ProfileNavbar currentUser={user} isAdmin={isAdmin} />
                    </div>
                ) : (
                    <ul className="flex items-center gap-2 md:gap-4 text-black">
                        <li>
                            <Button
                                variant="coffeeOutline"
                                asChild
                                className="text-xs md:text-base max-md:w-[60px]"
                            >
                                <Link href="/signin">Sign In</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="coffeePrimary"
                                asChild
                                className="text-xs md:text-base max-md:w-[60px]"
                            >
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

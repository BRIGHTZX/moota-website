import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full bg-coffee-brown">
            <div className="relative container mx-auto flex size-full items-center justify-between">
                <div className="size-14">
                    <Image
                        src="/logo.jpg"
                        className="object-cover"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>

                <ul className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 text-coffee-light">
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

                <ul className="flex items-center gap-4 text-black">
                    <li>
                        <Button variant="coffeeOutline" asChild>
                            <Link href="/signin">Sign In</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="coffeePrimary" asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

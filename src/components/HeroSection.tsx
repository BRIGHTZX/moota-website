import Image from "next/image";
import React from "react";
import BadgeCustom from "./BadgeCustom";
import { CheckIcon, StarIcon, Users2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

function HeroSection() {
    return (
        <div
            id="home"
            className="h-full w-screen overflow-x-hidden bg-coffee-light"
        >
            <div className="container mx-auto flex h-screen w-screen">
                <div className="flex flex-1 items-center">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="text-left text-8xl font-bold text-black">
                            Authentic <br />
                            <span className="text-coffee-dark">Thai BBQ</span>
                            <br /> Experience
                        </h1>

                        <p className="mt-4 text-left text-2xl text-coffee-brown">
                            Savor the traditional flavors of Moo Krata - premium
                            meats and fresh vegetables to perfection at your
                            table
                        </p>

                        <div className="mt-4 flex items-center gap-2">
                            <BadgeCustom
                                icon={<StarIcon />}
                                text="4.9/5 Rating"
                            />
                            <BadgeCustom
                                icon={<Users2Icon />}
                                text="Family Style"
                            />
                            <BadgeCustom
                                icon={<CheckIcon />}
                                text="100% Authentic"
                            />
                        </div>

                        <div className="mt-10">
                            <Button
                                asChild
                                variant="coffeePrimary"
                                className="rounded-full px-10 py-6"
                            >
                                <Link href="/reservation">
                                    <h1 className="text-2xl font-bold">
                                        Reserve Your Table
                                    </h1>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="h-[600px] w-[500px] rounded-lg">
                        <Image
                            src="/moota-1.webp"
                            alt="moota"
                            width={1000}
                            height={1000}
                            className="h-full w-full rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

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
            <div className="container mx-auto pt-20 lg:pt-0 flex flex-col lg:flex-row h-full lg:h-screen w-screen">
                <div className="flex flex-1 items-center">
                    <div className="flex flex-col lg:items-start justify-center">
                        <h1 className="text-center lg:text-left text-5xl md:text-8xl font-bold text-black">
                            Authentic <br />
                            <span className="text-coffee-dark">Thai BBQ</span>
                            <br /> Experience
                        </h1>

                        <p className="mt-4 lg:w-full mx-auto md:w-2/3 w-1/2 text-center lg:text-left text-sm md:text-xl lg:text-2xl text-coffee-brown">
                            ลิ้มลองรสชาติหมูกระทะแท้ๆ กับเนื้อชั้นดี ผักสด
                            และน้ำจิ้มสูตรพิเศษ ย่างเองบนเตาร้อน
                            เสิร์ฟความฟินถึงโต๊ะคุณ
                        </p>

                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-2">
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

                        <div className="mt-10 flex justify-center lg:justify-start">
                            <Button
                                asChild
                                variant="coffeePrimary"
                                className="rounded-full px-10 py-6"
                            >
                                <Link href="/reservation">
                                    <h1 className="text-lg md:text-2xl font-bold">
                                        Reserve Your Table
                                    </h1>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-1 items-center my-10 lg:my-0 justify-center">
                    <div className="h-[300px] lg:h-[600px] w-3/4 lg:w-[500px] rounded-lg">
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

import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

function HeroSection() {
    return (
        <div
            id="home"
            className="bg-coffee-light h-full w-screen overflow-x-hidden"
        >
            <div className="container mx-auto flex h-full w-screen flex-col pt-20 lg:h-screen lg:flex-row lg:pt-0">
                <div className="flex flex-1 items-center">
                    <div className="flex flex-col justify-center lg:items-start">
                        <p className="text-center text-5xl font-bold text-black md:text-8xl lg:text-left">
                            นกหมูกระทะ <br />
                            <span className="text-coffee-dark">บุฟเฟต์</span>
                        </p>

                        <p className="text-coffee-brown mx-auto mt-4 w-1/2 text-center text-sm md:w-2/3 md:text-xl lg:w-full lg:text-left lg:text-2xl">
                            ลิ้มลองรสชาติหมูกระทะแท้ๆ กับเนื้อชั้นดี ผักสด
                            และน้ำจิ้มสูตรพิเศษ ย่างเองบนเตาร้อน
                            เสิร์ฟความฟินถึงโต๊ะคุณ
                        </p>

                        <div className="mt-10 flex justify-center lg:justify-start">
                            <Button
                                asChild
                                variant="coffeePrimary"
                                className="rounded-full px-10 py-6"
                            >
                                <Link href="/reservation">
                                    <p className="text-lg font-bold md:text-2xl">
                                        เริ่มจองโต๊ะของท่าน
                                    </p>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="my-10 flex items-center justify-center lg:my-0 lg:flex-1">
                    <div className="h-[300px] w-3/4 rounded-lg lg:h-[600px] lg:w-[500px]">
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

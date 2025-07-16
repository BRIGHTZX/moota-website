'use client';
import React from 'react';
import HeaderSection from './HeaderSection';
import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ContactSection() {
    const router = useRouter();

    const goToMap = () => {
        router.push(
            'https://www.google.com/maps?q=22+%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88+9+%E0%B8%99%E0%B8%81+%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%B0%E0%B8%9A%E0%B8%B8%E0%B8%9F%E0%B9%80%E0%B8%9F%E0%B9%88%E0%B8%95%E0%B9%8C+%E0%B8%AD.%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87+%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B8+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B8+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD+%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87+%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%99+55160&ftid=0x31280bceba9dcfd9:0x31e1f6dd0192d4c5&entry=gps&lucs=,94275304,94224825,94227247,94227248,94231188,47071704,47069508,94218641,94203019,47084304&g_ep=CAISEjI1LjIyLjAuNzYzNTE5NzAyMBgAIIgnKlosOTQyNzUzMDQsOTQyMjQ4MjUsOTQyMjcyNDcsOTQyMjcyNDgsOTQyMzExODgsNDcwNzE3MDQsNDcwNjk1MDgsOTQyMTg2NDEsOTQyMDMwMTksNDcwODQzMDRCAlRI&skid=0e09962b-c0c8-4d37-ace2-5f04595dc722&g_st=com.google.maps.preview.copy'
        );
    };
    return (
        <div
            id="contact"
            className="bg-gradient-to-t from-[#E7DED0] to-[#ffffff] py-10 shadow-lg md:py-20"
        >
            <HeaderSection
                icon={<PhoneIcon className="size-6" />}
                title="ติดต่อเรา"
                header="ติดต่อเรา"
                description="เราพร้อมช่วยเหลือคุณในทุกคำถามหรือการจอง ติดต่อเราได้เลยวันนี้!"
            />

            <div className="container mx-auto">
                <div className="flex flex-col gap-10 md:flex-row">
                    <div className="flex-1 px-4 md:px-0">
                        <div
                            onClick={goToMap}
                            className="relative w-full rounded-lg border bg-gradient-to-t from-[#E7DED0] to-[#ffffff] shadow-lg"
                        >
                            <Image
                                src="/map.png"
                                alt="map"
                                width={500}
                                height={500}
                                className="size-full"
                            />
                            <div className="absolute right-0 bottom-4 w-full">
                                <div className="mx-auto flex w-[90%] items-center gap-4 border bg-white p-3 shadow-lg">
                                    <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] p-3">
                                        <MapPinIcon className="size-8 text-white" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-2xl font-bold">
                                            นกหมูกระทะ
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            22 หมู่ 9 พระธาตุ ตำบล พระธาตุ อำเภอ
                                            เชียงกลาง น่าน 55160
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex h-full w-full flex-col gap-6 px-4 md:px-0">
                            <ContactCard
                                icon={
                                    <PhoneIcon className="size-6 text-white" />
                                }
                                title="Phone"
                                description="064-634-0365"
                            />
                            <ContactCard
                                icon={
                                    <ClockIcon className="size-6 text-white" />
                                }
                                title="Open Hours"
                                description="จันทร์ - อาทิตย์: 16:00 น. - 22:00 น."
                            />

                            <div className="flex flex-col gap-4">
                                <Button
                                    asChild
                                    className="w-full rounded-full py-6"
                                    variant="coffeePrimary"
                                >
                                    <Link href="/reservation">
                                        <p className="text-lg font-bold md:text-2xl">
                                            จองโต๊ะตอนนี้
                                        </p>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;

type ContactCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

const ContactCard = ({ icon, title, description }: ContactCardProps) => {
    return (
        <div className="flex w-full items-center gap-4 rounded-md bg-white px-4 py-8 shadow-md">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] p-3">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold md:text-2xl">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};

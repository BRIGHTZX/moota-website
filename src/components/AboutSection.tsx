import React from 'react';
import HeaderSection from './HeaderSection';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';

function AboutSection() {
    const arrayAbout = [
        {
            text: 'หมูกระทะต้นตำรับ',
            image: '/moota/moota-1.jpg',
        },
        {
            text: 'หมูกระทะต้นตำรับ',
            image: '/moota/moota-2.jpg',
        },
        {
            text: 'หมูกระทะต้นตำรับ',
            image: '/moota/moota-3.jpg',
        },
    ];
    return (
        <div id="about" className="bg-white pt-10">
            <HeaderSection
                icon={<UserIcon className="text-coffee-light size-6" />}
                title="เกี่ยวกับเรา"
                header="บรรยากาศภายในร้าน"
                description="ทุกเมนูปรุงอย่างพิถีพิถันด้วยวัตถุดิบคุณภาพเยี่ยม และกรรมวิธีแบบไทยแท้ เพื่อมอบประสบการณ์หมูกระทะต้นตำรับอย่างแท้จริง"
            />

            <div className="mt-4 mb-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                {arrayAbout.map((item, idx) => (
                    <AboutCard key={idx} {...item} />
                ))}
            </div>
        </div>
    );
}

export default AboutSection;

const AboutCard = ({ text, image }: { text: string; image: string }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="size-60 overflow-hidden rounded-full">
                <Image
                    src={image}
                    alt="about"
                    width={240}
                    height={240}
                    className="h-full w-full object-cover"
                />
            </div>
            <p className="text-coffee-brown text-center text-lg font-bold">
                {text}
            </p>
        </div>
    );
};

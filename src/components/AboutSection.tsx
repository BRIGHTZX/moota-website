import React from "react";
import HeaderSection from "./HeaderSection";
import { ChefHat } from "lucide-react";
import Image from "next/image";

function AboutSection() {
    const arrayAbout = [
        {
            text: "หมูกระทะต้นตำรับ",
            image: "/moota/moota-1.jpg",
        },
        {
            text: "หมูกระทะต้นตำรับ",
            image: "/moota/moota-2.jpg",
        },
        {
            text: "หมูกระทะต้นตำรับ",
            image: "/moota/moota-3.jpg",
        },
    ];
    return (
        <div className="bg-white">
            <HeaderSection
                id="about"
                icon={<ChefHat className="size-6 text-coffee-light" />}
                title="About Us"
                header="Taste the Tradition"
                description="ทุกเมนูปรุงอย่างพิถีพิถันด้วยวัตถุดิบคุณภาพเยี่ยม และกรรมวิธีแบบไทยแท้ เพื่อมอบประสบการณ์หมูกระทะต้นตำรับอย่างแท้จริง"
            />

            <div className="mt-4 mb-10 flex-col md:flex-row flex justify-center items-center gap-10">
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
        <div className="p-4 flex flex-col gap-4">
            <div className="size-60 overflow-hidden rounded-full">
                <Image
                    src={image}
                    alt="about"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-center text-coffee-brown text-lg font-bold">
                {text}
            </p>
        </div>
    );
};

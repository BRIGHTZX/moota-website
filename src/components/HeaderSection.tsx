import React from "react";

type HeaderSectionProps = {
    icon: React.ReactNode;
    title: string;
    header: string;
    description: string;
};

function HeaderSection({
    icon,
    title,
    header,
    description,
}: HeaderSectionProps) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-10 flex items-center justify-center">
                <div className="flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] px-10 py-2 text-white">
                    {icon}
                    <h2 className="text-center text-coffee-light text-2xl font-bold">
                        {title}
                    </h2>
                </div>
            </div>

            <h1 className="text-center text-5xl md:text-7xl font-bold text-black">
                {header}
            </h1>
            <p className="mt-8 lg:w-3/4 mx-auto w-3/4 text-center text-sm md:text-xl lg:text-2xl text-coffee-brown">
                {description}
            </p>
        </div>
    );
}

export default HeaderSection;

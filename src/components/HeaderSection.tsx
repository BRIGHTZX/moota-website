import React from "react";

type HeaderSectionProps = {
    icon: React.ReactNode;
    title: string;
    header: string;
    description: string;
    id: string;
};

function HeaderSection({
    icon,
    title,
    header,
    description,
    id,
}: HeaderSectionProps) {
    return (
        <div id={id} className="container mx-auto px-4 py-16">
            <div className="mb-10 flex items-center justify-center">
                <div className="flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] px-10 py-2 text-white">
                    {icon}
                    <h2 className="text-center text-coffee-light text-2xl font-bold">
                        {title}
                    </h2>
                </div>
            </div>

            <h2 className="text-center text-6xl font-bold text-coffee-dark">
                {header}
            </h2>
            <p className="mx-auto mt-4 w-[80%] text-center text-2xl text-coffee-brown">
                {description}
            </p>
        </div>
    );
}

export default HeaderSection;

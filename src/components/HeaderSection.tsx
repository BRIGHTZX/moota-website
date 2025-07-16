import React from 'react';

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
                    <p className="text-coffee-light text-center text-2xl font-bold">
                        {title}
                    </p>
                </div>
            </div>

            <p className="text-center text-5xl font-bold text-black md:text-7xl">
                {header}
            </p>
            <p className="text-coffee-brown mx-auto mt-8 w-3/4 text-center text-sm md:text-xl lg:w-3/4 lg:text-2xl">
                {description}
            </p>
        </div>
    );
}

export default HeaderSection;

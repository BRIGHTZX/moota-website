import React from "react";
import HeaderSection from "./HeaderSection";
import { CarIcon, ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "./ui/button";

function ContactSection() {
    return (
        <div className="bg-gradient-to-t from-[#E7DED0] to-[#ffffff] py-20 shadow-lg">
            <HeaderSection
                id="contact"
                icon={<PhoneIcon className="size-6" />}
                title="Contact Us"
                header="Get in Touch"
                description="We're here to help you with any questions or reservations. Contact us today!"
            />

            <div className="container mx-auto">
                <div className="flex gap-10">
                    <div className="flex-1">
                        <div className="relative min-h-[400px] w-full rounded-lg border bg-gradient-to-t from-[#E7DED0] to-[#ffffff] shadow-lg">
                            <MapPinIcon className="text-orange-primary absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute right-0 bottom-4 w-full">
                                <div className="mx-auto flex w-[90%] items-center gap-4 border bg-white p-3 shadow-lg">
                                    <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] p-3">
                                        <MapPinIcon className="size-8 text-white" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl font-bold">
                                            Moo Krata Place
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            123 Main St, Anytown, USA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex h-full w-full flex-col justify-between gap-4">
                            <ContactCard
                                icon={
                                    <PhoneIcon className="size-6 text-white" />
                                }
                                title="Phone"
                                description="123 Main St, Anytown, USA"
                            />
                            <ContactCard
                                icon={
                                    <ClockIcon className="size-6 text-white" />
                                }
                                title="Open Hours"
                                description="Mon - Sun: 10:00 AM - 10:00 PM"
                            />
                            <ContactCard
                                icon={<CarIcon className="size-6 text-white" />}
                                title="Parking"
                                description="Free Parking"
                            />

                            <div className="flex flex-col gap-4">
                                <Button
                                    className="w-full rounded-full py-6"
                                    variant="coffeePrimary"
                                >
                                    <h1 className="text-2xl font-bold">
                                        Reservation Now
                                    </h1>
                                </Button>
                                <Button
                                    className="w-full rounded-full py-6"
                                    variant="coffeeOutline"
                                >
                                    <h1 className="text-2xl font-bold">
                                        Contact Us
                                    </h1>
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
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
};

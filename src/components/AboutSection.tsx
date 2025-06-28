import React from "react";
import HeaderSection from "./HeaderSection";
import { ChefHat } from "lucide-react";

function AboutSection() {
    return (
        <div className="bg-white">
            <HeaderSection
                id="about"
                icon={<ChefHat className="size-6 text-coffee-light" />}
                title="About Us"
                header="Taste the Tradition"
                description="Each dish is carefully prepared with premium ingredients and traditional Thai cooking methods, bringing you an authentic Moo Krata experience"
            />
        </div>
    );
}

export default AboutSection;

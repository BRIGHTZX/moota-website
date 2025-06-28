import React from "react";

type BadgeCustomProps = {
    icon: React.ReactNode;
    text: string;
};

function BadgeCustom({ icon, text }: BadgeCustomProps) {
    return (
        <div className="flex items-center gap-2 rounded-full border bg-coffee-beige px-4 py-2">
            <div className="text-coffee-dark rounded-full p-1 bg-coffee-light">
                {icon}
            </div>
            <span className="text-xs text-nowrap font-bold text-coffee-light">
                {text}
            </span>
        </div>
    );
}

export default BadgeCustom;

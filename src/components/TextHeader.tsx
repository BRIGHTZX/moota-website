import { cn } from "@/lib/utils";
import React from "react";

function TextHeader({ text, className }: { text: string; className?: string }) {
    return <p className={cn("text-2xl font-bold", className)}>{text}</p>;
}

export default TextHeader;

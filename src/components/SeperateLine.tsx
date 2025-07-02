import { cn } from "@/lib/utils";
import React from "react";

function SeperateLine({ className }: { className?: string }) {
    return <div className={cn("bg-gray-300 h-px w-full", className)} />;
}

export default SeperateLine;

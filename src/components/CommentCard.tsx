import { QuoteIcon, StarIcon } from "lucide-react";
import React from "react";

type CommentCardProps = {
    comment: string;
};

function CommentCard({ comment }: CommentCardProps) {
    return (
        <div className="h-[400px] w-full border bg-coffee-beige/50 p-10 shadow-lg">
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex size-18 items-center justify-center rounded-full bg-gradient-to-r from-[#4A2C2A] to-[#776054] text-white">
                    <QuoteIcon className="size-10" />
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="size-4 fill-yellow-500" />
                    <StarIcon className="size-4 fill-yellow-500" />
                    <StarIcon className="size-4 fill-yellow-500" />
                    <StarIcon className="size-4 fill-yellow-500" />
                    <StarIcon className="size-4 fill-yellow-500" />
                </div>

                <div className="w-2/3 text-center text-md md:text-2xl">
                    <p className="text-coffee-dark">{comment}</p>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;

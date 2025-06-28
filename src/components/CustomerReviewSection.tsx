"use client";
import HeaderSection from "./HeaderSection";
import { Star } from "lucide-react";
import CommentCard from "./CommentCard";
import { useState } from "react";
import { Button } from "./ui/button";

function CustomerReviewSection() {
    const [comments, setComments] = useState(1);
    return (
        <div className="bg-gradient-to-b from-[#E7DED0] to-[#ffffff] py-20 shadow-lg">
            <HeaderSection
                id="review"
                icon={<Star className="size-6" />}
                title="Customer Reviews"
                header="What Our Guests Say"
                description="Our guests love our authentic Thai cuisine and warm hospitality. See what they have to say about their experience at Moo Krata."
            />

            <div className="container mx-auto">
                <div>
                    {comments === 1 && (
                        <CommentCard comment="The most authentic Thai BBQ experience I've had outside of Thailand! The meat quality is exceptional and the traditional setup creates such a wonderful atmosphere." />
                    )}
                    {comments === 2 && (
                        <CommentCard comment="Moo Krata Palace has become our family's go-to spot for special occasions. The staff is incredibly friendly and the flavors are absolutely incredible!" />
                    )}
                    {comments === 3 && (
                        <CommentCard comment="I've been coming here for months and it never disappoints. The fresh ingredients, authentic seasonings, and cozy atmosphere make every visit special." />
                    )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <Button
                        onClick={() => setComments(comments - 1)}
                        disabled={comments === 1}
                        variant="coffeeOutline"
                        className="rounded-full px-10"
                    >
                        Prev
                    </Button>
                    <Button
                        onClick={() => setComments(comments + 1)}
                        disabled={comments === 3}
                        variant="coffeeOutline"
                        className="rounded-full px-10"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CustomerReviewSection;

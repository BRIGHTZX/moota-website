'use client';
import HeaderSection from './HeaderSection';
import { Star } from 'lucide-react';
import CommentCard from './CommentCard';
import { useState } from 'react';
import { Button } from './ui/button';

function CustomerReviewSection() {
    const [comments, setComments] = useState(1);
    return (
        <div
            id="review"
            className="bg-gradient-to-b from-[#E7DED0] to-[#ffffff] py-20 shadow-lg"
        >
            <HeaderSection
                icon={<Star className="size-6" />}
                title="รีวิวจากลูกค้า"
                header="ความคิดเห็นจากลูกค้าของเรา"
                description="ลูกค้าของเราประทับใจในรสชาติอาหารไทยแท้ และการบริการที่อบอุ่น มาดูกันว่าพวกเขาพูดถึงประสบการณ์ที่ Moo Krata Palace ว่าอย่างไรบ้าง"
            />

            <div className="container mx-auto px-4 md:px-0">
                <div>
                    {comments === 1 && (
                        <CommentCard comment="ประสบการณ์หมูกระทะที่แท้จริงที่สุดเท่าที่เคยเจอมา นอกประเทศไทย! เนื้อคุณภาพเยี่ยม และบรรยากาศการกินแบบดั้งเดิมทำให้รู้สึกอบอุ่นมาก" />
                    )}
                    {comments === 2 && (
                        <CommentCard comment="Moo Krata Palace กลายเป็นร้านประจำของครอบครัวเราในทุกโอกาสพิเศษ พนักงานเป็นกันเองมาก และรสชาติอาหารอร่อยแบบสุดๆ!" />
                    )}
                    {comments === 3 && (
                        <CommentCard comment="มาร้านนี้หลายเดือนแล้ว ไม่เคยผิดหวังเลย วัตถุดิบสดใหม่ เครื่องปรุงต้นตำรับ และบรรยากาศที่อบอุ่น ทำให้ทุกครั้งที่มากินรู้สึกพิเศษ" />
                    )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <Button
                        onClick={() => setComments(comments - 1)}
                        disabled={comments === 1}
                        variant="coffeeOutline"
                        className="rounded-full px-10 text-sm md:text-base"
                    >
                        ย้อนกลับ
                    </Button>
                    <Button
                        onClick={() => setComments(comments + 1)}
                        disabled={comments === 3}
                        variant="coffeeOutline"
                        className="rounded-full px-10 text-sm md:text-base"
                    >
                        ต่อไป
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CustomerReviewSection;

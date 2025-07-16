import React from 'react';
import HeaderSection from './HeaderSection';
import { FaBowlFood } from 'react-icons/fa6';
import FoodCarousel from './FoodCarousel';
import { FOOD_IMAGE_ARRAY } from '@/constant';

function FoodSection() {
    return (
        <div
            id="food"
            className="bg-gradient-to-t from-[#E7DED0] to-[#ffffff] pt-20"
        >
            <div className="container mx-auto px-4">
                <HeaderSection
                    icon={<FaBowlFood className="text-coffee-light size-6" />}
                    title="เมนูอาหาร"
                    header="เมนูอาหารที่คุณควรลอง"
                    description="ทุกเมนูปรุงอย่างพิถีพิถันด้วยวัตถุดิบคุณภาพเยี่ยม และกรรมวิธีแบบไทยแท้ เพื่อมอบประสบการณ์หมูกระทะต้นตำรับอย่างแท้จริง"
                />

                <div className="mt-4 flex items-center justify-center px-16 pb-20">
                    <FoodCarousel imgArray={FOOD_IMAGE_ARRAY} />
                </div>
            </div>
        </div>
    );
}

export default FoodSection;

import React from 'react';
import HeaderSection from './HeaderSection';
import { UserIcon } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { BG_IMAGE_ARRAY } from '@/constant';

function AboutSection() {
    return (
        <div id="about" className="container mx-auto bg-white px-4 pt-10">
            <HeaderSection
                icon={<UserIcon className="text-coffee-light size-6" />}
                title="เกี่ยวกับเรา"
                header="บรรยากาศภายในร้าน"
                description="บรรยากาศภายในร้านของเรามีความอบอุ่นและเป็นกันเอง ทำให้คุณรู้สึกเหมือนอยู่บ้าน"
            />

            <div className="mt-4 mb-10 flex items-center justify-center px-16">
                <ImageCarousel imgArray={BG_IMAGE_ARRAY} />
            </div>
        </div>
    );
}

export default AboutSection;

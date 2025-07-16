'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

function FoodCarousel({ imgArray }: { imgArray: string[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full" // ✅ เพิ่ม max-w ให้กว้างขึ้น
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {imgArray.map(imageSrc => (
                    <CarouselItem
                        key={imageSrc}
                        className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3" // ✅ กำหนดให้กินพื้นที่ 1/3 ต่อหน้า
                    >
                        <div className="p-0">
                            <Card className="overflow-hidden rounded-xl p-0">
                                <CardContent className="flex h-[300px] items-center justify-center p-0 sm:h-[350px] md:h-[400px] lg:h-[450px]">
                                    <Image
                                        src={imageSrc}
                                        alt="bg"
                                        width={1000}
                                        height={1000}
                                        className="h-full w-full object-cover"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default FoodCarousel;

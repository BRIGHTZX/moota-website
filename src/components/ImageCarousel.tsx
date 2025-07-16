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

function ImageCarousel({ imgArray }: { imgArray: string[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: false })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {imgArray.map((imageSrc, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card className="overflow-hidden rounded-lg p-0">
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

export default ImageCarousel;

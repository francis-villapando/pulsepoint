import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

interface ImageCarouselProps {
  images: {
    id: string;
    imageUrl: string;
    altText: string;
    eventTitle?: string;
    eventDate?: Date;
  }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">No Images Available</h3>
            <p className="text-sm text-muted-foreground">Check back later for updates from past events.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <Carousel className="relative">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.altText}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Image Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="max-w-4xl">
                    {image.eventTitle && (
                      <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 drop-shadow-lg">
                        {image.eventTitle}
                      </h3>
                    )}
                    {image.eventDate && (
                      <p className="text-lg text-white/90 drop-shadow-md">
                        {format(image.eventDate, 'MMMM d, yyyy')}
                      </p>
                    )}
                    <p className="text-sm text-white/80 mt-2 drop-shadow-md max-w-2xl">
                      {image.altText}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Built-in Navigation Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all border border-white/20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all border border-white/20" />
      </Carousel>
    </div>
  );
}

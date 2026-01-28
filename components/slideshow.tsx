"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlideshowImage = {
  id: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
};

export function Slideshow() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch slideshow images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/slideshow");
        if (!response.ok) throw new Error("Failed to fetch slideshow");
        const data = await response.json();
        setImages(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error fetching slideshow:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Auto-slide setiap 3 detik (tidak 1 detik untuk UX yang lebih baik)
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Handle swipe/drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragEnd = e.changedTouches[0].clientX;
    const diff = dragStart - dragEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-600">Loading slideshow...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-600">No slideshow images available</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 md:h-[500px] bg-black rounded-lg overflow-hidden group cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slideshow Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              unoptimized
              className="object-cover w-full h-full"
              priority={index === currentIndex}
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators/Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

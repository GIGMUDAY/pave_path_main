'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Testimonial {
  img?: string;
  quote: string;
  name: string;
  role: string;
}

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
  autoRotate?: boolean;
  duration?: number;
}

export default function TestimonialSlider({
  testimonials = [],
  autoRotate = true,
  duration = 5
}: TestimonialSliderProps) {
  const [active, setActive] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const heightFix = () => {
    if (testimonialsRef.current) {
      const height = testimonialsRef.current.scrollHeight;
      if (testimonialsRef.current.parentElement) {
        testimonialsRef.current.parentElement.style.height = `${height}px`;
      }
    }
  };

  const setActiveIndex = (index: number) => {
    setActive(index);
    setIsAutoRotating(false);
    resetAutorotate();
  };

  const startAutorotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setTimeout(heightFix, 100);
    }, duration * 1000);
  };

  const resetAutorotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoRotating) {
      startAutorotate();
    }
  };

  const handleNext = () => {
    setActiveIndex((active + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((active - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Initial height fix
    setTimeout(() => {
      heightFix();
    }, 100);
    
    if (isAutoRotating && testimonials.length > 0) {
      startAutorotate();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, testimonials.length]);

  useEffect(() => {
    // Fix height when active testimonial changes
    setTimeout(() => {
      heightFix();
    }, 300); // Wait for animation to start
  }, [active]);

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[active];

  return (
    <div className="mx-auto w-full max-w-3xl text-center flex flex-col min-h-[400px]">
      {/* Testimonial image */}
      <div className="relative h-32 flex-shrink-0">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-zinc-500/25 before:via-zinc-500/5 before:via-25% before:to-zinc-500/0 before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,white_20%,white)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${active}`}
                initial={{ opacity: 0, rotate: -60 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 60 }}
                transition={{ duration: 0.7, ease: [0.68, -0.3, 0.32, 1] }}
                className="absolute inset-0 -z-10 flex h-full flex-col"
              >
                {currentTestimonial.img ? (
                  <img
                    src={currentTestimonial.img}
                    alt={currentTestimonial.name}
                    className="relative left-1/2 top-11 -translate-x-1/2 rounded-full w-[60px] h-[60px] object-cover"
                  />
                ) : (
                  <div className="relative left-1/2 top-11 -translate-x-1/2 rounded-full w-[60px] h-[60px] bg-gradient-to-br from-[#1D4E89] to-[#4CB276] flex items-center justify-center text-white font-bold text-xl">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Text - with max-height to prevent overflow */}
      <div className="mb-8 transition-all delay-300 duration-150 ease-in-out flex-grow min-h-[100px] max-h-[300px] overflow-y-auto">
        <div ref={testimonialsRef} className="relative flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ 
                duration: 0.5, 
                ease: 'easeInOut',
                delay: 0.2
              }}
              className="w-full"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-[#2C2C2C] before:content-['\201C'] after:content-['\201D'] break-words px-4 leading-relaxed">
                {currentTestimonial.quote}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation - flex-shrink-0 to stay at bottom */}
      <div className="mt-auto pt-4 flex w-full items-center justify-between gap-4 flex-shrink-0">
        <button
          onClick={handlePrev}
          className="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: '#F4F4F4' }}
        >
          <FaArrowLeft className="size-5 transition-transform duration-300 group-hover/button:rotate-12" style={{ color: '#1D4E89' }} />
        </button>

        {/* Name and Role */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-base italic font-semibold" style={{ color: '#2C2C2C' }}>{currentTestimonial.name}</span>
          <span className="text-sm italic" style={{ color: '#6B7280' }}>{currentTestimonial.role}</span>
        </div>

        <button
          onClick={handleNext}
          className="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: '#F4F4F4' }}
        >
          <FaArrowRight className="size-5 transition-transform duration-300 group-hover/button:-rotate-12" style={{ color: '#1D4E89' }} />
        </button>
      </div>
    </div>
  );
}


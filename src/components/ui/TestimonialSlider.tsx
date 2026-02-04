import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    img: string;
    quote: string;
    name: string;
    role: string;
}

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6">
            {/* Soft circular backdrop sized down for mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-[260px] w-[260px] sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px] rounded-full bg-gradient-to-b from-muted/50 via-background to-background/40" />
            </div>

            <div className="relative">
                {/* Desktop controls overlay the card so they do not squeeze mobile width */}
                <button
                    onClick={handlePrevious}
                    aria-label="Previous testimonial"
                    className="hidden sm:flex absolute -left-5 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-muted-foreground/30 bg-background/90 shadow-lg items-center justify-center hover:scale-105 transition z-20"
                >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="hidden sm:flex absolute -right-5 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-muted-foreground/30 bg-background/90 shadow-lg items-center justify-center hover:scale-105 transition z-20"
                >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                </button>

                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col items-center text-center bg-background/85 dark:bg-background/70 border border-muted-foreground/15 rounded-3xl shadow-xl px-6 sm:px-10 py-10 sm:py-12 backdrop-blur"
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-background shadow-xl mb-6 sm:mb-8">
                        <img
                            src={testimonials[currentIndex].img}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="text-lg sm:text-2xl md:text-[32px] leading-relaxed sm:leading-snug font-semibold max-w-3xl mb-8 sm:mb-10">
                        &ldquo;{testimonials[currentIndex].quote}&rdquo;
                    </p>

                    <div className="space-y-1">
                        <h4 className="text-base sm:text-lg font-semibold text-foreground">
                            {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground italic">
                            {testimonials[currentIndex].role}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Mobile controls under the card to avoid horizontal overflow */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
                <button
                    onClick={handlePrevious}
                    aria-label="Previous testimonial"
                    className="w-11 h-11 rounded-full border border-muted-foreground/25 bg-background/90 shadow-lg flex items-center justify-center transition hover:scale-105"
                >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-11 h-11 rounded-full border border-muted-foreground/25 bg-background/90 shadow-lg flex items-center justify-center transition hover:scale-105"
                >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
            </div>
        </div>
    );
};

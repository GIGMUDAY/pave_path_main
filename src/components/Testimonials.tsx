import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TestimonialSlider } from './ui/TestimonialSlider';

const testimonials = [
    {
        img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=320&h=320&fit=crop&auto=format",
        quote: "PavePath Design has been instrumental in helping us meet tight deadlines. Their drafting team is incredibly responsive and delivers accurate, standards-compliant work every time.",
        name: "Sarah Mitchell",
        role: "Senior Project Engineer, TransTech Engineering"
    },
    {
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=320&h=320&fit=crop&auto=format",
        quote: "Working with PavePath has transformed our project delivery. Their expertise in ADA compliance and traffic control plans saved us countless hours. Outstanding quality!",
        name: "David Chen",
        role: "Principal Engineer, Urban Infrastructure Group"
    },
    {
        img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=320&h=320&fit=crop&auto=format",
        quote: "The team at PavePath understands the nuances of civil drafting. They seamlessly integrated with our workflow and delivered plan sets that exceeded our expectations.",
        name: "Jennifer Rodriguez",
        role: "Civil Engineering Manager, Coastal Design Associates"
    },
    {
        img: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=320&h=320&fit=crop&auto=format",
        quote: "PavePath's SWPPP and erosion control drafting services are top-notch. They helped us streamline our review process and maintain consistency across multiple projects.",
        name: "Michael Thompson",
        role: "Transportation Director, Metro Planning Solutions"
    },
    {
        img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=320&h=320&fit=crop&auto=format",
        quote: "From the pilot project to ongoing collaboration, PavePath has consistently delivered exceptional work. Their understanding of multiple state standards is impressive.",
        name: "Emily Parker",
        role: "Lead Civil Designer, Summit Engineering Corp"
    },
    {
        img: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=320&h=320&fit=crop&auto=format",
        quote: "PavePath Design brought the drafting capacity we desperately needed. Their team is professional, skilled, and always delivers on time. Highly recommended!",
        name: "Robert Anderson",
        role: "Engineering Director, Pacific Roadway Design"
    }
];

export const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="testimonials"
            className="section-spacing relative bg-accent/20 dark:bg-accent/10 overflow-hidden"
            ref={ref}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">
                        Testimonials
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground">
                        What Our Clients Say
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                        Trusted by engineering teams across the country to deliver exceptional drafting services
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="mt-12 sm:mt-16 px-4 sm:px-12">
                    <TestimonialSlider testimonials={testimonials} />
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto mt-12 sm:mt-20"
                >
                    <div className="text-center">
                        <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">
                            50
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                            Happy Clients
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">
                            99.8%
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                            Satisfaction Rate
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">
                            5.0
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                            Average Rating
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

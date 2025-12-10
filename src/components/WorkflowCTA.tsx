import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const WorkflowCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-spacing relative bg-secondary w-full" ref={ref}>
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-foreground leading-tight mb-4">
              Try PavePath With a Free Pilot Task
            </h2>
            <p className="text-secondary-foreground/90 text-base lg:text-lg leading-relaxed">
              Send us a single redline or drafting task.
              <br />
              We'll return a completed draft within 24–48 hours so you can evaluate speed, quality, and fit.
            </p>
          </motion.div>

          {/* White CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 bg-secondary-foreground text-secondary rounded-[6px] font-semibold text-base hover:bg-secondary-foreground/90 transition-colors shadow-lg group whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                Start Free Pilot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


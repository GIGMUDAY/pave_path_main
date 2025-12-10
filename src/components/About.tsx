import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '50+', label: 'Engineering Experts' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-spacing bg-background relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground">
              About PavePath Design
            </h2>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                PavePath Design is a drafting-focused studio that supports civil and transportation engineering 
                teams with reliable, standards-aligned CAD production.
              </p>
              
              <div>
                <p className="font-semibold text-foreground mb-3">We are:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                    <span>Drafting specialists, not a full-service engineering firm</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                    <span>Focused on execution, accuracy, and consistency</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                    <span>Comfortable working under multiple state and local standards</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center dark:border-border/70"
                >
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Mission Banner Component - Full Width
export const MissionBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-spacing relative bg-secondary" ref={ref}>
      <div className="section-container">
        <div className="relative min-h-[180px] sm:min-h-[200px] lg:min-h-[240px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-12 w-full items-center">
            {/* First Column - Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center lg:items-start"
            >
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-foreground leading-tight">
                Our mission is simple
              </h3>
            </motion.div>

            {/* Second Column - Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start"
            >
              <p className="text-secondary-foreground text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed font-medium">
                Give engineering teams the drafting capacity they need to deliver great projects on time.
              </p>
            </motion.div>

            {/* Third Column - Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-secondary-foreground text-secondary px-5 sm:px-6 py-2.5 sm:py-3 rounded-[6px] font-semibold text-sm sm:text-base hover:bg-secondary-foreground/90 active:scale-95 transition-all shadow-lg group w-full lg:w-auto touch-manipulation min-h-[44px]"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

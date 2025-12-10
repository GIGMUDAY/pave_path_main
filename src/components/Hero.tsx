import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import BalatroBackground from '@/components/ui/balatro-background';

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-visible">
      {/* Single Full-Width Box */}
      <div className="relative bg-primary w-full min-h-screen flex items-start pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 lg:pt-40 lg:pb-32 overflow-visible">
        {/* Balatro Animated Background */}
        <div className="absolute inset-0 z-0 opacity-70">
          <BalatroBackground
            spinRotation={-1.0}
            spinSpeed={0.02}
            color1="#1a4d8c" // Dark Blue
            color2="#4a9d6b" // Secondary Green
            color3="#ffffff" // White
            contrast={3.5}
            lighting={0.4}
            spinAmount={0.005}
            isRotate={true}
            mouseInteraction={true}
          />
        </div>
        {/* Subtle Grid Overlay for Engineering Aesthetic */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Green accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-10" />
        
        <div className="section-container relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            {/* Left Side: Heading and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.2] sm:leading-[1.3] mb-4 sm:mb-6 text-primary-foreground tracking-tight"
              >
                <span className="block">Elastic Drafting</span>
                <span className="block">Support for</span>
                <span className="block">Civil &</span>
                <span className="block">Transportation</span>
                <span className="block">Engineering</span>
                <span className="block">Teams</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-primary-foreground/95 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl"
              >
                Fast, standards-compliant CAD drafting that helps your firm clear backlogs, meet deadlines, and deliver cleaner plan sets.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-[6px] hover:bg-secondary hover:border-secondary hover:text-secondary-foreground active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl touch-manipulation min-h-[48px] text-sm sm:text-base"
                >
                  Get a Free Pilot Task
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-[6px] hover:bg-secondary hover:border-secondary hover:text-secondary-foreground active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation min-h-[48px] text-sm sm:text-base"
                >
                  See Drafting Services
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side: Drafting Services Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-primary-foreground/15 via-primary-foreground/10 to-primary-foreground/5 backdrop-blur-md border border-primary-foreground/30 rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden group mt-8 lg:mt-0"
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Section Header */}
                <h3 className="text-xs font-bold text-primary-foreground/80 uppercase tracking-[0.15em] mb-6 sm:mb-8 relative z-10">
                  Drafting Services
                </h3>

                {/* Services List in Card Format */}
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.7
                      }
                    }
                  }}
                  className="space-y-4"
                >
                  {[
                    "24–48 hr redline turnaround",
                    "5–7 day ADA curb ramp sheet packs",
                    "Traffic control & SWPPP drafting support",
                    "White-label pods or on-demand task support"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { duration: 0.4 }
                        }
                      }}
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 hover:border-primary-foreground/30 transition-all duration-300 relative z-10 group/item"
                      whileHover={{ 
                        x: 6,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary/20 group-hover/item:bg-secondary/30 border border-secondary/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" strokeWidth={2.5} />
                      </div>
                      <span className="text-primary-foreground text-sm sm:text-base leading-relaxed pt-1 sm:pt-1.5 font-medium">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PenTool, Accessibility, Droplets, Car, ClipboardList, Settings } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    text: 'Civil 3D & AutoCAD drafting',
  },
  {
    icon: Accessibility,
    text: 'ADA curb ramp drafting (4–8 sheet packs)',
  },
  {
    icon: Car,
    text: 'Traffic control plan drafting (MUTCD aligned)',
  },
  {
    icon: Droplets,
    text: 'SWPPP & erosion control drafting',
  },
  {
    icon: ClipboardList,
    text: 'Signage, striping & utility drafting',
  },
  {
    icon: Settings,
    text: 'Plan set cleanup, formatting, and organization',
  },
];

export const WhatWeDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="what-we-do" className="section-spacing bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground">
            Civil & Transportation Drafting Support — On Demand
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            PavePath Design provides civil engineering drafting services for firms that need extra 
            production capacity without extra headcount.
          </p>
        </motion.div>

        {/* Clean Cards - Using 12-column grid - All 6 services */}
        <div className="grid-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`col-span-12 md:col-span-6 lg:col-span-4 p-5 sm:p-6 md:p-8 rounded-[6px] border border-border/50 dark:border-border/70 ${
                index % 2 === 0 ? 'bg-accent/30 dark:bg-accent/15' : 'bg-muted dark:bg-muted/80'
              }`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-[6px] bg-secondary/10 flex items-center justify-center">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" strokeWidth={1.5} />
                </div>
                <p className="font-display text-base sm:text-lg font-semibold text-foreground leading-relaxed">
                  {service.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PenTool, Accessibility, Car, Droplets, ClipboardList, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'civil-transportation',
    badge: 'Core Service',
    icon: PenTool,
    title: 'Civil & Transportation Drafting',
    description: 'We provide CAD drafting services for roadway, site, and transportation projects.',
    bullets: [
      'Plan & profile drafting from design alignments',
      'Layout sheets, typical sections, and details',
      'Existing conditions plan drafting',
      'Utility, grading, and general civil drafting',
    ],
    bestFor: 'Good fit for: firms that have designs laid out but need help turning them into clean, consistent plan sheets.',
    iconGradient: 'from-secondary/20 to-secondary/10',
  },
  {
    id: 'ada-curb-ramp',
    badge: 'Compliance',
    icon: Accessibility,
    title: 'ADA Curb Ramp Drafting',
    description: 'We specialize in ADA curb ramp drafting for cities, agencies, and consultants.',
    bullets: [
      '4–8 sheet curb ramp packs',
      'ADA / PROWAG-aligned slopes & dimensions',
      'Plans, profiles, and details where required',
      'Clear dimensions, callouts, and notes for construction and inspection',
    ],
    bestFor: 'Perfect for: ADA programs, corridor upgrades, subdivision ramp retrofits, and backlog curb ramp design tasks.',
    iconGradient: 'from-secondary/10 to-secondary/20',
  },
  {
    id: 'traffic-control',
    badge: 'Traffic & Safety',
    icon: Car,
    title: 'Traffic Control Plan Drafting (TCP)',
    description: 'We draft MUTCD-compliant traffic control plans for lane closures, detours, utility work, and construction phasing.',
    bullets: [
      'Lane closures',
      'Detours & shifts',
      'Utility and maintenance work',
      'Construction phasing',
    ],
    hasTwoSections: true,
    secondSectionTitle: 'Our TCP drafting includes:',
    secondSectionBullets: [
      'Appropriate signs & symbol usage',
      'Lane tapers and channelization',
      'Pedestrian routing and markings',
      'Multiple phases, if required by the agency',
    ],
    bestFor: 'Ideal for: consultants, contractors, and engineering firms needing permit-ready TCP sets.',
    iconGradient: 'from-secondary/20 via-secondary/15 to-secondary/20',
  },
  {
    id: 'swppp-erosion',
    badge: 'Compliance',
    icon: Droplets,
    title: 'SWPPP & Erosion Control Drafting',
    description: 'We prepare drafting for SWPPP and water pollution control plans from your engineer\'s markups and design criteria.',
    bullets: [
      'BMP locations and symbols',
      'Erosion control details',
      'Legends and standard notes',
      'Plan callouts and coverage areas',
    ],
    bestFor: 'We work from your engineer\'s markups and design criteria to produce clear, readable SWPPP plan sheets.',
    iconGradient: 'from-secondary/10 to-secondary/20',
  },
  {
    id: 'plan-cleanup',
    badge: 'Organization',
    icon: ClipboardList,
    title: 'Plan Set Cleanup & Organization',
    description: 'We help firms present polished, consistent plan sets that are submission-ready and easy to review.',
    bullets: [
      'Cleaning up sheet naming and numbering',
      'Fixing title blocks, scales, and north arrows',
      'Aligning layers and linetypes',
      'Eliminating duplicate or outdated references',
    ],
    bestFor: 'Result: submission-ready drawing sets that are easy to review and approve.',
    iconGradient: 'from-secondary/20 to-secondary/10',
  },
];

export const Services = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Scroll progress tracking for the slider animation (works on all devices)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (custom: { cardIndex: number; bulletIndex: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.6 + custom.cardIndex * 0.15 + custom.bulletIndex * 0.08,
      },
    }),
  };

  return (
    <section id="services" className="section-spacing relative bg-accent/20 dark:bg-accent/10" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </div>
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Services
          </motion.span>
          <motion.h2 
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Drafting Services for Civil & Transportation Projects
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <motion.p 
              className="text-muted-foreground text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              PavePath supports civil engineering and transportation teams with production-ready drafting.
            </motion.p>
            <motion.p 
              className="text-foreground text-base sm:text-lg font-semibold"
              initial={{ opacity: 0, y: 15 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              We don't replace your engineers — we give them more time to do engineering.
            </motion.p>
          </div>
        </motion.div>

        {/* Services Grid - Modern Card Design with Slider Animation */}
        <div ref={containerRef} className="relative">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            
            // Calculate scale for each card - cards scale down as you scroll (works on all devices)
            const targetScale = 1 - ((services.length - index) * 0.05);
            const range: [number, number] = [index * 0.2, 1];
            const scale = useTransform(scrollYProgress, range, [1, targetScale]);
            
            return (
              <div
                key={service.id}
                className="h-screen flex items-center justify-center sticky top-0"
              >
                <motion.div
                  style={{ 
                    scale: scale,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`glass-card-hover relative overflow-hidden rounded-xl sm:rounded-2xl w-full max-w-7xl mx-auto group flex flex-col dark:border-border/70 ${service.hasTwoSections ? 'min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]' : 'min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]'}`}
                >
                  {/* Background Gradient Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-secondary/2 to-secondary/5"
                    initial={{ opacity: 0 }}
                    animate={isSectionInView ? { opacity: [0, 0.3, 0] } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-secondary/2 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className={`relative ${service.hasTwoSections ? 'p-3 sm:p-4 md:p-6 lg:p-8' : 'p-4 sm:p-6 lg:p-8'} flex-1 flex flex-col`}>
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 lg:gap-12 items-start`}>
                      {/* Left/Right: Icon & Badge Section */}
                      <div className={`flex-shrink-0 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <motion.div 
                          className="space-y-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.2,
                          }}
                        >
                          {/* Badge */}
                          <motion.div 
                            className="inline-flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + 0.3,
                            }}
                          >
                            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                              {service.badge}
                            </span>
                          </motion.div>
                          
                          {/* Icon */}
                          <motion.div 
                            className={`
                              relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl
                              bg-gradient-to-br ${service.iconGradient}
                              flex items-center justify-center
                              shadow-lg group-hover:scale-110 group-hover:rotate-3
                              transition-all duration-500
                            `}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1 + 0.4,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                          >
                            <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-secondary" strokeWidth={1.5} />
                            <div className="absolute inset-0 bg-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Right/Left: Content Section */}
                      <motion.div 
                        className={`flex-1 flex flex-col ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.2,
                        }}
                      >
                        {/* Title */}
                        <motion.h3 
                          className="font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-secondary transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.3,
                          }}
                        >
                          {service.title}
                        </motion.h3>
                        
                        {/* Description */}
                        <motion.p 
                          className={`text-muted-foreground ${service.hasTwoSections ? 'text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4' : 'text-sm sm:text-base lg:text-lg mb-4 sm:mb-6'} leading-relaxed`}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.4,
                          }}
                        >
                          {service.description}
                        </motion.p>

                        {/* Bullet Points - Special layout for services with two sections */}
                        {service.hasTwoSections ? (
                          <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1 + 0.5,
                            }}
                          >
                            {/* First Section */}
                            <motion.div 
                              className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1 + 0.6,
                              }}
                            >
                              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-foreground mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                                We draft MUTCD-compliant traffic control plans for:
                              </p>
                              <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                {service.bullets.map((bullet, bulletIndex) => (
                                  <motion.li
                                    key={bulletIndex}
                                    className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm lg:text-base text-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      duration: 0.3,
                                      delay: index * 0.1 + 0.7 + bulletIndex * 0.05,
                                    }}
                                  >
                                    <span className="text-secondary mt-0.5 sm:mt-1 md:mt-1.5 flex-shrink-0 text-[10px] sm:text-xs">●</span>
                                    <span className="leading-snug sm:leading-relaxed">{bullet}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>

                            {/* Second Section */}
                            <motion.div 
                              className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-accent/5 dark:bg-accent/10 border border-accent/10 dark:border-accent/20"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1 + 0.6,
                              }}
                            >
                              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-foreground mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                                {service.secondSectionTitle}
                              </p>
                              <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                                {service.secondSectionBullets?.map((bullet, bulletIndex) => (
                                  <motion.li
                                    key={bulletIndex}
                                    className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm lg:text-base text-foreground"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      duration: 0.3,
                                      delay: index * 0.1 + 0.7 + bulletIndex * 0.05,
                                    }}
                                  >
                                    <span className="text-secondary mt-0.5 sm:mt-1 md:mt-1.5 flex-shrink-0 text-[10px] sm:text-xs">●</span>
                                    <span className="leading-snug sm:leading-relaxed">{bullet}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.ul 
                            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1 + 0.5,
                            }}
                          >
                            {service.bullets.map((bullet, bulletIndex) => (
                              <motion.li
                                key={bulletIndex}
                                className="flex items-start gap-2 text-xs sm:text-sm lg:text-base text-foreground"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1 + 0.6 + bulletIndex * 0.08,
                                }}
                              >
                                <span className="text-secondary mt-1 sm:mt-1.5 flex-shrink-0">●</span>
                                <span className="leading-relaxed">{bullet}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}

                        {/* Best For Section */}
                        <motion.div 
                          className={`mt-auto ${service.hasTwoSections ? 'mb-2 sm:mb-3 md:mb-6 p-2 sm:p-2.5 md:p-4' : 'mb-4 sm:mb-6 p-3 sm:p-4'} rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.8,
                          }}
                        >
                          <p className={`${service.hasTwoSections ? 'text-[11px] sm:text-xs md:text-sm' : 'text-xs sm:text-sm'} text-foreground leading-snug sm:leading-relaxed`}>
                            {service.bestFor}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

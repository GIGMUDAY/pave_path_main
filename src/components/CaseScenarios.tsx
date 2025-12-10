import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Car, HardHat, Map } from 'lucide-react';

const helpCategories = [
  {
    icon: Building2,
    title: 'Small and mid-size civil engineering firms',
    gradient: 'from-secondary/20 to-secondary/10',
  },
  {
    icon: Car,
    title: 'Transportation & traffic consultancies',
    gradient: 'from-secondary/10 to-secondary/20',
  },
  {
    icon: HardHat,
    title: 'Contractors needing TCP and plan updates',
    gradient: 'from-secondary/20 via-secondary/15 to-secondary/20',
  },
  {
    icon: Map,
    title: 'Firms working across multiple states and standards',
    gradient: 'from-secondary/10 to-secondary/20',
  },
];

export const CaseScenarios = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-spacing bg-background relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Who We Help</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Built for Busy Engineering Teams
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Whether you're dealing with redline backlogs, ADA ramp programs, or permit submittals, 
            PavePath acts as your elastic drafting team.
          </p>
        </motion.div>

        <div className="mb-12">
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-center mb-8 text-foreground">
            We work with:
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card-hover rounded-2xl p-6 lg:p-8 h-full flex flex-col items-center text-center dark:border-border/70">
                <div className={`
                  w-16 h-16 lg:w-20 lg:h-20 rounded-xl
                  bg-gradient-to-br ${category.gradient}
                  flex items-center justify-center
                  shadow-lg group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-500 mb-6
                `}>
                  <category.icon className="w-8 h-8 lg:w-10 lg:h-10 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-base lg:text-lg font-semibold text-foreground leading-relaxed">
                  {category.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

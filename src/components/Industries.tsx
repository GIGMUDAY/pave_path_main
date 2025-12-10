import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Road, Building2, MapPin, Factory } from 'lucide-react';

const industries = [
  {
    icon: Road,
    number: '1.',
    title: 'Transportation Engineering',
    description: 'Supporting DOTs, municipalities, and consultants with roadway design, traffic studies, and infrastructure planning drafting.',
  },
  {
    icon: Building2,
    number: '2.',
    title: 'Civil Engineering Firms',
    description: 'Helping small to mid-sized firms scale drafting capacity during peak periods without adding permanent headcount.',
  },
  {
    icon: MapPin,
    number: '3.',
    title: 'Municipal & Public Works',
    description: 'Delivering compliant plan sets for cities and agencies managing ADA upgrades, utility projects, and public infrastructure.',
  },
  {
    icon: Factory,
    number: '4.',
    title: 'Site Development',
    description: 'Supporting commercial and residential developers with grading plans, utility coordination, and site layout drafting.',
  },
];

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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="industries" className="section-spacing bg-background relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Industry</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Our Know-how in Your Market
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            No matter what stage you're at, we've got the right moves to get you there. With our know-how across industries, 
            we deliver solutions that bring big-time results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card-hover rounded-2xl overflow-hidden h-full relative dark:border-border/70">
                {/* Image Section with Gradient Background */}
                <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-secondary/20 via-secondary/10 to-secondary/10 flex items-center justify-center">
                  <industry.icon className="w-16 h-16 text-secondary/30" />
                  
                  {/* Number Badge Overlay */}
                  <div className="absolute top-4 right-4">
                    <span className="font-display text-5xl lg:text-6xl font-bold text-primary/20">
                      {industry.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <industry.icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-3">
                        {industry.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

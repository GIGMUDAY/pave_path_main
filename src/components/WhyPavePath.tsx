import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Target, Repeat, Link, GitBranch } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Speed',
    description: '24–48 hr redline updates and fast turnaround on high-priority tasks.',
  },
  {
    icon: Target,
    title: 'Accuracy',
    description: 'Drafting aligned to ADA, PROWAG, MUTCD, and state DOT standards.',
  },
  {
    icon: Repeat,
    title: 'Consistency',
    description: 'Structured workflows and QA/QC checks so your sheets look like your own team produced them.',
  },
  {
    icon: Link,
    title: 'Integration',
    description: 'We use your templates, standards, and naming conventions — working seamlessly in the background.',
  },
  {
    icon: GitBranch,
    title: 'Flexibility',
    description: 'Use us for one-off tasks, recurring drafting, or dedicated Pods.',
  },
];

export const WhyPavePath = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-pavepath" className="section-spacing bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Why PavePath</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground">
            Built for Firms That Need Speed, Accuracy & Consistency
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Small and mid-sized engineering firms face the same recurring challenges: demand spikes, slow hiring cycles, and redline backlogs.
            <br className="hidden sm:block" /><br className="hidden sm:block" />
            <span className="font-medium text-foreground">pavepathdesign solves this by offering:</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 sm:p-6 text-center border border-border/50 dark:border-border/70 rounded-[6px] bg-card"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-[6px] bg-secondary/10 mb-4 sm:mb-5">
                <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-primary">{reason.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

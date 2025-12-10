import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Settings, Upload, CheckCircle2, FileCheck, Building2, Car, HardHat, Briefcase } from 'lucide-react';

const steps = [
  {
    icon: Settings,
    number: '01',
    title: 'Standards & Setup',
    description: 'We start with your CAD standards & templates, sample project sheets, and layer naming conventions.',
    details: [
      'Your CAD standards & templates',
      'Sample project sheets',
      'Layer naming and annotation styles',
    ],
    note: 'We mirror your look and feel so our drawings blend seamlessly with your work.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
  },
  {
    icon: Upload,
    number: '02',
    title: 'Task Intake',
    description: 'You send tasks via email, shared drive, or project management tools.',
    details: [
      'Annotated PDFs / redlines',
      'Marked-up CAD files',
      'Sketches with notes',
      'Scope descriptions',
    ],
    note: 'We accept multiple formats to make task submission easy.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
  },
  {
    icon: CheckCircle2,
    number: '03',
    title: 'Drafting & QA',
    description: 'Our drafting team produces drawings following your standards with internal QA/QC checks.',
    details: [
      'Produces drawings in Civil 3D / AutoCAD',
      'Follows your standards and instructions',
      'Runs internal QA/QC checks (layer checks, overlaps, missing dimensions)',
    ],
    note: 'Quality checks ensure accuracy before delivery.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80',
  },
  {
    icon: FileCheck,
    number: '04',
    title: 'Delivery & Revisions',
    description: 'You receive CAD files and PDFs, with quick revisions to keep your schedule moving.',
    details: [
      'CAD files (.dwg)',
      'PDFs (for review or submittal)',
      'Quick incorporation of minor revisions',
    ],
    note: 'Minor revisions based on your review are incorporated quickly to keep your schedule moving.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
  },
];

const engagementOptions = [
  {
    icon: Building2,
    title: 'Civil & Transportation Engineering Firms',
    description: 'Backlogged with plan production? We help with ADA, TCP, SWPPP, and general civil drafting.',
    accent: 'from-secondary/20 to-secondary/10',
  },
  {
    icon: Car,
    title: 'Traffic & Safety Consultants',
    description: 'We support traffic control layouts, signing & striping, and related civil drafting tasks.',
    accent: 'from-secondary/10 to-secondary/20',
  },
  {
    icon: HardHat,
    title: 'Contractors',
    description: 'Need updated TCPs, staging plans, or as-built drafting during construction? We can help.',
    accent: 'from-secondary/20 via-secondary/15 to-secondary/20',
  },
  {
    icon: Briefcase,
    title: 'Developers (via their engineers)',
    description: 'We support the engineering firms serving private developers, by accelerating plan set production and revisions.',
    accent: 'from-secondary/10 to-secondary/20',
  },
];

// Animation variants for staggered reveal (matching Eta Marketing style)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier easing
    },
  },
};

export const EngagementModels = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="industries" className="section-spacing bg-background relative" ref={ref}>
      <div className="section-container">
        {/* Who We Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
              Who We Support
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              We provide drafting services for:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {engagementOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="glass-card-hover rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 relative dark:border-border/70"
              >
                
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${option.accent} flex items-center justify-center mb-4 sm:mb-6 border border-secondary/20`}>
                  <option.icon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" strokeWidth={1.5} />
                </div>
                
                <h4 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{option.title}</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

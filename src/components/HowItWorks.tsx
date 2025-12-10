import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, ClipboardList, Users, CheckCircle2 } from 'lucide-react';
import { StickyScroll } from './StickyScroll';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Standards & Setup',
    description: 'We start with your CAD standards & templates, sample project sheets, and layer naming conventions.',
    features: [
      'Your CAD standards & templates',
      'Sample project sheets',
      'Layer naming and annotation styles',
    ],
    note: 'We mirror your look and feel so our drawings blend seamlessly with your work.',
    content: (
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80" 
          alt="Standards & Setup"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    icon: ClipboardList,
    number: '02',
    title: 'Task Intake',
    description: 'You send tasks via email, shared drive, or project management tools.',
    features: [
      'Annotated PDFs / redlines',
      'Marked-up CAD files',
      'Sketches with notes',
      'Scope descriptions',
    ],
    note: 'We accept multiple formats to make task submission easy.',
    content: (
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80" 
          alt="Task Intake"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    icon: Users,
    number: '03',
    title: 'Drafting & QA',
    description: 'Our drafting team produces drawings following your standards with internal QA/QC checks.',
    features: [
      'Produces drawings in Civil 3D / AutoCAD',
      'Follows your standards and instructions',
      'Runs internal QA/QC checks (layer checks, overlaps, missing dimensions)',
    ],
    note: 'Quality checks ensure accuracy before delivery.',
    content: (
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80" 
          alt="Drafting & QA"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    icon: CheckCircle2,
    number: '04',
    title: 'Delivery & Revisions',
    description: 'You receive CAD files and PDFs, with quick revisions to keep your schedule moving.',
    features: [
      'CAD files (.dwg)',
      'PDFs (for review or submittal)',
      'Quick incorporation of minor revisions',
    ],
    note: 'Minor revisions based on your review are incorporated quickly to keep your schedule moving.',
    content: (
      <div className="w-full h-full rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80" 
          alt="Delivery & Revisions"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="section-spacing bg-background relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">How We Work</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 text-foreground">
            How PavePath Integrates With Your Team
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We designed PavePath to feel like an extension of your existing drafting department — not a separate outside vendor.
          </p>
        </motion.div>

        <StickyScroll 
          content={steps}
          contentClassName="bg-gradient-to-br from-muted/50 to-background"
        />
      </div>
    </section>
  );
};

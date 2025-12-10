import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, FileKey, Server, Eye, CheckCircle } from 'lucide-react';

const securityFeatures = [
  {
    icon: FileKey,
    title: 'NDA Protection',
    description: 'Every project is protected under strict non-disclosure agreements.',
  },
  {
    icon: Lock,
    title: 'Encrypted Transfer',
    description: 'AES-256 encryption for all file transfers and communications.',
  },
  {
    icon: Server,
    title: 'Secure Storage',
    description: 'Files stored on enterprise-grade, access-controlled servers.',
  },
  {
    icon: Eye,
    title: 'Access Control',
    description: 'Role-based access ensures only authorized team members see your files.',
  },
];

export const Security = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-spacing bg-background relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.01] to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Security</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
              Your Data,
              <br />
              <span className="text-primary">Fully Protected</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We understand the sensitive nature of engineering documents. Our security 
              protocols ensure your intellectual property remains confidential at every stage.
            </p>
            
            <div className="space-y-4">
              {['SOC 2 compliant infrastructure', 'Regular security audits', 'Employee background checks', 'Automatic file deletion post-project'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  <span className="text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 border border-secondary/20">
                  <feature.icon className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

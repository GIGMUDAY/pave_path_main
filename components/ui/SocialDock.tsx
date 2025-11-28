'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SocialDockProps {
  children: ReactNode;
  className?: string;
}

export default function SocialDock({ children, className = '' }: SocialDockProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {children}
    </div>
  );
}

interface DockIconProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function DockIcon({ children, href, className = '' }: DockIconProps) {
  const content = (
    <motion.div
      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer ${className}`}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ color: '#FFFFFF' }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export function DockSeparator() {
  return (
    <div className="w-px h-8 bg-white/20 mx-1" />
  );
}


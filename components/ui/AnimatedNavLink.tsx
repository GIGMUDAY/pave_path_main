'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedNavLink({ href, children, className = '', onClick }: AnimatedNavLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`relative ${className}`}
        style={{ color: '#2C2C2C' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#1D4E89';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#2C2C2C';
        }}
      >
        <motion.span
          className="block"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
        >
          {children}
        </motion.span>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: '#4CB276' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
}


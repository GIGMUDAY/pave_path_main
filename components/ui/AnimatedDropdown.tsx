'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';

interface AnimatedDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function AnimatedDropdown({ trigger, children, className = '' }: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl py-2 z-50 min-w-[200px]"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(29, 78, 137, 0.1)'
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


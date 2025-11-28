'use client';

import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  hoverEffect = true 
}: AnimatedCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 relative overflow-hidden ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}
      style={{ borderColor: '#A7D6F1' }}
      onMouseEnter={(e) => {
        if (hoverEffect) {
          e.currentTarget.style.borderColor = '#1D4E89';
          e.currentTarget.style.backgroundColor = '#F4F4F4';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverEffect) {
          e.currentTarget.style.borderColor = '#A7D6F1';
          e.currentTarget.style.backgroundColor = '#FFFFFF';
        }
      }}
    >
      {children}
    </div>
  );
}


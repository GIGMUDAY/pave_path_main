import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface BoxRevealProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const BoxReveal: React.FC<BoxRevealProps> = ({
  children,
  color = 'hsl(var(--primary))',
  duration = 0.5,
  delay = 0,
  className,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={containerRef} className={cn('relative inline-block overflow-hidden', className)}>
      <div className="relative z-0">{children}</div>
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: color,
          transform: isRevealed ? 'translateX(100%)' : 'translateX(0%)',
          transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
    </div>
  );
};


'use client';

import { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
}

export default function GradientBackground({ 
  children, 
  className = '',
  colors = ['#1D4E89', '#4CB276', '#A7D6F1']
}: GradientBackgroundProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        backgroundSize: '200% 200%',
        animation: 'gradient 15s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      {children}
    </div>
  );
}


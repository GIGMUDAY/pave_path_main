'use client';

import { ReactNode } from 'react';
import './GlowBorder.css';

interface GlowBorderProps {
  color?: string[];
  borderRadius?: number;
  children: ReactNode;
  className?: string;
}

export default function GlowBorder({
  color = ['#1D4E89', '#4CB276', '#F5B301'],
  borderRadius = 10,
  children,
  className = ''
}: GlowBorderProps) {
  const color1 = color[0] || '#A07CFE';
  const color2 = color[1] || '#FE8FB5';
  const color3 = color[2] || '#FFBE7B';

  return (
    <div 
      className={`glow-border-container ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        '--glow-color-1': color1,
        '--glow-color-2': color2,
        '--glow-color-3': color3,
      } as React.CSSProperties}
    >
      <div className="glow-border-content">
        {children}
      </div>
    </div>
  );
}

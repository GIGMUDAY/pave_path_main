'use client';

import { useEffect, useRef, useState } from 'react';
import './BlurText.css';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters' | 'chars';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

export default function BlurText({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && onAnimationComplete) {
      const totalDuration = animateBy === 'words' 
        ? text.split(' ').length * 100 + delay
        : text.length * 50 + delay;
      
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, text, animateBy, delay, onAnimationComplete]);

  const renderContent = () => {
    if (animateBy === 'words') {
      const words = text.split(' ');
      return words.map((word, index) => (
        <span
          key={index}
          className="blur-text-word"
          data-direction={direction}
          style={{
            animationDelay: `${delay + index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ));
    } else {
      return text.split('').map((char, index) => (
        <span
          key={index}
          className="blur-text-word"
          data-direction={direction}
          style={{
            animationDelay: `${delay + index * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`blur-text-container ${className}`}
    >
      {renderContent()}
    </div>
  );
}

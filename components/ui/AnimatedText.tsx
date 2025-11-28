'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 50,
  style 
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={className} style={style}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}


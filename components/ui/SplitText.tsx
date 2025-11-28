'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; x?: number; y?: number; scale?: number; rotation?: number };
  to?: { opacity?: number; x?: number; y?: number; scale?: number; rotation?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || hasAnimatedRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setIsVisible(true);
            hasAnimatedRef.current = true;
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    
    // Clear previous content
    container.innerHTML = '';
    elementsRef.current = [];

    let elements: HTMLElement[] = [];

    // Split text based on splitType
    if (splitType === 'chars') {
      const chars = text.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        container.appendChild(span);
        elements.push(span);
      });
    } else if (splitType === 'words') {
      const words = text.split(' ');
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        if (index < words.length - 1) {
          const space = document.createTextNode('\u00A0');
          span.appendChild(space);
        }
        container.appendChild(span);
        elements.push(span);
      });
    } else if (splitType === 'lines') {
      const words = text.split(' ');
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        if (index < words.length - 1) {
          const space = document.createTextNode('\u00A0');
          span.appendChild(space);
        }
        container.appendChild(span);
        elements.push(span);
      });
    }

    elementsRef.current = elements;

    // Animate elements
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
    });

    elements.forEach((element, index) => {
      gsap.set(element, from);
      timeline.to(
        element,
        {
          ...to,
          duration,
          ease
        },
        index * (delay / 1000)
      );
    });

    return () => {
      // Cleanup
      elements.forEach((el) => {
        gsap.killTweensOf(el);
      });
    };
  }, [isVisible, text, splitType, delay, duration, ease, from, to, onLetterAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign }}
    >
      {!isVisible && <span style={{ opacity: 0, visibility: 'hidden' }}>{text}</span>}
    </div>
  );
}

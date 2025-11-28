'use client';

import { useEffect, useState } from 'react';
import './Meteor.css';

interface MeteorProps {
  count?: number;
  className?: string;
}

export default function Meteor({ count = 20, className = '' }: MeteorProps) {
  const [meteors, setMeteors] = useState<Array<{
    left: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: count }, () => ({
      left: Math.floor(Math.random() * (400 - -400) + -400),
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2,
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2),
    }));
    setMeteors(newMeteors);
  }, [count]);

  return (
    <>
      {meteors.map((meteor, index) => (
        <span
          key={`meteor-${index}`}
          className={`meteor ${className}`}
          style={{
            top: 0,
            left: `${meteor.left}px`,
            animationDelay: `${meteor.animationDelay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </>
  );
}


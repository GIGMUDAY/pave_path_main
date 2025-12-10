"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CometCardProps {
  children: React.ReactNode;
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
}

export const CometCard: React.FC<CometCardProps> = ({
  children,
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / rect.height) * rotateDepth;
    const rotateY = -(mouseX / rect.width) * rotateDepth;

    const translateX = (mouseX / rect.width) * translateDepth;
    const translateY = (mouseY / rect.height) * translateDepth;

    setTransform({
      rotateX,
      rotateY,
      translateX,
      translateY,
    });
  };

  const handleMouseLeave = () => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      translateX: 0,
      translateY: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        style={{
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateX(${transform.translateX}px) translateY(${transform.translateY}px)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};


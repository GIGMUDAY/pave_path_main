"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlareCard: React.FC<GlareCardProps> = ({ children, className }) => {
  const refElement = useRef<HTMLDivElement>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [state, setState] = useState({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rotateFactor = 0.4;
    const rect = refElement.current?.getBoundingClientRect();
    
    if (rect) {
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      const percentage = {
        x: (100 / rect.width) * position.x,
        y: (100 / rect.height) * position.y,
      };

      const delta = {
        x: percentage.x - 50,
        y: percentage.y - 50,
      };

      setState({
        background: {
          x: 50 + percentage.x / 4 - 12.5,
          y: 50 + percentage.y / 3 - 16.67,
        },
        rotate: {
          x: -(delta.x / 3.5) * rotateFactor,
          y: (delta.y / 2) * rotateFactor,
        },
        glare: {
          x: percentage.x,
          y: percentage.y,
        },
      });
    }
  };

  const handlePointerEnter = () => {
    setIsPointerInside(true);
    setTimeout(() => {
      if (isPointerInside && refElement.current) {
        refElement.current.style.setProperty("--duration", "0s");
      }
    }, 300);
  };

  const handlePointerLeave = () => {
    setIsPointerInside(false);
    if (refElement.current) {
      refElement.current.style.removeProperty("--duration");
      setState((prev) => ({
        ...prev,
        rotate: { x: 0, y: 0 },
      }));
    }
  };

  return (
    <div
      ref={refElement}
      className={cn(
        "duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] container relative isolate w-full transition-transform will-change-transform [contain:layout_style] [perspective:600px]",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        "--m-x": `${state.glare.x}%`,
        "--m-y": `${state.glare.y}%`,
        "--r-x": `${state.rotate.x}deg`,
        "--r-y": `${state.rotate.y}deg`,
        "--bg-x": `${state.background.x}%`,
        "--bg-y": `${state.background.y}%`,
        "--duration": "300ms",
        "--foil-size": "100%",
        "--opacity": "0",
        "--radius": "48px",
        "--easing": "ease",
      } as React.CSSProperties}
    >
      <div
        className="duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] grid h-full origin-center overflow-hidden rounded-lg border border-border transition-transform will-change-transform hover:filter-none hover:[--duration:200ms] hover:[--easing:linear] hover:[--opacity:0.6]"
        style={{
          transform: `rotateY(${state.rotate.x}deg) rotateX(${state.rotate.y}deg)`,
        }}
      >
        <div className="grid size-full mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))] [grid-area:1/1]">
          <div className={cn("size-full bg-card", className)}>
            {children}
          </div>
        </div>
        <div
          className="transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background grid size-full opacity-[var(--opacity)] mix-blend-soft-light transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1]"
          style={{
            background: `radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.8) 10%, rgba(255,255,255,0.65) 20%, rgba(255,255,255,0) 90%)`,
          }}
        />
        <div
          className="will-change-background relative grid size-full opacity-[var(--opacity)] mix-blend-color-dodge transition-opacity [background-blend-mode:hue_hue_hue_overlay] [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:content-[''] after:[background-blend-mode:soft-light,_hue,_hard-light] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-size:var(--foil-size),_200%_400%,_800%,_200%]"
          style={{
            "--step": "5%",
            "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
            "--pattern": "var(--foil-svg) center/100% no-repeat",
            "--rainbow": `repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(var(--step) * 1), rgba(255, 237, 95, 1) calc(var(--step) * 2), rgba(168, 255, 95, 1) calc(var(--step) * 3), rgba(131, 255, 247, 1) calc(var(--step) * 4), rgba(120, 148, 255, 1) calc(var(--step) * 5), rgb(216, 117, 255) calc(var(--step) * 6), rgb(255, 119, 115) calc(var(--step) * 7)) 0% var(--bg-y) / 200% 700% no-repeat`,
            "--diagonal": `repeating-linear-gradient(128deg, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 10%, 60%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%) var(--bg-x) var(--bg-y) / 300% no-repeat`,
            "--shade": `radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255, 255, 255, 0.1) 12%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.25) 120%) var(--bg-x) var(--bg-y) / 300% no-repeat`,
            background: "var(--pattern), var(--rainbow), var(--diagonal), var(--shade)",
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};


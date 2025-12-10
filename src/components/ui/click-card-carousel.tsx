"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CardItem = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  bullets?: string[];
  additionalInfo?: string;
  additionalBullets?: string[];
  fitFor?: string;
};

interface ClickCardCarouselProps {
  cards: CardItem[];
  className?: string;
}

export function ClickCardCarousel({
  cards,
  className = "",
}: ClickCardCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const total = cards.length;
  const current = cards[index];

  function goNext() {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }

  function goPrev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }

  // Keyboard support
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  }

  const variants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Service highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Card container */}
      <div className="relative min-h-[500px] lg:min-h-[600px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.button
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={goNext}
            className="
              absolute inset-0 w-full text-left
              rounded-2xl
              p-6 lg:p-8
              focus:outline-none focus:ring-2 focus:ring-white/40
              hover:shadow-hover
            "
            style={{
              background: 'linear-gradient(135deg, hsl(220 60% 20%) 0%, hsl(220 60% 15%) 100%)',
            }}
            aria-label="Next card"
            title="Click to view next"
          >
            {current.eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-3">
                {current.eyebrow}
              </p>
            )}

            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-primary-foreground mb-4">
              {current.title}
            </h3>

            {current.description && (
              <p className="text-primary-foreground/90 text-sm lg:text-base mb-6 leading-relaxed">
                {current.description}
              </p>
            )}

            {current.bullets?.length && current.additionalInfo && current.additionalBullets?.length ? (
              // Two-column layout for TCP service
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  {current.bullets?.length ? (
                    <ul className="space-y-2">
                      {current.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-primary-foreground">
                          <span className="text-primary-foreground/80 mt-1.5">●</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div>
                  <p className="text-primary-foreground/90 text-sm lg:text-base font-medium mb-2">
                    {current.additionalInfo}
                  </p>
                  {current.additionalBullets?.length ? (
                    <ul className="space-y-2">
                      {current.additionalBullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-primary-foreground">
                          <span className="text-primary-foreground/80 mt-1.5">●</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : (
              // Single column layout for other services
              <>
                {current.bullets?.length ? (
                  <ul className="space-y-2 mb-4">
                    {current.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-primary-foreground">
                        <span className="text-primary-foreground/80 mt-1.5">●</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {current.additionalInfo && (
                  <>
                    <p className="text-primary-foreground/90 text-sm lg:text-base font-medium mb-2 mt-4">
                      {current.additionalInfo}
                    </p>
                    {current.additionalBullets?.length ? (
                      <ul className="space-y-2 mb-4">
                        {current.additionalBullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-primary-foreground">
                            <span className="text-primary-foreground/80 mt-1.5">●</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                )}
              </>
            )}

            {current.fitFor && (
              <div className="mt-6 pt-4 border-t border-primary-foreground/20">
                <p className="text-sm lg:text-base text-primary-foreground/90 leading-relaxed">
                  {current.fitFor}
                </p>
              </div>
            )}

            <div className="mt-6 text-xs text-primary-foreground/60">
              Click card to advance →
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goPrev}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          aria-label="Previous card"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="flex items-center gap-1.5">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted hover:bg-muted-foreground/30"
              }`}
              aria-label={`Go to card ${i + 1}`}
              type="button"
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          aria-label="Next card"
          type="button"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


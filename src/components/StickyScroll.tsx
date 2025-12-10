import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Simple className utility function
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface ContentItem {
  title: string;
  description: string;
  content: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  number?: string;
  image?: string;
  features?: string[];
  note?: string;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

interface ScrollItemProps {
  item: ContentItem;
  index: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
}

const ScrollTextItem = ({ item, index, totalItems, scrollYProgress }: ScrollItemProps) => {
  const cardLength = 1 / totalItems;
  const cardStart = index * cardLength;
  const cardEnd = cardStart + cardLength;

  const textOpacity = useTransform(
    scrollYProgress,
    [
      cardStart - cardLength * 0.5,
      cardStart,
      cardEnd,
      cardEnd + cardLength * 0.5,
    ],
    index === 0 ? [1, 1, 1, 0.3] : [0.3, 1, 1, 0.3]
  );

  const textY = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [50, 0]
  );

  const Icon = item.icon;

  return (
    <motion.div
      className="mb-12 sm:mb-16 lg:mb-40"
      style={{ opacity: textOpacity, y: textY }}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        {item.number && (
          <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary/20">
            {item.number}
          </span>
        )}
        {Icon && (
          <div className="w-10 h-10 sm:w-12 sm:h-14 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-7 text-secondary" strokeWidth={1.5} />
          </div>
        )}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
          {item.title}
        </h2>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4">
        {item.description}
      </p>
      {item.features && item.features.length > 0 && (
        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-secondary mt-1 sm:mt-1.5 flex-shrink-0">●</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      {item.note && (
        <p className="text-xs sm:text-sm text-muted-foreground italic mt-3 sm:mt-4">
          {item.note}
        </p>
      )}
    </motion.div>
  );
};

const ScrollImageItem = ({ item, index, totalItems, scrollYProgress }: ScrollItemProps) => {
  const cardLength = 1 / totalItems;
  const cardStart = index * cardLength;
  const cardEnd = cardStart + cardLength;

  const imageScale = useTransform(
    scrollYProgress,
    [
      cardStart - cardLength * 0.5,
      cardStart,
      cardEnd,
      cardEnd + cardLength * 0.5,
    ],
    [0.8, 1, 1, 0.8]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [
      cardStart - cardLength * 0.5,
      cardStart,
      cardEnd,
      cardEnd + cardLength * 0.5,
    ],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden"
      style={{
        scale: imageScale,
        opacity: imageOpacity,
      }}
    >
      {item.content}
    </motion.div>
  );
};

export const StickyScroll = ({ content, contentClassName }: StickyScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} className="relative w-full">
      {/* Desktop: Sticky scroll layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-10 px-4">
        {/* Left side - Text content */}
        <div className="py-20">
          {content.map((item, index) => (
            <ScrollTextItem
              key={item.title}
              item={item}
              index={index}
              totalItems={content.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Right side - Sticky content */}
        <div className="sticky top-0 h-screen flex items-center">
          <div className={cn('w-full h-[600px] rounded-lg relative', contentClassName)}>
            {content.map((item, index) => (
              <ScrollImageItem
                key={`content-${index}`}
                item={item}
                index={index}
                totalItems={content.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Simple card layout */}
      <div className="lg:hidden space-y-8">
        {content.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border/50 dark:border-border/70 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className={cn('w-full h-[250px] sm:h-[300px] relative overflow-hidden', contentClassName)}>
                {item.content}
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  {item.number && (
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary/20">
                      {item.number}
                    </span>
                  )}
                  {Icon && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" strokeWidth={1.5} />
                    </div>
                  )}
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    {item.title}
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                
                {item.features && item.features.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {item.note && (
                  <p className="text-xs sm:text-sm text-muted-foreground italic mt-4">
                    {item.note}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


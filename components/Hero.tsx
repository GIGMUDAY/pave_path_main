'use client';

import AnimatedButton from '@/components/ui/AnimatedButton';
import SplitText from '@/components/ui/SplitText';

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <section 
      className="relative text-white py-24 lg:py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, rgba(29, 78, 137, 0.85) 0%, rgba(29, 78, 137, 0.75) 50%, rgba(76, 178, 118, 0.8) 100%)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            <SplitText
              text="Expect More."
              className="block mb-2"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <SplitText
              text="Experience Better."
              className="block"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>
          <div className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            <SplitText
              text="At PavePath Design, one of the nation's premier engineering, planning, and design consultants, our professionals are experts in many disciplines yet share one passion: making our clients successful. We combine creative yet practical solutions, a sense of urgency, and a focus on bottom line value to meet your specific project needs."
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
          <div className="mt-8">
            <AnimatedButton href="#" variant="primary">
              Learn More
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

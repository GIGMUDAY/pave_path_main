'use client';

import AnimatedButton from '@/components/ui/AnimatedButton';
import SplitText from '@/components/ui/SplitText';

export default function JoinTeam() {
  const handleAnimationComplete = () => {
    console.log('Join Team animation completed!');
  };

  return (
    <section className="py-16 text-white" style={{ backgroundColor: '#1D4E89' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          <SplitText
            text="Join Our Team"
            className="text-3xl font-bold"
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
        </h2>
        <div className="text-xl mb-8 max-w-3xl mx-auto">
          <SplitText
            text="Looking for a terrific place to build your career? Explore the many reasons our team members consistently rate PavePath Design a great place to work."
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <AnimatedButton href="#" variant="primary">
            View Open Positions
          </AnimatedButton>
          <AnimatedButton href="#" variant="outline">
            Watch Our Video
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

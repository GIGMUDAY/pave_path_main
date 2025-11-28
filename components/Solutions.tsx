'use client';

import Link from 'next/link';
import AnimatedCard from '@/components/ui/AnimatedCard';
import SplitText from '@/components/ui/SplitText';
import Meteor from '@/components/ui/Meteor';

export default function Solutions() {
  const solutions = [
    'DRIVE',
    'Kadence',
    'KITS',
    'PublicCoordinate',
    'PV Tune',
    'SMARTS',
    'Traction Connect',
    'Traction Live',
    'Traction Metrics',
    'Traction Priority',
    'Traction Travel',
    'TREDLite VMT',
    'XAK-PACK'
  ];

  return (
    <section 
      className="relative py-16 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, rgba(29, 78, 137, 0.85) 0%, rgba(29, 78, 137, 0.75) 50%, rgba(76, 178, 118, 0.8) 100%)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-lg">
          <SplitText
            text="Solutions"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <Link key={solution} href="#">
              <div 
                className="rounded-lg shadow-md p-6 transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:-translate-y-1 text-center h-full border border-white/20"
                style={{
                  background: 'rgba(10, 14, 39, 0.7)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Meteor count={20} />
                <h3 className="font-semibold text-lg relative z-10 text-white drop-shadow-md">
                  <SplitText
                    text={solution}
                    className="font-semibold text-lg"
                    delay={50 + index * 20}
                    duration={0.5}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-50px"
                    textAlign="center"
                  />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

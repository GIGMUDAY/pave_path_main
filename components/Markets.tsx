'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import GlowBorder from '@/components/ui/GlowBorder';
import SplitText from '@/components/ui/SplitText';

export default function Markets() {
  const publicInfrastructure = [
    { name: 'Aviation / Aerospace', link: '#' },
    { name: 'Education / Institutions', link: '#' },
    { name: 'Energy', link: '#' },
    { 
      name: 'Government', 
      link: '#',
      submenu: ['City / Municipal', 'County', 'Federal / Defense & Intelligence', 'State']
    },
    { name: 'Parks & Recreation', link: '#' },
    { name: 'Ports & Maritime', link: '#' },
    { name: 'Transit & Rail', link: '#' },
    { name: 'Water', link: '#' }
  ];

  const privateDevelopment = [
    'Data Centers & Mission Critical Facilities',
    'Education / Institutions',
    'Energy',
    'Healthcare',
    'Hospitality / Resorts',
    'Industrial Distribution / Warehouses',
    'Mixed-Use Development',
    'Office / Corporate',
    'Residential',
    'Retail',
    'Sports & Entertainment',
    'Telecommunications',
    'Water'
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#2C2C2C' }}>
          <SplitText
            text="Markets"
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
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Public Infrastructure */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <GlowBorder
              color={['#1D4E89', '#4CB276', '#F5B301']}
              borderRadius={10}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-6 h-full">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1D4E89' }}>
                <SplitText
                  text="Public Infrastructure"
                  className="text-2xl font-semibold"
                  delay={200}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, x: -40 }}
                  to={{ opacity: 1, x: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </h3>
              <ul className="space-y-2">
                {publicInfrastructure.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    {item.submenu ? (
                      <div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                          <Link href={item.link} className="font-semibold transition-colors inline-block" style={{ color: '#1D4E89' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#4CB276'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#1D4E89'}>
                            {item.name} →
                          </Link>
                        </motion.div>
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((sub, subIdx) => (
                            <motion.li 
                              key={subIdx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: (idx * 0.05) + (subIdx * 0.03), duration: 0.3 }}
                            >
                              <motion.div
                                whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                className="rounded px-2 py-1"
                              >
                                <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                                  {sub}
                                </Link>
                              </motion.div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Link href={item.link} className="transition-colors block" style={{ color: '#2C2C2C' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}>
                          {item.name}
                        </Link>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="mt-4"
              >
                <Link
                  href="#"
                  className="inline-block font-semibold transition-colors relative group"
                  style={{ color: '#1D4E89' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4CB276'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#1D4E89'}
                >
                  Explore Government →
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ backgroundColor: '#4CB276' }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              </div>
            </GlowBorder>
          </motion.div>

          {/* Private Development */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <GlowBorder
              color={['#1D4E89', '#4CB276', '#F5B301']}
              borderRadius={10}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-6 h-full">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: '#1D4E89' }}>
                <SplitText
                  text="Private Development"
                  className="text-2xl font-semibold"
                  delay={200}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, x: 40 }}
                  to={{ opacity: 1, x: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </h3>
              <ul className="space-y-2">
                {privateDevelopment.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="rounded px-2 py-1"
                    >
                      <Link href="#" className="transition-colors block" style={{ color: '#2C2C2C' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}>
                        {item}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="mt-4"
              >
                <Link
                  href="#"
                  className="inline-block font-semibold transition-colors relative group"
                  style={{ color: '#1D4E89' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4CB276'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#1D4E89'}
                >
                  Learn More →
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ backgroundColor: '#4CB276' }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              </div>
            </GlowBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

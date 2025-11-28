'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const markets = {
    'Public Infrastructure': [
      { name: 'Aviation / Aerospace', link: '#' },
      { name: 'Education / Institutions', link: '#' },
      { name: 'Energy', link: '#' },
      { 
        name: 'Government', 
        link: '#',
        submenu: [
          'City / Municipal',
          'County',
          'Federal / Defense & Intelligence',
          'State'
        ]
      },
      { name: 'Parks & Recreation', link: '#' },
      { name: 'Ports & Maritime', link: '#' },
      { name: 'Transit & Rail', link: '#' },
      { name: 'Water', link: '#' }
    ],
    'Private Development': [
      { name: 'Data Centers & Mission Critical Facilities', link: '#' },
      { name: 'Education / Institutions', link: '#' },
      { name: 'Energy', link: '#' },
      { name: 'Healthcare', link: '#' },
      { name: 'Hospitality / Resorts', link: '#' },
      { name: 'Industrial', link: '#' },
      { name: 'Life Science', link: '#' },
      { name: 'Mixed-Use Development', link: '#' },
      { name: 'Office / Corporate', link: '#' },
      { name: 'Ports & Maritime', link: '#' },
      { name: 'Residential', link: '#' },
      { name: 'Retail', link: '#' },
      { name: 'Sports & Entertainment', link: '#' },
      { name: 'Telecommunications', link: '#' },
      { name: 'Water', link: '#' }
    ]
  };

  const services = [
    'Aviation',
    'Community Planning',
    'Development Management',
    'Development Services',
    'Energy',
    'Environmental',
    'Forensics & Structural Restoration Services',
    'Grants & Funding',
    'Landscape Architecture',
    'Land Surveying',
    'Mechanical, Electrical, & Plumbing',
    'Parking',
    'Pavement & Asset Management',
    'Resilience',
    'Roadway & Bridge',
    'SAFETY Act Designated TMCS',
    'Streetscape, Landscape, & Irrigation',
    'Structural',
    'Surface Water',
    'Sustainability Consulting & Design',
    'Technology & Software',
    'Transit & Rail',
    'Transportation & Traffic',
    'Transportation Systems Management & Operations',
    'Urban Design',
    'Water & Wastewater'
  ];

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

  const projects = [
    'Project Spotlights',
    'Project Snapshots'
  ];

  const newsInsights = [
    'Perspectives',
    'Awards',
    'In the Media',
    'PavePath Design Corner'
  ];

  const aboutUs = [
    'Why PavePath Design?',
    'Our People',
    'Diversity & Inclusion',
    'Veterans',
    'Client Service',
    'Safety',
    'Responsibility Report',
    'Sustainability',
    'International Projects',
    'Community Involvement',
    'Industry Involvement',
    'Trending @PavePath Design'
  ];

  const careers = [
    'Careers Home',
    'Apply Now',
    'Benefits',
    'Professional Development'
  ];

  const contact = [
    'Contact Us',
    'Locations',
    'Talk to Our Experts',
    'Third-Party Recruiters'
  ];

  return (
    <motion.nav 
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold" style={{ color: '#1D4E89' }}>
              PavePath Design
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:space-x-8">
            {/* Markets */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('markets')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Markets
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'markets' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'markets' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-[600px] bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: '#2C2C2C' }}>Public Infrastructure</h3>
                        <ul className="space-y-1">
                          {markets['Public Infrastructure'].map((item, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              {item.submenu ? (
                                <div className="group">
                                  <Link href={item.link} className="text-sm block py-1 transition-colors font-semibold" style={{ color: '#1D4E89' }}>
                                    {item.name} →
                                  </Link>
                                  <ul className="ml-4 mt-1 space-y-1">
                                    {item.submenu.map((sub, subIdx) => (
                                      <li key={subIdx}>
                                        <motion.div
                                          whileHover={{ x: 5 }}
                                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        >
                                          <Link href="#" className="text-sm block py-1 transition-colors" style={{ color: '#6B7280' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                                            {sub}
                                          </Link>
                                        </motion.div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                  <Link href={item.link} className="text-sm block py-1 transition-colors" style={{ color: '#6B7280' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                                    {item.name}
                                  </Link>
                                </motion.div>
                              )}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: '#2C2C2C' }}>Private Development</h3>
                        <ul className="space-y-1">
                          {markets['Private Development'].map((item, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                              >
                                <Link href={item.link} className="text-sm block py-1 transition-colors" style={{ color: '#6B7280' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                                  {item.name}
                                </Link>
                              </motion.div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Services
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'services' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-1 z-50 max-h-96 overflow-y-auto"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {services.map((service, idx) => (
                        <motion.li 
                          key={service}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {service}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('solutions')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Solutions
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'solutions' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {solutions.map((solution, idx) => (
                        <motion.li 
                          key={solution}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {solution}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('projects')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'projects' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {projects.map((project, idx) => (
                        <motion.li 
                          key={project}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {project}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* News & Insights */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('news')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                News & Insights
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'news' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'news' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {newsInsights.map((item, idx) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {item}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('about')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                About Us
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'about' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-50 max-h-96 overflow-y-auto"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {aboutUs.map((item, idx) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {item}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Careers */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('careers')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Careers
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'careers' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'careers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {careers.map((item, idx) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {item}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('contact')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <motion.button 
                className="px-3 py-2 text-sm font-medium relative"
                style={{ color: '#2C2C2C' }}
                whileHover={{ color: '#1D4E89' }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#4CB276' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: openDropdown === 'contact' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(29, 78, 137, 0.1)'
                    }}
                  >
                    <ul className="py-2">
                      {contact.map((item, idx) => (
                        <motion.li 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(29, 78, 137, 0.05)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="rounded px-4 py-2"
                          >
                            <Link href="#" className="text-sm block transition-colors" style={{ color: '#6B7280' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                              {item}
                            </Link>
                          </motion.div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              style={{ color: '#2C2C2C' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Markets', 'Services', 'Solutions', 'Projects', 'News & Insights', 'About Us', 'Careers', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href="#" className="block px-3 py-2 transition-colors" style={{ color: '#2C2C2C' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1D4E89'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}>
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

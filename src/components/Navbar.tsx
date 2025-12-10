import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { 
    label: 'Services', 
    href: '#services',
    submenu: [
      { label: 'Civil & Transportation Drafting', href: '#services' },
      { label: 'ADA Curb Ramp Drafting', href: '#services' },
      { label: 'Traffic Control Plan Drafting', href: '#services' },
      { label: 'SWPPP & Erosion Control Drafting', href: '#services' },
      { label: 'Plan Set Cleanup & Organization', href: '#services' },
    ]
  },
  { label: 'How We Work', href: '#how-it-works' },
  { label: 'Who We Support', href: '#industries' },
  { label: 'About PavePath', href: '#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const currentScroll = window.scrollY || window.pageYOffset;
      setScrollPosition(currentScroll);
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${currentScroll}px`;
    } else {
      // Restore scroll position
      const savedScroll = scrollPosition;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      // Use requestAnimationFrame to ensure styles are reset before scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, savedScroll);
      });
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    // Close menu first
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
    
    // Wait for menu to close and body to reset
    setTimeout(() => {
      if (href === '#') {
        // If not on home page, navigate first
        if (location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (href.startsWith('/')) {
        // Handle route navigation
        navigate(href);
      } else {
        // Handle anchor links - check if we're on home page
        const isOnHomePage = location.pathname === '/';
        
        if (!isOnHomePage) {
          // Navigate to home page first, then scroll to section
          navigate('/');
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              const yOffset = -80; // Offset for fixed navbar
              const rect = element.getBoundingClientRect();
              const absoluteElementTop = rect.top + window.pageYOffset;
              const offsetPosition = absoluteElementTop + yOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 300);
        } else {
          // Already on home page, just scroll
          const element = document.querySelector(href);
          if (element) {
            // Wait a bit more to ensure body styles are reset
            setTimeout(() => {
              const yOffset = -80; // Offset for fixed navbar
              const rect = element.getBoundingClientRect();
              const absoluteElementTop = rect.top + window.pageYOffset;
              const offsetPosition = absoluteElementTop + yOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 50);
          }
        }
      }
    }, 200);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-white dark:bg-background ${
        isScrolled 
          ? 'shadow-md' 
          : ''
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-22"> {/* Responsive height */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2" onClick={(e) => { e.preventDefault(); scrollToSection('#'); }}>
            <img 
              src="/pave_logo.jpg" 
              alt="pavepathdesign" 
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
            <span className="font-display font-bold text-base sm:text-lg lg:text-xl text-foreground dark:text-foreground">
              pavepathdesign<span className="text-secondary dark:text-secondary">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground/90 dark:text-foreground/90 hover:text-foreground dark:hover:text-foreground font-medium text-sm transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {/* Submenu dropdown - can be added later if needed */}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`text-foreground/90 dark:text-foreground/90 hover:text-foreground dark:hover:text-foreground font-medium text-sm transition-colors ${
                    activeSection === item.href.substring(1) ? 'text-foreground dark:text-foreground' : ''
                  }`}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA Button - Green background, white text */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden lg:flex items-center px-6 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-[6px] hover:bg-secondary/90 transition-colors text-sm"
            >
              Start Free Pilot
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-foreground dark:text-foreground touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/60 dark:bg-[hsl(220_60%_25%)]/60 backdrop-blur-md z-[9998]"
              style={{ 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                position: 'fixed',
                zIndex: 9998
              }}
            />
            {/* Left sidebar menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 bg-primary dark:bg-[hsl(220_60%_25%)] border-r border-primary/20 shadow-2xl overflow-y-auto w-full sm:w-[90%] md:w-[85%] lg:w-[400px] max-w-[400px]"
              style={{ 
                height: '100vh',
                position: 'fixed',
                zIndex: 9999
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary/20">
                <h2 className="text-primary-foreground text-lg sm:text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-foreground hover:text-primary-foreground/80 transition-colors p-2 touch-manipulation"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col">
                {navItems.map((item, index) => (
                  <div key={item.href}>
                    {item.submenu ? (
                      <div>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="w-full text-left text-primary-foreground hover:bg-primary/80 transition-colors py-4 px-4 sm:px-6 flex items-center justify-between border-b border-primary/20 touch-manipulation min-h-[48px]"
                      >
                        <span className="text-base sm:text-base">{item.label}</span>
                        {openSubmenu === item.label ? (
                          <ChevronUp size={18} className="text-primary-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-primary-foreground flex-shrink-0" />
                        )}
                      </button>
                        <AnimatePresence>
                          {openSubmenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-primary/30"
                            >
                              {item.submenu.map((subItem) => (
                                <button
                                  key={subItem.href}
                                  onClick={() => scrollToSection(subItem.href)}
                                  className="w-full text-left text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/50 transition-colors py-3 px-4 sm:px-6 pl-8 sm:pl-12 text-sm border-b border-primary/20 touch-manipulation min-h-[44px]"
                                >
                                  {subItem.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left text-primary-foreground hover:bg-primary/80 transition-colors py-4 px-4 sm:px-6 border-b border-primary/20 touch-manipulation min-h-[48px]"
                      >
                        <span className="text-base sm:text-base">{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

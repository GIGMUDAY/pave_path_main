import { Linkedin, Twitter, Mail, Phone, MessageCircle, Send } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 dark:border-border/50 bg-white dark:bg-background text-foreground dark:text-foreground">
      <div className="section-container py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img 
                src="/pave_logo.jpg" 
                alt="pavepathdesign" 
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-foreground dark:text-foreground">
                pavepathdesign<span className="text-secondary">.</span>
              </span>
            </a>
            <p className="text-foreground/80 dark:text-foreground/80 text-sm mb-6">
              Engineering design services built for speed. 
              From urgent redlines to full project support.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/pavepathdesign/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-foreground/10 dark:bg-card/30 flex items-center justify-center hover:bg-secondary transition-colors text-foreground dark:text-foreground hover:text-secondary-foreground dark:hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com/PavePathdesign" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-foreground/10 dark:bg-card/30 flex items-center justify-center hover:bg-secondary transition-colors text-foreground dark:text-foreground hover:text-secondary-foreground dark:hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me/PavePathdesign" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-foreground/10 dark:bg-card/30 flex items-center justify-center hover:bg-secondary transition-colors text-foreground dark:text-foreground hover:text-secondary-foreground dark:hover:text-foreground"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground dark:text-foreground">Services</h4>
            <ul className="space-y-3">
              {['Drafting & Design', '3D Modeling & BIM', 'Redline Processing', 'Engineering Support'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-foreground/70 dark:text-foreground/70 hover:text-secondary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground dark:text-foreground">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Case Studies', href: '#' },
                { label: 'Careers', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-foreground/70 dark:text-foreground/70 hover:text-secondary transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground dark:text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-foreground/80 dark:text-foreground/80">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="mailto:info@pavepathdesign.com" className="hover:text-secondary transition-colors">
                  info@pavepathdesign.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/80 dark:text-foreground/80">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="tel:+16503092685" className="hover:text-secondary transition-colors">
                  +1 650 309 2685
                </a>
                <a 
                  href="https://wa.me/16503092685" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 hover:scale-110 transition-transform"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-secondary" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 dark:border-border/50 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black dark:text-foreground/70">
            © {currentYear} pavepathdesign. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-black dark:text-foreground/70 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-black dark:text-foreground/70 hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

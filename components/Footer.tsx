'use client';

import Link from 'next/link';
import SocialDock, { DockIcon, DockSeparator } from '@/components/ui/SocialDock';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="text-gray-300" style={{ backgroundColor: '#2C2C2C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Markets */}
          <div>
            <h3 className="text-white font-semibold mb-4">Markets</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Public Infrastructure</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Private Development</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Aviation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community Planning</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Engineering</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Transportation</Link></li>
            </ul>
          </div>

          {/* News & Insights */}
          <div>
            <h3 className="text-white font-semibold mb-4">News & Insights</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Perspectives</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">PavePath Design Corner</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">In the Media</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Awards</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Why PavePath Design?</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Why Hire Us?</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Client Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Why Join Us?</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Why Partner With Us?</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Trending @PavePath Design</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community Involvement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Awards & Recognition</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">News & Insights</Link></li>
            </ul>
          </div>

          {/* Follow Us Section with Social Dock */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <SocialDock>
              <DockIcon href="https://github.com" className="hover:bg-white/20">
                <FaGithub className="w-6 h-6" />
              </DockIcon>
              <DockSeparator />
              <DockIcon href="https://linkedin.com" className="hover:bg-white/20">
                <FaLinkedin className="w-6 h-6" />
              </DockIcon>
              <DockIcon href="https://twitter.com" className="hover:bg-white/20">
                <FaTwitter className="w-6 h-6" />
              </DockIcon>
              <DockIcon href="https://facebook.com" className="hover:bg-white/20">
                <FaFacebook className="w-6 h-6" />
              </DockIcon>
              <DockIcon href="https://instagram.com" className="hover:bg-white/20">
                <FaInstagram className="w-6 h-6" />
              </DockIcon>
              <DockIcon href="https://youtube.com" className="hover:bg-white/20">
                <FaYoutube className="w-6 h-6" />
              </DockIcon>
            </SocialDock>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8" style={{ borderTop: '1px solid #6B7280' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
                  <p>© Copyright 2025 PavePath Design and Associates, Inc. All Rights Reserved.</p>
              <p className="mt-2">Non-Discrimination (No Discriminación)</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Site Map</Link>
              <Link href="#" className="hover:text-white transition-colors">Employee Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

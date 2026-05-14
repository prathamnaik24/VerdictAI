'use client';

import { Container } from '../common/Container';
import { GoldDivider } from '../common/GoldDivider';
import { Mail, Link, Share2 } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Case Studies', 'Security'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Resources: ['Documentation', 'API Docs', 'Community', 'Support'],
};

export function Footer() {
  return (
    <footer className="bg-navy text-offwhite border-t border-gold/20">
      <Container className="py-16 md:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <GoldDivider width="small" className="mb-4" />
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-offwhite mb-2">
                VerdictAI
              </h3>
              <p className="text-offwhite/70 text-sm leading-relaxed">
                AI-powered legal analysis platform helping advocates, corporate
                counsel, and litigation teams evaluate case strength with
                unprecedented accuracy.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-3 bg-charcoal rounded-lg text-offwhite/60 hover:text-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Link className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-charcoal rounded-lg text-offwhite/60 hover:text-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-charcoal rounded-lg text-offwhite/60 hover:text-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-offwhite mb-6 uppercase tracking-widest opacity-70">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-offwhite/60 hover:text-gold transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <GoldDivider width="full" className="mb-8 opacity-20" />

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Copyright */}
          <div className="text-sm text-offwhite/60 text-center md:text-left">
            <p>© {new Date().getFullYear()} VerdictAI. All rights reserved.</p>
          </div>

          {/* Legal links */}
          <div className="flex gap-6 justify-center text-sm text-offwhite/60">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Cookies
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-offwhite/50 text-center md:text-right leading-relaxed">
            <p>
              VerdictAI is not a substitute for professional legal advice. Always
              consult qualified attorneys.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

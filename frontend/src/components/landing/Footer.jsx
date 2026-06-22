import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiOutlineGlobeAlt,
  HiOutlineCog6Tooth,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube,
  FaDiscord 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { name: 'Resume Builder', href: '#' },
        { name: 'Portfolio Generator', href: '#' },
        { name: 'Templates', href: '#templates' },
        { name: 'Pricing', href: '#' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Community', href: '#' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' },
      ],
    },
  };

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaDiscord, href: '#', label: 'Discord' },
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      style={{ 
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1.5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Devfolio</span>
                <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>
                  AI
                </span>
              </h2>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                Build your resume and portfolio website in minutes. 
                The all-in-one platform for professionals.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -3,
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 + 0.1 }}
            >
              <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#6366f1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-6 border-t flex flex-col items-center gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* ─── DIGITAL HEROES BUTTON ─── */}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md"
          >
            Built for Digital Heroes
          </a>

          {/* ─── CREATOR DETAILS ─── */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
              Created by <span className="font-medium text-gray-700 dark:text-gray-300">Akshata Jondhale</span> &middot; 
              <a 
                href="mailto:akshatajondhale@gmail.com" 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-1"
              >
                akshatajondhale@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {currentYear} Devfolio AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>Made with ❤️</span>
              <span>•</span>
              <span>v1.0.0</span>
              <span>•</span>
              <a 
                href="#" 
                className="hover:text-brand-500 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                Status
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
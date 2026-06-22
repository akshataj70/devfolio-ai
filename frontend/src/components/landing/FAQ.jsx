import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';

const FAQ_ITEMS = [
  {
    question: 'Is Devfolio AI really free to use?',
    answer:
      'Yes! Devfolio AI offers a generous free tier that includes unlimited resume creation, one portfolio website, and all core features. Premium plans are available for advanced features like custom domains and unlimited portfolios.',
  },
  {
    question: 'Can I use my own custom domain?',
    answer:
      'Absolutely! With our Pro plan, you can connect your own custom domain to your portfolio website. This makes your portfolio look even more professional and personal.',
  },
  {
    question: 'How does the resume to portfolio sync work?',
    answer:
      'Devfolio AI automatically keeps your resume and portfolio in sync. When you update your skills, experience, or projects in the resume builder, your portfolio updates instantly. No duplicate work required!',
  },
  {
    question: 'What file formats can I export?',
    answer:
      'You can export your resume as PDF, your portfolio as a complete HTML website, or download everything as a ZIP file. Your portfolio can also be published to a live URL instantly.',
  },
  {
    question: 'Can I upload an existing resume PDF?',
    answer:
      'Yes! Devfolio AI can parse your existing resume PDF and extract all the information automatically. Simply upload your PDF and we\'ll populate your resume template in seconds.',
  },
  {
    question: 'Is my data secure and private?',
    answer:
      'Absolutely. We take data security seriously. All your data is encrypted, and we never share your information with third parties. You can delete your account and data at any time.',
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-gray-200 dark:border-gray-700 last:border-0"
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className="font-heading font-semibold text-base sm:text-lg pr-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
              : 'var(--bg-secondary)',
            border: '1px solid var(--border)',
          }}
        >
          {isOpen ? (
            <HiOutlineMinus className="w-4 h-4 text-white" />
          ) : (
            <HiOutlinePlus className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8">
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Section dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </>
          }
          subtitle="Everything you need to know about Devfolio AI. Can't find what you're looking for? Feel free to reach out!"
          align="center"
          className="mb-12 lg:mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleItem(index)}
                index={index}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              Still have questions?{' '}
              <a
                href="#"
                className="font-semibold transition-colors hover:underline"
                style={{ color: '#6366f1' }}
              >
                Contact Support
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative flex items-center justify-between">
        
        {/* ================= DESKTOP LEFT: Navigation Links Capsule ================= */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 p-1.5 px-3 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-[0_4px_20px_-4px_rgba(2,6,23,0.35)]"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/80 transition-all duration-150 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ================= DESKTOP CENTER: Brand Identity Logo ================= */}
        <a
          href="#"
          className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg py-1 group"
          aria-label="Mohammed Qais — Portfolio Home"
        >
          <img
            src="/images/mq-logo.png"
            alt="Mohammed Qais Logo"
            className="h-7 xl:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </a>

        {/* ================= DESKTOP RIGHT: Standalone 'Let's Talk' Button ================= */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-[13px] font-bold hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-95 shadow-md shadow-violet-500/20 group overflow-hidden"
          >
            {/* Top Gloss Arc */}
            <span className="absolute inset-x-2 top-0.5 h-[45%] rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
            <span className="relative z-10 tracking-tight">Let's Talk</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* ================= MOBILE VIEW (LOGO ON LEFT, HAMBURGER ON RIGHT) ================= */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <a
            href="#"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg py-1 group"
            aria-label="Mohammed Qais — Portfolio Home"
          >
            <img
              src="/images/mq-logo.png"
              alt="Mohammed Qais Logo"
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE: Drawer Menu ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden rounded-2xl mt-2 border border-slate-800/90 bg-slate-950/95 backdrop-blur-md px-4 pt-3 pb-5 shadow-xl shadow-slate-950/30"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-800/80">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all shadow-xs shadow-violet-500/20"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


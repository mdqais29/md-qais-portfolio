import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { EXPERIENCE_SECTION_DATA, EXPERIENCE_LIST, ExperienceItem } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="experience" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-0.5 bg-violet-600 rounded-full" />
            <span className="text-xs font-bold tracking-widest text-slate-900 uppercase">
              {EXPERIENCE_SECTION_DATA.label}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-2.5">
            <span>{EXPERIENCE_SECTION_DATA.headingPrefix}</span>
            <span className="text-violet-600">{EXPERIENCE_SECTION_DATA.headingHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl leading-relaxed">
            {EXPERIENCE_SECTION_DATA.description}
          </p>
        </div>

        {/* ================= TIMELINE TRACK ================= */}
        <div className="relative">
          {/* Continuous Connecting Line for Desktop */}
          <div 
            className="hidden lg:block absolute top-[19px] left-[32px] right-[32px] h-[2px] bg-slate-300 z-0" 
            aria-hidden="true" 
          />

          {/* Continuous Connecting Line for Mobile / Tablet */}
          <div 
            className="lg:hidden absolute top-4 bottom-4 left-[19px] w-[2px] bg-slate-300 z-0" 
            aria-hidden="true" 
          />

          {/* Experience Grid / List */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-5 relative z-10">
            {EXPERIENCE_LIST.map((item: ExperienceItem, index: number) => (
              <motion.div
                key={item.id}
                {...fadeIn}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative flex flex-col pl-12 lg:pl-0"
              >
                {/* Node Indicator + Step */}
                <div className="flex lg:flex-row items-center gap-3 mb-3.5 lg:mb-4">
                  {/* Step Circle Badge */}
                  <div className="absolute left-0 lg:relative w-10 h-10 rounded-full bg-white border-2 border-slate-400 group-hover:border-violet-600 group-hover:bg-violet-50 transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm z-10">
                    <span className="text-xs font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Period Label */}
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-violet-100 group-hover:text-violet-900 px-2.5 py-1 rounded-full border border-slate-300 transition-colors">
                    {item.period}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-base font-bold text-slate-950 group-hover:text-violet-700 transition-colors leading-snug mb-1">
                  {item.role}
                </h3>

                {/* Organization & Location */}
                <div className="flex flex-col text-xs text-slate-700 font-semibold mb-2.5 gap-0.5">
                  <span className="text-slate-900 font-bold">{item.organization}</span>
                  {item.location && (
                    <span className="text-slate-600 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-slate-700 shrink-0" />
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 font-normal leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;

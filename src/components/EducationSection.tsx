import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { 
  EDUCATION_SECTION_DATA, 
  EDUCATION_LIST, 
  CERTIFICATIONS_LIST,
  EducationItem,
  CertificationItem 
} from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="certificates" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-0.5 bg-violet-600 rounded-full" />
            <span className="text-xs font-bold tracking-widest text-slate-900 uppercase">
              {EDUCATION_SECTION_DATA.label}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-2.5">
            <span>{EDUCATION_SECTION_DATA.headingPrefix}</span>
            <span className="text-violet-600">{EDUCATION_SECTION_DATA.headingHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl leading-relaxed">
            {EDUCATION_SECTION_DATA.description}
          </p>
        </div>

        {/* ================= 2-COLUMN BALANCED LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ================= LEFT COLUMN: EDUCATION (5 COLS) ================= */}
          <motion.div 
            {...fadeIn}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-300">
              <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 border border-violet-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                Education
              </h3>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-8">
              {/* Continuous vertical line */}
              <div 
                className="absolute left-[9px] sm:left-[11px] top-3 bottom-4 w-[2px] bg-violet-300"
                aria-hidden="true" 
              />

              {EDUCATION_LIST.map((edu: EducationItem) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline Dot Node */}
                  <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-violet-600 ring-4 ring-violet-100 group-hover:scale-125 transition-transform" />

                  {/* Education Card Content */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm hover:border-violet-500 transition-all duration-200">
                    <h4 className="text-base font-bold text-slate-950 group-hover:text-violet-700 transition-colors leading-snug mb-1">
                      {edu.degree}
                    </h4>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                      {edu.institution}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-600 shrink-0" />
                        {edu.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-600 shrink-0" />
                        {edu.period}
                      </span>
                    </div>

                    {/* Grade Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 text-violet-900 text-xs font-bold border border-violet-300">
                      <span>{edu.gradeLabel}:</span>
                      <span className="text-violet-950 font-extrabold">{edu.gradeValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: CERTIFICATIONS (7 COLS) ================= */}
          <motion.div 
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-300">
              <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 border border-violet-200">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                Certifications & Achievements
              </h3>
            </div>

            {/* List of 7 Certifications */}
            <div className="flex flex-col space-y-3">
              {CERTIFICATIONS_LIST.map((cert: CertificationItem) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-300 shadow-sm hover:border-violet-500 hover:bg-violet-50/30 transition-all duration-200 flex items-start gap-3.5 group"
                >
                  {/* Number Badge */}
                  <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-800 font-extrabold text-xs flex items-center justify-center shrink-0 border border-violet-300 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    {cert.number}
                  </div>

                  {/* Cert Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-bold text-slate-950 group-hover:text-violet-800 transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md self-start shrink-0">
                        {cert.issuer}
                      </span>
                    </div>

                    {cert.detail && (
                      <p className="text-xs text-violet-800 font-bold mt-1">
                        ★ {cert.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default EducationSection;

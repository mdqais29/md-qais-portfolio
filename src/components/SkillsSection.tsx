import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Zap, 
  PenTool, 
  Briefcase, 
  CheckCircle2, 
  Compass,
  Sparkles
} from 'lucide-react';
import { 
  SKILLS_SECTION_DATA, 
  ESTABLISHED_SKILL_CATEGORIES, 
  LEARNING_CATEGORY,
  SkillCategory 
} from '../data/portfolioData';

// Helper to map icon names to Lucide icons
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return <Code2 className="w-5 h-5 text-violet-600" />;
    case 'brain':
      return <Brain className="w-5 h-5 text-violet-600" />;
    case 'zap':
      return <Zap className="w-5 h-5 text-violet-600" />;
    case 'pen-tool':
      return <PenTool className="w-5 h-5 text-violet-600" />;
    case 'briefcase':
      return <Briefcase className="w-5 h-5 text-violet-600" />;
    case 'check-circle':
      return <CheckCircle2 className="w-5 h-5 text-violet-600" />;
    case 'compass':
      return <Compass className="w-5 h-5 text-indigo-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-violet-600" />;
  }
};

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="skills" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-0.5 bg-violet-600 rounded-full" />
            <span className="text-xs font-bold tracking-widest text-slate-900 uppercase">
              {SKILLS_SECTION_DATA.label}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-2.5">
            <span>{SKILLS_SECTION_DATA.headingPrefix}</span>
            <span className="text-violet-600">{SKILLS_SECTION_DATA.headingHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            {SKILLS_SECTION_DATA.description}
          </p>
        </div>

        {/* ================= ESTABLISHED SKILLS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ESTABLISHED_SKILL_CATEGORIES.map((category: SkillCategory, index: number) => (
            <motion.div
              key={category.id}
              {...fadeIn}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="bg-white rounded-2xl p-6 border border-slate-300 shadow-sm hover:border-violet-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon + Category Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center border border-violet-200 group-hover:bg-violet-200/70 group-hover:scale-105 transition-all">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-slate-950 group-hover:text-violet-700 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg border border-slate-300 hover:bg-violet-50 hover:text-violet-900 hover:border-violet-300 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= LEARNING & EXPLORING (VISUALLY SEPARATE) ================= */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-violet-100/70 via-indigo-50/60 to-purple-100/60 rounded-2xl p-6 sm:p-7 border border-dashed border-violet-300 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-300 shrink-0">
                {getCategoryIcon(LEARNING_CATEGORY.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-950">
                    {LEARNING_CATEGORY.title}
                  </h3>
                  <span className="text-[11px] font-bold text-indigo-900 bg-indigo-200/80 px-2 py-0.5 rounded-full border border-indigo-300">
                    Active Focus
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-0.5">
                  Technologies, libraries, and platforms currently exploring and integrating into active workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Learning Pills */}
          <div className="flex flex-wrap gap-2">
            {LEARNING_CATEGORY.skills.map((skill: string) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium bg-white text-indigo-900 rounded-lg border border-indigo-200/80 hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-default shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;

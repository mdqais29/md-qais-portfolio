import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS_SECTION_DATA, PROJECTS_LIST, ProjectItem } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="projects" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            {/* Section Eyebrow */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-4 h-0.5 bg-violet-600 rounded-full" />
              <span className="text-xs font-bold tracking-widest text-slate-900 uppercase">
                {PROJECTS_SECTION_DATA.label}
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-2.5">
              <span>{PROJECTS_SECTION_DATA.headingPrefix}</span>
              <span className="text-violet-600">{PROJECTS_SECTION_DATA.headingHighlight}</span>
            </h2>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-700 font-medium max-w-xl leading-relaxed">
              {PROJECTS_SECTION_DATA.description}
            </p>
          </div>

          {/* View All Projects Action Link */}
          <a
            href={PROJECTS_SECTION_DATA.viewAllLink}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900 transition-colors group shrink-0 self-start md:self-end pb-1"
          >
            <span>{PROJECTS_SECTION_DATA.viewAllText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* ================= 6-PROJECT RESPONSIVE GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {PROJECTS_LIST.map((project: ProjectItem, index: number) => (
            <motion.div
              key={project.id}
              {...fadeIn}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.05,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="flex"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-300 hover:border-violet-500 shadow-sm hover:shadow-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                aria-label={`View ${project.title} project`}
              >
                <div>
                  {/* Visual Preview / Thumbnail */}
                  <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Subtle External Link Badge on Hover */}
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 text-violet-700" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-950 group-hover:text-violet-700 transition-colors mt-3 mb-1 line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-700 font-medium leading-snug line-clamp-2 mb-3 min-h-[32px]">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-slate-100 text-slate-800 border border-slate-200/80 group-hover:bg-violet-50 group-hover:text-violet-800 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Link */}
                  <div className="pt-2.5 border-t border-slate-200 flex items-center gap-1 text-xs font-bold text-violet-700 group-hover:text-violet-900">
                    <span>{project.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS_SECTION_DATA, PROJECTS_LIST, ProjectItem } from '../data/portfolioData';

// Double the list for a seamless 360-degree circular infinite wheel (12 cards, 30 deg each)
const WHEEL_CARDS = [...PROJECTS_LIST, ...PROJECTS_LIST];
const STEP_ANGLE = 360 / WHEEL_CARDS.length; // 30 deg

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  // Track window resize to ensure full-bleed edge-to-edge radius calculation
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous animation loop: Left-to-Right infinite roll across entire screen
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHoveredRef.current) {
        // Continuous left-to-right drift (~7.5 degrees per second)
        angleRef.current = (angleRef.current + 0.011 * delta) % 360;
        setAngle(angleRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [shouldReduceMotion]);

  // Determine which card is currently closest to the top apex (0 deg)
  let closestIdx = 0;
  let minDiff = 360;
  WHEEL_CARDS.forEach((_, idx) => {
    const rawAngle = (angle + idx * STEP_ANGLE) % 360;
    const normalized = ((rawAngle + 180) % 360) - 180;
    if (Math.abs(normalized) < minDiff) {
      minDiff = Math.abs(normalized);
      closestIdx = idx;
    }
  });

  // Active project to display in the text below
  const activeIdx = hoveredCardIdx !== null ? hoveredCardIdx : closestIdx;
  const activeProject: ProjectItem = WHEEL_CARDS[activeIdx] || PROJECTS_LIST[0];

  // Manual rotation controls
  const rotateTo = (direction: 'next' | 'prev') => {
    const step = direction === 'next' ? -STEP_ANGLE : STEP_ANGLE;
    angleRef.current = (angleRef.current + step) % 360;
    setAngle(angleRef.current);
  };

  // Drag handlers for touch / pointer scrubbing
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartAngle(angleRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    angleRef.current = (dragStartAngle + deltaX * 0.12) % 360;
    setAngle(angleRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Dynamic radius that scales with viewport width so cards glide across the true screen edges
  const radius = Math.max(720, Math.min(1150, viewportWidth * 0.65));

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] overflow-x-hidden select-none"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
      </div>

      {/* ================= FULL-SCREEN EDGE-TO-EDGE INFINITE ROLL STAGE ================= */}
      <div
        className="relative w-screen left-1/2 -translate-x-1/2 h-[420px] sm:h-[480px] md:h-[530px] flex items-center justify-center overflow-x-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredCardIdx(null);
          setIsDragging(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Ambient Radial Lighting in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-violet-200/50 via-violet-100/15 to-transparent blur-3xl pointer-events-none" />

        {/* ================= CIRCULAR DIAL DISC (Behind the Cards) ================= */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] md:w-[480px] aspect-square rounded-full border border-slate-300/80 pointer-events-none flex items-center justify-center">
          {/* Concentric Dashed Ring */}
          <div className="absolute inset-5 rounded-full border border-dashed border-slate-300/70" />
          
          {/* Center Pointer Marking with "ME" / "PROJECTS" */}
          <div className="absolute top-3.5 flex flex-col items-center text-slate-800">
            <span className="text-xs font-black tracking-widest text-violet-600">▲</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-slate-600">
              ME
            </span>
          </div>

          {/* Rotating Decorative Compass SVG Ring */}
          <svg
            className="w-full h-full animate-[spin_55s_linear_infinite]"
            viewBox="0 0 400 400"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            <defs>
              <path
                id="portfolioCirclePath"
                d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
              />
            </defs>
            <text className="text-[10px] font-mono tracking-[0.28em] uppercase fill-slate-400 font-bold">
              <textPath href="#portfolioCirclePath" startOffset="0%">
                PORTFOLIO • SELECTED WORK • AI GENERALIST • QDELTA TECH • MOHAMMED QAIS • 
              </textPath>
            </text>
          </svg>
        </div>

        {/* ================= FANNED CARDS (Full-Bleed Across Entire Window Width) ================= */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center pointer-events-none">
          {WHEEL_CARDS.map((project, idx) => {
            // Calculate angular position on the virtual cylinder/arc
            const rawAngle = (angle + idx * STEP_ANGLE) % 360;
            const normalizedAngle = ((rawAngle + 180) % 360) - 180; // range [-180, 180]

            // Visible range across the full width of the monitor (up to 88 deg off center)
            if (Math.abs(normalizedAngle) > 88) return null;

            const rad = (normalizedAngle * Math.PI) / 180;
            const x = radius * Math.sin(rad);
            const y = radius * (1 - Math.cos(rad)) * 0.65; // gentle upward dome

            // Tangential tilt angle
            const rotateDeg = normalizedAngle * 0.78;

            // Fade only at the very extreme window edges
            const opacity = Math.max(0, 1 - Math.pow(Math.abs(normalizedAngle) / 84, 4));

            // Depth layer: cards closest to apex (0 deg) have highest z-index
            const isHoveredCard = hoveredCardIdx === idx;
            const zIndex = isHoveredCard ? 70 : Math.round(50 - Math.abs(normalizedAngle));

            return (
              <div
                key={`${project.id}-${idx}`}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                className="absolute pointer-events-auto transition-transform duration-200 ease-out origin-bottom cursor-pointer"
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${rotateDeg}deg) scale(${
                    isHoveredCard ? 1.08 : 1
                  })`,
                  zIndex,
                  opacity,
                }}
              >
                {/* Card Container: Razor-Sharp High-Resolution Poster Card */}
                <div
                  className={`relative w-[210px] sm:w-[250px] md:w-[270px] h-[290px] sm:h-[340px] md:h-[370px] rounded-3xl overflow-hidden border transition-all duration-300 ${
                    isHoveredCard
                      ? 'border-violet-400 ring-4 ring-violet-500/30 shadow-[0_30px_70px_-10px_rgba(124,58,237,0.5)] -translate-y-5'
                      : 'border-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.25)]'
                  } bg-slate-950 flex flex-col justify-between p-4 text-white group`}
                >
                  {/* Top Status & Index Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold tracking-wider uppercase bg-slate-950/70 backdrop-blur-md text-white border border-white/20 shadow-xs">
                      {project.tags[0] || 'FEATURED'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-black/50 backdrop-blur-xs text-slate-300 border border-white/10">
                      0{((idx % PROJECTS_LIST.length) + 1)}
                    </span>
                  </div>

                  {/* Razor-Sharp Full-Bleed Project Visual */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHoveredCard ? 'scale-105 brightness-105' : 'scale-100 brightness-100'
                      }`}
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                      }}
                      loading="eager"
                    />
                    {/* Bottom Vignette for Title Readability while keeping artwork sharp */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                  </div>

                  {/* Bottom Title on Card */}
                  <div className="relative z-10 pt-4">
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white line-clamp-1 drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-200 font-medium line-clamp-1 drop-shadow-sm mt-0.5">
                      {project.description}
                    </p>
                  </div>

                  {/* Top Specular Arc Glass Highlight */}
                  <div className="absolute inset-x-2 top-0.5 h-[35%] rounded-t-3xl bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-Bleed Navigation Chevrons pinned to true screen edges */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rotateTo('prev');
          }}
          className="absolute left-3 sm:left-6 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 shadow-lg text-slate-900 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            rotateTo('next');
          }}
          className="absolute right-3 sm:right-6 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 shadow-lg text-slate-900 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ================= PROJECT DETAILS BELOW DIAL ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-auto mt-4 sm:mt-6 p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-900/10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col items-center text-center space-y-3"
          >
            {/* Category Pill with Active Status */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-50 text-violet-700 border border-violet-100">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                {activeProject.tags[0] || 'Selected Work'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-slate-500 font-semibold">
                {isHovered ? 'PAUSED' : 'AUTO ROLLING'}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-display">
              {activeProject.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md leading-relaxed">
              {activeProject.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Direct Project Link Button */}
            <div className="pt-2">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 hover:bg-violet-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <span>{activeProject.linkText || 'View Project'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;

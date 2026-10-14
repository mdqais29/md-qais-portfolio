import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS_SECTION_DATA, PROJECTS_LIST, ProjectItem } from '../data/portfolioData';

// Double the list for seamless 360-degree circular infinite wheel (12 cards, 30 deg each)
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

  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  // Continuous animation loop: Left-to-Right infinite roll
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHoveredRef.current) {
        // Continuous left-to-right rotation (~8 degrees per second)
        angleRef.current = (angleRef.current + 0.012 * delta) % 360;
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
    angleRef.current = (dragStartAngle + deltaX * 0.15) % 360;
    setAngle(angleRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] overflow-hidden select-none"
    >
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

        {/* ================= CURVED ARC TURNTABLE / INFINITE ROLL STAGE ================= */}
        <div
          className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center overflow-x-clip"
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
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-violet-200/40 via-violet-100/10 to-transparent blur-3xl pointer-events-none" />

          {/* ================= CIRCULAR DIAL / COMPASS DISC (Behind the Cards) ================= */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[360px] md:w-[420px] aspect-square rounded-full border border-slate-300/80 pointer-events-none flex items-center justify-center">
            {/* Concentric Dashed Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-slate-300/60" />
            
            {/* Center Pointer Marking with "ME" / "PROJECTS" */}
            <div className="absolute top-3 flex flex-col items-center text-slate-800">
              <span className="text-[10px] font-black tracking-widest text-violet-600">▲</span>
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-slate-500">
                PORTFOLIO
              </span>
            </div>

            {/* Rotating Decorative Compass SVG Ring */}
            <svg
              className="w-full h-full animate-[spin_60s_linear_infinite]"
              viewBox="0 0 400 400"
              style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
            >
              <defs>
                <path
                  id="portfolioCirclePath"
                  d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                />
              </defs>
              <text className="text-[10px] font-mono tracking-[0.28em] uppercase fill-slate-400 font-semibold">
                <textPath href="#portfolioCirclePath" startOffset="0%">
                  PORTFOLIO • SELECTED WORK • AI GENERALIST • QDELTA TECH • MOHAMMED QAIS • 
                </textPath>
              </text>
            </svg>
          </div>

          {/* ================= THE FANNED PLAYING CARDS (Infinite Arc Roll) ================= */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
            {WHEEL_CARDS.map((project, idx) => {
              // Calculate angular position on the virtual cylinder/arc
              const rawAngle = (angle + idx * STEP_ANGLE) % 360;
              const normalizedAngle = ((rawAngle + 180) % 360) - 180; // range [-180, 180]

              // Only render cards currently within the visible front hemisphere (-75 deg to +75 deg)
              if (Math.abs(normalizedAngle) > 75) return null;

              // Arc Radius
              const radius = 540; // in px
              const rad = (normalizedAngle * Math.PI) / 180;
              const x = radius * Math.sin(rad);
              const y = radius * (1 - Math.cos(rad)) * 0.72; // slight flattening for ultra-graceful dome

              // Tangential tilt angle
              const rotateDeg = normalizedAngle * 0.85;

              // Smooth fade at the edges of the arc
              const opacity = Math.max(0, 1 - Math.pow(Math.abs(normalizedAngle) / 68, 2.5));

              // Depth layer: cards closest to apex (0 deg) have highest z-index
              const isHoveredCard = hoveredCardIdx === idx;
              const zIndex = isHoveredCard ? 60 : Math.round(50 - Math.abs(normalizedAngle));

              return (
                <div
                  key={`${project.id}-${idx}`}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  className="absolute pointer-events-auto transition-transform duration-200 ease-out origin-bottom cursor-pointer"
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${rotateDeg}deg) scale(${
                      isHoveredCard ? 1.06 : 1
                    })`,
                    zIndex,
                    opacity,
                  }}
                >
                  {/* Card Container: Tarot / Poster Aspect Ratio matching reference */}
                  <div
                    className={`relative w-[190px] sm:w-[230px] md:w-[250px] h-[270px] sm:h-[320px] md:h-[350px] rounded-3xl overflow-hidden border transition-all duration-300 ${
                      isHoveredCard
                        ? 'border-violet-500 ring-4 ring-violet-500/25 shadow-[0_25px_60px_-10px_rgba(124,58,237,0.45)] -translate-y-4'
                        : 'border-slate-800/80 shadow-[0_16px_36px_rgba(15,23,42,0.22)]'
                    } bg-slate-950 flex flex-col justify-between p-3.5 sm:p-4 text-white group`}
                  >
                    {/* Top Status & Index Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/15 backdrop-blur-md text-white border border-white/20">
                        {project.tags[0] || 'FEATURED'}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        0{((idx % PROJECTS_LIST.length) + 1)}
                      </span>
                    </div>

                    {/* Centered Artwork / Project Screenshot Thumbnail */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                          isHoveredCard ? 'scale-110 brightness-105' : 'scale-100 brightness-95'
                        }`}
                        loading="lazy"
                      />
                      {/* Gradient Vignette Overlay for rich contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
                    </div>

                    {/* Bottom Title & Glint on Card */}
                    <div className="relative z-10 pt-4">
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white line-clamp-1 drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-medium line-clamp-1 drop-shadow-sm mt-0.5">
                        {project.description}
                      </p>
                    </div>

                    {/* Top Specular Arc Highlight */}
                    <div className="absolute inset-x-2 top-0.5 h-[35%] rounded-t-3xl bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Quick Control Chevrons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rotateTo('prev');
            }}
            className="absolute left-2 sm:left-4 z-40 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md border border-slate-300 shadow-md text-slate-800 hover:text-slate-950 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
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
            className="absolute right-2 sm:right-4 z-40 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md border border-slate-300 shadow-md text-slate-800 hover:text-slate-950 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ================= PROJECT DETAILS BELOW DIAL (Reveals on Hover / Auto Updates) ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-auto mt-4 sm:mt-6 p-5 sm:p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-900/10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col items-center text-center space-y-3"
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

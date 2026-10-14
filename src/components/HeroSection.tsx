import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

const ROLES = [
  'Designer',
  'Developer',
  'Marketer',
  'Researcher',
  'AI Generalist',
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const currentWord = ROLES[roleIndex];
    const isLastWord = roleIndex === ROLES.length - 1;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 45); // Snappy, fluid typing speed (no sluggishness)
      } else {
        // Current word is fully typed
        if (isLastWord) {
          // Permanently finish on "AI Generalist"
          timer = setTimeout(() => {
            setIsComplete(true);
          }, 350);
        } else {
          // Natural reading pause before backspacing
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 850);
        }
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 22); // Fast, effortless backspacing
      } else {
        // Word cleared: brief breathing pause then begin next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }, 120);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, isComplete]);

  return (
    <section
      id="about"
      className="w-full relative isolate flex flex-col justify-between pt-20 sm:pt-24 pb-0 min-h-[calc(100vh-54px)] sm:min-h-[calc(100vh-56px)] overflow-hidden"
    >
      {/* ================= BACKGROUND AMBIENT DECORATIVE ACCENTS & FINE GRID ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Soft Ethereal Lavender, Pale-Violet & Warm Ambient Glows */}
        <div className="absolute top-[20%] right-[12%] w-[580px] h-[580px] bg-violet-300/35 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[35%] left-[8%] w-[520px] h-[520px] bg-amber-100/50 rounded-full blur-3xl opacity-75" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[640px] bg-purple-200/35 rounded-full blur-3xl opacity-70" />

        {/* Fine Low-Contrast Grid Pattern with Smooth Radial Vignette Mask */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(100, 116, 139, 0.20) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 116, 139, 0.20) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
          }}
        />
      </div>

      {/* ================= TOP: Centered Headline Typography ================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-4 sm:pt-6 text-center flex flex-col items-center">
        {/* Main Display Headline: I'm Mohammed Qais */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1] relative">
          <span className="relative inline-flex flex-col items-center">
            <motion.span
              initial={{ x: '-50%', y: 0 }}
              animate={{
                x: '-50%',
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-5 sm:-top-6 md:-top-7 left-1/2 text-xs sm:text-sm md:text-base font-bold tracking-tight whitespace-nowrap select-none pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(71, 85, 105, 0.95) 0%, rgba(100, 116, 139, 0.70) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 1px 1px rgba(255, 255, 255, 0.85))',
              }}
            >
              Hi, there!
            </motion.span>
            <span>I'm</span>
          </span>{' '}
          <span
            className="text-violet-600"
            style={{
              WebkitTextStroke: '1px #0f172a',
              paintOrder: 'stroke fill',
            }}
          >
            Mohammed Qais
          </span>
        </h1>

        {/* Buttery Smooth Typewriter Subtitle */}
        <div className="mt-2.5 sm:mt-3 h-8 sm:h-9 flex items-center justify-center">
          <div className="inline-flex items-center text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight">
            <span>{displayedText}</span>
            <span
              className={`inline-block w-[2.5px] h-5 sm:h-6 bg-violet-600 ml-1 rounded-full transition-opacity duration-300 ${
                isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ================= LEFT HERO RAIL (DESKTOP: MOVED TO LEFT & NUDGED DOWN SLIGHTLY; MOBILE: FLOWS NATURALLY) ================= */}
      <div className="w-full lg:w-auto lg:max-w-[340px] xl:max-w-[380px] lg:absolute lg:left-6 xl:left-12 2xl:left-20 lg:top-[55%] lg:-translate-y-1/2 z-20 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 px-4 mb-6 lg:mb-0">
        {/* Intro paragraph with Frosted Glass Text Effect */}
        <p
          className="text-base sm:text-lg font-semibold leading-relaxed max-w-md select-none"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(71, 85, 105, 0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 1px 1px rgba(255, 255, 255, 0.85))',
          }}
        >
          {PERSONAL_INFO.intro}
        </p>

        {/* Availability Status Badge (Glassy & High Contrast) */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs ring-1 ring-slate-900/5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 ring-2 ring-emerald-100" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            {PERSONAL_INFO.statusText}
          </span>
        </div>

        {/* Dual Action CTAs: Reduced Size, Same Dimensions Side-by-Side with Shiny Glass Styling */}
        <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full max-w-[350px] sm:max-w-[370px] pt-1">
          <a
            href="#projects"
            className="relative flex-1 h-10 sm:h-11 px-3 sm:px-4 rounded-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white font-bold text-xs sm:text-sm border border-white/25 shadow-[0_4px_16px_rgba(15,23,42,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.6)] hover:border-white/45 hover:shadow-[0_6px_20px_rgba(15,23,42,0.45),inset_0_1.5px_1px_rgba(255,255,255,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
            
            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>{PERSONAL_INFO.primaryCta}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>

          <a
            href="#contact"
            className="relative flex-1 h-10 sm:h-11 px-3 sm:px-4 rounded-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-950 font-bold text-xs sm:text-sm border border-slate-200/90 shadow-[0_4px_14px_rgba(15,23,42,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.12),inset_0_1.5px_1px_rgba(255,255,255,1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none" />

            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white via-violet-100/60 to-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-shine" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-700 group-hover:text-slate-950 transition-colors" />
              <span>{PERSONAL_INFO.secondaryCta}</span>
            </span>
          </a>
        </div>
      </div>

      {/* ================= RIGHT HERO RAIL: MINIMAL METRICS & CONNECT ================= */}
      <div className="w-full lg:w-auto lg:max-w-[340px] xl:max-w-[370px] lg:absolute lg:right-6 xl:right-12 2xl:right-20 lg:top-[55%] lg:-translate-y-1/2 z-20 flex flex-col items-center lg:items-end space-y-3.5 px-4 mb-8 lg:mb-0 pointer-events-auto">
        
        {/* Minimalist Glass Plaque */}
        <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white/85 backdrop-blur-xl border border-slate-900/10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,1)] rounded-3xl p-5 text-left space-y-4">
          
          {/* Metrics Stack */}
          <div className="space-y-3.5">
            {/* Stat 1 */}
            <div className="group flex items-center justify-between py-1 transition-colors">
              <div>
                <span className="text-sm font-bold text-slate-900 block tracking-tight">
                  Design & Development
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  Experience in building practical digital solutions
                </span>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="text-2xl font-black text-slate-950 font-display tracking-tight group-hover:text-violet-600 transition-colors">
                  2<span className="text-lg font-bold text-violet-600">+</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block -mt-1">
                  Years
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* Stat 2 */}
            <div className="group flex items-center justify-between py-1 transition-colors">
              <div>
                <span className="text-sm font-bold text-slate-900 block tracking-tight">
                  Happy Clients
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  Satisfied partners & businesses worldwide
                </span>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="text-2xl font-black text-slate-950 font-display tracking-tight group-hover:text-violet-600 transition-colors">
                  10<span className="text-lg font-bold text-violet-600">+</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block -mt-1">
                  Clients
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* Stat 3 */}
            <div className="group flex items-center justify-between py-1 transition-colors">
              <div>
                <span className="text-sm font-bold text-slate-900 block tracking-tight">
                  Projects Completed
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  AI tools, web applications & automations
                </span>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="text-2xl font-black text-slate-950 font-display tracking-tight group-hover:text-violet-600 transition-colors">
                  12<span className="text-lg font-bold text-violet-600">+</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block -mt-1">
                  Shipped
                </span>
              </div>
            </div>
          </div>

          {/* Social Links Section Inside Same Plaque (Unified & Minimal) */}
          <div className="pt-3.5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                Follow me on
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Connect with me
              </span>
            </div>

            {/* Monolithic Minimal Obsidian Tiles with Violet Accent Hover */}
            <div className="grid grid-cols-4 gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="h-8.5 rounded-xl bg-slate-950 hover:bg-violet-600 text-white flex items-center justify-center transition-all duration-200 group/btn shadow-xs hover:scale-105 active:scale-95"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5 fill-white group-hover/btn:scale-110 transition-transform" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="h-8.5 rounded-xl bg-slate-950 hover:bg-violet-600 text-white flex items-center justify-center transition-all duration-200 group/btn shadow-xs hover:scale-105 active:scale-95"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-white group-hover/btn:scale-110 transition-transform" />
              </a>
              <a
                href={PERSONAL_INFO.businessSite}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="QDelta Technologies Website"
                className="h-8.5 rounded-xl bg-slate-950 hover:bg-violet-600 text-white flex items-center justify-center transition-all duration-200 group/btn shadow-xs hover:scale-105 active:scale-95"
                title="Website"
              >
                <Globe className="w-3.5 h-3.5 text-white group-hover/btn:scale-110 transition-transform" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Send Email"
                className="h-8.5 rounded-xl bg-slate-950 hover:bg-violet-600 text-white flex items-center justify-center transition-all duration-200 group/btn shadow-xs hover:scale-105 active:scale-95"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5 text-white group-hover/btn:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CENTERED FOCAL PORTRAIT COMPOSITION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-end self-end pb-0">

        {/*
          Center-Aligned Portrait Container:
          Positioned so the visible bottom of the polo shirt meets the top border of the trust bar with exactly 0px gap!
        */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[480px] flex items-end justify-center pb-0">
          
          {/* Actual Generated Profile Portrait with Purple Halo Graphic */}
          <div className="relative z-10 w-full flex items-end justify-center pointer-events-none pb-0">
            <img
              src={PERSONAL_INFO.portraitSrc}
              alt={`${PERSONAL_INFO.name} — AI Generalist`}
              className="block w-full h-auto max-h-[46vh] sm:max-h-[50vh] lg:max-h-[52vh] object-contain object-bottom align-bottom drop-shadow-md select-none"
              loading="eager"
              fetchPriority="high"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

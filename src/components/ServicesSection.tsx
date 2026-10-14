import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { SERVICES_SECTION_DATA, SERVICES_LIST, ServiceItem } from '../data/portfolioData';

// Visual 01: Make / n8n Workflow Automation Canvas
const AutomationWorkflowVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] bg-[#0c101d] rounded-xl border border-slate-800 p-4 overflow-hidden flex items-center justify-between shadow-inner select-none">
    {/* Grid Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

    {/* Connecting Flow Lines SVG */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
      <path
        d="M 65 85 C 100 85, 110 85, 145 85"
        stroke="#475569"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="animate-pulse"
      />
      <path
        d="M 235 85 C 265 85, 275 45, 305 45"
        stroke="#8b5cf6"
        strokeWidth="1.5"
      />
      <path
        d="M 235 85 C 265 85, 275 85, 305 85"
        stroke="#8b5cf6"
        strokeWidth="1.5"
      />
      <path
        d="M 235 85 C 265 85, 275 125, 305 125"
        stroke="#8b5cf6"
        strokeWidth="1.5"
      />
    </svg>

    {/* Node 1: Trigger */}
    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 shadow-xs">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      <span className="text-[11px] font-medium text-slate-300">Trigger</span>
    </div>

    {/* Node 2: AI Agent (Center) */}
    <div className="relative z-10 flex flex-col items-center justify-center p-2.5 px-4 rounded-xl bg-violet-950/80 border border-violet-500/60 shadow-lg shadow-violet-900/30">
      <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold mb-1 shadow-xs shadow-violet-400">
        AI
      </div>
      <span className="text-xs font-bold text-violet-200">AI Agent</span>
      <span className="text-[9px] text-violet-400">LLM + Logic</span>
    </div>

    {/* Node 3: Connected Integrations */}
    <div className="relative z-10 flex flex-col gap-2">
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        <span className="text-[10px] font-medium text-slate-300">OpenAI</span>
      </div>
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="text-[10px] font-medium text-slate-300">Notion</span>
      </div>
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <span className="text-[10px] font-medium text-slate-300">Gmail</span>
      </div>
    </div>
  </div>
);

// Visual 02: Responsive Website & Architecture
const WebsiteVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] bg-[#0c101d] rounded-xl border border-slate-800 p-3.5 overflow-hidden flex flex-col justify-between shadow-inner select-none">
    {/* Browser Bar */}
    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-500/80" />
        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
      </div>
      <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
        modern-app.dev
      </span>
      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
        99.9% Fast
      </span>
    </div>

    {/* Mini Responsive Layout Blocks */}
    <div className="grid grid-cols-3 gap-2 py-2">
      <div className="col-span-2 h-14 rounded-lg bg-gradient-to-r from-violet-900/40 to-slate-900 border border-violet-800/40 p-2 flex flex-col justify-center">
        <div className="w-16 h-2 rounded bg-violet-400/80 mb-1" />
        <div className="w-24 h-1.5 rounded bg-slate-600" />
      </div>
      <div className="h-14 rounded-lg bg-slate-900 border border-slate-800 p-2 flex flex-col justify-center items-center">
        <span className="text-[10px] font-bold text-violet-400">100/100</span>
        <span className="text-[8px] text-slate-500">Lighthouse</span>
      </div>
    </div>

    {/* Tech Pills */}
    <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-400">
      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">React</span>
      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-white">Next.js</span>
      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">Tailwind</span>
    </div>
  </div>
);

// Visual 03: UI/UX & Design Systems
const DesignVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] bg-[#0c101d] rounded-xl border border-slate-800 p-3.5 overflow-hidden flex flex-col justify-between shadow-inner select-none">
    {/* Design Canvas Header */}
    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-400" />
        <span className="text-[10px] font-medium text-slate-300">Figma Prototype Canvas</span>
      </div>
      <span className="text-[9px] text-slate-500 font-mono">100% Zoom</span>
    </div>

    {/* UI Component Wireframes */}
    <div className="grid grid-cols-2 gap-2.5 py-1.5">
      <div className="p-2 rounded-lg bg-slate-900/90 border border-violet-500/30 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="w-10 h-1.5 rounded bg-violet-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
        </div>
        <div className="w-full h-4 rounded bg-slate-800/80 border border-slate-700/50" />
      </div>
      <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5">
        <div className="w-8 h-1.5 rounded bg-slate-400" />
        <div className="w-full h-4 rounded bg-violet-600/30 border border-violet-500/40" />
      </div>
    </div>

    {/* Figma Cursor Accent */}
    <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-violet-500 flex items-center justify-center text-[7px] text-white font-bold">
          Q
        </div>
        <span className="text-violet-300 font-medium">Qais (Editing)</span>
      </div>
      <span className="text-slate-500">Design System V2.4</span>
    </div>
  </div>
);

// Visual 04: AI-Powered Digital Products
const ProductVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] bg-[#0c101d] rounded-xl border border-slate-800 p-3.5 overflow-hidden flex flex-col justify-between shadow-inner select-none">
    {/* Terminal / Dashboard header */}
    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-mono text-emerald-300">AI Product Studio</span>
      </div>
      <span className="text-[9.5px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
        Claude / GPT-4o
      </span>
    </div>

    {/* Prompt Query / Output Simulation */}
    <div className="my-auto py-1">
      <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-300 mb-2">
        <span className="text-violet-400 font-bold">$ </span>
        <span>generate_workflow(goal="scale")</span>
      </div>
      <div className="p-2 rounded-lg bg-violet-950/40 border border-violet-800/40 text-[10px] text-slate-300 flex items-center gap-2">
        <span className="text-emerald-400">✓</span>
        <span>Custom AI SaaS Application Deployed</span>
      </div>
    </div>

    {/* Footer status */}
    <div className="flex items-center justify-between text-[9px] text-slate-400">
      <span>Latency: 180ms</span>
      <span className="text-violet-400 font-medium">Production Ready</span>
    </div>
  </div>
);

// Visual 05: Digital Systems & Architecture
const DigitalSystemsVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] bg-[#0c101d] rounded-xl border border-slate-800 p-3.5 overflow-hidden flex flex-col justify-between shadow-inner select-none">
    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-violet-400" />
        <span className="text-[10px] font-mono text-violet-300">Distributed Cloud Engine</span>
      </div>
      <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
        Healthy • 99.99%
      </span>
    </div>

    <div className="grid grid-cols-3 gap-2.5 my-auto py-2">
      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
        <span className="text-[9px] text-slate-400 font-mono">Edge CDN</span>
        <span className="text-xs font-bold text-white mt-0.5">Global</span>
        <span className="text-[8px] text-emerald-400">12ms avg</span>
      </div>
      <div className="p-2 rounded-lg bg-violet-950/50 border border-violet-700/50 flex flex-col items-center justify-center text-center">
        <span className="text-[9px] text-violet-300 font-mono">GraphQL API</span>
        <span className="text-xs font-bold text-violet-200 mt-0.5">High QPS</span>
        <span className="text-[8px] text-violet-400">Zero-downtime</span>
      </div>
      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center">
        <span className="text-[9px] text-slate-400 font-mono">Data Pipeline</span>
        <span className="text-xs font-bold text-white mt-0.5">Automated</span>
        <span className="text-[8px] text-sky-400">Real-time sync</span>
      </div>
    </div>

    <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
      <span>Scalable Architecture</span>
      <span className="text-violet-400 font-medium">SOC2 Compliant Design</span>
    </div>
  </div>
);

const getServiceVisual = (id: string) => {
  switch (id) {
    case 'ai-automation':
      return <AutomationWorkflowVisual />;
    case 'websites':
      return <WebsiteVisual />;
    case 'ui-ux':
      return <DesignVisual />;
    case 'digital-products':
      return <ProductVisual />;
    case 'digital-systems':
      return <DigitalSystemsVisual />;
    default:
      return <WebsiteVisual />;
  }
};

export const ServicesSection: React.FC = () => {
  // Expand 02 (Websites & Digital Experiences) by default to match reference
  const [activeId, setActiveId] = useState<string>('websites');

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="w-full py-20 sm:py-24 lg:py-28 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP: Section Header (Left: Eyebrow + Headline; Right: Description) ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-14">
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-5 sm:w-6 h-0.5 bg-violet-600 rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase">
                {SERVICES_SECTION_DATA.label}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
              <span>{SERVICES_SECTION_DATA.headingPrefix}</span>
              <span className="text-violet-600">{SERVICES_SECTION_DATA.headingHighlight}</span>
              <span className="inline-block text-violet-500 font-normal ml-2 select-none" aria-hidden="true">
                ✦
              </span>
            </h2>
          </div>

          {/* Right Description */}
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-md md:text-right">
            {SERVICES_SECTION_DATA.description}
          </p>
        </div>

        {/* ================= CENTER: Full-Width Accordion Stack ================= */}
        <div className="flex flex-col space-y-3.5 sm:space-y-4">
          {SERVICES_LIST.map((service: ServiceItem) => {
            const isExpanded = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                transition={{
                  layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
                className="w-full"
              >
                {isExpanded ? (
                  /* ---------- EXPANDED STATE (Rich Dark Sleek Card matching reference 02) ---------- */
                  <div className="w-full bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-300">
                    {/* Ambient subtle violet radial glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Top Row: Number + Title + Active Circle Button */}
                    <div
                      onClick={() => toggleAccordion(service.id)}
                      className="flex items-start justify-between gap-4 cursor-pointer relative z-10 group"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="text-lg sm:text-xl font-bold text-slate-400 mt-1 shrink-0 w-8 sm:w-10">
                          {service.number}.
                        </span>
                        <div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {service.title}
                          </h3>

                          {/* Tag pills */}
                          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 mb-4">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 shadow-inner"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Active Circle Button with Down-Right Arrow */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/40 shrink-0 group-hover:scale-105 transition-all">
                        <ArrowDownRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Interactive Showcase Preview Area */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="mt-8 pt-6 border-t border-slate-850 w-full relative z-10"
                    >
                      <div className="rounded-xl overflow-hidden border border-slate-800/90 shadow-xl bg-[#0c101d]">
                        {getServiceVisual(service.id)}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* ---------- COLLAPSED STATE (Soft Warm Grey Pill Row matching reference) ---------- */
                  <div
                    onClick={() => toggleAccordion(service.id)}
                    className="w-full bg-[#F3F1EC] hover:bg-[#EAE8E1] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 flex items-center justify-between cursor-pointer transition-colors duration-200 group border border-slate-200/60 shadow-2xs select-none"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight shrink-0 w-8 sm:w-10">
                        {service.number}.
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-violet-700 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Collapsed Arrow Up-Right Circle */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 group-hover:scale-105 transition-all duration-200 shrink-0">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM: Dual-Pill Capsule CTA ================= */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 transition-all duration-200 group"
          >
            <span>View All Services</span>
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

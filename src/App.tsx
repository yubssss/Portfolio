import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { MockupCarousel } from './components/MockupCarousel';
import { GalleryModal } from './components/GalleryModal';
import { useTheme } from './context/ThemeContext';
import { ecoTrackScreens, ecoTrackMockups, furniViewScreens, furniViewMockups, weddingMockups } from './data/mockupData';

type ProjectCategory = 'all' | 'mobile' | 'web';
type TechTag =
  | 'Flutter'
  | 'Dart'
  | 'React'
  | 'React Native'
  | 'TypeScript'
  | 'Vite'
  | 'Supabase'
  | 'Postman'
  | 'Figma'
  | 'AR';

const allTechTags: TechTag[] = [
  'Flutter',
  'Dart',
  'React',
  'React Native',
  'TypeScript',
  'Vite',
  'Supabase',
  'Postman',
  'Figma',
  'AR',
];

const ecoTrackTech: TechTag[] = ['React', 'TypeScript', 'Vite', 'Supabase'];
const furniViewTech: TechTag[] = ['React Native', 'AR'];
const weddingTech: TechTag[] = ['Flutter', 'Dart', 'Postman', 'Figma'];

function App() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');
  const [selectedTechTags, setSelectedTechTags] = useState<TechTag[]>([]);
  const [imageError, setImageError] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isFurniGalleryOpen, setIsFurniGalleryOpen] = useState(false);
  const [currentFurniIndex, setCurrentFurniIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.motion-reveal'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { rootMargin: '-8% 0px -12%', threshold: 0.18 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeTab, selectedTechTags]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const updatePointerGlow = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  };

  const revealDelay = (delay: number) => ({ '--delay': `${delay}ms` }) as CSSProperties;
  const toggleTechTag = (tag: string) => {
    const techTag = tag as TechTag;
    setSelectedTechTags((currentTags) =>
      currentTags.includes(techTag)
        ? currentTags.filter((currentTag) => currentTag !== techTag)
        : [...currentTags, techTag],
    );
  };

  const matchesProject = (categories: ProjectCategory[], techTags: TechTag[]) => {
    const matchesCategory = activeTab === 'all' || categories.includes(activeTab);
    const matchesTech = selectedTechTags.every((tag) => techTags.includes(tag));

    return matchesCategory && matchesTech;
  };
  const showEcoTrack = matchesProject(['mobile', 'web'], ecoTrackTech);
  const showFurniView = matchesProject(['mobile'], furniViewTech);
  const showWeddingModule = matchesProject(['mobile'], weddingTech);
  const hasVisibleProjects = showEcoTrack || showFurniView || showWeddingModule;

  return (
    <div
      className="site-shell bg-[#0b0b0c] text-white min-h-screen font-sans w-full max-w-full px-4 sm:px-12 md:px-20 lg:px-32 py-12 flex flex-col gap-12 transition-all duration-300"
      onPointerMove={updatePointerGlow}
      style={{ '--scroll-depth': `${Math.min(scrollY / 900, 1)}` } as CSSProperties}
    >
      <div className="page-transition-layer" aria-hidden="true"></div>
      <CommandPalette
        techTags={allTechTags}
        selectedTechTags={selectedTechTags}
        onSelectCategory={setActiveTab}
        onToggleTechTag={toggleTechTag}
        onClearTechTags={() => setSelectedTechTags([])}
      />
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle btn-active-scale fixed right-5 top-5 z-40 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-300 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-600/20 hover:text-white"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {theme === 'dark' ? 'D' : 'L'}
        </span>
        {theme === 'dark' ? 'Dark' : 'Light'}
      </button>
      
      {/* --- HERO PROFILE ARCHITECTURE --- */}
      <header className="motion-reveal reveal-rise hero-panel w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 p-8 md:p-12 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-purple-500/20">
        <div className="flex-1 text-left space-y-6">
          {/* Status Badge */}
          <div className="motion-reveal reveal-blur inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 transition-all duration-300 hover:bg-purple-500/20" style={revealDelay(100)}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            IT Graduate / Specializing in Mobile Application Development
          </div>
          
          <div className="motion-reveal reveal-rise space-y-3" style={revealDelay(180)}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">Mar James Cayube</span>.
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-400 tracking-wide">
              Technological Institute of the Philippines (TIP) QC
            </p>
          </div>
          
          <p className="motion-reveal reveal-rise text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl" style={revealDelay(260)}>
            Equipped with solid, hands-on experience in building cross-platform applications using Flutter and React Native from an intensive 500-hour industry internship. Proven ability in translating complex UI/UX designs into functional code, managing RESTful API integrations, and implementing modern state management.
          </p>

          {/* Action Hub */}
          <div className="motion-reveal reveal-rise flex flex-wrap gap-4 pt-2" style={revealDelay(340)}>
            <a 
              href="#projects" 
              className="btn-active-scale px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] hover:translate-y-[-2px]"
            >
              Explore Ecosystems
            </a>
            <a
              href="/resume/Marjames_Cayube_RESUME.pdf"
              download="Marjames_Cayube_RESUME.pdf"
              className="btn-active-scale inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 font-medium rounded-xl transition-all duration-300 text-white hover:border-white/20 hover:translate-y-[-2px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              Download Full CV
            </a>
          </div>

          {/* Connected Network Links */}
          <div className="motion-reveal reveal-rise flex items-center gap-3 pt-4" style={revealDelay(420)}>
            {[
              { url: 'https://github.com/yubssss', svg: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" /> },
              { url: 'https://www.linkedin.com/feed/', svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></> },
              { url: 'mailto:jamescayube7@gmail.com', svg: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></> }
            ].map((link, idx) => (
              <a 
                key={idx}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-active-scale p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 text-slate-400 hover:text-purple-400 backdrop-blur-md transition-all duration-300 hover:bg-purple-500/5 hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {link.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* --- PREMIUM PORTRAIT WRAPPER --- */}
        <div
          className="motion-reveal reveal-scale portrait-float w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 relative shrink-0 group"
          style={{ ...revealDelay(220), '--portrait-parallax': `${scrollY * -0.025}px` } as CSSProperties}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 rounded-3xl opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"></div>
          <div className="w-full h-full rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden relative z-10 transition-all duration-500 group-hover:scale-[1.03] shadow-2xl group-hover:border-purple-500/40 flex items-center justify-center">
            {!imageError ? (
              <img 
                src="/src/assets/ecotrack/profile.jpg" 
                alt="Mar James Cayube" 
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-5xl text-purple-400 font-sans font-bold bg-zinc-950 select-none">
                MJC
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- TECHNICAL CORE ARCHITECTURE / SKILLS MATRIX --- */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl" style={revealDelay(0)}>
          <h3 className="text-sm font-mono tracking-widest text-purple-400 uppercase font-bold mb-3">// Mobile Frameworks</h3>
          <p className="text-base text-white font-semibold">Flutter (Dart), React Native</p>
        </div>
        <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl" style={revealDelay(120)}>
          <h3 className="text-sm font-mono tracking-widest text-indigo-400 uppercase font-bold mb-3">// Web & Database</h3>
          <p className="text-base text-white font-semibold">ReactJS, JavaScript (ES6+), Vite, Supabase</p>
        </div>
        <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl" style={revealDelay(240)}>
          <h3 className="text-sm font-mono tracking-widest text-fuchsia-400 uppercase font-bold mb-3">// Architecture & Tools</h3>
          <p className="text-base text-white font-semibold">Git, Postman API, EFSM Core Logic</p>
        </div>
      </section>

      {/* --- PRODUCTION ENGINE / PROJECTS MATRIX --- */}
      <main id="projects" className="w-full flex flex-col gap-8">
        <div className="motion-reveal reveal-rise flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Engineered Architectural Solutions</h2>
            <p className="text-base text-slate-400 mt-2">Production-grade applications and systems built from source files to scalable deployments.</p>
          </div>
          
          <div className="flex gap-1 p-1 bg-black/50 border border-white/5 rounded-xl backdrop-blur-md self-start sm:self-auto shrink-0">
            {(['all', 'mobile', 'web'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-lg capitalize transition-all duration-300 btn-active-scale ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="motion-reveal reveal-rise tech-filter-bar flex flex-wrap items-center gap-2 px-2" style={revealDelay(80)}>
          <span className="mr-1 text-[11px] font-mono uppercase tracking-widest text-slate-500">Tech filters</span>
          {allTechTags.map((tag) => {
            const isSelected = selectedTechTags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTechTag(tag)}
                className={`btn-active-scale rounded-full border px-3 py-1.5 text-xs font-mono transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-400/60 bg-purple-500/20 text-white shadow-lg shadow-purple-500/10'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                {tag}
              </button>
            );
          })}
          {selectedTechTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTechTags([])}
              className="btn-active-scale rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-mono text-slate-500 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* --- FULL LANDING GRID PLATFORMS --- */}
        <div className="flex flex-col gap-10 w-full">
          
          {/* Case Study 1: EcoTrack Core System Platform */}
          {showEcoTrack && (
            <div className="motion-reveal reveal-slide-left project-card group flex flex-col lg:flex-row items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
              {/* Image Frame/Carousel Container */}
              <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
                <MockupCarousel data={ecoTrackMockups} />
              </div>

              {/* Data Specifications text block */}
              <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">Integrated Full-Stack Ecosystem</span>
                    <span className="text-xs text-slate-500 font-mono">Capstone Core System</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">EcoTrack Core Platform</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    The high-fidelity mobile interface of an integrated real-time ticketing and inventory management system co-developed for PhilEco. Acting as the production workforce gateway, this module features a unified Help Desk engine to request, route, and update network or hardware issues with live action steps, seamlessly synchronized with a centralized administrative web console. Implemented using advanced state tracking via Extended Finite State Machines (EFSM).
                  </p>

                  {/* Dynamic Gallery trigger button linked to state */}
                  <button 
                    onClick={() => { setIsGalleryOpen(true); setCurrentScreenIndex(0); }}
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white rounded-xl transition-all duration-300 btn-active-scale"
                  >
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/>
                    </svg>
                    Expand Overlay Gallery ({ecoTrackScreens.length} Views)
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                  {['ReactJS', 'TypeScript', 'Vite', 'Supabase APIs', 'EFSM Logic', 'Ticketing Framework'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Case Study 2: FurniView AR Application */}
        {showFurniView && (
          <div className="motion-reveal reveal-slide-right project-card group flex flex-col lg:flex-row-reverse items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
            <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-l border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
              <MockupCarousel data={furniViewMockups} />
            </div>
            <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md">Mobile AR Application</span>
                  <span className="text-xs text-slate-500 font-mono">Project Lead Dev</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">FurniView Architecture</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Independently developed a full-featured mobile e-commerce application utilizing cross-platform architectures. Integrated Augmented Reality (AR) technology allowing users to preview and scale dynamic 3D furniture configurations inside real-world layouts.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                {['React Native', 'JavaScript (ES6+)', 'Mobile AR Engine', 'UI/UX Optimization', 'State Management'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- Case Study 3: Wedding Fair Event Module --- */}
{showWeddingModule && (
  <div className="motion-reveal reveal-slide-left project-card group flex flex-col lg:flex-row items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
    
    {/* DITO NA ANG CAROUSEL SA HALIP NA IMG TAG */}
    <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
      <MockupCarousel data={weddingMockups} />
    </div>

    <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded-md">Mobile Application Module</span>
          <span className="text-xs text-slate-500 font-mono">8box Solutions Internship</span>
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">Event Check-In Ecosystem</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Contributed to high-level technical implementation during a 500-hour intensive industry deployment phase. Translated precise Figma designs into high-fidelity fluid application modules featuring active hardware asset interfaces, localized QR token readers, and rigorous RESTful endpoint validations checked through Postman suites.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
        {['Flutter', 'Dart', 'Postman API Testing', 'Figma Translation', 'Clean Architecture'].map((tech) => (
          <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>
        ))}
      </div>
    </div>
  </div>
)}
          {!hasVisibleProjects && (
            <div className="motion-reveal reveal-blur rounded-3xl border border-white/10 bg-black/30 p-8 text-center text-sm text-slate-400">
              No projects match the current filters. Clear the tech filters or switch the project type.
            </div>
          )}
        </div>
      </main>

      {/* --- STEP 3: MOVED TO SEPARATE COMPONENT --- */}
      <GalleryModal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        screens={ecoTrackScreens}
        currentIndex={currentScreenIndex}
        setCurrentIndex={setCurrentScreenIndex}
      />
      <GalleryModal 
        isOpen={isFurniGalleryOpen} 
        onClose={() => setIsFurniGalleryOpen(false)} 
        screens={furniViewScreens}
        currentIndex={currentFurniIndex}
        setCurrentIndex={setCurrentFurniIndex}
      />

      {/* --- FOOTER --- */}
      <footer className="motion-reveal reveal-blur w-full text-center py-8 border-t border-white/5 font-mono text-xs text-slate-500">
        (c) 2026 Mar James Cayube. Built using native Tailwind compilation plugins.
      </footer>
    </div>
  );
}

export default App;

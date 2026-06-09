import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { CommandPalette } from './components/CommandPalette';
import { MockupCarousel } from './components/MockupCarousel';
import { GalleryModal } from './components/GalleryModal';
import { useTheme } from './context/ThemeContext';
import { 
  ecoTrackScreens, 
  ecoTrackMockups, 
  furniViewScreens, 
  furniViewMockups, 
  ecoTrackWebMockups,
  ecoTrackWebScreens,
  weddingMockups, 
  weddingScreens 
} from './data/mockupData';
// Profile image from public folder
const profileImage = '/Portfolio/assets/ecotrack/profile.jpg';
// Import icons as components for better performance
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <path d="M10 9H8"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
  </svg>
);

const CodeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

type NavTab = 'home' | 'projects' | 'about' | 'contact';
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
const webTech: TechTag[] = ['React', 'TypeScript', 'Vite', 'Supabase'];

function App() {
  const [isWebGalleryOpen, setIsWebGalleryOpen] = useState(false);
  const [currentWebIndex, setCurrentWebIndex] = useState(0);
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [activeProjectTab, setActiveProjectTab] = useState<ProjectCategory>('all');
  const [selectedTechTags, setSelectedTechTags] = useState<TechTag[]>([]);
  const [imageError, setImageError] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isFurniGalleryOpen, setIsFurniGalleryOpen] = useState(false);
  const [currentFurniIndex, setCurrentFurniIndex] = useState(0);
  const [isWeddingGalleryOpen, setIsWeddingGalleryOpen] = useState(false);
  const [currentWeddingIndex, setCurrentWeddingIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [downloadCount, setDownloadCount] = useState(() => {
    const saved = localStorage.getItem('resume_download_count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const { theme, toggleTheme } = useTheme();

  const handleDownload = () => {
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('resume_download_count', newCount.toString());
  };

  const handleNavClick = (tab: NavTab) => {
    if (tab === activeNavTab) return;
    
    setIsTransitioning(true);
    setActiveNavTab(tab);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };

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
  }, [activeNavTab, activeProjectTab, selectedTechTags]);

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
    const matchesCategory = activeProjectTab === 'all' || categories.includes(activeProjectTab);
    const matchesTech = selectedTechTags.length === 0 || selectedTechTags.every((tag) => techTags.includes(tag));
    return matchesCategory && matchesTech;
  };

  const showEcoTrack = matchesProject(['mobile'], ecoTrackTech);
  const showFurniView = matchesProject(['mobile'], furniViewTech);
  const showWeddingModule = matchesProject(['mobile'], weddingTech);
  const showWebProjects = activeProjectTab === 'web' || (activeProjectTab === 'all' && matchesProject(['web'], webTech));
  const hasVisibleProjects = showEcoTrack || showFurniView || showWeddingModule || showWebProjects;
  
  const pageTransitionClass = isTransitioning ? 'animate-fade-out' : 'animate-fade-in';

  return (
    <>
      <Helmet>
        <title>Mar James Cayube | Mobile & Web Developer Portfolio</title>
        <meta name="description" content="IT Graduate from TIP QC specializing in Flutter, React Native, and AR applications. View my projects: EcoTrack, FurniView, and event check-in systems with 500+ hours of industry experience." />
        <meta name="keywords" content="Flutter, React Native, AR, Mobile Developer, Portfolio, TIP QC, React, TypeScript" />
        <meta name="author" content="Mar James Cayube" />
        <meta property="og:title" content="Mar James Cayube | Portfolio" />
        <meta property="og:description" content="Mobile & Web Developer specializing in cross-platform applications" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div
        className="site-shell bg-[#0b0b0c] text-white min-h-screen font-sans w-full max-w-full px-4 sm:px-12 md:px-20 lg:px-32 pt-24 pb-12 flex flex-col gap-12 transition-all duration-300"
        onPointerMove={updatePointerGlow}
        style={{ '--scroll-depth': `${Math.min(scrollY / 900, 1)}` } as CSSProperties}
      >
        <div className="page-transition-layer" aria-hidden="true"></div>
        
        <CommandPalette
          techTags={allTechTags}
          selectedTechTags={selectedTechTags}
          onSelectCategory={setActiveProjectTab}
          onToggleTechTag={toggleTechTag}
          onClearTechTags={() => setSelectedTechTags([])}
        />
        
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle btn-active-scale fixed right-5 top-20 z-40 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-300 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-600/20 hover:text-white"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>

        {/* Navigation Tabs - Fixed */}
        <nav className="fixed top-4 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <div className={`flex justify-center items-center gap-1 p-1.5 rounded-2xl border transition-all duration-300 shadow-2xl mx-auto max-w-fit pointer-events-auto ${
            theme === 'dark' 
              ? 'border-white/10 bg-black/80 backdrop-blur-xl' 
              : 'border-gray-200/30 bg-white/80 backdrop-blur-xl shadow-gray-500/10'
          }`}>
            {[
              { id: 'home', label: 'Home', icon: '🏠' },
              { id: 'projects', label: 'Projects', icon: '📱' },
              { id: 'about', label: 'About', icon: '👤' },
              { id: 'contact', label: 'Contact', icon: '📞' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id as NavTab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 btn-active-scale ${
                  activeNavTab === tab.id
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content Container with Animation */}
        <div className={pageTransitionClass}>
          {/* --- HOME SECTION --- */}
          {activeNavTab === 'home' && (
            <div className="motion-reveal reveal-rise">
              <header className="hero-panel w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 p-8 md:p-12 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-purple-500/20">
                <div className="flex-1 text-left space-y-6">
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
                  
                  <div className="motion-reveal reveal-rise flex flex-wrap gap-6 text-sm font-mono" style={revealDelay(220)}>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold text-lg">500+</span>
                      <span className="text-slate-500">Internship Hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold text-lg">3</span>
                      <span className="text-slate-500">Production Apps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold text-lg">10+</span>
                      <span className="text-slate-500">Tech Stack Tools</span>
                    </div>
                    {downloadCount > 0 && (
                      <div className="flex items-center gap-2">
                        <DownloadIcon />
                        <span className="text-slate-500">{downloadCount} CV Downloads</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="motion-reveal reveal-rise text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl" style={revealDelay(260)}>
                    Equipped with solid, hands-on experience in building cross-platform applications using Flutter and React Native from an intensive 500-hour industry internship. Proven ability in translating complex UI/UX designs into functional code, managing RESTful API integrations, and implementing modern state management.
                  </p>

                  <div className="motion-reveal reveal-rise flex flex-wrap gap-4 pt-2" style={revealDelay(340)}>
                    <button 
                      onClick={() => handleNavClick('projects')}
                      className="btn-active-scale px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] hover:translate-y-[-2px]"
                    >
                      Explore Ecosystems
                    </button>
                    <a
                      href="/resume/Marjames_Cayube_RESUME.pdf"
                      download="Marjames_Cayube_RESUME.pdf"
                      onClick={handleDownload}
                      className="btn-active-scale inline-flex items-center gap-2 px-6 py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 font-medium rounded-xl transition-all duration-300 text-white hover:border-white/20 hover:translate-y-[-2px]"
                    >
                      <DownloadIcon />
                      Download Full CV
                    </a>
                  </div>

                  <div className="motion-reveal reveal-rise flex items-center gap-3 pt-4" style={revealDelay(420)}>
                    <a href="https://github.com/yubssss" target="_blank" rel="noopener noreferrer" className="btn-active-scale p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 text-slate-400 hover:text-purple-400 backdrop-blur-md transition-all duration-300 hover:bg-purple-500/5 hover:scale-105" aria-label="GitHub Profile">
                      <GithubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/mar-james-cayube-30918035a/" target="_blank" rel="noopener noreferrer" className="btn-active-scale p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 text-slate-400 hover:text-purple-400 backdrop-blur-md transition-all duration-300 hover:bg-purple-500/5 hover:scale-105" aria-label="LinkedIn Profile">
                      <LinkedInIcon />
                    </a>
                    <a href="mailto:jamescayube7@gmail.com" className="btn-active-scale p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 text-slate-400 hover:text-purple-400 backdrop-blur-md transition-all duration-300 hover:bg-purple-500/5 hover:scale-105" aria-label="Email Me">
                      <MailIcon />
                    </a>
                  </div>
                </div>

                <div className="motion-reveal reveal-scale portrait-float w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 relative shrink-0 group" style={{ ...revealDelay(220), '--portrait-parallax': `${scrollY * -0.025}px` } as CSSProperties}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 rounded-3xl opacity-20 blur-2xl transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"></div>
                  <div className="w-full h-full rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden relative z-10 transition-all duration-500 group-hover:scale-[1.03] shadow-2xl group-hover:border-purple-500/40 flex items-center justify-center">
                    {!imageError ? (
                      <img src={profileImage} alt="Mar James Cayube - Mobile Developer Portfolio" className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500" onError={() => setImageError(true)} loading="eager" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl text-purple-400 font-sans font-bold bg-zinc-950 select-none">MJC</div>
                    )}
                  </div>
                </div>
              </header>

              {/* Skills Matrix */}
              <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
                <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300" style={revealDelay(0)}>
                  <h3 className="text-sm font-mono tracking-widest text-purple-400 uppercase font-bold mb-3">// Mobile Frameworks</h3>
                  <p className="text-base text-white font-semibold">Flutter, React Native</p>
                </div>
                <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300" style={revealDelay(120)}>
                  <h3 className="text-sm font-mono tracking-widest text-indigo-400 uppercase font-bold mb-3">// Web & Database</h3>
                  <p className="text-base text-white font-semibold">ReactJS, TypeScript, Vite, Supabase</p>
                </div>
                <div className="motion-reveal reveal-rise skill-card p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300" style={revealDelay(240)}>
                  <h3 className="text-sm font-mono tracking-widest text-fuchsia-400 uppercase font-bold mb-3">// Architecture & Tools</h3>
                  <p className="text-base text-white font-semibold">Git, Postman API, EFSM Core Logic</p>
                </div>
              </section>
            </div>
          )}

          {/* --- PROJECTS SECTION --- */}
          {activeNavTab === 'projects' && (
            <div className="motion-reveal reveal-rise">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Engineered Architectural Solutions</h2>
                  <p className="text-base text-slate-400 mt-2">Production-grade applications and systems built from source files to scalable deployments.</p>
                </div>
                
                <div className="flex gap-1 p-1 bg-black/50 border border-white/5 rounded-xl backdrop-blur-md self-start sm:self-auto shrink-0">
                  {(['all', 'mobile', 'web'] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveProjectTab(tab)} className={`px-4 py-2 text-xs font-mono font-medium rounded-lg capitalize transition-all duration-300 btn-active-scale ${activeProjectTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                      {tab === 'all' ? 'All Projects' : `${tab} Apps`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="motion-reveal reveal-rise tech-filter-bar flex flex-wrap items-center gap-2 px-2 mt-6" style={revealDelay(80)}>
                <span className="mr-1 text-[11px] font-mono uppercase tracking-widest text-slate-500">Tech filters</span>
                {allTechTags.map((tag) => {
                  const isSelected = selectedTechTags.includes(tag);
                  return (
                    <button key={tag} type="button" onClick={() => toggleTechTag(tag)} className={`btn-active-scale rounded-full border px-3 py-1.5 text-xs font-mono transition-all duration-300 ${isSelected ? 'border-purple-400/60 bg-purple-500/20 text-white shadow-lg shadow-purple-500/10' : 'border-white/10 bg-white/5 text-slate-400 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white'}`} aria-pressed={isSelected}>
                      {tag}
                    </button>
                  );
                })}
                {selectedTechTags.length > 0 && (
                  <button type="button" onClick={() => setSelectedTechTags([])} className="btn-active-scale rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-mono text-slate-500 transition-all duration-300 hover:border-white/20 hover:text-white">
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-10 w-full mt-6">
                {showEcoTrack && (
                  <div className="motion-reveal reveal-slide-left project-card group flex flex-col lg:flex-row items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
                      <MockupCarousel data={ecoTrackMockups} />
                    </div>
                    <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">Integrated Full-Stack Ecosystem</span>
                          <span className="text-xs text-slate-500 font-mono">Capstone Core System</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">EcoTrack Core Platform</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">The high-fidelity mobile interface of an integrated real-time ticketing and inventory management system co-developed for PhilEco. Acting as the production workforce gateway, this module features a unified Help Desk engine to request, route, and update network or hardware issues with live action steps, seamlessly synchronized with a centralized administrative web console. Implemented using advanced state tracking via Extended Finite State Machines (EFSM).</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button onClick={() => { setIsGalleryOpen(true); setCurrentScreenIndex(0); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white rounded-xl transition-all duration-300 btn-active-scale">
                            <CodeIcon /> Expand Gallery ({ecoTrackScreens.length} Views)
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                        {['ReactJS', 'TypeScript', 'Vite', 'Supabase APIs', 'EFSM Logic', 'Ticketing Framework'].map((tech) => (<span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>))}
                      </div>
                    </div>
                  </div>
                )}

                {showFurniView && (
                  <div className="motion-reveal reveal-slide-right project-card group flex flex-col lg:flex-row-reverse items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-l border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
                      <MockupCarousel data={furniViewMockups} />
                    </div>
                    <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md">Mobile AR Application</span>
                          <span className="text-xs text-slate-500 font-mono">Project Lead Dev</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">FurniView Architecture</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Independently developed a full-featured mobile e-commerce application utilizing cross-platform architectures. Integrated Augmented Reality (AR) technology allowing users to preview and scale dynamic 3D furniture configurations inside real-world layouts.</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button onClick={() => { setIsFurniGalleryOpen(true); setCurrentFurniIndex(0); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white rounded-xl transition-all duration-300 btn-active-scale">
                            <CodeIcon /> Expand Gallery ({furniViewScreens.length} Views)
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                        {['React Native', 'JavaScript (ES6+)', 'Mobile AR Engine', 'UI/UX Optimization', 'State Management'].map((tech) => (<span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>))}
                      </div>
                    </div>
                  </div>
                )}

                {/* WEB PROJECTS SECTION */}
                {showWebProjects && (
                  <div className="motion-reveal reveal-slide-right project-card group flex flex-col lg:flex-row-reverse items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-l border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
                      <MockupCarousel data={ecoTrackWebMockups} type="web" />
                    </div>
                    <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">Enterprise Web Dashboard</span>
                          <span className="text-xs text-slate-500 font-mono">Full-Stack Developer</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">EcoTrack Admin Console</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Centralized web dashboard for real-time ticket management, HR analytics, and system administration. Features include live data visualization, AI-powered predictions, and full CRUD operations on PostgreSQL database. Synchronized with the mobile workforce application for seamless enterprise workflow management.</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button onClick={() => { setIsWebGalleryOpen(true); setCurrentWebIndex(0); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white rounded-xl transition-all duration-300 btn-active-scale">
                            <CodeIcon /> Expand Gallery ({ecoTrackWebScreens.length} Views)
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                        {['React', 'TypeScript', 'Vite', 'Supabase', 'Recharts', 'Tailwind CSS'].map((tech) => (<span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>))}
                      </div>
                    </div>
                  </div>
                )}

                {showWeddingModule && (
                  <div className="motion-reveal reveal-slide-left project-card group flex flex-col lg:flex-row items-stretch rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                    <div className="lg:w-1/2 min-h-[450px] bg-zinc-950 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden shrink-0 group/img flex items-center justify-center p-4">
                      <MockupCarousel data={weddingMockups} />
                    </div>
                    <div className="project-copy flex-1 p-8 text-left flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded-md">Mobile Application Module</span>
                          <span className="text-xs text-slate-500 font-mono">8box Solutions Internship</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">Event Check-In Ecosystem</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Contributed to high-level technical implementation during a 500-hour intensive industry deployment phase. Translated precise Figma designs into high-fidelity fluid application modules featuring active hardware asset interfaces, localized QR token readers, and rigorous RESTful endpoint validations checked through Postman suites.</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <button onClick={() => { setIsWeddingGalleryOpen(true); setCurrentWeddingIndex(0); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white rounded-xl transition-all duration-300 btn-active-scale">
                            <CodeIcon /> Expand Gallery ({weddingScreens.length} Views)
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-300 pt-4">
                        {['Flutter', 'Dart', 'Postman API Testing', 'Figma Translation', 'Clean Architecture'].map((tech) => (<span key={tech} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">{tech}</span>))}
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
            </div>
          )}

          {/* --- ABOUT SECTION --- */}
          {activeNavTab === 'about' && (
            <div className="space-y-8 motion-reveal reveal-rise">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">About Me</h2>
                <p className="text-slate-400 mt-2">Get to know more about my journey and expertise</p>
              </div>

              {/* Career Objective */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">🎯 Career Objective</h3>
                <p className="text-slate-300 leading-relaxed">
                  Motivated and detail-oriented IT Graduate specializing in Mobile Application Development. Equipped with solid, hands-on experience in building cross-platform applications using Flutter and React Native from a 500-hour intensive industry internship. Proven ability in translating complex UI/UX designs into functional code, managing RESTful API integrations, and implementing modern state management. Passionate about engineering scalable, user-friendly solutions in a fast-paced development team.
                </p>
              </div>

              {/* Education */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">🎓 Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-purple-400">Bachelor of Science in Information Technology</h4>
                    <p className="text-slate-300">Technological Institute of the Philippines (TIP) QC</p>
                    <p className="text-slate-500 text-sm">Graduated: 2026</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">⚙️ Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* MOBILE DEVELOPMENT */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">📱</span> Mobile Development
                    </h4>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-mono">FRAMEWORKS</p>
                      <div className="flex flex-wrap gap-2">
                        {['Flutter', 'React Native'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-slate-500 mb-1 font-mono">LANGUAGES</p>
                      <div className="flex flex-wrap gap-2">
                        {['Dart', 'JavaScript'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WEB DEVELOPMENT */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🌐</span> Web Development
                    </h4>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-mono">FRAMEWORKS & LIBRARIES</p>
                      <div className="flex flex-wrap gap-2">
                        {['ReactJS', 'Vite', 'Tailwind CSS'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-slate-500 mb-1 font-mono">LANGUAGES & TECHNOLOGIES</p>
                      <div className="flex flex-wrap gap-2">
                        {['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BACKEND & DATABASE */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🗄️</span> Backend & Database
                    </h4>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-mono">DATABASES & BaaS</p>
                      <div className="flex flex-wrap gap-2">
                        {['Supabase', 'PostgreSQL', 'Firebase'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-slate-500 mb-1 font-mono">QUERY LANGUAGES</p>
                      <div className="flex flex-wrap gap-2">
                        {['SQL'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PROGRAMMING LANGUAGES */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">💻</span> Other Programming Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Java', 'C++', 'C#'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* DESIGN & PROTOTYPING */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🎨</span> Design & Prototyping
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'Canva'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* DEVELOPER TOOLS */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🛠️</span> Developer Tools & Version Control
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'GitHub', 'Postman', 'VS Code', 'Android Studio'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* NETWORKING */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🌍</span> Networking
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Cisco Packet Tracer', 'Network Configuration', 'TCP/IP'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* SECURITY */}
                  <div className="space-y-3">
                    <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🔒</span> Security & Information Assurance
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Information Assurance', 'Ethical Hacking Concepts', 'SQL Injection Mitigation', 'Bruteforce Mitigation'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">💼 Work Experience</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h4 className="text-xl font-semibold text-purple-400">Mobile Developer (Intern)</h4>
                      <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full">500+ hours</span>
                    </div>
                    <p className="text-slate-300 font-medium">8box Solutions Inc.</p>
                    <p className="text-slate-500 text-sm">15F Centerpoint Bldg, Garnet Road | January 14, 2026 - April 16, 2026</p>
                    <ul className="mt-3 space-y-2 text-slate-400 list-disc list-inside">
                      <li>Completed a 500-hour intensive internship focused on high-level technical implementation, mobile application logic, and clean architecture</li>
                      <li>Contributed to the deployment of 6 mobile projects by successfully translating Figma design mockups into responsive and pixel-perfect Flutter applications</li>
                      <li>Managed and tested RESTful API integrations using Postman to ensure stable and seamless backend-to-frontend communication</li>
                      <li>Developed core app functionalities using Dart, utilizing advanced state management principles to maintain maintainable and clean codebases</li>
                      <li>Collaborated directly with UI/UX engineers and senior developers within a professional Git-based workflow and fast-paced agile sprints</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-purple-400">Event Marshall (Part-time)</h4>
                    <p className="text-slate-300 font-medium">Switch Asia</p>
                    <p className="text-slate-500 text-sm">Pasay, Metro Manila | September 05, 2025 - September 08, 2025</p>
                    <ul className="mt-3 space-y-2 text-slate-400 list-disc list-inside">
                      <li>Managed high-traffic booth areas, ensuring crowd control, safety, and a conducive environment during peak event hours</li>
                      <li>Demonstrated strict adaptability and communication skills by handling various cross-functional roles on the ground as needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Design Projects Completed */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">📱 Design Projects Completed</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400">FurniView | Cross-Platform Mobile AR Application</h4>
                    <ul className="mt-2 space-y-1 text-slate-400 list-disc list-inside">
                      <li>Independently developed a full-feature mobile e-commerce application using React Native and JavaScript</li>
                      <li>Integrated Augmented Reality (AR) technology allowing users to preview and scale 3D furniture models in real-world environments before purchasing</li>
                      <li>Implemented a complete e-commerce pipeline including product catalog browsing, detailed item viewing, and secure in-app transaction processing</li>
                      <li>Optimized UI performance and responsiveness across multiple device screen sizes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400">EcoTrack | Integrated Web & Mobile Ticketing and Inventory Management System</h4>
                    <ul className="mt-2 space-y-1 text-slate-400 list-disc list-inside">
                      <li>Co-developed and successfully deployed an integrated web and mobile real-time ticketing system for PhilEco with cross-platform functionality and AI chatbot support</li>
                      <li>Engineered intelligent routing and prioritization features using Extended Finite State Machines (EFSM) to optimize workflow automation and track inventory in real time</li>
                      <li>Integrated an AI-powered chatbot to analyze system requests, enhance user experience, and provide actionable operational insights</li>
                      <li>Collaborated on bridging frontend modules with backend APIs, ensuring seamless cross-platform performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Leadership Activities */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">👑 Leadership Activities</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400">Project Lead | FurniView (AR App)</h4>
                    <p className="text-slate-400 text-sm">Led the development of FurniView, a mobile app that uses Augmented Reality (AR) to show furniture in a real room. Ensured the technical parts of the app worked correctly and the team finished the project on time.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400">Team Leader | Community Project (NSTP)</h4>
                    <p className="text-slate-400 text-sm">Managed a team for a community service project where we painted walls and improved a local area. Assigned tasks to team members and ensured we had all the materials needed to finish the job.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400">Team Captain | Basketball</h4>
                    <p className="text-slate-400 text-sm">Acted as the leader for the team, keeping everyone focused and working together during games and practice. Helped teammates stay motivated and handled any issues within the group to keep the team spirit high.</p>
                  </div>
                </div>
              </div>

              {/* Knowledge, Skills & Attitude */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">🌟 Knowledge, Skills & Attitude</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Excellent Communication', 'Teamwork', 'Cross-functional Collaboration', 'Leadership Experience', 'Problem Solving', 'Adaptability'].map(skill => (
                    <span key={skill} className="px-3 py-2 bg-white/5 rounded-lg text-sm text-slate-300">{skill}</span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm">
                  Skilled in fostering positive professional relationships and a healthy, collaborative team environment.
                </p>
              </div>

              {/* Seminars and Trainings */}
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">📜 Seminars & Trainings Attended</h3>
                <div className="space-y-4 text-slate-300">
                  <div>
                    <p className="font-semibold text-purple-400">AI-powered Facebook Ads Strategies</p>
                    <p className="text-sm text-slate-500">Leveraging AI for Efficient Campaign Creation and Optimization | Online - Google Meet | February 27, 2024</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-400">Python Programming Application</p>
                    <p className="text-sm text-slate-500">Unit 703 Parc house bldg, Guadalupe | February 04, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CONTACT SECTION --- */}
          {activeNavTab === 'contact' && (
            <div className="space-y-8 motion-reveal reveal-rise">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Let's Connect</h2>
                <p className="text-slate-400 mt-2">I'm always open to discussing new opportunities and collaborations</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <a href="mailto:jamescayube7@gmail.com" className="block p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center text-2xl transition-all duration-300">📧</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">Email</h3>
                        <p className="text-slate-400 group-hover:text-purple-300 transition-colors">jamescayube7@gmail.com</p>
                      </div>
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/marjames-cayube-48386630a/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center text-2xl transition-all duration-300">💼</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">LinkedIn</h3>
                        <p className="text-slate-400 group-hover:text-purple-300 transition-colors">Connect with me</p>
                      </div>
                    </div>
                  </a>

                  <a href="https://github.com/yubssss" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center text-2xl transition-all duration-300">🐙</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">GitHub</h3>
                        <p className="text-slate-400 group-hover:text-purple-300 transition-colors">github.com/yubssss</p>
                      </div>
                    </div>
                  </a>

                  <div className="p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl">📍</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Location</h3>
                        <p className="text-slate-400">Antipolo City, Rizal, Philippines</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
                  <form action="https://formspree.io/f/xgvorypq" method="POST" className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                      <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 btn-active-scale">
                      Send Message →
                    </button>
                  </form>
                </div>
              </div>

              {/* Availability Banner */}
              <div className="w-full py-12 text-center border-y border-white/5 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-3xl">
                <h3 className="text-2xl font-bold text-white">Open for Opportunities</h3>
                <p className="text-slate-400 mt-2 max-w-md mx-auto">
                  Currently seeking full-time software engineering roles starting mid-2026
                </p>
                <div className="flex justify-center gap-4 mt-6 flex-wrap">
                  <a href="mailto:jamescayube7@gmail.com" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-all duration-300 btn-active-scale">📧 Send an Email</a>
                  <a href="/resume/Marjames_Cayube_RESUME.pdf" download="Marjames_Cayube_RESUME.pdf" onClick={handleDownload} className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-xl transition-all duration-300 btn-active-scale inline-flex items-center gap-2">
                    <DownloadIcon /> Download CV
                  </a>
                  <a href="https://cal.com/marjames" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-xl transition-all duration-300 btn-active-scale">📅 Schedule a Call</a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Modals */}
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} screens={ecoTrackScreens} currentIndex={currentScreenIndex} setCurrentIndex={setCurrentScreenIndex} />
        <GalleryModal isOpen={isFurniGalleryOpen} onClose={() => setIsFurniGalleryOpen(false)} screens={furniViewScreens} currentIndex={currentFurniIndex} setCurrentIndex={setCurrentFurniIndex} />
        <GalleryModal isOpen={isWeddingGalleryOpen} onClose={() => setIsWeddingGalleryOpen(false)} screens={weddingScreens} currentIndex={currentWeddingIndex} setCurrentIndex={setCurrentWeddingIndex} />
        <GalleryModal isOpen={isWebGalleryOpen} onClose={() => setIsWebGalleryOpen(false)} screens={ecoTrackWebScreens} currentIndex={currentWebIndex} setCurrentIndex={setCurrentWebIndex} />

        {/* Footer */}
        <footer className="motion-reveal reveal-blur w-full text-center py-8 border-t border-white/5 font-mono text-xs text-slate-500">
          <p>© 2026 Mar James Cayube. Built with React, TypeScript, Vite & Tailwind CSS.</p>
          <p className="mt-2 text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </footer>
      </div>
    </>
  );
}

export default App;
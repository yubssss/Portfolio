import { useEffect, useState, useRef, useCallback, type ReactNode } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type NavTab = "home" | "projects" | "about" | "contact";
type ProjectCategory = "all" | "mobile" | "web";
type BadgeColor = "indigo" | "purple" | "emerald" | "cyan" | "fuchsia";
type FormStatus = "idle" | "sending" | "sent" | "error";

interface Project {
  id: string;
  categories: ProjectCategory[];
  tags: string[];
  badge: string;
  badgeColor: BadgeColor;
  meta: string;
  title: string;
  desc: string;
  techStack: string[];
  galleryKey: string;
  galleryCount: number;
  direction: "left" | "right";
  isWeb?: boolean;
}

interface SkillGroup {
  emoji: string;
  label: string;
  items: string[];
}

interface Summary {
  label: string;
  value: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const RESUME_PATH = "/Portfolio/resume/Marjames_Cayube_RESUME.pdf";
const PROFILE_IMG = "/Portfolio/assets/ecotrack/profile.jpg";

const TECH_TAGS: string[] = [
  "Flutter","Dart","React","React Native","TypeScript",
  "Vite","Supabase","Postman","Figma","AR",
  "TensorFlow Lite","Google ML Kit","AsyncStorage",
];

const PROJECTS: Project[] = [
  {
    id: "ecotrack-mobile",
    categories: ["mobile"],
    tags: ["React","TypeScript","Vite","Supabase"],
    badge: "Integrated Full-Stack Ecosystem",
    badgeColor: "indigo",
    meta: "Capstone Core System",
    title: "EcoTrack Core Platform",
    desc: "High-fidelity mobile interface of a real-time ticketing and inventory management system co-developed for PhilEco. Features a unified Help Desk engine to request, route, and update network or hardware issues with live action steps, synchronized with a centralized administrative web console. Built with Extended Finite State Machines (EFSM) for intelligent state tracking.",
    techStack: ["ReactJS","TypeScript","Vite","Supabase APIs","EFSM Logic","Ticketing Framework"],
    galleryKey: "ecotrack",
    galleryCount: 8,
    direction: "left",
  },
  {
    id: "furniview",
    categories: ["mobile"],
    tags: ["React Native","AR"],
    badge: "Mobile AR Application",
    badgeColor: "purple",
    meta: "Project Lead Dev",
    title: "FurniView Architecture",
    desc: "Full-featured mobile e-commerce application using cross-platform architecture. Integrated Augmented Reality (AR) allowing users to preview and scale dynamic 3D furniture configurations inside real-world layouts before purchasing.",
    techStack: ["React Native","JavaScript (ES6+)","Mobile AR Engine","UI/UX Optimization","State Management"],
    galleryKey: "furniview",
    galleryCount: 7,
    direction: "right",
  },
  {
    id: "ai-scanner",
    categories: ["mobile"],
    tags: ["React Native","TensorFlow Lite","Google ML Kit","AsyncStorage"],
    badge: "AI-Powered Recipe Intelligence",
    badgeColor: "emerald",
    meta: "Full-Stack Developer",
    title: "AI Pantry Scanner",
    desc: "Intelligent mobile app that transforms cooking by scanning pantry ingredients and generating AI-powered recipes via Google Gemini. Converts photos into structured ingredient lists with cooking times, nutrition estimates, and step-by-step instructions. Includes offline storage, scan history, profile management, and voice guide support.",
    techStack: ["React Native","Google Gemini AI","TensorFlow Lite","AsyncStorage","RESTful APIs","Camera Integration"],
    galleryKey: "recipe",
    galleryCount: 10,
    direction: "left",
  },
  {
    id: "ecotrack-web",
    categories: ["web"],
    tags: ["React","TypeScript","Vite","Supabase"],
    badge: "Enterprise Web Dashboard",
    badgeColor: "cyan",
    meta: "Full-Stack Developer",
    title: "EcoTrack Admin Console",
    desc: "Centralized web dashboard for real-time ticket management, HR analytics, and system administration. Features live data visualization, AI-powered predictions, and full CRUD on PostgreSQL. Synchronized with the mobile workforce application for seamless enterprise workflow management.",
    techStack: ["React","TypeScript","Vite","Supabase","Recharts","Tailwind CSS"],
    galleryKey: "ecoweb",
    galleryCount: 4,
    direction: "right",
    isWeb: true,
  },
  {
    id: "wedding",
    categories: ["mobile"],
    tags: ["Flutter","Dart","Postman","Figma"],
    badge: "Mobile Application Module",
    badgeColor: "fuchsia",
    meta: "8box Solutions Internship",
    title: "Event Check-In Ecosystem",
    desc: "High-level technical implementation during a 500-hour industry deployment. Translated Figma designs into high-fidelity Flutter modules featuring active hardware asset interfaces, localized QR token readers, and rigorous RESTful endpoint validations through Postman suites.",
    techStack: ["Flutter","Dart","Postman API Testing","Figma Translation","Clean Architecture"],
    galleryKey: "ojt",
    galleryCount: 1,
    direction: "left",
  },
];

const SKILLS: SkillGroup[] = [
  { emoji: "📱", label: "Mobile Frameworks", items: ["Flutter","React Native"] },
  { emoji: "🌐", label: "Web Development", items: ["ReactJS","TypeScript","Vite","Tailwind CSS"] },
  { emoji: "🗄️", label: "Backend & Database", items: ["Supabase","PostgreSQL","Firebase"] },
  { emoji: "🤖", label: "AI & Machine Learning", items: ["TensorFlow Lite","Google ML Kit","OpenCV","Cloud Vision API"] },
  { emoji: "🛠️", label: "Developer Tools", items: ["Git","GitHub","Postman","VS Code","Android Studio"] },
  { emoji: "🔒", label: "Security", items: ["SQL Injection Mitigation","Bruteforce Mitigation","OWASP Basics"] },
];

const BADGE_COLORS: Record<BadgeColor,string> = {
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
};

const SUMMARIES: Summary[] = [
  { label: "Production apps", value: "4+" },
  { label: "Live screens", value: "26" },
  { label: "Internship hours", value: "500+" },
  { label: "Focus area", value: "Secure UX" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf: number;
    const handler = () => { raf = requestAnimationFrame(() => setY(window.scrollY)); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => { window.removeEventListener("scroll", handler); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? (JSON.parse(s) as T) : initial;
    } catch { return initial; }
  });
  const set = useCallback((v: T) => {
    setVal(v);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (_e) { /* storage unavailable */ }
  }, [key]);
  return [val, set];
}

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function getGallerySrc(galleryKey: string, index: number): string {
  if (galleryKey === "ojt") return "/Portfolio/assets/ojt/ojt.jpg";
  if (galleryKey === "ecoweb") return `/Portfolio/assets/ecoweb/eco${index + 1}.png`;
  if (galleryKey === "ecotrack") {
    const names = [
      "welcome-login-portal","service-portal-dashboard","active-tickets-console",
      "resolved-ticket-history","borrow-equipment","return-assets",
      "notifications-hub","profile-settings",
    ];
    return `/Portfolio/assets/ecotrack/${names[index]}.jpg`;
  }
  if (galleryKey === "furniview") return `/Portfolio/assets/furni/furni-${index + 1}.jpg`;
  return `/Portfolio/assets/${galleryKey}/${index + 1}.jpg`;
}

// ─── ANIMATION WRAPPER ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8M16 13H8M16 17H8" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const CodeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setActive(true); };
    const leave = () => setActive(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
        mixBlendMode: "screen",
      }}
    />
  );
}

// ─── ANIMATED BG GRID ────────────────────────────────────────────────────────
function BgGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollBar({ scrollY }: { scrollY: number }) {
  const [max, setMax] = useState(1);
  useEffect(() => {
    const update = () => setMax(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const pct = Math.min(100, (scrollY / max) * 100);
  return (
    <div className="fixed left-0 top-0 z-[100] h-[2px] w-full bg-white/5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-indigo-500"
        style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV_TABS: Array<{ id: NavTab; label: string; path: string }> = [
  { id: "home", label: "Home", path: "M3 10.5l9-7 9 7M5 10v10h14V10M9 20v-6h6v6" },
  { id: "projects", label: "Projects", path: "M3 4h18v14H3z M8 22h8 M12 18v4" },
  { id: "about", label: "About", path: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
  { id: "contact", label: "Contact", path: "M2 4h20v16H2z M2 7l10 6 10-6" },
];

function Nav({ active, onChange, scrollY }: { active: NavTab; onChange: (tab: NavTab) => void; scrollY: number }) {
  const scrolled = scrollY > 40;
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ paddingTop: scrolled ? "8px" : "16px", transition: "padding 0.3s ease" }}
      aria-label="Main navigation"
    >
      <div
        className="flex items-center gap-0.5 p-1 rounded-2xl pointer-events-auto"
        style={{
          background: scrolled ? "rgba(8,8,16,0.85)" : "rgba(8,8,16,0.5)",
          backdropFilter: "blur(20px)",
          border: scrolled ? "1px solid rgba(139,92,246,0.15)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(139,92,246,0.1)" : "none",
          transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {NAV_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-current={active === t.id ? "page" : undefined}
            className={`flex items-center gap-2 px-3 py-2 md:px-4 rounded-xl text-sm font-medium select-none ${
              active === t.id
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
            style={{
              background: active === t.id
                ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                : "transparent",
              boxShadow: active === t.id ? "0 2px 12px rgba(124,58,237,0.35)" : "none",
              transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
              transform: "scale(1)",
            }}
            onMouseEnter={e => { if (active !== t.id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { if (active !== t.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={t.path} />
            </svg>
            <span className="hidden md:inline">{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── TECH PILL ────────────────────────────────────────────────────────────────
function TechPill({ tag, selected, onClick }: { tag: string; selected: boolean; onClick: (tag: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick(tag)}
      aria-pressed={selected}
      style={{ transition: "all 0.18s cubic-bezier(.22,1,.36,1)" }}
      className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-mono active:scale-95 ${
        selected
          ? "border-purple-400/50 bg-purple-500/15 text-purple-300 shadow-sm shadow-purple-500/10"
          : "border-white/10 bg-white/4 text-slate-400 hover:border-purple-500/30 hover:bg-purple-500/8 hover:text-white"
      }`}
    >
      {tag}
    </button>
  );
}

// ─── DOTS ─────────────────────────────────────────────────────────────────────
function Dots({ count, current, onSelect }: { count: number; current: number; onSelect: (i: number) => void }) {
  if (count <= 1) return null;
  return (
    <div className="flex gap-1.5 items-center flex-wrap justify-center">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Slide ${i + 1}`}
          style={{ transition: "all 0.25s cubic-bezier(.22,1,.36,1)" }}
          className={`rounded-full ${i === current ? "w-5 h-2 bg-purple-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
        />
      ))}
    </div>
  );
}

// ─── PHONE CAROUSEL ───────────────────────────────────────────────────────────
function PhoneCarousel({ galleryKey, count }: { galleryKey: string; count: number }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgFade, setImgFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setImgFade(false);
      setTimeout(() => { setIdx(p => (p + 1) % count); setImgFade(true); }, 200);
    }, 4800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, count]);

  const go = (dir: 1 | -1) => {
    setImgFade(false);
    setTimeout(() => { setIdx(p => (p + dir + count) % count); setImgFade(true); }, 150);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full py-6 gap-4"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto" style={{ width: 220, height: 460 }}>
        <div className="absolute inset-0 rounded-[2rem] border-[10px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-20" />
          <img
            key={getGallerySrc(galleryKey, idx)}
            src={getGallerySrc(galleryKey, idx)}
            alt={`${galleryKey} screen ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{
              borderRadius: "1.4rem",
              opacity: imgFade ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
        </div>
        {/* Subtle reflection */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2rem",
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            zIndex: 15,
            pointerEvents: "none",
          }}
        />
        {count > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-9 z-30 w-8 h-8 rounded-full bg-white/8 hover:bg-purple-600/40 border border-white/10 text-white flex items-center justify-center transition-all active:scale-90">
              <ChevronLeft />
            </button>
            <button onClick={() => go(1)} aria-label="Next slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-9 z-30 w-8 h-8 rounded-full bg-white/8 hover:bg-purple-600/40 border border-white/10 text-white flex items-center justify-center transition-all active:scale-90">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      <Dots count={count} current={idx} onSelect={setIdx} />
    </div>
  );
}

// ─── WEB CAROUSEL ─────────────────────────────────────────────────────────────
function WebCarousel({ count }: { count: number }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(p => (p + 1) % count); setFade(true); }, 200);
    }, 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full py-4 gap-4"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="w-full max-w-lg rounded-xl overflow-hidden border border-white/10 shadow-xl">
        <div className="bg-zinc-900 flex items-center gap-2 px-3 py-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-2 bg-zinc-800 rounded-md px-3 py-1 text-[11px] text-zinc-500 font-mono text-center truncate">
            localhost:3000/dashboard
          </div>
        </div>
        <div className="relative bg-black">
          <img
            key={idx}
            src={`/Portfolio/assets/ecoweb/eco${idx + 1}.png`}
            alt={`Dashboard screen ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
            style={{ opacity: fade ? 1 : 0, transition: "opacity 0.2s ease" }}
          />
          {count > 1 && (
            <>
              <button onClick={() => { setFade(false); setTimeout(() => { setIdx(p => (p - 1 + count) % count); setFade(true); }, 150); }}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-purple-600/60 text-white rounded-full p-1.5 transition-all">
                <ChevronLeft />
              </button>
              <button onClick={() => { setFade(false); setTimeout(() => { setIdx(p => (p + 1) % count); setFade(true); }, 150); }}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-purple-600/60 text-white rounded-full p-1.5 transition-all">
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
      <Dots count={count} current={idx} onSelect={setIdx} />
    </div>
  );
}

// ─── GALLERY MODAL ────────────────────────────────────────────────────────────
function GalleryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imgFade, setImgFade] = useState(true);
  const { galleryCount: count, galleryKey: key } = project;

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  const navigate = useCallback((dir: 1 | -1) => {
    setImgFade(false);
    setTimeout(() => { setIdx(p => (p + dir + count) % count); setImgFade(true); }, 150);
  }, [count]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [handleClose, navigate]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}
      onClick={handleClose}
      style={{
        background: visible ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        className="relative bg-zinc-950 border border-white/10 rounded-2xl p-5 max-w-sm w-full flex flex-col gap-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
          transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white font-semibold text-sm">{project.title}</p>
            <p className="text-xs text-zinc-500 font-mono">Screen {idx + 1} / {count}</p>
          </div>
          <button onClick={handleClose} aria-label="Close gallery"
            className="text-zinc-400 hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8">
            ×
          </button>
        </div>
        <div className="relative flex items-center justify-center bg-black/40 rounded-xl overflow-hidden" style={{ minHeight: 340 }}>
          <img
            key={getGallerySrc(key, idx)}
            src={getGallerySrc(key, idx)}
            alt={`${project.title} screen ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="max-h-[55vh] w-auto object-contain rounded-lg"
            style={{ opacity: imgFade ? 1 : 0, transition: "opacity 0.15s ease" }}
          />
          {count > 1 && (
            <>
              <button onClick={() => navigate(-1)} aria-label="Previous screen"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-600 rounded-full p-2 text-white transition-all">
                <ChevronLeft />
              </button>
              <button onClick={() => navigate(1)} aria-label="Next screen"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-purple-600 rounded-full p-2 text-white transition-all">
                <ChevronRight />
              </button>
            </>
          )}
        </div>
        <Dots count={count} current={idx} onSelect={setIdx} />
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onGallery }: { project: Project; onGallery: (p: Project) => void }) {
  const isRight = project.direction === "right";
  const [hovered, setHovered] = useState(false);
  return (
    <article
      className={`group flex flex-col ${isRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch rounded-2xl overflow-hidden`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)"}`,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(16px)",
        boxShadow: hovered ? "0 8px 48px rgba(139,92,246,0.12), 0 2px 16px rgba(0,0,0,0.4)" : "0 2px 16px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div className={`w-full lg:w-[46%] min-h-[360px] lg:min-h-[420px] bg-zinc-950/60 ${isRight ? "lg:border-l" : "lg:border-r"} border-b lg:border-b-0 border-white/5 flex items-center justify-center overflow-hidden`}>
        {project.isWeb ? <WebCarousel count={project.galleryCount} /> : <PhoneCarousel galleryKey={project.galleryKey} count={project.galleryCount} />}
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 border rounded-md ${BADGE_COLORS[project.badgeColor]}`}>
              {project.badge}
            </span>
            <span className="text-xs text-zinc-500 font-mono">{project.meta}</span>
          </div>
          <h3 style={{ transition: "color 0.2s ease" }} className={`text-xl font-bold ${hovered ? "text-purple-300" : "text-white"}`}>
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{project.desc}</p>
          <button
            onClick={() => onGallery(project)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/4 hover:bg-purple-600/15 border border-white/8 hover:border-purple-500/35 text-xs font-mono text-zinc-300 hover:text-white rounded-xl active:scale-95"
            style={{ transition: "all 0.18s cubic-bezier(.22,1,.36,1)" }}
          >
            <CodeIcon />
            View Gallery ({project.galleryCount} screens)
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
          {project.techStack.map(t => (
            <span key={t} className="px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-white/4 rounded-lg border border-white/5 hover:border-purple-500/20 hover:text-zinc-300" style={{ transition: "all 0.15s ease" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
function StatCounter({ value, label }: { value: string; label: string }) {
  const [ref, visible] = useInView(0.5);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(num)) {
      // Use a RAF to avoid synchronous setState in effect body
      const raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 1200;
    const startTime = performance.now();
    let rafId: number;
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      setDisplay(current + suffix);
      if (progress < 1) { rafId = requestAnimationFrame(step); }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [visible, value]);

  return (
    <div ref={ref} className="flex items-center gap-1.5">
      <span className="text-purple-400 font-bold text-lg tabular-nums">{visible ? display : "0"}</span>
      <span className="text-zinc-500 text-sm">{label}</span>
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ onNav, downloadCount, onDownload }: { onNav: (tab: NavTab) => void; downloadCount: number; onDownload: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hoverSocial, setHoverSocial] = useState<string | null>(null);

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Hero */}
      <FadeUp delay={0}>
        <header className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20 px-0 py-12 sm:py-20"
          style={{}}
        >
          <div className="flex-1 space-y-6 text-left w-full">
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)", color: "#a78bfa" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              IT Graduate · Mobile Application Development
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.08]">
                Hi, I'm{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #e879f9, #818cf8)" }}
                >
                  Mar James Cayube
                </span>
                .
              </h1>
              <p className="text-base text-zinc-400 mt-2 font-medium">
                Technological Institute of the Philippines (TIP) QC
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 text-sm font-mono">
              <StatCounter value="500+" label="Internship Hours" />
              <StatCounter value="4+" label="Production Apps" />
              <StatCounter value="10+" label="Tech Stack Tools" />
              {downloadCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">{downloadCount} CV download{downloadCount !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              Equipped with hands-on experience building cross-platform apps using Flutter and React
              Native from a 500-hour industry internship. Skilled at translating UI/UX designs into
              functional code, managing RESTful API integrations, and implementing modern state
              management patterns.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => onNav("projects")}
                className="px-5 py-2.5 text-white font-medium rounded-xl active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                  transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(124,58,237,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                View Projects
              </button>
              <a
                href={RESUME_PATH}
                download="Marjames_Cayube_RESUME.pdf"
                onClick={onDownload}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-xl text-white active:scale-95"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <DownloadIcon />
                Download CV
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2 pt-1">
              {[
                { id: "github", href: "https://github.com/yubssss", label: "GitHub", icon: <GithubIcon /> },
                { id: "linkedin", href: "https://www.linkedin.com/in/marjames-cayube-48386630a/?locale=en", label: "LinkedIn", icon: <LinkedInIcon /> },
                { id: "mail", href: "mailto:jamescayube7@gmail.com", label: "Email", icon: <MailIcon /> },
              ].map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onMouseEnter={() => setHoverSocial(s.id)}
                  onMouseLeave={() => setHoverSocial(null)}
                  style={{
                    padding: "10px",
                    borderRadius: "12px",
                    background: hoverSocial === s.id ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${hoverSocial === s.id ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.06)"}`,
                    color: hoverSocial === s.id ? "#a78bfa" : "#94a3b8",
                    transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
                    transform: hoverSocial === s.id ? "translateY(-2px)" : "translateY(0)",
                    display: "flex",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="shrink-0 w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 relative">
            <div aria-hidden="true"
              style={{
                position: "absolute",
                inset: -12,
                background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(20px)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)",
              }}
            >
              {!imgErr ? (
                <img
                  src={PROFILE_IMG}
                  alt="Mar James Cayube"
                  className="w-full h-full object-cover"
                  style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgErr(true)}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-purple-400 select-none bg-zinc-900">
                  MJC
                </div>
              )}
            </div>
          </div>
        </header>
      </FadeUp>

      {/* Skills grid */}
      <FadeUp delay={100}>
        <section aria-label="Technical skills">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Mobile Frameworks", items: "Flutter · React Native", accent: "#a78bfa" },
              { label: "Web & Database", items: "React · TypeScript · Vite · Supabase", accent: "#818cf8" },
              { label: "Architecture & Tools", items: "Git · Postman · EFSM · Clean Architecture", accent: "#e879f9" },
            ].map((s) => (
              <SkillCard key={s.label} label={s.label} items={s.items} accent={s.accent} />
            ))}
          </div>
        </section>
      </FadeUp>

      {/* About preview */}
      <FadeUp delay={150}>
        <div
          className="p-6 sm:p-8 rounded-2xl"
          style={{
            border: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(135deg, rgba(139,92,246,0.04), rgba(79,70,229,0.03))",
          }}
        >
          <p className="text-[10px] font-mono tracking-widest uppercase text-purple-400 font-bold mb-4">Currently seeking</p>
          <p className="text-white font-semibold text-lg">Full-time Software Engineering roles starting mid-2026</p>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Open to mobile (Flutter/React Native), full-stack, or front-end positions. Based in Antipolo City, Rizal — willing to relocate.
          </p>
          <button
            onClick={() => onNav("contact")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300"
            style={{ transition: "color 0.15s ease" }}
          >
            Get in touch →
          </button>
        </div>
      </FadeUp>

      <style>{`@keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }`}</style>
    </div>
  );
}

function SkillCard({ label, items, accent }: { label: string; items: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)"}`,
        background: hovered ? "rgba(139,92,246,0.04)" : "rgba(0,0,0,0.2)",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <p style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: accent, fontWeight: 700, marginBottom: "8px" }}>
        {label}
      </p>
      <p style={{ fontSize: "14px", color: "#fff", fontWeight: 500 }}>{items}</p>
    </div>
  );
}

// ─── PROJECTS TAB ─────────────────────────────────────────────────────────────
function ProjectsTab({ onGallery }: { onGallery: (p: Project) => void }) {
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [selectedTags, setSelectedTags] = useLocalStorage<string[]>("portfolio_tags", []);

  const toggleTag = (tag: string) =>
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]);

  const visible = PROJECTS.filter(p => {
    const catMatch = category === "all" || p.categories.includes(category);
    const tagMatch = selectedTags.length === 0 || selectedTags.every(t => p.tags.includes(t));
    return catMatch && tagMatch;
  });

  return (
    <div className="space-y-8">
      <FadeUp>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Engineered Solutions</h2>
            <p className="text-sm text-zinc-400 mt-1">Production-grade apps built from design to deployment.</p>
          </div>
          <div className="flex gap-0.5 p-1 rounded-xl shrink-0" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {(["all","mobile","web"] as ProjectCategory[]).map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg capitalize active:scale-95"
                style={{
                  background: category === c ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "transparent",
                  color: category === c ? "#fff" : "#94a3b8",
                  boxShadow: category === c ? "0 2px 10px rgba(124,58,237,0.25)" : "none",
                  transition: "all 0.18s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={e => { if (category !== c) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { if (category !== c) (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              >
                {c === "all" ? "All" : `${c} apps`}
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={60}>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 shrink-0 w-full sm:w-auto">Filter by tech</span>
          {TECH_TAGS.map(tag => <TechPill key={tag} tag={tag} selected={selectedTags.includes(tag)} onClick={toggleTag} />)}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-mono text-zinc-500 hover:text-white active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", transition: "all 0.15s ease" }}
            >
              Clear
            </button>
          )}
        </div>
      </FadeUp>

      <FadeUp delay={100}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUMMARIES.map(s => <SummaryCard key={s.label} label={s.label} value={s.value} />)}
        </div>
      </FadeUp>

      <div className="space-y-8">
        {visible.length === 0 ? (
          <FadeUp>
            <div className="rounded-2xl p-8 text-center text-sm text-zinc-400" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.25)" }}>
              No projects match the selected filters.
            </div>
          </FadeUp>
        ) : (
          visible.map((p, i) => (
            <FadeUp key={p.id} delay={i * 80}>
              <ProjectCard project={p} onGallery={onGallery} />
            </FadeUp>
          ))
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)"}`,
        background: hovered ? "rgba(139,92,246,0.05)" : "rgba(0,0,0,0.25)",
        padding: "16px",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <p style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: "#71717a" }}>{label}</p>
      <p style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginTop: "6px" }}>{value}</p>
    </div>
  );
}

// ─── ABOUT TAB ────────────────────────────────────────────────────────────────
function Section({ emoji, title, children, delay = 0 }: { emoji?: string; title: string; children: ReactNode; delay?: number }) {
  return (
    <FadeUp delay={delay}>
      <div
        className="p-6 sm:p-8 rounded-2xl space-y-4"
        style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(16px)" }}
      >
        <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
          {emoji && <span aria-hidden="true">{emoji}</span>}
          {title}
        </h3>
        {children}
      </div>
    </FadeUp>
  );
}

function AboutTab() {
  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="text-center mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">About Me</h2>
          <p className="text-zinc-400 mt-1 text-sm">Background, skills, and experience</p>
        </div>
      </FadeUp>

      <Section emoji="🎯" title="Career Objective" delay={50}>
        <p className="text-zinc-300 leading-relaxed text-sm">
          Motivated IT Graduate specializing in Mobile Application Development. Equipped with hands-on experience building cross-platform apps using Flutter and React Native from a 500-hour industry internship. Proven in translating complex UI/UX designs into functional code, managing RESTful API integrations, and implementing modern state management. Passionate about engineering scalable, user-friendly solutions.
        </p>
      </Section>

      <Section emoji="🎓" title="Education" delay={80}>
        <div>
          <h4 className="text-base font-semibold text-purple-400">B.S. in Information Technology</h4>
          <p className="text-zinc-300 text-sm">Technological Institute of the Philippines (TIP) QC</p>
          <p className="text-zinc-500 text-xs mt-0.5">Graduated 2026</p>
        </div>
      </Section>

      <Section emoji="⚙️" title="Technical Skills" delay={110}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILLS.map(s => (
            <div key={s.label}>
              <p className="text-sm font-medium text-purple-400 mb-2"><span aria-hidden="true">{s.emoji}</span> {s.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map(item => (
                  <span key={item}
                    className="px-2.5 py-1 text-xs rounded-lg text-zinc-300 hover:text-white hover:border-purple-500/30"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.15s ease" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section emoji="💼" title="Work Experience" delay={140}>
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h4 className="text-base font-semibold text-purple-400">Mobile Developer (Intern)</h4>
              <span className="text-xs text-zinc-500 px-2.5 py-0.5 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.05)" }}>500+ hrs</span>
            </div>
            <p className="text-zinc-300 text-sm font-medium">8box Solutions Inc.</p>
            <p className="text-zinc-500 text-xs mb-2">15F Centerpoint Bldg, Garnet Rd · Jan–Apr 2026</p>
            <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
              <li>Completed 500-hour internship focused on mobile app logic and clean architecture</li>
              <li>Contributed to 6 mobile projects, translating Figma mockups into pixel-perfect Flutter apps</li>
              <li>Managed and tested RESTful API integrations using Postman</li>
              <li>Developed core app features using Dart with advanced state management</li>
              <li>Collaborated with UI/UX engineers in Git-based agile sprints</li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-purple-400">Event Marshall (Part-time)</h4>
            <p className="text-zinc-300 text-sm font-medium">Switch Asia</p>
            <p className="text-zinc-500 text-xs mb-2">Pasay, Metro Manila · Sep 2025</p>
            <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
              <li>Managed high-traffic booth areas ensuring crowd safety and a positive environment</li>
              <li>Handled cross-functional roles with strong adaptability and communication</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section emoji="👑" title="Leadership" delay={170}>
        <div className="space-y-4">
          {([
            ["Project Lead · FurniView (AR App)", "Led the development of FurniView AR app, ensuring technical quality and on-time delivery."],
            ["Team Leader · NSTP Community Project", "Managed a community service painting project: task assignment, logistics, and team coordination."],
            ["Team Captain · Basketball", "Led team focus and motivation during games and practice; resolved internal conflicts to maintain morale."],
          ] as [string, string][]).map(([title, desc]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-purple-400">{title}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section emoji="📜" title="Seminars & Training" delay={200}>
        <div className="space-y-3">
          {([
            ["AI-powered Facebook Ads Strategies", "Leveraging AI for Campaign Optimization · Online · Feb 27, 2024"],
            ["Python Programming Application", "Unit 703 Parc House Bldg, Guadalupe · Feb 04, 2024"],
          ] as [string, string][]).map(([title, meta]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-purple-400">{title}</p>
              <p className="text-xs text-zinc-500">{meta}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── CONTACT TAB ─────────────────────────────────────────────────────────────
function ContactTab({ onDownload }: { onDownload: () => void }) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://formspree.io/f/xgvorypq", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("sent"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <div className="space-y-8">
      <FadeUp>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let's Connect</h2>
          <p className="text-zinc-400 mt-1 text-sm">Open to full-time roles and collaborations starting mid-2026</p>
        </div>
      </FadeUp>

      <FadeUp delay={60}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {([
              { icon: "📧", label: "Email", value: "jamescayube7@gmail.com", href: "mailto:jamescayube7@gmail.com" },
              { icon: "💼", label: "LinkedIn", value: "Connect with me", href: "https://www.linkedin.com/in/mar-james-cayube-30918035a/" },
              { icon: "🐙", label: "GitHub", value: "github.com/yubssss", href: "https://github.com/yubssss" },
              { icon: "📍", label: "Location", value: "Antipolo City, Rizal, Philippines", href: null },
            ] as { icon: string; label: string; value: string; href: string | null }[]).map(({ icon, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(139,92,246,0.15)" }} aria-hidden="true">{icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-purple-300" style={{ transition: "color 0.15s ease" }}>{label}</p>
                    <p className="text-xs text-zinc-400">{value}</p>
                  </div>
                </div>
              );
              const sharedStyle: React.CSSProperties = { border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)", borderRadius: "14px", padding: "16px", display: "block", transition: "all 0.2s cubic-bezier(.22,1,.36,1)" };
              return href ? (
                <a key={label} href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group"
                  style={sharedStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {inner}
                </a>
              ) : (
                <div key={label} style={sharedStyle}>{inner}</div>
              );
            })}
          </div>

          <div
            className="p-6 sm:p-8 rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}
          >
            <h3 className="text-lg font-bold text-white mb-5">Send a message</h3>
            {status === "sent" ? (
              <div className="text-center py-8">
                <p className="text-emerald-400 font-semibold">Message sent! 🎉</p>
                <p className="text-zinc-400 text-sm mt-1">I'll get back to you soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-xs text-purple-400 hover:text-purple-300 underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="hidden" name="_subject" value="Portfolio inquiry — marjames.dev" />
                {[
                  { id: "contact-name", name: "name", label: "Name", type: "text", placeholder: "Your name", required: true, minLength: 2, maxLength: 80 },
                  { id: "contact-email", name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true, maxLength: 120 },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-xs font-medium text-zinc-300 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      id={f.id}
                      name={f.name}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm focus:outline-none placeholder:text-zinc-600"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300 mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    maxLength={1200}
                    placeholder="Tell me about the opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm focus:outline-none resize-none placeholder:text-zinc-600"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.5)"; }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
                {status === "error" && <p className="text-xs text-red-400">Something went wrong. Try emailing directly.</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-2.5 text-white font-medium rounded-xl active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { if (status !== "sending") (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(124,58,237,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.25)"; }}
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={120}>
        <div
          className="w-full py-10 text-center rounded-2xl"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(135deg, rgba(139,92,246,0.04), rgba(79,70,229,0.04))",
          }}
        >
          <h3 className="text-xl font-bold text-white">Open for Opportunities</h3>
          <p className="text-zinc-400 mt-1.5 text-sm max-w-sm mx-auto">Seeking full-time software engineering roles starting mid-2026</p>
          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            <a href="mailto:jamescayube7@gmail.com"
              className="px-5 py-2.5 text-white font-medium text-sm rounded-xl active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.25)", transition: "all 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              📧 Email Me
            </a>
            <a href={RESUME_PATH} download="Marjames_Cayube_RESUME.pdf" onClick={onDownload} rel="noopener noreferrer"
              className="px-5 py-2.5 text-white text-sm rounded-xl active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.15)", background: "transparent", transition: "all 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Download CV
            </a>
            <a href="https://cal.com/marjames" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 text-white text-sm rounded-xl active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.15)", background: "transparent", transition: "all 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              📅 Schedule a Call
            </a>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────────
function PageWrapper({ children, tabKey }: { children: ReactNode; tabKey: string }) {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setVisible(false);
      rafRef.current = requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [tabKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s cubic-bezier(.22,1,.36,1), transform 0.4s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useLocalStorage<NavTab>("portfolio_tab", "home");
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [downloadCount, setDownloadCount] = useLocalStorage<number>("portfolio_downloads", 0);
  const scrollY = useScrollY();

  const handleNav = useCallback((tab: NavTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }, [activeTab, setActiveTab]);

  const handleDownload = () => setDownloadCount(downloadCount + 1);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #080810; }
        ::selection { background: rgba(139,92,246,0.3); color: white; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.5); }
      `}</style>

      <CursorGlow />
      <BgGrid />
      <ScrollBar scrollY={scrollY} />
      <Nav active={activeTab} onChange={handleNav} scrollY={scrollY} />

      <div
        className="min-h-screen text-white font-sans w-full overflow-x-hidden"
        style={{ background: "#080810", position: "relative", zIndex: 1 }}
      >
        {/* Full-width ambient orbs */}
        <div aria-hidden="true" style={{
          position: "fixed", top: "-20%", left: "-10%", width: "60%", height: "60%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div aria-hidden="true" style={{
          position: "fixed", bottom: "-20%", right: "-10%", width: "50%", height: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div
          className="px-5 sm:px-10 lg:px-16"
          style={{
            maxWidth: "1500px",
            width: "100%",
            margin: "0 auto",
            paddingTop: "88px",
            paddingBottom: "80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <main>
            <PageWrapper tabKey={activeTab}>
              {activeTab === "home" && (
                <HomeTab onNav={handleNav} downloadCount={downloadCount} onDownload={handleDownload} />
              )}
              {activeTab === "projects" && <ProjectsTab onGallery={setGalleryProject} />}
              {activeTab === "about" && <AboutTab />}
              {activeTab === "contact" && <ContactTab onDownload={handleDownload} />}
            </PageWrapper>
          </main>

          <footer
            className="mt-16 pt-6 text-center font-mono text-xs text-zinc-600"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p>© 2026 Mar James Cayube · Built with React, TypeScript, Vite & Tailwind CSS</p>
            <p className="mt-1">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </footer>
        </div>
      </div>

      {galleryProject && (
        <GalleryModal project={galleryProject} onClose={() => setGalleryProject(null)} />
      )}
    </>
  );
}

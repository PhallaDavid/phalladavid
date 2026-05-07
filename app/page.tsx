"use client";

import { useEffect, useState } from "react";
import { 
  Code, MapPin, Phone, Mail, Link as LinkIcon, Hand,
  Send,
  BadgeCheck, ArrowUpRight, GraduationCap, Building2,
  ChevronDown, ChevronUp, Menu, X
} from "lucide-react";
import {
  SiGithub,
  SiVuedotjs,
  SiNuxt,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiOpenai,
  SiClaude,
  SiTelegram,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const CursorLogoIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="currentColor" opacity="0.12" />
    <path
      d="M7.2 8.2L11.9 12 7.2 15.8 8.8 17.2 15.2 12 8.8 6.8 7.2 8.2z"
      fill="currentColor"
    />
    <path
      d="M13.2 7.2h3.6v3.6h-1.8V9h-1.8V7.2zm0 9.6h1.8V15h1.8v1.8h-3.6z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [activeLensIndex, setActiveLensIndex] = useState<number | null>(null);
  const [isLensExpanded, setIsLensExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTitleVisible(false);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
        setIsTitleVisible(true);
      }, 320);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollTop > 260);

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ["about", "experience", "education", "services", "projects"];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousLens = () => {
    setActiveLensIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? lensImages.length - 1 : prev - 1;
    });
  };

  const goToNextLens = () => {
    setActiveLensIndex((prev) => {
      if (prev === null) return prev;
      return prev === lensImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans pb-32 transition-colors duration-300">
      <div className="fixed top-0 left-0 z-[70] h-[2px] w-full bg-black/5 dark:bg-white/10 pointer-events-none">
        <div
          className={`h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-150 ${isScrolling ? "opacity-100" : "opacity-0"}`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="max-w-[768px] mx-auto border-x border-black/[0.04] dark:border-white/[0.04] min-h-screen flex flex-col relative">
        
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 pt-6 pb-4 bg-zinc-50/85 dark:bg-white/[0.04] backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04] transition-colors duration-300">
          <div className="flex-1">
            <img
              src="/imgaes/C5725E55-54EF-4952-91F5-7E25040B5672_1_105_c.jpeg"
              alt="Narak logo"
              className="w-9 h-9 rounded-xl object-cover border border-black/10 dark:border-white/15"
            />
          </div>
          <nav className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="hidden md:flex items-center gap-5">
              <a 
                href="#about" 
                className={`transition-colors ${activeSection === "about" ? "text-zinc-900 dark:text-zinc-100 font-medium underline  decoration-2 decoration-zinc-900 dark:decoration-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
              >
                About
              </a>
             
              <a 
                href="#experience" 
                className={`transition-colors ${activeSection === "experience" ? "text-zinc-900 dark:text-zinc-100 font-medium underline  decoration-2 decoration-zinc-900 dark:decoration-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
              >
                Experience
              </a>
               <a 
                href="#services" 
                className={`transition-colors ${activeSection === "services" ? "text-zinc-900 dark:text-zinc-100 font-medium underline  decoration-2 decoration-zinc-900 dark:decoration-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
              >
                Services
              </a>
              <a 
                href="#education" 
                className={`transition-colors ${activeSection === "education" ? "text-zinc-900 dark:text-zinc-100 font-medium underline  decoration-2 decoration-zinc-900 dark:decoration-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
              >
                Education
              </a>
              <a 
                href="#projects" 
                className={`transition-colors ${activeSection === "projects" ? "text-zinc-900 dark:text-zinc-100 font-medium underline  decoration-2 decoration-zinc-900 dark:decoration-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
              >
                Projects
              </a>
            </div>
            <div className="flex items-center gap-3 md:ml-4 md:pl-4 border-l border-transparent md:border-black/[0.04] md:dark:border-white/[0.04]">
              <a href="https://github.com/phalladavid" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"><GitHubIcon size={18} /></a>
              <ThemeToggle />
              <button className="md:hidden text-zinc-900 dark:text-zinc-100 ml-2" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile Sidebar Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-white dark:bg-[#0d0d0d] md:hidden flex flex-col items-center justify-center animate-in fade-in duration-200">
            <button className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} />
            </button>
            <nav className="flex flex-col items-center gap-10 text-2xl tracking-tight">
              <a 
                href="#about" 
                className={`font-medium transition-colors ${activeSection === "about" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#services" 
                className={`font-medium transition-colors ${activeSection === "services" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#experience" 
                className={`font-medium transition-colors ${activeSection === "experience" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="#education" 
                className={`font-medium transition-colors ${activeSection === "education" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Education
              </a>
              <a 
                href="#projects" 
                className={`font-medium transition-colors ${activeSection === "projects" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
            </nav>
          </div>
        )}


        <main className="flex flex-col w-full">
          {/* Profile Card / Header */}
          <div data-aos="fade-up" className="flex items-center justify-center py-12 border-b border-black/[0.04] dark:border-white/[0.04]">
            <div className="flex flex-col items-center gap-5">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-black/5 dark:border-white/10 p-1">
                <div className="w-full h-full rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src="/imgaes/C5725E55-54EF-4952-91F5-7E25040B5672_1_105_c.jpeg" alt="Narak" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-[13px] text-zinc-500 mb-1 font-mono">Just living with my oun rules.</p>
                <h1 className="text-3xl font-medium flex items-center justify-center gap-2 text-zinc-900 dark:text-zinc-50">
                  Phalla David <VerifiedBadge />
                </h1>
                <p
                  className={`text-zinc-500 dark:text-zinc-400 text-[15px] mt-1 transition-all duration-200 ${
                    isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  {rotatingTitles[titleIndex]}
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section id="about" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-5 text-zinc-900 dark:text-zinc-100">About</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
              Hello, Everyone! I am David. I focused on building modern, user-friendly applications. Motivated by problem-solving, performance, and lifelong learning.
            </p>
          </section>

          {/* Contact Info List Sectin */}
          <section data-aos="fade-up" className="border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8 flex flex-col gap-5">
            <div className="flex items-center gap-4 text-[15px] text-zinc-700 dark:text-zinc-300">
              <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500 dark:text-zinc-400"><Code size={16} /></div>
              <span>Software Developer @ <strong>Anakut Digital Solution</strong></span>
            </div>
            <div className="flex items-center gap-4 text-[15px] text-zinc-700 dark:text-zinc-300">
              <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500 dark:text-zinc-400"><MapPin size={16} /></div>
              <span>Phnom Penh, Cambodia</span>
            </div>
            <div className="flex items-center gap-4 text-[15px] text-zinc-700 dark:text-zinc-300">
              <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500 dark:text-zinc-400"><Phone size={16} /></div>
              <a href="tel:+85516763049" className="hover:underline underline-offset-4">+855 16 763 049</a>
            </div>
            <div className="flex items-center gap-4 text-[15px] text-zinc-700 dark:text-zinc-300">
              <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500 dark:text-zinc-400"><Mail size={16} /></div>
              <a href="mailto:phalladavidd@gmail.com" className="hover:underline underline-offset-4">phalladavidd@gmail.com</a>
            </div>
           
          </section>

          {/* Social Section */}
          <section id="social" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-5 text-zinc-900 dark:text-zinc-100">Social</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" data-aos="zoom-in-up" data-aos-delay="30" className="flex items-center justify-between p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.06] transition-all duration-300 group bg-zinc-50/85 dark:bg-white/[0.04] hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04]"><FacebookIcon size={20} className="text-zinc-700 dark:text-zinc-300" /></div>
                  <div>
                    <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-200">Facebook</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">Phalla David</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </a>
              
              <a href="https://www.instagram.com/daviqq____/" target="_blank" rel="noreferrer" data-aos="zoom-in-up" data-aos-delay="80" className="flex items-center justify-between p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.06] transition-all duration-300 group bg-zinc-50/85 dark:bg-white/[0.04] hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04]"><InstagramIcon size={20} className="text-zinc-700 dark:text-zinc-300" /></div>
                  <div>
                    <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-200">Instagram</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">daviqq____</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </a>

              <a href="https://github.com/phalladavid" target="_blank" rel="noreferrer" data-aos="zoom-in-up" data-aos-delay="130" className="flex items-center justify-between p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.06] transition-all duration-300 group bg-zinc-50/85 dark:bg-white/[0.04] hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04]"><GitHubIcon size={20} className="text-zinc-700 dark:text-zinc-300" /></div>
                  <div>
                    <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-200">GitHub</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">Phalla David</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </a>

              <a href="https://t.me/R4kie" target="_blank" rel="noreferrer" data-aos="zoom-in-up" data-aos-delay="180" className="flex items-center justify-between p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.06] transition-all duration-300 group bg-zinc-50/85 dark:bg-white/[0.04] hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl flex items-center justify-center border border-black/[0.04] dark:border-white/[0.04]">
                    <SiTelegram size={18} className="text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-200">Telegram</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">@R4kie</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </a>
            </div>
          </section>

          {/* Stack Section */}
          <section id="stack" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-5 text-zinc-900 dark:text-zinc-100">Stack</h2>
            <div className="bg-zinc-50/85 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.04] p-4 sm:p-6 rounded-2xl">
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                 {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="min-w-0 flex items-center gap-2 sm:gap-3 rounded-xl border border-black/[0.04] dark:border-white/[0.04] px-2.5 sm:px-3 py-2 sm:py-2.5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                    >
                      <tech.icon size={16} className="text-zinc-700 dark:text-zinc-200 shrink-0 sm:w-[18px] sm:h-[18px]" />
                      <span className="truncate text-[12px] sm:text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                        {tech.name}
                      </span>
                    </div>
                 ))}
               </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-2 text-zinc-900 dark:text-zinc-100">Experience</h2>
            <p className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-6">
              My professional journey and work experience in web development and technology.
            </p>

            <div className="flex flex-col gap-4">
              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <Building2 size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Codex Solutions</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Internship Web Developer <span className="mx-1">•</span> 2024 — 2025 (4 months)</p>
                    <p className="text-[13px] text-zinc-500 mt-2">
                      Contributing to web development projects by assisting in building and maintaining websites and web applications using modern technologies and best practices.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Laravel", "HTML", "CSS", "JavaScript", "Tailwind CSS", "MySQL", "Git"].map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-[12px] border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <Building2 size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Anakut Digital Solutions</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Web Developer <span className="mx-1">•</span> 2025 — Present</p>
                    <p className="text-[13px] text-zinc-500 mt-2">
                      Building personal projects to enhance skills in modern web technologies, learning best practices, and exploring new frameworks and tools.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["JavaScript", "Nuxt.js", "Vue.js", "GitLab", "Laravel", "Tailwind CSS", "HTML", "CSS", "MySQL", "PHP", "Vuetify"].map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-full text-[12px] border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-2 text-zinc-900 dark:text-zinc-100">Services</h2>
            <p className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-6">
              Services I provide for building modern web applications with responsive and user-friendly experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-100">Modern Web Application Development</h3>
                <p className="text-[13px] text-zinc-500 mt-2">
                  Build fast and maintainable web applications using modern frameworks, clean structure, and scalable architecture.
                </p>
              </div>
              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-100">Responsive User Experience</h3>
                <p className="text-[13px] text-zinc-500 mt-2">
                  Create responsive interfaces that look great on mobile, tablet, and desktop with smooth and intuitive interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" data-aos="fade-up" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <h2 className="text-2xl font-medium mb-2 text-zinc-900 dark:text-zinc-100">Education</h2>
            <p className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-6">
              My educational background and academic journey in technology and web development.
            </p>

            <div className="flex flex-col gap-4">
              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <GraduationCap size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Hun Sen Svaytany Primary School</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Primary Education <span className="mx-1">•</span> 2008 — 2015</p>
                    <p className="text-[13px] text-zinc-500 mt-2">Building foundational knowledge in various subjects.</p>
                  </div>
                </div>
              </div>

              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <GraduationCap size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Hun Sen S&apos;aang High School</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Secondary Education <span className="mx-1">•</span> 2015 — 2021</p>
                    <p className="text-[13px] text-zinc-500 mt-2">Building foundational knowledge in various subjects.</p>
                  </div>
                </div>
              </div>

              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <GraduationCap size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Royal University of Phnom Penh</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Bachelor Degree of Information Technology <span className="mx-1">•</span> 2021 — 2024</p>
                    <p className="text-[13px] text-zinc-500 mt-2">Continued education in web development, software engineering, databases, and modern programming practices.</p>
                  </div>
                </div>
              </div>

              <div className="border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center text-zinc-500">
                    <GraduationCap size={14} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100">Etec Center Institute of Technology</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">Short Course <span className="mx-1">•</span> 2024</p>
                    <p className="text-[13px] text-zinc-500 mt-2">Learning short courses in web development.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-28 border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 sm:px-8">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Projects</h2>
              <span className="text-zinc-500 text-sm">(2)</span>
            </div>
            <p className="text-[14px] text-zinc-500 dark:text-zinc-400 mb-6">
              Real projects I built across e-commerce and digital menu platforms.
            </p>

            <div className="flex flex-col gap-4">
              {projectEntries.map((project, i) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-black/[0.04] dark:border-white/[0.04] rounded-xl p-4 bg-zinc-50/85 dark:bg-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.08] transition-colors"
                >
                  <div className={`flex flex-col md:items-stretch gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="md:w-1/2">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden border border-black/[0.04] dark:border-white/[0.04] bg-zinc-100 dark:bg-zinc-800">
                        <img src={project.image} alt={project.thumbnailAlt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="font-medium text-[16px] text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                        {project.title} <ArrowUpRight size={14} className="text-zinc-400" />
                      </h3>
                      <p className="text-[13px] text-zinc-500 mt-0.5">{project.date}</p>
                      <p className="text-[13px] text-zinc-500 mt-2">{project.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.skills.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-full text-[12px] border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
          
          {/* Lens Section */}
          <section data-aos="fade-up" className="border-b border-dashed border-black/[0.04] dark:border-white/[0.04] px-4 py-8 pb-20 sm:px-8">
             <h2 className="text-2xl font-medium mb-5 text-zinc-900 dark:text-zinc-100">My Gallery</h2>
             <div className="mb-6 flex items-center justify-between gap-3">
               <span className="px-4 py-1.5 bg-zinc-900 text-white text-[13px] rounded-full">
                 {isLensExpanded ? `All (${lensImages.length})` : "Top 6"}
               </span>
               <button
                 type="button"
                 onClick={() => setIsLensExpanded((prev) => !prev)}
                 className="text-[13px] text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
               >
                 {isLensExpanded ? "Show less" : "Show all"}
               </button>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(isLensExpanded ? lensImages : lensImages.slice(0, 6)).map((image, i) => (
                <button
                  key={image}
                  onClick={() => setActiveLensIndex(i)}
                  className="aspect-[4/5] rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-black/[0.04] dark:border-white/[0.04] cursor-zoom-in"
                >
                  <img src={image} alt="Lens item" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </button>
               ))}
             </div>
          </section>

          <footer className="px-4 py-8 sm:px-8">
            <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-zinc-50/85 dark:bg-white/[0.04] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Phalla David</p>
                  <p className="text-[13px] mt-1 text-zinc-500 dark:text-zinc-400">
                    Building modern, reliable web experiences.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://github.com/phalladavid" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-black/20 dark:hover:border-white/20 transition-colors" aria-label="GitHub">
                    <GitHubIcon size={16} />
                  </a>
                  <a href="https://www.instagram.com/daviqq____/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-black/20 dark:hover:border-white/20 transition-colors" aria-label="Instagram">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-black/20 dark:hover:border-white/20 transition-colors" aria-label="Facebook">
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                  © {new Date().getFullYear()} Phalla David. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-[12px] text-zinc-500 dark:text-zinc-400">
                  <a href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">About</a>
                  <a href="#services" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Services</a>
                  <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</a>
                  <a href="mailto:phalladavidd@gmail.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </footer>

        </main>
      </div>

      {activeLensIndex !== null && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLensIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close image dialog"
          >
            <X size={28} />
          </button>

          <button
            onClick={goToPreviousLens}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronDown size={28} className="rotate-90" />
          </button>

          <div className="w-full max-w-5xl flex flex-col items-center gap-4">
            <div className="text-white/75 text-[13px]">
              {activeLensIndex + 1} / {lensImages.length}
            </div>
            <img
              src={lensImages[activeLensIndex]}
              alt="Lens preview"
              className="max-w-full max-h-[68vh] rounded-2xl object-contain"
            />
            <div className="w-full overflow-x-auto">
              <div className="mx-auto w-max flex items-center gap-2 px-1">
                {lensImages.map((image, i) => (
                  <button
                    key={`thumb-${image}`}
                    onClick={() => setActiveLensIndex(i)}
                    aria-label={`Preview image ${i + 1}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border transition-all ${i === activeLensIndex ? "border-white scale-105" : "border-white/25 hover:border-white/60"}`}
                  >
                    <img src={image} alt={`Lens thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={goToNextLens}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronDown size={28} className="-rotate-90" />
          </button>
        </div>
      )}

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-28 sm:bottom-32 right-4 sm:right-8 w-11 h-11 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-200 border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-800/85 backdrop-blur-md shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 z-40 ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <ChevronUp size={19} />
      </button>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[768px] px-4 sm:px-8 z-50 pointer-events-none">
        <div className="w-full flex gap-3 pointer-events-auto">
          <a href="https://t.me/R4kie" target="_blank" rel="noreferrer" className="flex-1 py-2.5 px-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border border-black/10 dark:border-white/20 transition-all flex items-center justify-center gap-2 text-[14px] font-medium shadow-xl hover:bg-zinc-800 dark:hover:bg-zinc-100">
            <Hand size={15} />
            Get in touch
          </a>
          <a href="mailto:phalladavidd@gmail.com" className="flex-1 py-2.5 px-4 rounded-full bg-white/95 dark:bg-zinc-800 border border-black/10 dark:border-white/10 transition-all flex items-center justify-center gap-2 text-[14px] font-medium text-zinc-800 dark:text-zinc-200 shadow-xl hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <Send size={16} /> Send Email
          </a>
        </div>
      </div>
    </div>
  );
}

const techStack = [
  { name: "GitHub", icon: SiGithub },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Nuxt.js", icon: SiNuxt },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "ChatGPT", icon: SiOpenai },
  { name: "Claude", icon: SiClaude },
  { name: "VS Code", icon: VscVscode },
  { name: "Cursor", icon: CursorLogoIcon },
];

const lensImages = [
  "/len/E51FA293-698B-46F4-8E4B-98B72D663DBF_1_105_c.jpeg",
  "/len/19BA2EA7-E443-480F-803D-4294F45F9DC1_1_105_c.jpeg",
  "/len/630E2172-0787-4526-9E5B-4D013DF58BF6_1_105_c.jpeg",
  "/len/B891EF4F-8696-4CAB-9D2C-897E62378C92_1_105_c.jpeg",
  "/len/BD2C3254-61B0-4FF9-91A9-5008782E4612_1_105_c.jpeg",
  "/len/CF6FA3FA-3742-4DF8-8A72-E4F809A06B06_1_105_c.jpeg",
  "/len/F804AAC1-0292-4EE3-AD90-5D6B19B30E10_1_105_c.jpeg",
  "/len/81E5C24A-2B1A-45BB-A6FE-584E0D4778CC_1_105_c.jpeg",
  "/len/3523AF20-B5C6-4E44-B008-7FD976BF727E_1_105_c.jpeg",
  "/len/E5A3DC0A-CD3E-4464-BFF1-75613D346D6D_1_105_c.jpeg",
  "/len/5932A446-BAFC-4EAC-A808-62960994543A_1_105_c.jpeg",
];

const projectEntries = [
  {
    title: "E-commerce Web Application",
    date: "Jan 2026 — Present",
    description:
      "Developed a modern e-commerce platform that allows users to browse products, place orders, and receive real-time notifications. The application combines a responsive front-end, robust backend APIs, and automated alerts for seamless user experience.",
    skills: ["Node.js", "Next.js", "Tailwind CSS", "MySQL", "Laravel", "JavaScript", "Git", "API", "Notifications"],
    image: "/imgaes/image.png",
    thumbnailAlt: "Thumbnail for E-commerce Web Application",
    url: "https://ecommerce-store-rouge-seven.vercel.app/",
  },
  {
    title: "QR Menu Digital (K&H Coffee)",
    date: "Sep 2025 — Oct 2025",
    description:
      "Built a digital QR menu platform for coffee shops to display products, prices, and categories on mobile devices. Focused on fast loading, clean UI, and easy content updates for staff.",
    skills: ["Nuxt.js", "Laravel", "Tailwind CSS", "MySQL", "QR Menu"],
    image: "/imgaes/image copy.png",
    thumbnailAlt: "Thumbnail for K&H Coffee",
    url: "https://emenu-6rrl.vercel.app/",
  },
];

const rotatingTitles = [
  "Software Developer",
  "Web Developer",
  "Technology Enthusiast",
  "Lifelong Learner",
];

type SocialIconProps = {
  size?: number;
  className?: string;
};

const FacebookIcon = ({ size = 20, className }: SocialIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.019 4.388 11.008 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.022 1.792-4.693 4.533-4.693 1.312 0 2.686.236 2.686.236v2.966h-1.514c-1.49 0-1.956.93-1.956 1.885v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.081 24 18.092 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className }: SocialIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4zm4.65-2.17a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
  </svg>
);

const GitHubIcon = ({ size = 20, className }: SocialIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.08-.74.08-.74a2.53 2.53 0 0 1 1.84 1.24 2.57 2.57 0 0 0 3.5 1 2.56 2.56 0 0 1 .77-1.61c-2.66-.3-5.47-1.33-5.47-5.91a4.63 4.63 0 0 1 1.23-3.21 4.3 4.3 0 0 1 .12-3.17s1-.32 3.3 1.23a11.32 11.32 0 0 1 6 0c2.27-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 0 1 .12 3.17 4.62 4.62 0 0 1 1.23 3.21c0 4.59-2.81 5.61-5.49 5.9a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
  </svg>
);

const VerifiedBadge = () => (
  <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_6px_16px_-8px_rgba(37,99,235,0.8)] ring-2 ring-white/80 dark:ring-zinc-900">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 10.5 8.2 13.6 15 6.8"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="absolute -inset-[1px] rounded-full border border-white/20 dark:border-white/30" />
  </span>
);

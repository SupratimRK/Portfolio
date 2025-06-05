import { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Home,
  Mail,
  Menu,
  X,
  Github,
  Twitter,
  Cpu,
  Wrench,
  Sparkles,
  Zap,
  Code,
  Coffee,
  CircuitBoard,
  School,
  Building,
  Trophy,
  User,
  MapPin,
  Calendar,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Monitor,
  Terminal,
  ChevronDown,
  Wifi,
  Battery,
  Bluetooth,
  Radio,
  Lightbulb,
  Rocket,
  Heart,
  Star,
  Flame,
  Brain,
  Eye,
} from "lucide-react";
import ChatBot from './ChatBot';

// --- Creative Components ---

// Typing Effect Component
const TypingEffect = ({ texts, speed = 100, delay = 2000 }: { texts: string[], speed?: number, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const current = texts[textIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(current.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === current.length) {
          setTimeout(() => setIsDeleting(true), delay);
          return;
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentIndex, textIndex, isDeleting, texts, speed, delay]);

  return (
    <span className="text-green-400 font-mono">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Simplified Floating Circuit Elements - less animations
const FloatingCircuit = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple static circuit paths */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Static circuit lines */}
        <path
          d="M 50 100 L 200 100 L 200 200 L 350 200 L 350 100 L 500 100"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 100 300 L 300 300 L 300 450 L 450 450 L 450 300 L 600 300"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          fill="none"
        />
        
        {/* Simple circuit nodes - no animation */}
        <circle cx="200" cy="100" r="2" fill="#22c55e" opacity="0.6" />
        <circle cx="350" cy="200" r="2" fill="#3b82f6" opacity="0.6" />
        <circle cx="450" cy="450" r="2" fill="#8b5cf6" opacity="0.6" />
      </svg>
    </div>
  );
};

// Removed Matrix Rain Effect - too distracting

// Simplified Glitch Text Effect - less frequent
const GlitchText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 15000); // Much less frequent - every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`${className} ${isGlitching ? 'text-green-400' : ''} transition-colors duration-100`}
    >
      {children}
    </span>
  );
};

// Enhanced Navbar Component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#education", label: "Education", icon: GraduationCap },
    { href: "#projects", label: "Projects", icon: Briefcase },
    { href: "#skills", label: "Skills", icon: Cpu },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">          {/* Logo */}
          <div className="flex items-center space-x-2">
            <CircuitBoard className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold text-gradient-primary">
              <GlitchText>Supratim.dev</GlitchText>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-green-500/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md rounded-lg mt-2 mb-4 border border-green-500/20">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-colors border-b border-gray-700/50 last:border-b-0"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

// --- Data Definitions ---

// Skills Data
const skillsData = [
  {
    category: "Electronics & Hardware",
    icon: CircuitBoard,
    color: "text-green-400",
    skills: [
      { name: "Circuit Design", level: 85 },
      { name: "PCB Design (KiCad)", level: 80 },
      { name: "Arduino/ESP32", level: 90 },
      { name: "MPPT Systems", level: 75 },
      { name: "Soldering", level: 85 },
    ]
  },
  {
    category: "Programming",
    icon: Code,
    color: "text-blue-400",
    skills: [
      { name: "Python", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "JavaScript/TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Firebase", level: 75 },
    ]
  },
  {
    category: "Tools & Software",
    icon: Wrench,
    color: "text-purple-400",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 85 },
      { name: "LaTeX", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Docker", level: 60 },
    ]
  }
];

// Achievements / Fails - More creative
const achievements = [
  "😴 <strong>Didn't get into IIT...</strong> but hey, now I sleep better than them! 💤",
  "🔥 <strong>Burnt 3 MOSFETs in a row...</strong> They're now part of my 'Hall of Shame' collection 🏆",
  "🗿 <strong>Built a circuit that never worked...</strong> It's now modern art on my desk 🎨",
  "👻 <strong>Applied to 10 internships, got ghosted by 11...</strong> Apparently parallel universes also reject me 🌌",
  "📉 <strong>Got a C in Digital Communication...</strong> The irony was not lost on the professor 😂",
  "☕ <strong>Consumed approximately 547 cups of chai...</strong> while building one project. Efficiency level: Bengali 🎯",
  "🌱 <strong>Built an auto plant watering system...</strong> Plants are now thriving. My social life? Still needs irrigation 💧",
  "🎯 <strong>Hit compile error #404...</strong> Code not found, developer crying 😭",
];

// Education Data
const education = [
  {
    degree: "B.Tech in Electronics & Communication",
    institution: "Dr. B. C. Roy Engineering College, Durgapur",
    period: "2022 - Present",
    icon: Building,
    details: [
      "CGPA: 6.9/10 (Still surviving the academic battlefield! 🏁)",
      "Relevant Coursework: Embedded Systems, Signal Processing, VLSI Design",
      "Lab Champion: Where theory meets smoke alarms and occasional explosions 🔥",
      "Special Skill: Making professors question their life choices 🤔",
    ]
  },
  {
    degree: "Higher Secondary (WBCHSE)",
    institution: "Sainthia High School",
    period: "2019 - 2021",
    icon: School,
    details: [
      "Percentage: 69.69% (Back when I thought I had life figured out 📚)",
      "Stream: Science (PCM + Computer)",
      "First encounter with resistors and capacitors (Love at first sight ⚡)",
      "Discovered that 'Engineering' was my calling (Or so I thought... 😅)",
    ]
  }
];

// Project Data - Enhanced with more personality
const projects = [
  {
    title: "MPPT Solar Charging System",
    type: "Hardware",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    description: "Buck-boost converter with Arduino control for maximum power point tracking. Features real-time monitoring and efficiency optimization. Spoiler: It exploded spectacularly! 💥",
    technologies: ["Arduino", "C++", "Power Electronics", "PCB Design", "Tears", "Prayer"],
    status: "Educational Failure",
    statusColor: "text-red-400",
    challenges: ["MOSFET explosions (RIP brave soldiers 🪦)", "Noisy signals dancing the cha-cha", "PID controller developing trust issues"],
    learnings: "Power electronics is basically controlled magic. Also, always check your component ratings twice! 🔍",
    github: "https://github.com/SupratimRK/mppt-solar-charger",
    demo: null,
    funFact: "🎭 This project taught me that magic smoke is indeed finite and non-renewable."
  },
  {
    title: "Smart Home Automation (Gone Rogue)",
    type: "IoT",
    icon: <Home className="w-6 h-6 text-blue-400" />,
    description: "ESP8266-based home automation with relay control, mobile app integration, and voice commands. Works 60% of the time, every time! 🎲",
    technologies: ["ESP8266", "Blynk", "C++", "IoT", "Wishful Thinking", "Debugging Prayers"],
    status: "Works Sometimes",
    statusColor: "text-yellow-400",
    challenges: ["WiFi connectivity playing hide and seek 📶", "Relays having mood swings", "Power supply being dramatic"],
    learnings: "IoT is fun but unreliable hardware adds 'character'. Also learned: Smart homes make you feel dumb. 🤖",
    github: "https://github.com/SupratimRK/smart-home",
    demo: null,
    funFact: "🌟 The lights once turned on at 3 AM. Either it's haunted or I have a ghost roommate."
  },
  {
    title: "Portfolio Website (Meta Inception)",
    type: "Web",
    icon: <Monitor className="w-6 h-6 text-purple-400" />,
    description: "This very website! Built with React, TypeScript, and Tailwind CSS. Features responsive design, AI chatbot integration, and excessive self-referential humor. 🎪",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Coffee", "Existential Crisis"],
    status: "Live & Kicking",
    statusColor: "text-green-400",
    challenges: ["CSS centering (the eternal struggle)", "Responsive design nightmares", "Writing about myself without cringing"],
    learnings: "React is powerful, TypeScript saves tears, writing about yourself is surprisingly hard. Also, recursion is everywhere! 🔄",
    github: "https://github.com/SupratimRK/portfolio",
    demo: "https://portfolio.supratim.me",
    funFact: "🎨 This portfolio has more versions than Windows. Currently on v47.3.1-alpha-beta-gamma."
  }
];

// --- Main App Component ---
export default function App() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // SEO constants
  const siteTitle = "Supratim Mondal | Electronics Engineer & Developer";
  const siteDescription = "Portfolio of Supratim Mondal - Electronics & Communication Engineering student passionate about hardware design, embedded systems, and web development.";
  const siteUrl = "https://portfolio.supratim.me";
  const siteKeywords = "Supratim Mondal, Electronics Engineering, PCB Design, Arduino, React Developer, MPPT, IoT, Portfolio";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <link rel="canonical" href={siteUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Supratim Mondal" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:site" content="@supratimrk" />

        <link rel="icon" href="/tea.svg" type="image/svg+xml" />
        <html lang="en" />
      </Helmet>      <div className="bg-gray-900 text-white min-h-screen font-sans relative circuit-bg">
        <FloatingCircuit />
        <Navbar />

        {/* Hero Section - Enhanced with creativity */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-4">                  <div className="flex items-center space-x-2 text-green-400 font-medium">
                    <CircuitBoard className="w-5 h-5" />
                    <span>Electronics Engineer & Developer</span>
                    <Rocket className="w-5 h-5" />
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <GlitchText className="text-gradient-primary">Supratim</GlitchText>
                    <br />
                    <span className="text-white">Mondal</span>
                  </h1>
                  
                  <div className="text-xl text-gray-300 leading-relaxed max-w-xl">
                    <p className="mb-4">
                      Turning <span className="text-green-400 font-semibold">caffeine into circuits</span> and 
                      <span className="text-blue-400 font-semibold"> bugs into features</span>. 
                    </p>                    <p className="text-lg">
                      Currently: <TypingEffect 
                        texts={[
                          "Building things that shouldn't work but do 🔧",
                          "Debugging life, one semicolon at a time 🐛",
                          "Converting chai into code ☕",
                          "Making MOSFETs cry 😢",
                          "Surviving engineering college 🎓"
                        ]}
                        speed={100}
                        delay={5000}
                      />
                    </p>
                  </div>
                </div>

                {/* Enhanced Status indicators */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-green-500/30">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>Sainthia, West Bengal</span>
                  </div>                  <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-blue-500/30">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Available for chaos</span>
                  </div><div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-purple-500/30">
                    <Coffee className="w-4 h-4 text-orange-400" />
                    <span>Chai level: Maximum</span>
                  </div>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-wrap gap-4">                  <a
                    href="#projects"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <Briefcase className="w-5 h-5" />
                    View Projects
                    <Sparkles className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Get In Touch
                    <Heart className="w-4 h-4 text-red-400" />
                  </a>
                </div>

                {/* Enhanced Social Links */}
                <div className="flex items-center gap-4">                  <a
                    href="https://github.com/SupratimRK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/supratimrk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:supratimrk@outlook.com"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
                    aria-label="Email Contact"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Content - Enhanced Terminal */}
              <div className="animate-fade-in-up animation-delay-200">
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-2xl overflow-hidden hover:border-green-500/50 transition-colors duration-300">
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-3 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">supratim@dev:~</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-green-400" />
                      <Battery className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                  <div className="p-6 font-mono text-sm">
                    <div className="space-y-2">
                      <div className="text-green-400">$ whoami</div>
                      <div className="text-gray-300 ml-2">Supratim Mondal - The Soldering Socialite 😉</div>
                      
                      <div className="text-green-400 mt-4">$ cat skills.txt</div>
                      <div className="text-gray-300 ml-2 space-y-1">
                        <div>├── Hardware: Arduino, PCB Design, MPPT ⚡</div>
                        <div>├── Software: React, Python, C++ 💻</div>
                        <div>├── Tools: KiCad, VS Code, Git 🛠️</div>
                        <div>├── Debugging: Expert level crying 😭</div>
                        <div>└── Superpower: Turning coffee into code ☕</div>
                      </div>
                      
                      <div className="text-green-400 mt-4">$ current_status</div>
                      <div className="text-gray-300 ml-2">Building circuits, breaking code, learning daily 🚀</div>
                      
                      <div className="text-green-400 mt-4">$ fun_fact</div>
                      <div className="text-gray-300 ml-2">MOSFETs fear me, but I fear spiders 🕷️</div>
                      
                      <div className="text-green-400 mt-4 animate-pulse">$ █</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Enhanced Scroll Indicator - with subtle animations */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400 text-sm animate-pulse">Scroll for more chaos</span>
              <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>          {/* Enhanced Background Elements - with subtle float animations */}
          <div className="absolute top-20 right-10 w-32 h-32 text-green-500/10 animate-float" style={{ animationDuration: '6s' }}>
            <CircuitBoard className="w-full h-full" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 text-blue-500/10 animate-float" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <Cpu className="w-full h-full" />
          </div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 text-purple-500/10 animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}>
            <Lightbulb className="w-full h-full" />
          </div>
        </section>

        {/* About Section - Enhanced with more personality */}
        <section id="about" className="py-20 bg-gray-800/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-white mb-4">
                About Me <Flame className="inline w-8 h-8 text-orange-400" />
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A passionate Electronics Engineering student who loves building things that shouldn't work but somehow do.
                <br />
                <span className="text-green-400 italic">Powered by chai, driven by curiosity, debugged by tears.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Enhanced Image placeholder */}              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-1 transition-transform duration-300">
                  <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-center space-y-4 relative z-10">                      <Coffee className="w-16 h-16 text-orange-400 mx-auto" />
                      <p className="text-gray-300">Fueled by chai ☕</p>
                      <div className="flex justify-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                    {/* Static elements */}
                    <div className="absolute top-4 right-4">
                      <Brain className="w-6 h-6 text-purple-400/50" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Zap className="w-6 h-6 text-yellow-400/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Enhanced About content */}
              <div className="space-y-6">
                <div className="space-y-4">                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    The Journey So Far 
                    <Rocket className="w-6 h-6 text-blue-400" />
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      I'm currently pursuing my B.Tech in Electronics & Communication Engineering 
                      at Dr. B. C. Roy Engineering College. My journey started with a simple question: 
                      "Why does this button do that?" and has evolved into a passion for creating 
                      both hardware and software solutions.
                    </p>
                    <p>
                      When I'm not busy debugging circuits or chasing elusive semicolons, you'll 
                      find me experimenting with new technologies, contributing to open-source projects, 
                      or explaining to my family why their WiFi isn't working (again).
                    </p>
                    <p className="text-green-400 italic">
                      Fun fact: I've consumed approximately 547 cups of chai this semester. 
                      My circuits run on caffeine and determination! ☕⚡
                    </p>
                  </div>
                </div>

                {/* Enhanced Quick Facts */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-colors duration-300">                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    Quick Facts <Eye className="w-5 h-5 text-blue-400" />
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2 hover:text-green-400 transition-colors">
                      <CircuitBoard className="w-4 h-4 text-green-400" />
                      <span>MOSFETs sacrificed in the name of learning: 3+ (RIP brave soldiers 🪦)</span>
                    </li>                    <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                      <Coffee className="w-4 h-4 text-orange-400" />
                      <span>Daily chai consumption: Immeasurable (Bengal approved ✅)</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span>Favorite debugging method: Strategic console.log placement 🎯</span>
                    </li>
                    <li className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>Family tech support success rate: 99.9% (that 0.1% was my own laptop 😅)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Enhanced with animations */}
        <section id="skills" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-white mb-4 flex justify-center items-center gap-3">
                Skills & Expertise 
                <Wrench className="w-8 h-8 text-green-400" />
              </h2>
              <p className="text-xl text-gray-400">
                My toolkit for turning <span className="text-green-400 font-semibold">ideas into reality</span> 
                (and occasionally into smoke) 🔥
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skillsData.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 group"
                  >                    <div className="flex items-center gap-3 mb-6">
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                        {category.category}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                            <span className="text-sm text-gray-400 group-hover:text-green-400 transition-colors">{skill.level}%</span>
                          </div>                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${skill.level}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Fun Achievements */}
            <div className="mt-16 bg-gray-800/50 rounded-lg p-8 border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Epic Achievements & Glorious Failures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <div
                      className="text-sm text-gray-300 group-hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: achievement }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section - Enhanced */}
        <section id="education" className="py-20 bg-gray-800/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-white mb-4 flex justify-center items-center gap-3">
                Education 
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </h2>
              <p className="text-xl text-gray-400">
                My academic journey and learning milestones 
                <span className="text-green-400">(AKA survival story)</span>
              </p>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">                        <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <Icon className="w-8 h-8 text-green-400" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-green-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-gray-400 text-sm mb-4">{edu.period}</p>
                        
                        <ul className="space-y-2">                          {edu.details.map((detail, i) => (
                            <li key={i} className="text-gray-300 flex items-start gap-2 group-hover:text-white transition-colors">
                              <span className="text-green-400 mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section - Enhanced with more personality */}
        <section id="projects" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-white mb-4 flex justify-center items-center gap-3">
                Featured Projects 
                <Briefcase className="w-8 h-8 text-purple-400" />
              </h2>
              <p className="text-xl text-gray-400">
                A collection of my adventures in hardware and software 
                <br />
                <span className="text-green-400 italic">(Warning: Some explosions occurred during development 💥)</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">                      <div className="flex items-center gap-3">
                        <div>
                          {project.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-sm text-gray-400">{project.type}</span>
                        </div>
                      </div>                      <span className={`text-sm px-2 py-1 rounded-full bg-gray-700 ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-white transition-colors">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full hover:bg-green-500/20 hover:text-green-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Challenges */}
                    <div className="mb-4">                      <h4 className="text-sm font-medium text-yellow-400 mb-2 flex items-center gap-1">
                        Key Challenges:
                        <Flame className="w-3 h-3" />
                      </h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {project.challenges.map((challenge, i) => (                          <li key={i} className="flex items-start gap-1 hover:text-gray-300 transition-colors">
                            <span className="text-red-400">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learnings */}
                    <div className="mb-4">                      <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-1">
                        Key Learnings:
                        <Brain className="w-3 h-3" />
                      </h4>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{project.learnings}</p>
                    </div>

                    {/* Fun Fact */}
                    {project.funFact && (
                      <div className="mb-4 bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">                        <h4 className="text-sm font-medium text-purple-400 mb-1 flex items-center gap-1">
                          Fun Fact:
                          <Star className="w-3 h-3" />
                        </h4>
                        <p className="text-xs text-purple-300">{project.funFact}</p>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all hover:scale-110"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all hover:scale-110"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Enhanced */}
        <section id="contact" className="py-20 bg-gray-800/50 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">            <h2 className="text-4xl font-bold text-white mb-6 flex justify-center items-center gap-3 animate-fade-in-up">
              Let's Build Something Amazing 
              <Heart className="w-8 h-8 text-red-400 animate-pulse" style={{ animationDuration: '2s' }} />
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Have an interesting project? Want to collaborate? Or just want to chat about circuits and chai? 
              <br />              <span className="text-green-400 font-semibold">I'd love to hear from you!</span>
              <Coffee className="inline w-5 h-5 text-orange-400 ml-2" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <a
                href="mailto:supratimrk@outlook.com"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >                <Mail className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">Email Me</h3>
                <p className="text-gray-400 text-sm">supratimrk@outlook.com</p>
                <div className="mt-2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to send some digital love! 💌
                </div>
              </a>

              <a
                href="https://github.com/SupratimRK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >                <Github className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">GitHub</h3>
                <p className="text-gray-400 text-sm">Check out my code</p>
                <div className="mt-2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Where my code lives and dies! 💀
                </div>
              </a>

              <a
                href="https://twitter.com/supratimrk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >                <Twitter className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">Twitter</h3>
                <p className="text-gray-400 text-sm">Follow my journey</p>
                <div className="mt-2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Random thoughts at 3 AM! 🌙
                </div>
              </a>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-8 border border-green-500/30 hover:border-green-500/50 transition-colors duration-300">              <h3 className="text-2xl font-bold text-white mb-4 flex justify-center items-center gap-2">
                Current Status 
                <Radio className="w-6 h-6 text-green-400" />
              </h3>              <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="font-medium">Available for opportunities (and interesting conversations)</span>
              </div>
              <p className="text-gray-300">                I'm actively seeking internship opportunities and exciting projects to work on. 
                Let's create something extraordinary together! 
                <Rocket className="inline w-5 h-5 text-purple-400 ml-2" />
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-700 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span>Forged with React, Tailwind, & unhealthy amounts of chai</span>
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <p>© {new Date().getFullYear()} Supratim Mondal. All circuits reserved. ⚡</p>
            </div>
            <div className="mt-4 text-xs text-gray-600">
              <GlitchText>
                "Code is poetry, circuits are art, and debugging is therapy." - Someone wise (probably)
              </GlitchText>
            </div>
          </div>
        </footer>        {/* Enhanced Eye-Catching Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Pulsing background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Chat Button with enhanced animations */}
          <button
            onClick={() => setIsChatModalOpen(true)}
            className="relative bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-500 group animate-bounce"
            style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}
            aria-label="Chat with AI Assistant"
          >            {/* Sparkles icon with rotation */}
            <Sparkles className="w-6 h-6 group-hover:animate-spin transition-transform duration-700" />
            
            {/* Floating mini sparkles around the button */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </button>
          
          {/* Floating tooltip that appears on hover */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg border border-green-500/30 whitespace-nowrap">
              <span className="text-sm font-medium">Chat with AI Assistant 🤖</span>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        <ChatBot
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />
      </div>
    </HelmetProvider>
  );
}
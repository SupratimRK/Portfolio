import { useState } from "react";
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
} from "lucide-react";
import ChatBot from './ChatBot';

// --- Enhanced Navbar Component ---
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <CircuitBoard className="w-8 h-8 text-green-400 animate-pulse" />
            <span className="text-xl font-bold text-gradient-primary">Supratim.dev</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-green-500/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

// Achievements / Fails
const achievements = [
  "😴 <strong>Didn't get into IIT...</strong> but hey, now I get more sleep than them.",
  "🔥 <strong>Burnt 3 MOSFETs in a row...</strong> Still convinced it was their fault, not mine.",
  "🗿 <strong>Built a circuit that never worked...</strong> It's now a paperweight. A very aesthetic one.",
  "👻 <strong>Applied to 10 internships, got ghosted by 11...</strong> Math doesn't check out but the pain does.",
  "📉 <strong>Got a C in Digital Communication...</strong> The irony was not lost on me.",
];

// Education Data
const education = [
  {
    degree: "B.Tech in Electronics & Communication",
    institution: "Dr. B. C. Roy Engineering College, Durgapur",
    period: "2022 - Present",
    icon: Building,
    details: [
      "CGPA: 8.2/10 (Still surviving!)",
      "Relevant Coursework: Embedded Systems, Signal Processing, VLSI Design",
      "Lab Champion: Where theory meets smoke alarms 🔥",
    ]
  },
  {
    degree: "Higher Secondary (WBCHSE)",
    institution: "Sainthia High School",
    period: "2019 - 2021",
    icon: School,
    details: [
      "Percentage: 94.2%",
      "Stream: Science (PCM + Computer)",
      "First encounter with resistors and capacitors",
    ]
  }
];

// Project Data
const projects = [
  {
    title: "MPPT Solar Charging System",
    type: "Hardware",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    description: "Buck-boost converter with Arduino control for maximum power point tracking. Features real-time monitoring and efficiency optimization.",
    technologies: ["Arduino", "C++", "Power Electronics", "PCB Design"],
    status: "Educational Failure",
    statusColor: "text-red-400",
    challenges: ["MOSFET explosions", "Noisy signals", "PID tuning nightmares"],
    learnings: "Power electronics is witchcraft, component selection is crucial.",
    github: "https://github.com/SupratimRK/mppt-solar-charger",
    demo: null
  },
  {
    title: "Smart Home Automation",
    type: "IoT",
    icon: <Home className="w-6 h-6 text-blue-400" />,
    description: "ESP8266-based home automation with relay control, mobile app integration, and voice commands.",
    technologies: ["ESP8266", "Blynk", "C++", "IoT"],
    status: "Works Sometimes",
    statusColor: "text-yellow-400",
    challenges: ["WiFi connectivity", "Relay interference", "Power supply issues"],
    learnings: "IoT is fun but unreliable hardware adds character.",
    github: "https://github.com/SupratimRK/smart-home",
    demo: null
  },
  {
    title: "Portfolio Website",
    type: "Web",
    icon: <Monitor className="w-6 h-6 text-purple-400" />,
    description: "This very website! Built with React, TypeScript, and Tailwind CSS. Features responsive design and AI chatbot integration.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    status: "Live & Kicking",
    statusColor: "text-green-400",
    challenges: ["CSS centering", "Responsive design", "Content creation"],
    learnings: "React is powerful, TypeScript saves tears, writing about yourself is weird.",
    github: "https://github.com/SupratimRK/portfolio",
    demo: "https://portfolio.supratim.me"
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
      </Helmet>

      <div className="bg-gray-900 text-white min-h-screen font-sans relative circuit-bg">
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-400 font-medium">
                    <CircuitBoard className="w-5 h-5" />
                    <span>Electronics Engineer & Developer</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="text-gradient-primary">Supratim</span>
                    <br />
                    <span className="text-white">Mondal</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                    Turning <span className="text-green-400 font-semibold">caffeine into circuits</span> and 
                    <span className="text-blue-400 font-semibold"> bugs into features</span>. 
                    An EC student passionate about hardware design and web development.
                  </p>
                </div>

                {/* Location & Status */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>Sainthia, West Bengal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Available for opportunities</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Briefcase className="w-5 h-5" />
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Get In Touch
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/SupratimRK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/supratimrk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:supratimrk@outlook.com"
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    aria-label="Email Contact"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Right Content - Terminal */}
              <div className="animate-fade-in-up animation-delay-200">
                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-3 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">supratim@dev:~</span>
                    </div>
                  </div>
                  <div className="p-6 font-mono text-sm">
                    <div className="space-y-2">
                      <div className="text-green-400">$ whoami</div>
                      <div className="text-gray-300 ml-2">Supratim Mondal - The Soldering Socialite 😉</div>
                      
                      <div className="text-green-400 mt-4">$ cat skills.txt</div>
                      <div className="text-gray-300 ml-2 space-y-1">
                        <div>├── Hardware: Arduino, PCB Design, MPPT</div>
                        <div>├── Software: React, Python, C++</div>
                        <div>├── Tools: KiCad, VS Code, Git</div>
                        <div>└── Superpower: Turning coffee into code ☕</div>
                      </div>
                      
                      <div className="text-green-400 mt-4">$ current_status</div>
                      <div className="text-gray-300 ml-2">Building circuits, breaking code, learning daily 🚀</div>
                      
                      <div className="text-green-400 mt-4 animate-pulse">$ _</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>

          {/* Background Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 text-green-500/10">
            <CircuitBoard className="w-full h-full animate-float" />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 text-blue-500/10">
            <Cpu className="w-full h-full animate-float animation-delay-1000" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A passionate Electronics Engineering student who loves building things that shouldn't work but somehow do.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image placeholder */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-1">
                  <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Coffee className="w-16 h-16 text-orange-400 mx-auto animate-bounce" />
                      <p className="text-gray-300">Fueled by chai ☕</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - About content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">The Journey So Far</h3>
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
                      or explaining to my family why their WiFi isn't working.
                    </p>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Quick Facts</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CircuitBoard className="w-4 h-4 text-green-400" />
                      <span>MOSFETs sacrificed in the name of learning: 3+</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-orange-400" />
                      <span>Daily chai consumption: Immeasurable</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span>Favorite debugging method: Strategic console.log placement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>Family tech support success rate: 99.9%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
              <p className="text-xl text-gray-400">
                My toolkit for turning ideas into reality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skillsData.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-sm text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fun Achievements */}
            <div className="mt-16 bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Epic Achievements & Glorious Failures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div
                      className="text-sm text-gray-300"
                      dangerouslySetInnerHTML={{ __html: achievement }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
              <p className="text-xl text-gray-400">
                My academic journey and learning milestones
              </p>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-8 h-8 text-green-400" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-green-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-gray-400 text-sm mb-4">{edu.period}</p>
                        
                        <ul className="space-y-2">
                          {edu.details.map((detail, i) => (
                            <li key={i} className="text-gray-300 flex items-start gap-2">
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

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-400">
                A collection of my adventures in hardware and software
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {project.icon}
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-sm text-gray-400">{project.type}</span>
                        </div>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full bg-gray-700 ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Challenges */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-yellow-400 mb-2">Key Challenges:</h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {project.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learnings */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Key Learnings:</h4>
                      <p className="text-xs text-gray-400">{project.learnings}</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
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
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
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

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Have an interesting project? Want to collaborate? Or just want to chat about circuits and chai? 
              I'd love to hear from you!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <a
                href="mailto:supratimrk@outlook.com"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-colors duration-300 group"
              >
                <Mail className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-white mb-2">Email Me</h3>
                <p className="text-gray-400 text-sm">supratimrk@outlook.com</p>
              </a>

              <a
                href="https://github.com/SupratimRK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-colors duration-300 group"
              >
                <Github className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
                <p className="text-gray-400 text-sm">Check out my code</p>
              </a>

              <a
                href="https://twitter.com/supratimrk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-colors duration-300 group"
              >
                <Twitter className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold text-white mb-2">Twitter</h3>
                <p className="text-gray-400 text-sm">Follow my journey</p>
              </a>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Current Status</h3>
              <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Available for opportunities</span>
              </div>
              <p className="text-gray-300">
                I'm actively seeking internship opportunities and exciting projects to work on. 
                Let's create something extraordinary together!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span>Forged with React, Tailwind, & unhealthy amounts of chai</span>
              </div>
              <p>© {new Date().getFullYear()} Supratim Mondal. All circuits reserved.</p>
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsChatModalOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 z-50 animate-pulse-glow"
          aria-label="Chat with AI Assistant"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        {/* Chat Modal */}
        <ChatBot
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />
      </div>
    </HelmetProvider>
  );
}

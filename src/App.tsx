import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Info,
  GraduationCap,
  Briefcase,
  Mail,
  ExternalLink,
  Cpu,
  Layout,
  Zap,
  Wifi,
  Code,
  Shield,
  GitPullRequest,
  Github,
  Database,
  Camera,
  Film,
  Feather,
  Menu,
  X,
  Twitter
} from 'lucide-react';

// Reimagined Navbar Component
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items with consistent icons
  const navItems = [
    { href: "#about", label: "About", icon: <Info className="w-5 h-5 inline-block mr-1" /> },
    { href: "#education", label: "Education", icon: <GraduationCap className="w-5 h-5 inline-block mr-1" /> },
    { href: "#work", label: "Work", icon: <Briefcase className="w-5 h-5 inline-block mr-1" /> },
    { href: "#contact", label: "Contact", icon: <Mail className="w-5 h-5 inline-block mr-1" /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center px-8 py-4 fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg">
        <a 
          href="#hero" 
          className="flex items-center gap-2 text-2xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          <Home className="w-6 h-6" />
          Supratim
        </a>
        <ul className="flex gap-8">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a 
                href={item.href} 
                className="text-lg text-white hover:text-purple-400 transition-colors"
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex justify-between items-center px-4 py-4 fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg">
        <a 
          href="#hero" 
          className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          Supratim
        </a>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-white"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Sidebar (Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside 
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
            <ul className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl text-white hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const updateCursorVariant = (variant: string) => {
    setCursorVariant(variant);
  };

  // Electronics Skills
  const electronicsSkills = [
    { 
      icon: <Cpu className="w-12 h-12 text-blue-400" />, 
      title: "Embedded Systems", 
      desc: "Design & integration of embedded hardware." 
    },
    { 
      icon: <Layout className="w-12 h-12 text-green-400" />, 
      title: "Digital System Design", 
      desc: "Logic synthesis & FPGA prototyping." 
    },
    { 
      icon: <Cpu className="w-12 h-12 text-indigo-400" />, 
      title: "Microprocessors & Microcontrollers", 
      desc: "Programming and interfacing." 
    },
    { 
      icon: <Zap className="w-12 h-12 text-yellow-400" />, 
      title: "Analog & Digital Communication", 
      desc: "Signal processing & modulation." 
    },
    { 
      icon: <Wifi className="w-12 h-12 text-red-400" />, 
      title: "Computer Network", 
      desc: "Networking fundamentals and protocols." 
    },
    { 
      icon: <Cpu className="w-12 h-12 text-purple-400" />, 
      title: "CMOS VLSI Design", 
      desc: "Chip design and layout techniques." 
    },
  ];

  // Programming Skills
  const programmingSkills = [
    { 
      icon: <Code className="w-12 h-12 text-cyan-400" />, 
      title: "React", 
      desc: "Building interactive UIs using component-driven architecture." 
    },
    { 
      icon: <Zap className="w-12 h-12 text-yellow-400" />, 
      title: "JavaScript", 
      desc: "Crafting dynamic web experiences with modern JS." 
    },
    { 
      icon: <Shield className="w-12 h-12 text-blue-400" />, 
      title: "TypeScript", 
      desc: "Writing scalable, type-safe code." 
    },
    { 
      icon: <Database className="w-12 h-12 text-teal-400" />, 
      title: "Node.js", 
      desc: "Building robust backend services and APIs." 
    },
    { 
      icon: <GitPullRequest className="w-12 h-12 text-indigo-400" />, 
      title: "Git & GitHub", 
      desc: "Version control and collaborative workflows." 
    },
    { 
      icon: <Layout className="w-12 h-12 text-pink-400" />, 
      title: "CSS & HTML", 
      desc: "Creating visually appealing and semantic web pages." 
    },
  ];

  // Other Skills
  const otherSkills = [
    { 
      icon: <Camera className="w-12 h-12 text-orange-400" />, 
      title: "Photography", 
      desc: "Capturing moments with an artistic eye." 
    },
    { 
      icon: <Film className="w-12 h-12 text-violet-400" />, 
      title: "Video Editing", 
      desc: "Crafting engaging visual stories." 
    },
    { 
      icon: <Feather className="w-12 h-12 text-green-400" />, 
      title: "Creative Writing", 
      desc: "Expressing ideas with words and imagination." 
    },
  ];

  // Featured Work Projects (without images, with GitHub links)
  const projects = [
    {
      title: "URL Shortener",
      description: "A modern URL shortening service built with React and Node.js.",
      github: "https://github.com/SupratimRK/url_shortener"
    },
    {
      title: "YouTube Audio Toggle",
      description: "An extension to control YouTube audio seamlessly.",
      github: "https://github.com/SupratimRK/yt-audio-toggle"
    },
    {
      title: "UPI QR Generator",
      description: "Instantly generate UPI payment QR codes.",
      github: "https://github.com/SupratimRK/upi_qr_genarator"
    },
    {
      title: "Qbee",
      description: "An anonymous chat app with a twist.",
      github: "https://github.com/SupratimRK/Qbee"
    },
    {
      title: "Portfolio Website",
      description: "A personal website showcasing projects and skills.",
      github: "https://github.com/SupratimRK/portfolio"
    },
    {
      title: "Formatter Chrome Extension",
      description: "YouTube Number Formatter Chrome Extension.",
      github: "https://github.com/SupratimRK/num_converter"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Smooth Custom Cursor */}
      <motion.div
        className="fixed w-12 h-12 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference ${
          cursorVariant === "hover" ? "bg-white scale-150" : "bg-white scale-100"
        }`}
        style={{ left: mousePosition.x - 2, top: mousePosition.y - 2 }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="container mx-auto z-10 text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
            onMouseEnter={() => updateCursorVariant("hover")}
            onMouseLeave={() => updateCursorVariant("default")}
          >
            Supratim
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            EC Student with a passion for Electronics.
          </p>
          <p className="text-lg text-gray-400 mb-9 italic">
            "Electronics Enthusiast | Web Developer | Creative Thinker"
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#about" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full transition-all"
              onMouseEnter={() => updateCursorVariant("hover")}
              onMouseLeave={() => updateCursorVariant("default")}
            >
              Learn More
            </a>
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full hover:opacity-90 transition-all"
              onMouseEnter={() => updateCursorVariant("hover")}
              onMouseLeave={() => updateCursorVariant("default")}
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Info className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About / Skills Section */}
      <section id="about" className="py-20 bg-white/5">
        <div className="container mx-auto px-4 space-y-12">
          {/* Short note about you */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              I am an Electronics student passionate about bridging hardware and software. Whether designing circuits, coding web apps, or capturing creative moments, I thrive on exploring new technologies and ideas.
            </p>
          </div>
          
          {/* Skills Section */}
          <div className="space-y-12">
            {/* Electronics Skills */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">Electronics Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {electronicsSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1 text-center"
                    onMouseEnter={() => updateCursorVariant("hover")}
                    onMouseLeave={() => updateCursorVariant("default")}
                  >
                    <div className="flex justify-center">
                      {skill.icon}
                    </div>
                    <h4 className="text-xl font-bold mt-4 mb-2">{skill.title}</h4>
                    <p className="text-gray-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Programming Skills */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">Programming Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {programmingSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1 text-center"
                    onMouseEnter={() => updateCursorVariant("hover")}
                    onMouseLeave={() => updateCursorVariant("default")}
                  >
                    <div className="flex justify-center">
                      {skill.icon}
                    </div>
                    <h4 className="text-xl font-bold mt-4 mb-2">{skill.title}</h4>
                    <p className="text-gray-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">Other Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherSkills.map((skill, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1 text-center"
                    onMouseEnter={() => updateCursorVariant("hover")}
                    onMouseLeave={() => updateCursorVariant("default")}
                  >
                    <div className="flex justify-center">
                      {skill.icon}
                    </div>
                    <h4 className="text-xl font-bold mt-4 mb-2">{skill.title}</h4>
                    <p className="text-gray-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
          <div className="space-y-8">
            {[
              {
                degree: "Bachelor of Technology in Electronics and Communication Engineering",
                institution: "Dr. B. C. Roy Engineering College",
                period: "2022 - 2026 (Expected)",
                details: "Focused on embedded systems, microcontrollers, and analog design."
              },
              {
                degree: "Higher Secondary Certificate",
                institution: "Sainthia High School",
                period: "2019 - 2021",
                details: "Studied science with emphasis on physics, chemistry, and mathematics."
              },
              {
                degree: "Secondary Certificate",
                institution: "Sainthia Town High School",
                period: "2016 - 2019",
                details: "Studied general subjects with a focus on science and mathematics."
              }
            ].map((edu, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1"
                onMouseEnter={() => updateCursorVariant("hover")}
                onMouseLeave={() => updateCursorVariant("default")}
              >
                <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-lg text-gray-300 mb-1">{edu.institution}</p>
                <p className="text-gray-400 mb-2">{edu.period}</p>
                <p className="text-gray-400">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1 flex flex-col justify-between"
                onMouseEnter={() => updateCursorVariant("hover")}
                onMouseLeave={() => updateCursorVariant("default")}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                </div>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mt-4"
                >
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Fact Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-3xl mx-auto text-center"
            onMouseEnter={() => updateCursorVariant("hover")}
            onMouseLeave={() => updateCursorVariant("default")}
          >
            <h3 className="text-2xl font-bold mb-4">Fun Fact</h3>
            <p className="text-xl text-gray-300 italic">
              "You know the best way to find a solution? Ignore the problem like I do with assignments."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
            <p className="text-gray-400 mb-8">
              Want to reach out? Feel free to contact me!
            </p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Mail, href: 'mailto:supratimrk@outlook.com', label: 'Email' },
                { icon: Github, href: 'https://github.com/SupratimRK', label: 'Github' },
                { icon: Twitter, href: 'https://x.com/SupratimRK', label: 'X (Twitter)' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={index}
                    href={item.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all transform hover:-translate-y-1"
                    onMouseEnter={() => updateCursorVariant("hover")}
                    onMouseLeave={() => updateCursorVariant("default")}
                    aria-label={item.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-8">
              <p className="text-gray-400">
                Personal Website:{' '}
                <a 
                  href="https://supratim.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                  onMouseEnter={() => updateCursorVariant("hover")}
                  onMouseLeave={() => updateCursorVariant("default")}
                >
                  supratim.netlify.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>© 2025 Supratim. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

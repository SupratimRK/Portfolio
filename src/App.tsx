import { useEffect, useState } from 'react';
import { 
  Gamepad2, 
  Mail, 
  Github, 
  ChevronDown,
  ExternalLink,
  Cpu,
  Languages,
  Twitter
} from 'lucide-react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const updateCursorVariant = (variant: string) => {
    setCursorVariant(variant);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out
          ${cursorVariant === 'hover' ? 'scale-150 bg-white' : 'bg-white scale-100'}`}
        style={{
          left: `${mousePosition.x - 12}px`,
          top: `${mousePosition.y - 12}px`,
        }}
      />

      {/* Interactive Background Gradient */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(129, 140, 248, 0.15), transparent 80%)`,
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
              onMouseEnter={() => updateCursorVariant('hover')}
              onMouseLeave={() => updateCursorVariant('default')}
            >
              Supratim
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
            EC Student with interest in WebDev & Video Editing
            </p>
            <p className="text-lg text-gray-400 mb-8 italic">
              "Eelectronics Enthusiast"
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#about" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full transition-all"
                onMouseEnter={() => updateCursorVariant('hover')}
                onMouseLeave={() => updateCursorVariant('default')}
              >
                About Me
              </a>
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full hover:opacity-90 transition-all"
                onMouseEnter={() => updateCursorVariant('hover')}
                onMouseLeave={() => updateCursorVariant('default')}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Gamepad2, title: 'Gaming', desc: 'Casual gamer with a passion for virtual adventures', color: 'purple' },
              { icon: Cpu, title: 'Electronics', desc: 'Enthusiast exploring the world of electronic systems', color: 'blue' },
              { icon: Languages, title: 'Languages', desc: 'Native Bengali speaker with a multilingual mindset', color: 'purple' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all transform hover:-translate-y-1"
                  onMouseEnter={() => updateCursorVariant('hover')}
                  onMouseLeave={() => updateCursorVariant('default')}
                >
                  <Icon className={`w-12 h-12 mb-4 text-${item.color}-400`} />
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                image: "https://raw.githubusercontent.com/SupratimRK/url_shortener/refs/heads/main/sample/01.png",
                title: "URL Shortener",
                description: "A modern URL shortening service"
              },
              {
                image: "https://raw.githubusercontent.com/SupratimRK/yt-audio-toggle/refs/heads/main/assets/ss.png",
                title: "YouTube Audio Toggle",
                description: "Control YouTube audio with ease"
              },
              {
                image: "https://raw.githubusercontent.com/SupratimRK/upi_qr_genarator/refs/heads/main/sample/01.png",
                title: "UPI QR Generator",
                description: "Generate UPI payment QR codes instantly"
              },
              {
                image: "https://raw.githubusercontent.com/SupratimRK/Qbee/refs/heads/main/sample/04.png",
                title: "Qbee",
                description: "Anon chat app with a twist"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                onMouseEnter={() => updateCursorVariant('hover')}
                onMouseLeave={() => updateCursorVariant('default')}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[300px] object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
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
            onMouseEnter={() => updateCursorVariant('hover')}
            onMouseLeave={() => updateCursorVariant('default')}
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
                { icon: Github, href: 'https://github.com/SupratimRK', label: 'GitHub' },
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
                    onMouseEnter={() => updateCursorVariant('hover')}
                    onMouseLeave={() => updateCursorVariant('default')}
                    aria-label={item.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-8">
              <p className="text-gray-400">
                Personal Website: {' '}
                <a 
                  href="https://supratimx.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                  onMouseEnter={() => updateCursorVariant('hover')}
                  onMouseLeave={() => updateCursorVariant('default')}
                >
                  supratimx.netlify.app
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
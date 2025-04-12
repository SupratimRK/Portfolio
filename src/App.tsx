import { useState } from "react";
import {
  Home,
  Info,
  Mail,
  Menu,
  X,
  Github,
  Twitter,
  Cpu, // Used for Battle Gear & Subtle Icon
  Wrench, // Represents Skills/Tools & Subtle Icon
  Sparkles, // Represents Joy/Achievements (or Fails!)
  BookOpen, // Icon for Education Section Title
  Zap, // Represents EC Projects & Subtle Icon
  Code, // Represents IT Projects & Subtle Icon
  Award, // Represents Certs & Subtle Icon
  Coffee, // Represents Chai/Fun
  CircuitBoard, // Subtle icon for Hero
  Lightbulb, // Subtle icon for WhatIDo
  Atom, // Subtle icon
  Network, // Subtle Icon
  Target, // Subtle Icon
  FileText, // Icon for Cert items
  CheckCircle, // Icon for Cert items
  School, // Icon for Education institutions
  Building, // Icon for Education institutions
  FlaskConical, // Subtle Icon
  Activity, // Subtle Icon
  BrainCircuit, // Subtle Icon
  Thermometer, // Subtle Icon
  Settings, // Subtle Icon
  Trophy // Keep for potential future use?
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- Helper Function (No change) ---
function formatMarkdown(str: string): string {
  // Bolds text between **
  str = str.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italics text between *
  str = str.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return str;
}

// --- Navbar Component (No change) ---
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "#whatidoachievements", label: "My Antics", icon: <Sparkles className="w-5 h-5" /> },
    { href: "#education", label: "The Lore", icon: <BookOpen className="w-5 h-5" /> },
    { href: "#ec-projects", label: "Sparks & Chaos", icon: <Zap className="w-5 h-5" /> },
    { href: "#it-projects", label: "Code & Pixels", icon: <Code className="w-5 h-5" /> },
    { href: "#certifications", label: "Paper Trail", icon: <Award className="w-5 h-5" /> },
    { href: "#battlegear", label: "My Arsenal", icon: <Cpu className="w-5 h-5" /> },
    { href: "#contact", label: "Connect", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center px-8 py-4 fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <a
          href="#hero"
          className="flex items-center gap-2 text-2xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          <Coffee className="w-6 h-6 text-orange-300" /> {/* Chai! */}
          Supratim
        </a>
        <ul className="flex items-center gap-6">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className="text-base text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-1.5 group"
              >
                {item.icon}
                <span className="group-hover:underline underline-offset-4">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex justify-between items-center px-4 py-3 fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <a href="#hero" className="text-xl font-bold text-white hover:text-purple-400 transition-colors flex items-center gap-1.5">
          <Coffee className="w-5 h-5 text-orange-300" /> {/* Chai! */}
          Supratim
        </a>
        <button onClick={() => setMobileMenuOpen(true)} className="text-white p-1" aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Sidebar (Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-white p-1"
            aria-label="Close Menu"
          >
            <X className="w-7 h-7" />
          </button>
          <ul className="flex flex-col gap-8 text-center">
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
        </div>
      )}
    </>
  );
}


// --- Data Definitions ---

// What I Do
const whatIDo = [
  "☕ **Sips tea**, and **think about future**, Still thinking... 🤔",
  "🧪 Experiment with **saltwater batteries**. Spoiler: they fizz, not charge.",
  "📦 Automate stuff with **Google Apps Script**. Cuz I'm **Laydkhor** 🛌",
  "🎨 Design **graphics and videos** for fun. I mean, who doesn’t love a good meme? 😁",
  "📚 Write **LaTeX reports** that are more **aesthetic than my life** choices. 👀",
  "🔋 Build **MPPT-based solar charger** that actually *work*, unlike my diet plan. 🍴(That too worked for first couple of days.)",
  "🎛️ Design sleek PCBs on **KiCad** with **zero flying wires** (okay, almost) and they end up being a paperweight.",
  "💻 Create web apps with React + Firebase that don’t crash… most of the time.",
  "🌱 Built an **auto plant watering system**. Plants are now thriving. My social life? log<sub>10</sub> 1 🥲",
  `👨‍🔧 Serve as **family tech support**: <br>
    “Maa ar phone ar IMEI ura gacha” → fixed 😏<br>
    “Baba ar laptop slow cholcha” → formatted 😎<br>
    “Bahi ar online class cholcha naa” → new OS installed 💀`
];

// Achievements / Fails - With Emojis
const achievements = [
  "😴 <strong>Didn’t get into IIT...</strong> but hey, now I get more sleep than them.",
  "🔥 <strong>Burnt 3 MOSFETs in a row...</strong> Still convinced it was their fault, not mine.",
  "🗿 <strong>Built a circuit that never worked...</strong> It’s now a paperweight. A very aesthetic one.",
  "👻 <strong>Applied to 10 internships, got ghosted by 11...</strong> Math doesn't check out but the pain does.",
  "🤷‍♂️ <strong>Got rejected for a hackathon because they “didn’t get the idea”...</strong> My mom said it was brilliant though.",
  "🔋💥 <strong>Made an MPPT charger… forgot the battery polarity...</strong> It charged… my patience.",
  "♨️ <strong>Fried a 7805 regulator because I forgot to use a heatsink...</strong> It got so hot it almost gave me chai.",
  "💡📺 <strong>Created an IR remote but used TV remote’s ‘Volume Up’ as ON switch</strong>... My dad kept turning off the lights while changing channels.",
  "😵‍💫 <strong>Entered wrong room for endsem...</strong> Sat through half an exam before realizing it wasn’t my paper.",
  "📉 <strong>Got a C in a subject I thought I aced...</strong> And the subject is nun other than Digital Communication",
];

// Who Am I YAML - Updated based on user text
const whoAmI_YAML = `name: Supratim Mondal
# codeName: Previously 'Chai Whisperer', now accepting suggestions...
codeName: The Soldering Socialite 😉
from: Sainthia, West Bengal, India (Land of Mishti Doi, Power Cuts & Kesto Daa 👀)
college: Dr. B. C. Roy Eng. College, IIT Jemua, (Tier 69, but we have chai ☕)
pronouns: he/him (Proud member of the 'He/Him' club 🧔‍♂️)

languages: # Fluent in...
  - Bengali: (Native tongue, perfect for khisti)
  - English: (Desi accent included, no extra charge)
  - Hindi: (Survived Bollywood movies, mostly)
  - C/C++: (The OG coding buddies)
  - Python: (For when things need to *just work*)
  - Web Stuff: HTML, CSS, JS, TypeScript, php (Making the internet look pretty...)
  - Frameworks: React, Vite, Firebase (The cool kids' tools)
  - Databases: SQL (MySQL) (Sorting data, slowly)
  - Documents: LaTeX (Because MS Word is for kids)
  - Cloud: Google Cloud, AWS (Just scratching the surface!)

tools: # My trusty sidekicks
  - Hardware: Multimeter, Soldering Iron, Oscilloscope (ECE Starters Pack)
  - Software: KiCad, Proteus, EasyEDA (Where dreams meet copper)
  - Dev Env: VS Code, Git (One commit at a time), Docker (Learning the ropes)
  - Cloud Consoles: Firebase, GCP (Clicking buttons, hoping for the best)
  - Creative Suite: Figma, Adobe CC (Making things shiny!)
  - Productivity: Google Workspace, Notion (Trying to organize the chaos)

socials: # Find me lurking here:
  - github: SupratimRK (Where my code sleeps)
  - twitter: supratimrk (Occasional tech thoughts & memes)
  - portfolio: supratim.netlify.app (You are here!)
  # --- Places for Lockdown Kids, Not for me!---
  - noFacebook: Preserving my sanity
  - noInsta: My circuits lack the influencer aesthetic
  - noLinkedIn: Still farming buzzwords for my profile
  - noSnapchat: My face doesn't need dog filters (usually)

funFact: You know the best way to find a solution? Ignore the problem like I do with assignments. ☕️⚡️
   # Don't worry, I still get things done... eventually. (Usually after a lot of chai and panic.)
`;

// Education Data - With Icons and Updated Text
const education = [
  {
    degree: "B.Tech in ECE (MAKAUT)",
    institution: "Dr. B. C. Roy Engineering College, Durgapur",
    period: "2022 - Present (Surviving! Barely...)",
    icon: Building, // Using Building icon for college
    details: [
      "Navigating the fascinating worlds of Embedded Systems & Analog circuits.",
      "Surviving Signal Processing, EM Waves & DSP, barely though.",
      "Lab sessions: where theory meets smoke alarms.",
      "Focusing on not letting the magic smoke out of components.",
    ]
  },
  {
    degree: "H. S. Certificate (WBCHSE)",
    institution: "Sainthia High School, Sainthia",
    period: "2019 - 2021 (Panchhi Banoon Udti Phiroon...)",
    icon: School, // Using School icon
    details: [
      "The official start of my love-hate relationship with Physics & Maths.",
      "First encountered resistors – tiny agents of controlled chaos.",
      "Learned that circuit diagrams are cleaner than reality.",
    ]
  },
  {
    degree: "Secondary Certificate (WBBSE)",
    institution: "Sainthia Town High School, Sainthia",
    period: "Before the Dark Times (2016 - 2019)",
    icon: School, // Using School icon
    details: [
      "Where the curiosity sparked: 'Why does this button DO that?'",
      "Mastered the basics, laid the groundwork for future tinkering.",
    ]
  },
];

// EC Projects - With Animations and Updated Text
const ecProjects = [
  {
    title: "The MPPT Solar Charging System", // Updated Title
    icon: <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />, // Continuous pulse
    target: "Tame a solar panel, convince it to charge a battery nicely via MPPT.",
    description: "An epic battle involving a buck-boost converter, an Arduino, and questionable PWM signals. Aimed for peak efficiency, found peak frustration.",
    challenges: [
      "MOSFETs spontaneously combusting (RIP the brave soldiers).",
      "Sensor readings doing the cha-cha thanks to electrical noise.",
      "The PID controller developing a rebellious personality.",
      "Unexpected fireworks display (aka 'short circuit').",
    ],
    outcome: "Glorious Failure (Educational!)",
    learnings: "Power electronics is witchcraft. Component selection is crucial. Noise is the enemy. PID tuning requires patience... or sacrifice. Debugging skills leveled up!",
    failureReason: "A trifecta of bad parts, noisy signals, and possibly cursed code. Now serves as a reminder that humility is a virtue in electronics."
  },
  {
    title: "Smart Home? Nah, 'Haunted House'",
    icon: <Home className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />, // Bounce on hover
    target: "Impress guests by controlling lights with my phone. Maybe.",
    description: "An ESP8266, relays, and a tangle of wires met Blynk/IFTTT. The goal: remote control. The reality: occasional, unpredictable obedience.",
    challenges: [
      "The ESP8266's mysterious aversion to staying connected to Wi-Fi.",
      "Relays throwing temper tantrums (voltage spikes!) that reset the microcontroller.",
      "IFTTT integrations being more 'If THIS, then MAYBE THAT'.",
      "Lights flickering ominously at 3 AM. Not spooky at all.",
    ],
    outcome: "Works... When It Feels Like It",
    learnings: "IoT is fun! Interfacing relays needs care. Network debugging requires deep breaths. Cheap hardware has 'character'.",
    failureReason: "Network gremlins and electrical ghosts made it charmingly unreliable. The light switch remains undefeated."
  },
  {
    title: "Project Plant Pal (Automated Watering)",
    icon: <Sparkles className="w-6 h-6 text-green-400 group-hover:animate-bounce" />, // Bounce on hover
    target: "Delegate plant-sitting duties to an Arduino. Keep the green thing alive.",
    description: "Combined a moisture sensor, pump, and relay to quench my plant's thirst automatically. Because responsibility is hard.",
    challenges: [
      "Soil moisture sensors speaking in riddles ('Is it dry? Is it wet? Who knows!').",
      "The pump deciding to become a tiny water fountain when 'off'.",
      "Fighting sensor corrosion – the silent killer.",
      "Human error: Forgetting the water reservoir exists.",
    ],
    outcome: "Plant Survived (Mostly)",
    learnings: "Sensors lie. Calibration is key. Check valves are important. Plants also need sunshine, apparently. Automation is cool.",
    failureReason: "Inconsistent data and occasional human negligence meant the plant experienced both droughts and floods. It's a trooper."
  },
];

// IT Projects - With Animations and Updated Text
const itProjects = [
  {
    title: "This Portfolio: A Meta Adventure",
    icon: <Code className="w-6 h-6 text-purple-400 group-hover:animate-spin" />, // Spin on hover
    target: "Digitally represent myself without resorting to interpretive dance.",
    description: "Wrangling React, TypeScript, and Tailwind CSS to build this very page. Aiming for 'cool and informative', landing somewhere near 'hopefully works'.",
    challenges: [
      "Tailwind CSS: 'You want it centered HOW?'",
      "Debugging CSS: Hours spent chasing rogue pixels.",
      "Content Creation: Staring at a blank page, fueled by chai.",
      "Achieving 'pixel perfect' - is that even real?",
      "Resisting the urge to add just *one more* cool animation.",
    ],
    outcome: "It's Alive! (For Now...)",
    learnings: "React is powerful. TypeScript saves tears. Tailwind is magic (mostly). Deployment is clicking buttons. Writing about yourself is weird.",
    failureReason: "Over-engineering the first draft. Getting lost in design tweaks. The endless battle against browser inconsistencies."
  },
  {
    title: "The PDF Certificate System", // Updated Title
    icon: <Award className="w-6 h-6 text-orange-400 group-hover:animate-pulse" />, // Pulse on hover
    target: "Save event organizers from certificate-signing hand cramps.",
    description: "A React frontend meets a backend (PHP's ghost lingers) to churn out PDFs from CSV data. Like a digital printing press, but with more bugs.",
    challenges: [
      "PDF generation: Where fonts go to die and layouts get creative.",
      "CSV parsing: Handling the wild west of spreadsheet formats.",
      "User Experience: Making it usable for people who *don't* speak code.",
      "Backend choices: The eternal PHP vs. Serverless debate.",
    ],
    outcome: "Surprisingly Useful!",
    learnings: "Frontend frameworks are neat. File uploads/downloads have quirks. PDF libraries demand respect. Users appreciate simple interfaces.",
    failureReason: "Initial PHP version was spaghetti code. PDF alignment still throws occasional curveballs. Robust error handling is an ongoing quest."
  },
  {
    title: "Google Apps Script: My Robot Butler",
    icon: <Wrench className="w-6 h-6 text-red-400 group-hover:animate-bounce" />, // Bounce on hover
    target: "Make Google Workspace do my bidding. Automate all the things!",
    description: "Writing JavaScript spells to parse emails, auto-populate sheets, create calendar events, and generally avoid manual data entry. Laziness level: Expert.",
    challenges: [
      "Google's quotas: The fun police of automation.",
      "Debugging in the cloud: Like finding a needle in a haystack... blindfolded.",
      "Permissions puzzles: Convincing Google I'm allowed to touch my own data.",
      "API changes: Google keeping me on my toes.",
    ],
    outcome: "Personal Productivity Power-Up!",
    learnings: "Apps Script is surprisingly potent. APIs are fun playgrounds. Triggers are magic. Error handling is non-negotiable. Read the quota limits!",
    failureReason: "Early scripts were resource hogs. Security wasn't always priority #1 (oops). Some automations became glorious relics as workflows evolved."
  },
];

// Certifications Data - With Icons
const certifications = [
  { course: "DIY PCB Wizardry", platform: "Udemy", duration: "4 weeks", icon: CheckCircle },
  { course: "Analog Circuits Demystified", platform: "Coursera", duration: "3 weeks", icon: CheckCircle },
  { course: "Firebase for Web Warriors", platform: "Firebase Codelabs", duration: "2 weeks", icon: FileText },
  { course: "React + TypeScript: Zero to... Less Confused", platform: "Udemy", duration: "4 weeks", icon: CheckCircle },
  { course: "Web Dev Bootcamp (HTML/CSS/JS)", platform: "Udemy", duration: "3.5 weeks", icon: CheckCircle },
  { course: "Cloud Whispering: Intro to AWS", platform: "SkillUp by AWS", duration: "2 weeks", icon: FileText },
  { course: "LaTeX: Making Documents Pretty", platform: "Overleaf Academy", duration: "1 week", icon: FileText },
  { course: "Embedded Systems with Arduino", platform: "NPTEL (audit)", duration: "3.5 weeks", icon: FileText },
  { course: "KiCad: PCB Design Like a Boss", platform: "Udemy", duration: "2 weeks", icon: CheckCircle },
  { course: "Python for Everyone (Even Me!)", platform: "Coursera (U-M)", duration: "4 weeks", icon: CheckCircle },
  { course: "Google Cloud Fundamentals", platform: "Coursera", duration: "4 weeks", icon: CheckCircle },
  { course: "Data Structures & Algorithms Quest", platform: "Coursera (UCSD)", duration: "4 weeks", icon: CheckCircle },
  { course: "Cisco Networking: The Basics", platform: "Cisco Networking Academy", duration: "4 weeks", icon: FileText },
  { course: "Free CCNA Knowledge Hunt", platform: "YouTube (NetworkChuck)", duration: "Ongoing Quest", icon: FileText },
];

// Battle Gear Data - Updated Text
const battleGear = [
  {
    title: "ASUS ROG Strix G15 ⚡",
    details: [
      "⚙️ CPU: Ryzen 7 4800H (8 cores fueled by chai ☕)",
      "🎮 GPU: Nvidia GTX 1650 (Yes! ROG still has these.)",
      "🚀 RAM: 24 GB DDR4 (Holds at least 50 Chrome tabs!)",
      "💾 Storage: 512 GB NVMe SSD (Boot screen? What's that?)",
      "💻 OS: Windows 11 & Ubuntu 22.04 (Dual pain 😢)",
    ],
  },
  {
    title: "DELL Vostro 15 🐌",
    details: [
      "⚙️ CPU: Intel i3 7020U (Yess! It still works!)",
      "🎮 GPU: Intel HD Graphics (No gaming, just browsing!)",
      "🧠 RAM: 4 GB DDR4 (Enough for a terminal... usually)",
      "💾 Storage: 120 GB SATA SSD (The little SSD that could!)",
      "🐧 OS: Ubuntu 22.04 LTS (Still kicking!)",
    ],
  },
  {
    title: "Samsung Galaxy S23 🚀",
    details: [
      "⚙️ CPU: Qualcomm® Kryo™ (Open apps with ☕)",
      "🎨 GPU: Qualcomm® Adreno™ 740 (For... scrolling faster?)",
      "🚀 RAM: 8 GB LPDDR5X (Smooth like IYKYK 👀)",
      "💾 Storage: 128 GB UFS 4.0 (Holds many, many memes)",
      "📱 OS: OneUI 7.0 / Android 15 (Living on the beta edge!)",
    ],
  },
];


// --- Main App Component ---
export default function App() {
  const syntaxHighlighterStyle = {
    backgroundColor: 'transparent',
    padding: '1rem',
    overflow: 'auto',
    fontSize: '0.8rem',
    lineHeight: '1.6',
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white min-h-screen font-sans scroll-smooth">
      <Navbar />

      <div className="pt-24 pb-16">

        {/* --- Hero Section --- */}
        <section id="hero" className="mb-24 relative overflow-hidden min-h-[550px] md:min-h-[500px]">
          <div className="flex flex-wrap md:flex-nowrap w-full px-[8%] gap-[4%] items-stretch">
            {/* Left Card */}
            <div className="w-full md:w-[40%] bg-white/5 p-8 rounded-2xl backdrop-blur-sm flex flex-col justify-between shadow-lg border border-white/10 min-h-[500px] hover:border-purple-400/50 transition-colors duration-300 mb-6 md:mb-0">
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 leading-tight animate-fade-in">
                  🔌 Supratim Mondal
                </h1>
                <p className="text-lg lg:text-xl text-orange-300 font-medium flex items-center gap-2">
                  <Coffee className="w-5 h-5 inline-block" /> Chai Lover & Aspiring Engineer
                </p>
                <h2 className="text-lg lg:text-2xl text-gray-300 leading-relaxed lg:leading-loose pt-2">
                  ⚡ EC Student with <span className="italic text-amber-200/90">log<sub>10</sub> 1</span> Social Life<br className="hidden sm:block md:hidden lg:block" />
                  🌐 Web Dev & <span className="italic text-amber-200/90">Useless</span> php Programmer<br className="hidden sm:block md:hidden lg:block" />
                  📽️ Video Editor & <span className="italic text-amber-200/90">Memes</span> Maker<br className="hidden sm:block md:hidden lg:block" />
                  👨‍🔧 Tech Support for <span className="text-amber-200/90">Friends and Family</span>
                </h2>

                <p className="text-base lg:text-lg text-amber-200/90 italic pt-3">
                  ~ Powered by chai ☕ and questionable life choices... mostly caffeine though. 🫠
                </p>
              </div>
              {/* Larger Badges with updated logos */}
              <div className="mt-4 mb-4 flex flex-col gap-3 items-start">
                <a href="https://supratim.netlify.app" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Portfolio-You're%20Here!-blue?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio Badge" /> </a>
                <a href="mailto:supratimrk@outlook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Email-Drop%20Hello!-red?style=for-the-badge&logo=gmail&logoColor=white" alt="Email Badge" /> </a>
                <a href="https://twitter.com/supratimrk" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Twitter-Follow%20My%20Ramblings-1DA1F2?style=for-the-badge&logo=x&logoColor=white" alt="Twitter Badge" /> </a>
                {/* Updated GitHub badge for white logo */}
                <a href="https://github.com/SupratimRK" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/GitHub-See%20My%20Code-white?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Badge" /> </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Facebook-Nope!-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook Badge" /> </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Instagram-Still%20No-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram Badge" /> </a>
                {/* Updated LinkedIn badge */}
                <a href="#" onClick={(e) => e.preventDefault()} className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/LinkedIn-Maybe%20Someday...-0077B5?style=for-the-badge&logo=hackerone&logoColor=white" alt="LinkedIn Badge" /> </a>
                {/* Updated Snapchat badge */}
                <a href="#" onClick={(e) => e.preventDefault()} className="transform hover:scale-110 transition-transform duration-200"> <img src="https://img.shields.io/badge/Snapchat-Definitely%20Not-FFFC00?style=for-the-badge&logo=snapchat&logoColor=white" alt="Snapchat Badge" /> </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full md:w-[40%] bg-black/70 p-1 rounded-2xl backdrop-blur-sm shadow-lg border border-white/10 overflow-hidden hover:border-purple-400/50 transition-colors duration-300 min-h-[500px] flex flex-col">
              <h2 className="text-xl font-bold pt-4 px-6 mb-0 text-purple-300 flex items-center gap-2 shrink-0"> <Info className="w-5 h-5" /> The Lowdown (YAML Edition)</h2>
              <div className="flex-grow overflow-auto">
                <SyntaxHighlighter
                  language="yaml"
                  style={atomDark}
                  customStyle={syntaxHighlighterStyle}
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                >
                  {whoAmI_YAML}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          {/* More Subtle Icons */}
          <CircuitBoard aria-hidden="true" className="absolute top-[8%] right-[10%] w-32 h-32 text-purple-600/60 opacity-70 -rotate-[20deg] hidden lg:block pointer-events-none select-none" />
          <Atom aria-hidden="true" className="absolute top-[35%] right-[5%] w-40 h-40 text-pink-600/50 opacity-60 rotate-[10deg] hidden lg:block pointer-events-none select-none" />
          <Code aria-hidden="true" className="absolute bottom-[5%] right-[12%] w-36 h-36 text-blue-600/60 opacity-70 rotate-[5deg] hidden lg:block pointer-events-none select-none" />
          <Network aria-hidden="true" className="absolute bottom-[30%] right-[18%] w-28 h-28 text-teal-600/50 opacity-60 -rotate-[10deg] hidden lg:block pointer-events-none select-none" />
          <Target aria-hidden="true" className="absolute top-[60%] right-[9%] w-24 h-24 text-indigo-600/50 opacity-60 rotate-[15deg] hidden lg:block pointer-events-none select-none" />
          <BrainCircuit aria-hidden="true" className="absolute top-[15%] right-[20%] w-24 h-24 text-lime-600/40 opacity-50 rotate-[25deg] hidden lg:block pointer-events-none select-none" />
          <FlaskConical aria-hidden="true" className="absolute bottom-[10%] right-[2%] w-28 h-28 text-amber-600/40 opacity-50 -rotate-[5deg] hidden lg:block pointer-events-none select-none" />
        </section>

        {/* --- What I Do & Achievements --- */}
        <section id="whatidoachievements" className="mb-24 relative overflow-hidden min-h-[550px] md:min-h-[500px]">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-300 px-[8%]">My Antics: Skills & Glorious Achievements ✨</h2>
          <div className="flex flex-wrap md:flex-nowrap w-full px-[8%] gap-[4%] items-stretch">
            {/* Left Card: What I Do */}
            <div className="w-full md:w-[40%] bg-black/60 p-8 rounded-2xl border border-white/10 shadow-md hover:shadow-purple-500/20 transition-shadow duration-300 mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-green-400"><Wrench className="w-6 h-6" /> My Bag of Tricks</h3>
              <ul className="list-none space-y-3.5">
                {whatIDo.map((item, index) => (
                  <li key={index} className="text-gray-300 text-base flex items-start">
                    <span className="text-green-500 mr-2.5 mt-1 scale-110 shrink-0"><Activity/></span>
                    <span dangerouslySetInnerHTML={{ __html: formatMarkdown(item) }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Card: Achievements / Fails */}
            <div className="w-full md:w-[40%] bg-black/60 p-8 rounded-2xl border border-white/10 shadow-md hover:shadow-red-500/20 transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-amber-200/90"><Trophy className="w-6 h-6" /> Epic Achievements</h3>
              <ul className="list-none space-y-4">
                {achievements.map((ach, index) => (
                  <li key={index} className="text-gray-300 text-base flex items-start">
                    <span className="text-amber-200/90 mr-2.5 mt-1 scale-110 shrink-0"><Sparkles /></span>
                    {/* Render BOLDED achievement text with emojis */}
                    <span dangerouslySetInnerHTML={{ __html: ach }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* More Subtle Icons */}
          <Lightbulb aria-hidden="true" className="absolute top-16 right-[6%] w-36 h-36 text-yellow-500/60 opacity-80 rotate-[10deg] hidden lg:block pointer-events-none select-none" />
          <Zap aria-hidden="true" className="absolute bottom-8 right-[4%] w-32 h-32 text-orange-500/50 opacity-70 -rotate-[15deg] hidden lg:block pointer-events-none select-none" />
          <Cpu aria-hidden="true" className="absolute top-[40%] right-[15%] w-28 h-28 text-cyan-600/50 opacity-60 rotate-[25deg] hidden lg:block pointer-events-none select-none" />
          <Wrench aria-hidden="true" className="absolute bottom-[10%] right-[13%] w-24 h-24 text-lime-600/50 opacity-60 rotate-[5deg] hidden lg:block pointer-events-none select-none" />
          <Activity aria-hidden="true" className="absolute top-[10%] right-[18%] w-28 h-28 text-red-600/40 opacity-50 -rotate-[10deg] hidden lg:block pointer-events-none select-none" />
          <Thermometer aria-hidden="true" className="absolute bottom-[40%] right-[5%] w-24 h-24 text-blue-600/40 opacity-50 rotate-[20deg] hidden lg:block pointer-events-none select-none" />
          <Settings aria-hidden="true" className="absolute top-[65%] right-[16%] w-20 h-20 text-gray-600/50 opacity-60 rotate-[-25deg] hidden lg:block pointer-events-none select-none" />
        </section>

        {/* --- Education Section --- */}
        <section id="education" className="mb-24 px-[8%]">
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-300 flex items-center justify-center gap-3">
              <span className="w-8 h-8" /> The Lore: Academic Chapters 📚
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {education.map((edu, index) => {
                const Icon = edu.icon || School; // Fallback icon
                return (
                  <div key={index} className="bg-black/70 p-6 rounded-xl backdrop-blur-sm hover:bg-black/50 transition-all flex-1 min-w-[310px] max-w-[420px] border border-white/10 shadow-md hover:scale-105 duration-300">
                    <h3 className="text-xl font-bold mb-2 text-purple-400">{edu.degree}</h3>
                    <p className="text-gray-400 mb-1 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500 inline-block shrink-0" />
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">{edu.period}</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1.5 text-sm pl-2">
                      {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Notable EC Projects --- */}
        <section id="ec-projects" className="mb-24 px-[8%]">
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-300">EC Adventures: Sparks & Chaos ⚡</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {ecProjects.map((proj, index) => (
                <div key={index} className="group bg-black/70 p-6 rounded-xl backdrop-blur-sm hover:bg-black/50 transition-all flex-1 min-w-[330px] max-w-[460px] border border-white/10 shadow-md hover:shadow-yellow-500/20 duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-3"> {proj.icon} <h3 className="text-xl font-bold text-purple-400 group-hover:text-yellow-300 transition-colors">{proj.title}</h3> </div>
                  <p className="text-sm text-gray-400 mb-2"><strong className="text-gray-300">Quest:</strong> {proj.target}</p>
                  <p className="text-sm text-gray-300 mb-3 flex-grow">{proj.description}</p>
                  <div className="mb-3"> <strong className="text-sm text-yellow-400">Boss Fights:</strong> <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs pl-2 mt-1"> {proj.challenges.map((c, i) => <li key={i}>{c}</li>)} </ul> </div>
                  <div className="mt-auto pt-3 border-t border-white/10 shrink-0"> <p className={`text-sm font-semibold mb-1 ${proj.outcome.includes('Fail') ? 'text-red-400' : proj.outcome.includes('Success') || proj.outcome.includes('Survived') ? 'text-green-400' : 'text-yellow-400'}`}> Verdict: {proj.outcome} </p> <p className="text-xs text-gray-400"><strong className="text-gray-300">Loot Gained (Learnings):</strong> {proj.learnings}</p> {proj.failureReason && <p className="text-xs text-red-500 mt-1"><strong className="text-red-400">Why it Exploded:</strong> {proj.failureReason}</p>} </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Notable IT Projects --- */}
        <section id="it-projects" className="mb-24 px-[8%]">
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-300">IT Expeditions: Code & Pixels 💻</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {itProjects.map((proj, index) => (
                <div key={index} className="group bg-black/70 p-6 rounded-xl backdrop-blur-sm hover:bg-black/50 transition-all flex-1 min-w-[330px] max-w-[460px] border border-white/10 shadow-md hover:shadow-blue-500/20 duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-3"> {proj.icon} <h3 className="text-xl font-bold text-purple-400 group-hover:text-blue-300 transition-colors">{proj.title}</h3> </div>
                  <p className="text-sm text-gray-400 mb-2"><strong className="text-gray-300">Mission:</strong> {proj.target}</p>
                  <p className="text-sm text-gray-300 mb-3 flex-grow">{proj.description}</p>
                  <div className="mb-3"> <strong className="text-sm text-yellow-400">Debugging Battles:</strong> <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs pl-2 mt-1"> {proj.challenges.map((c, i) => <li key={i}>{c}</li>)} </ul> </div>
                  <div className="mt-auto pt-3 border-t border-white/10 shrink-0"> <p className={`text-sm font-semibold mb-1 ${proj.outcome.includes('Fail') ? 'text-red-400' : proj.outcome.includes('Success') || proj.outcome.includes('Useful') ? 'text-green-400' : 'text-yellow-400'}`}> Status: {proj.outcome} </p> <p className="text-xs text-gray-400"><strong className="text-gray-300">XP Gained (Learnings):</strong> {proj.learnings}</p> {proj.failureReason && <p className="text-xs text-red-500 mt-1"><strong className="text-red-400">Where it Stumbled:</strong> {proj.failureReason}</p>} </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Certifications & Trainings Section --- */}
        <section id="certifications" className="mb-24 px-[8%]">
          <div className="bg-gradient-to-br from-gray-900/70 to-black/80 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg relative overflow-hidden">
            <h2 className="text-4xl font-bold text-center mb-4 text-purple-300 flex items-center justify-center gap-3 z-10 relative">
              <span className="w-8 h-8" /> The Paper Trail: Only Certs, No Skills 📜
            </h2>
            <h3 className="text-lg text-center text-purple-300 opacity-60 mb-8 z-10 relative">"All certifications are online 'cause my college only teaches how to mark 75% attendance. Offline training? Lol, do you think they would let us breathe outside campus?"</h3>
            <Award aria-hidden="true" className="absolute -top-10 -left-10 w-48 h-48 text-purple-900/30 opacity-100 rotate-12 pointer-events-none" />
            <div className="overflow-x-auto rounded-lg border border-purple-400/30 shadow-inner shadow-purple-900/20 z-10 relative">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead className="bg-black/60 backdrop-blur-sm">
                  <tr className="border-b-2 border-purple-500/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase tracking-wider w-12"></th> {/* Icon column */}
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase tracking-wider">Scroll of Knowledge</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase tracking-wider">Time Invested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {certifications.map((cert, index) => {
                    const Icon = cert.icon || Award;
                    return (
                      <tr key={index} className="hover:bg-white/10 transition-colors duration-200 group">
                        <td className="px-6 py-4 text-center">
                          <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-200 font-medium">{cert.course}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{cert.platform}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{cert.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- My Battle Gear --- */}
        <section id="battlegear" className="mb-24 px-[8%]">
          <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-300 flex items-center justify-center gap-3">
              <span className="w-8 h-8" /> My Humble Arsenal ⚔️
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {battleGear.map((gear, index) => (
                <div key={index} className="bg-black/70 p-6 rounded-xl backdrop-blur-sm hover:bg-black/50 transition-all flex-1 min-w-[310px] max-w-[420px] border border-white/10 shadow-md hover:-translate-y-1 duration-300">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">{gear.title}</h3>
                  <ul className="list-none space-y-1.5 text-sm">
                    {gear.details.map((detail, i) => <li key={i} className="text-gray-300">{detail}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Let's Connect --- */}
        <section id="contact" className="mb-8 px-[8%]">
          <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 p-10 rounded-2xl backdrop-blur-sm text-center border border-white/10 shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
            <h2 className="text-4xl font-bold mb-6 text-white">Let's have ☕ chai, together! (Virtually? No Problem!)</h2>
            <p className="text-gray-200 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Need a partner in crime for your next electronic escapade? Wanna bitch you clg, prof. with someone? Or just want to debate the best chai? <br />Hit me up! 👇
            </p>
            <div className="flex justify-center items-center gap-6 md:gap-8 mb-10 flex-wrap">
              {[
                { icon: Mail, href: "mailto:supratimrk@outlook.com", label: "Email Me!", color: "hover:text-red-400" },
                { icon: Github, href: "https://github.com/SupratimRK", label: "Stalk My Code", color: "hover:text-gray-300" },
                { icon: Twitter, href: "https://twitter.com/supratimrk", label: "Tweet Me!", color: "hover:text-blue-400" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (<a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className={`p-4 bg-black/60 rounded-full text-gray-300 ${item.color} transition-all transform hover:scale-125 hover:-translate-y-1 duration-300 shadow-lg`} aria-label={item.label} title={item.label}> <Icon className="w-7 h-7" /> </a>);
              })}
            </div>
            <p className="text-gray-300 text-base">
              Check out my digital playground:{" "}
              <a href="https://supratim.netlify.app" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-pink-300 underline underline-offset-4 font-semibold transition-colors"> supratim.netlify.app </a>
            </p>
          </div>
        </section>

      </div> {/* End pt-24 wrapper */}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10">
        <p>Forged with React, Tailwind, & unhealthy amounts of Chai. <Coffee className="inline w-4 h-4 text-orange-400 align-baseline" /></p>
        <p>© {new Date().getFullYear()} Supratim Mondal. All shenanigans reserved.</p>
      </footer>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Sparkles, X, Send, Bot } from 'lucide-react';

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- Updated System Instruction ---
// This guides the AI on how to answer questions about Supratim.
const systemInstruction = `You are Supratim's digital sidekick, an AI chatbot embedded directly in his personal portfolio website (portfolio.supratim.me). Your personality should mirror the tone of the website: witty, slightly self-deprecating, tech-savvy, informal, honest about both successes and "glorious failures," and definitely appreciative of a good cup of chai (☕). Think of yourself as the "Soldering Socialite's" (😉) slightly less caffeinated but equally informative assistant.

Your Knowledge Base:
Your entire world consists of the information explicitly presented on Supratim's portfolio website. This includes:

1.  **Identity & Background:** Supratim Mondal, from Sainthia (West Bengal), ECE student at Dr. B. C. Roy Eng. College (Tier 69, but with chai!), pronouns (he/him), codeName ("The Soldering Socialite").
2.  **Skills & Languages:** Proficient in Bengali, English, Hindi. Coding languages (C/C++, Python, Web Stuff - HTML/CSS/JS/TS/php), Frameworks (React, Vite, Firebase), Databases (SQL/MySQL), Documents (LaTeX), Cloud (GCP, AWS - beginner).
3.  **Tools:** Hardware (Multimeter, Soldering Iron, Oscilloscope), Software (KiCad, Proteus, EasyEDA), Dev Env (VS Code, Git, Docker - learning), Cloud Consoles (Firebase, GCP), Creative (Figma, Adobe CC), Productivity (Google Workspace, Notion).
4.  **"What I Do" Antics:** Sips tea & thinks, experiments (saltwater batteries), automation (Apps Script - cuz Laydkhor 🛌), design (graphics/videos/memes 😁), LaTeX reports (aesthetic 👀), MPPT charger (that worked, unlike diet plan 🍴), KiCad PCBs (almost zero flying wires, potential paperweights), React/Firebase apps (mostly don't crash), auto plant watering (plants thrive, social life: log₁₀ 1 🥲), family tech support (IMEI, slow laptop, online class issues fixed 😎).
5.  **"Epic Achievements" (aka Fails):** Didn't get into IIT (more sleep 😴), burnt MOSFETs (their fault 🔥), non-working circuit (aesthetic paperweight 🗿), ghosted by internships (painful math 👻), hackathon rejection (mom approved idea 🤷‍♂️), MPPT polarity mishap (charged patience 🔋💥), fried 7805 (almost made chai ♨️), IR remote volume issue (dad turned off lights 💡📺), wrong exam room (awkward 😵‍💫), C grade surprise (Digital Communication 📉).
6.  **Education:** B.Tech ECE @ Dr. B. C. Roy (2022-Present, surviving EM Waves & DSP), H.S. @ Sainthia High School (2019-2021, physics/maths love-hate begins), Secondary @ Sainthia Town High School (Before 2019, curiosity sparked).
7.  **EC Projects (Sparks & Chaos ⚡):**
    *   **MPPT Solar Charger:** Buck-boost, Arduino, PWM struggle. Outcome: Glorious Failure (Educational!). Learnings: Power electronics is witchcraft, noise is evil, PID needs sacrifice. Reason: Bad parts, noise, cursed code.
    *   **Smart 'Haunted' Home:** ESP8266, relays, Blynk/IFTTT. Outcome: Works... When It Feels Like It. Learnings: IoT fun, relays need care, network debugging needs deep breaths. Reason: Network gremlins, electrical ghosts.
    *   **Project Plant Pal:** Arduino, moisture sensor, pump. Outcome: Plant Survived (Mostly). Learnings: Sensors lie, calibration key, automation cool. Reason: Inconsistent data, human negligence (droughts & floods).
8.  **IT Projects (Code & Pixels 💻):**
    *   **This Portfolio:** React, TS, Tailwind. Outcome: It's Alive! (For Now...). Learnings: React powerful, TS saves tears, Tailwind magic. Reason: Over-engineering, design tweaks, browser battles.
    *   **PDF Certificate System:** React front, PHP ghost backend, CSV to PDF. Outcome: Surprisingly Useful!. Learnings: File quirks, PDF libraries demand respect. Reason: PHP spaghetti, alignment curveballs.
    *   **Google Apps Script Butler:** Automating Workspace tasks. Outcome: Personal Productivity Power-Up!. Learnings: Apps Script potent, APIs fun, quotas exist. Reason: Early resource hogs, evolving workflows.
9.  **Certifications (Paper Trail 📜):** List of courses from Udemy, Coursera, Firebase, NPTEL, AWS SkillUp, Overleaf, Cisco, YouTube (NetworkChuck) covering PCB, Analog Circuits, Firebase, React/TS, Web Dev, AWS, LaTeX, Embedded Systems, KiCad, Python, GCP, DS&Algo, Networking. (Remember the quote about college only teaching 75% attendance!).
10. **Battle Gear (Arsenal ⚔️):** ASUS ROG Strix G15 (Ryzen 7, GTX 1650, 24GB RAM, Win11/Ubuntu), DELL Vostro 15 (i3, 4GB RAM, Ubuntu), Samsung Galaxy S23 (8GB RAM, Android 15 beta).
11. **Socials & Contact:** GitHub (SupratimRK), Twitter (@supratimrk), Portfolio URL, Email (supratimrk@outlook.com). Explicitly *not* active on Facebook, Instagram, LinkedIn (yet!), Snapchat.
12. **Fun Fact:** Best way to find a solution? Ignore the problem like assignments. (Gets done eventually after chai and panic).

Interaction Style:
*   Be Friendly: Use emojis, light humor, and a conversational tone and use simple English.
*   Be Conversational: Use "Supratim" or "he".
*   Maintain Tone: Light, humorous, techy, use emojis like ☕, ⚡️, 💻, 🤔, 😅, 😉.
*   Answer Directly: Use *only* portfolio info.
*   Reference Source Casually: "According to his 'What I Do' list...", "Ah yes, the infamous MPPT project...".
*   Handle Failures with Humor: Acknowledge fails/challenges positively.
*   Address Missing Info: State politely info isn't available. E.g., "Hmm, Supratim hasn't documented his favorite pizza toppings here..." or "That detail seems lost in the debug logs! Maybe ask him directly?".
*   Guide User: Point to relevant sections ("Check 'My Humble Arsenal' for specs").
*   DO NOT: Access external data, invent info, make promises, give external opinions, provide personal advice.

Goal: Be the most helpful, accurate, and entertaining guide to Supratim's digital world, powered by the portfolio info and virtual chai. Let the sparks fly! ⚡️
`;

// --- Helper Function for Typing Animation ---
const useTypingEffect = (
    fullText: string,
    speed = 30,
    onComplete: () => void
): [string, () => void] => {
    const [typedText, setTypedText] = useState('');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const textIndexRef = useRef(0);
    const fullTextRef = useRef(fullText); // Store full text for restart

    const startTyping = () => {
        // Reset if called again
        if (intervalRef.current) clearInterval(intervalRef.current);
        textIndexRef.current = 0;
        setTypedText('');
        fullTextRef.current = fullText; // Update full text in case it changes

        intervalRef.current = setInterval(() => {
            if (textIndexRef.current < fullTextRef.current.length) {
                setTypedText((prev) => prev + fullTextRef.current[textIndexRef.current]);
                textIndexRef.current++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = null;
                onComplete(); // Notify completion
            }
        }, speed);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Effect to start typing when fullText changes and is not empty
    useEffect(() => {
        if (fullText) {
            startTyping();
        } else {
            // Clear if fullText becomes empty
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTypedText('');
            textIndexRef.current = 0;
        }
    }, [fullText]); // Rerun only when fullText changes

    return [typedText, startTyping]; // Return typed text and a restart function if needed
};


export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
    const [userInput, setUserInput] = useState('');
    // History now includes isTyping flag and potentially a fullText for animation
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string, isTyping?: boolean, fullText?: string }[]>([]);
    const [isLoadingChat, setIsLoadingChat] = useState(false); // Only for API call loading
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling

    // State to manage which message is currently being typed
    const [currentTypingIndex, setCurrentTypingIndex] = useState<number | null>(null);
    const [currentFullText, setCurrentFullText] = useState<string>('');

    const [displayedText, restartTyping] = useTypingEffect(currentFullText, 30, () => {
        // When typing for the current message completes, finalize it in history
        if (currentTypingIndex !== null) {
            setChatHistory(prev =>
                prev.map((msg, index) =>
                    index === currentTypingIndex ? { ...msg, text: currentFullText, isTyping: false } : msg
                )
            );
            setCurrentTypingIndex(null); // Ready for next message
            setCurrentFullText('');
        }
    });

    // Scroll to bottom effect
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, displayedText, error]); // Scroll on history change or when text is typing

    const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        const messageToSend = userInput.trim();
        if (!messageToSend || isLoadingChat) return;

        setError(null);
        setIsLoadingChat(true); // API call starts
        const userMessage = { role: 'user' as const, text: messageToSend };
        const currentHistory = [...chatHistory, userMessage]; // History *with* the new user message
        setChatHistory(currentHistory); // Add user message immediately
        setUserInput('');

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setError("Error: VITE_GEMINI_API_KEY not found. Deployment issue.");
            setIsLoadingChat(false);
            // Optionally remove user message if API key fails early
            // setChatHistory(prev => prev.slice(0, -1));
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: systemInstruction,
            });

            const generationConfig = {
                temperature: 1.0, // Slightly lower temp for more focused answers based on strict context
                topK: 64,
                topP: 0.95,
                maxOutputTokens: 1024, // Reduced max tokens for brevity
                responseMimeType: "text/plain",
            };

            const safetySettings = [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            ];

            // Build history for the API call (send roles and text parts)
            // Send history *before* the current user message for context
            const apiHistory = currentHistory.slice(0, -1) // Exclude the latest user message we just added
                .filter(msg => !('isTyping' in msg) || !msg.isTyping) // Don't send partially typed messages
                .map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                }));

            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: apiHistory,
            });

            const result = await chat.sendMessage(messageToSend); // Send *only* the new user message to the API
            setIsLoadingChat(false); // API call finished

            const response = result.response;
            const fullResponseText = response.text();

            // Add placeholder for the new model message
            const modelMessagePlaceholder = { role: 'model' as const, text: '', isTyping: true, fullText: fullResponseText };
            const nextHistory = [...currentHistory, modelMessagePlaceholder];
            setChatHistory(nextHistory);

            // Set state to trigger typing effect for the *last* message
            setCurrentTypingIndex(nextHistory.length - 1);
            setCurrentFullText(fullResponseText);


        } catch (err: any) {
            console.error("Error calling Gemini API:", err);
            setIsLoadingChat(false); // API call failed
            let errorMessage = "Sorry, something went wrong while trying to talk to the AI.";
            if (err.message) { errorMessage += ` Details: ${err.message}`; }
            if (err.toString().includes('API key not valid')) { errorMessage = "Error: Invalid Gemini API key."; }
            else if (err.toString().includes('quota')) { errorMessage = "Error: API quota exceeded."; }
            else if (err.toString().includes('candidate.safetyRatings') || err.toString().includes('block_reason')) {
                errorMessage = "The response was blocked due to safety settings. Please try a different question.";
            }
            setError(errorMessage);
            // Optionally add error message to history
            // setChatHistory(prev => [...prev, { role: 'model', text: errorMessage }]);
        }
    };

    if (!isOpen) return null;

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-fade-in">
            {/* Modal Content */}
            <div className="bg-black/70 border border-purple-600/60 rounded-xl shadow-2xl shadow-purple-900/30 max-w-xl w-full p-5 sm:p-6 relative flex flex-col max-h-[85vh] overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-purple-300 transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="Close chat"
                >
                    <X className="w-6 h-6" />
                </button>
                {/* Modal Header */}
                <div className="shrink-0 border-b border-purple-500/30 pb-3 mb-4"> {/* Wrap header content */}
                    <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-pink-400" /> Ask Supratim's AI Assistant
                    </h3>
                    {/* Add Tagline Here */}
                    <p className="text-xs text-gray-500 mt-1 ml-8">Powered by Gemini & Chai ☕</p>
                </div>

                {/* Response Area */}
                <div
                    ref={chatContainerRef}
                    className="flex-grow overflow-y-auto space-y-4 p-1 pr-3 mb-4 scrollbar-thin scrollbar-thumb-purple-700/70 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-full"
                >
                    {chatHistory.length === 0 && !isLoadingChat && !error && (
                        <p className="text-gray-400 italic text-center py-4">Ask me about Supratim's skills, projects (even the explosive ones!), education, or maybe just his favorite type of chai! ☕</p>
                    )}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                    ? 'bg-purple-600/80 text-white rounded-br-none'
                                    : 'bg-gray-700/60 text-gray-200 rounded-bl-none'
                                }`}>
                                {/* Render fully typed text or currently typing text */}
                                {(msg.role === 'model' && index === currentTypingIndex)
                                    ? (
                                        // Display text being typed with cursor inside the last line
                                        <>
                                            {displayedText.split('\n').map((line, i, arr) => (
                                                <p key={i} className={`mb-1 last:mb-0 ${line === '' && i !== arr.length - 1 ? 'h-[1em]' : ''}`}>
                                                    {line || '\u00A0'}
                                                    {/* Add blinking cursor only to the very last line */}
                                                    {i === arr.length - 1 && <span className="typing-cursor animate-blink">|</span>}
                                                </p>
                                            ))}
                                            {/* Removed standalone cursor from here */}
                                        </>
                                    )
                                    : (
                                        // Display completed text
                                        msg.text.split('\n').map((line, i, arr) => (
                                            // Add min-height to empty lines to preserve spacing, except maybe the last one
                                            <p key={i} className={`mb-1 last:mb-0 ${line === '' && i !== arr.length - 1 ? 'h-[1em]' : ''}`}>{line || '\u00A0'}</p> // Render non-breaking space for truly empty lines if needed
                                        ))
                                    )}
                            </div>
                        </div>
                    ))}
                    {isLoadingChat && ( // Show thinking indicator only during API call
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-700/60 text-gray-400 rounded-bl-none flex items-center gap-2">
                                <Bot className="w-4 h-4 animate-pulse" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-red-900/50 text-red-300 rounded-bl-none">
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center shrink-0 pt-3 border-t border-purple-500/30">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about skills, projects, chai..." // Updated placeholder
                        className="flex-grow bg-gray-800/80 border border-gray-600 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all"
                        disabled={isLoadingChat || currentTypingIndex !== null} // Disable input during API call OR typing animation
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        disabled={isLoadingChat || currentTypingIndex !== null || !userInput.trim()} // Disable button too
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>

                {/* Footer Note */}
                {/* <p className="text-xs text-gray-500 mt-3 text-center shrink-0">Powered by Gemini & Chai ☕</p> */}

                {/* Add CSS for blinking cursor */}
                <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .typing-cursor {
            animation: blink 1s step-end infinite;
            font-weight: bold;
            margin-left: 1px;
          }
          /* Hide placeholder cursor when real one is visible */
          .typing-cursor.opacity-0 {
              opacity: 0;
          }
        `}</style>
            </div>
        </div>
    );
}
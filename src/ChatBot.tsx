import { useState, useEffect, useRef } from 'react';
import { CircuitBoard, X, Send, Zap, Coffee, Brain, Cpu } from 'lucide-react';

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- Helper Function for Typing Animation ---
const useTypingEffect = (
    fullText: string,
    speed = 30,
    onComplete: () => void
): [string, () => void] => {
    const [typedText, setTypedText] = useState('');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const textIndexRef = useRef(0);
    const fullTextRef = useRef(fullText);

    const startTyping = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        textIndexRef.current = 0;
        setTypedText('');
        fullTextRef.current = fullText;

        intervalRef.current = setInterval(() => {
            if (textIndexRef.current < fullTextRef.current.length) {
                setTypedText((prev) => prev + fullTextRef.current[textIndexRef.current]);
                textIndexRef.current++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = null;
                onComplete();
            }
        }, speed);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (fullText) {
            startTyping();
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTypedText('');
            textIndexRef.current = 0;
        }
    }, [fullText]);

    return [typedText, startTyping];
};

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string, isTyping?: boolean, fullText?: string }[]>([]);
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // State to manage which message is currently being typed
    const [currentTypingIndex, setCurrentTypingIndex] = useState<number | null>(null);
    const [currentFullText, setCurrentFullText] = useState<string>('');

    const [displayedText] = useTypingEffect(currentFullText, 30, () => {
        // When typing for the current message completes, finalize it in history
        if (currentTypingIndex !== null) {
            setChatHistory(prev =>
                prev.map((msg, index) =>
                    index === currentTypingIndex ? { ...msg, text: currentFullText, isTyping: false } : msg
                )
            );
            setCurrentTypingIndex(null);
            setCurrentFullText('');
        }
    });

    // Scroll to bottom effect
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, displayedText, error]);

    const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        const messageToSend = userInput.trim();
        if (!messageToSend || isLoadingChat) return;

        setError(null);
        setIsLoadingChat(true);
        const userMessage = { role: 'user' as const, text: messageToSend };
        const currentHistory = [...chatHistory, userMessage];
        setChatHistory(currentHistory);
        setUserInput('');

        try {
            // Use Netlify function for API calls
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageToSend,
                    history: currentHistory.slice(0, -1).filter(msg => !('isTyping' in msg) || !msg.isTyping)
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            setIsLoadingChat(false);
            const fullResponseText = data.response;

            // Add placeholder for the new model message
            const modelMessagePlaceholder = { role: 'model' as const, text: '', isTyping: true, fullText: fullResponseText };
            const nextHistory = [...currentHistory, modelMessagePlaceholder];
            setChatHistory(nextHistory);

            // Set state to trigger typing effect for the last message
            setCurrentTypingIndex(nextHistory.length - 1);
            setCurrentFullText(fullResponseText);

        } catch (err: any) {
            console.error("Error calling chat API:", err);
            setIsLoadingChat(false);
            let errorMessage = "Sorry, something went wrong while trying to chat! ☕";
            
            if (err.message?.includes('Failed to fetch')) {
                errorMessage = "Connection failed. The chai server might be down! ☕";
            } else if (err.message) {
                errorMessage = `Oops! ${err.message}`;
            }
            
            setError(errorMessage);
        }
    };

    if (!isOpen) return null;

    return (
        // Modal Overlay - Updated to match portfolio theme
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-fade-in">
            {/* Modal Content - Updated styling */}
            <div className="bg-gray-900/90 border border-green-500/40 rounded-xl shadow-2xl shadow-green-500/20 max-w-xl w-full p-5 sm:p-6 relative flex flex-col max-h-[85vh] overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-green-400 transition-colors p-1 rounded-full hover:bg-green-500/10"
                    aria-label="Close chat"
                >
                    <X className="w-6 h-6" />
                </button>
                  {/* Modal Header - Circuit board theme */}
                <div className="shrink-0 border-b border-green-500/30 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-green-400 flex items-center gap-2.5">
                        <CircuitBoard className="w-5 h-5 text-green-400" /> 
                        Supratim's AI Assistant
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 ml-8 flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        Ask me anything about Supratim's journey! 🚀
                    </p>
                </div>

                {/* Response Area - Updated styling */}
                <div
                    ref={chatContainerRef}
                    className="flex-grow overflow-y-auto space-y-4 p-1 pr-3 mb-4 scrollbar-thin scrollbar-thumb-green-600/70 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-full"
                >                    {chatHistory.length === 0 && !isLoadingChat && !error && (
                        <div className="text-center py-6">
                            <div className="mb-4">
                                <Zap className="w-12 h-12 text-green-400 mx-auto opacity-50" />
                            </div>
                            <p className="text-gray-400 italic">
                                Ask me about Supratim's projects, skills, education, or his epic engineering failures! 
                                <br />
                                <span className="text-green-400">⚡ Ready to chat about circuits and code!</span>
                            </p>
                        </div>
                    )}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                    ? 'bg-green-600/80 text-white rounded-br-none border border-green-500/30'
                                    : 'bg-gray-800/80 text-gray-200 rounded-bl-none border border-gray-600/50'
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
                                        </>
                                    )
                                    : (
                                        // Display completed text
                                        msg.text.split('\n').map((line, i, arr) => (
                                            <p key={i} className={`mb-1 last:mb-0 ${line === '' && i !== arr.length - 1 ? 'h-[1em]' : ''}`}>{line || '\u00A0'}</p>
                                        ))
                                    )}
                            </div>
                        </div>
                    ))}
                    {isLoadingChat && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-800/80 text-gray-400 rounded-bl-none flex items-center gap-2 border border-gray-600/50">
                                <Brain className="w-4 h-4 animate-pulse text-green-400" />
                                <span>Processing through the chai-powered circuits...</span>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-red-900/50 text-red-300 rounded-bl-none border border-red-600/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <Zap className="w-4 h-4 text-red-400" />
                                    <span className="font-medium">Circuit Malfunction!</span>
                                </div>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area - Updated styling */}
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center shrink-0 pt-3 border-t border-green-500/30">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about projects, skills, chai consumption..." 
                        className="flex-grow bg-gray-800/90 border border-gray-600 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:border-green-500/50 transition-all"
                        disabled={isLoadingChat || currentTypingIndex !== null} 
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        disabled={isLoadingChat || currentTypingIndex !== null || !userInput.trim()} 
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>                {/* Footer Note - Clean single powered by message */}
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Coffee className="w-3 h-3 text-orange-400" />
                    <span>Powered by Gemini & Chai ☕</span>
                    <Zap className="w-3 h-3 text-green-400" />
                </div>

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
            color: #22c55e;
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
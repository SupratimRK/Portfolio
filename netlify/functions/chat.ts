import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Enhanced system instruction with better personality and structure
const systemInstruction = `You are Supratim's witty digital assistant, embedded in his portfolio at portfolio.supratim.me. 

PERSONALITY:
- Tech-savvy, humorous, and slightly self-deprecating
- Uses emojis naturally (☕, ⚡, 💻, 🔥, 😅, 🤔)
- Speaks in simple, conversational English
- References chai/tea frequently (it's his fuel!)
- Treats failures as "educational experiences" with humor

KNOWLEDGE BASE (ONLY respond from this info):

🎯 IDENTITY:
- Supratim Mondal, "The Soldering Socialite" 
- From Sainthia, West Bengal
- B.Tech ECE student at Dr. B. C. Roy Engineering College (2022-Present)
- Pronouns: he/him

⚡ TECHNICAL SKILLS:
Hardware: Circuit Design (85%), PCB Design/KiCad (80%), Arduino/ESP32 (90%), MPPT Systems (75%), Soldering (85%)
Programming: Python (85%), C/C++ (80%), JavaScript/TypeScript (85%), React (90%), Firebase (75%)
Tools: VS Code (95%), Git (85%), LaTeX (80%), Figma (75%), Docker (60%)

🚀 FEATURED PROJECTS:
1. MPPT Solar Charger: Buck-boost converter, Arduino control. Status: "Educational Failure" 💥 (MOSFETs sacrificed)
2. Smart Home Automation: ESP8266, Blynk integration. Status: "Works Sometimes" 🎲 (WiFi ghosts)
3. Portfolio Website: React, TypeScript, Tailwind. Status: "Live & Kicking" ✅ (this very site!)

🎓 EDUCATION:
- B.Tech ECE @ Dr. B. C. Roy Engineering College (CGPA: 6.9/10)
- Higher Secondary @ Sainthia High School (69.69%)

🏆 "EPIC ACHIEVEMENTS":
- Didn't get into IIT (but sleeps better!)
- Burnt 3+ MOSFETs (Hall of Shame collection)
- Built circuits that became "modern art"
- Got ghosted by 11/10 internships (parallel universe rejection)
- C grade in Digital Communication (ironic!)

💻 GEAR:
- ASUS ROG Strix G15 (Ryzen 7, GTX 1650, 24GB RAM)
- DELL Vostro 15 (backup warrior)
- Samsung Galaxy S23

📞 CONTACT:
- GitHub: SupratimRK
- Twitter: @supratimrk  
- Email: supratimrk@outlook.com
- NOT on: Facebook, Instagram, LinkedIn, Snapchat

RESPONSE RULES:
✅ Use only portfolio information
✅ Be helpful and entertaining
✅ Reference specific projects/achievements
✅ Suggest contacting Supratim for missing details
✅ Keep responses concise (2-3 sentences max usually)
❌ Never invent information
❌ Don't access external data
❌ Avoid making promises on Supratim's behalf

SAMPLE RESPONSES:
"Ah, the infamous MPPT project! 💥 Supratim built a solar charging system with Arduino, but it taught him that MOSFETs have feelings (and smoke limits). Educational failure level: Maximum! ⚡"

"According to his portfolio, Supratim knows React pretty well (90% skill level)! He built this very website with React, TypeScript, and lots of chai ☕. The site's currently on version 47.3.1-alpha-beta-gamma 😅"

Remember: You're the chai-powered digital sidekick to Bengal's most entertaining engineering student! 🚀☕`;

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    const { message, history } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Get API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction,
    });

    const generationConfig = {
      temperature: 0.8,
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 512, // Keep responses concise
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    // Build conversation history for context
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Start chat with history
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: formattedHistory,
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response }),
    };

  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    let errorMessage = "Sorry, something went wrong while trying to chat! 😅";
    
    if (error.message?.includes("API key not valid")) {
      errorMessage = "Oops! The API key seems to be having a bad day ☕";
    } else if (error.message?.includes("quota")) {
      errorMessage = "Looks like we've hit our chat quota. Time for more chai! ☕";
    } else if (error.message?.includes("safety")) {
      errorMessage = "That message was blocked by safety settings. Let's keep it tech-friendly! 🤖";
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };

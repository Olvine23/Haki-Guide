import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Scale, 
  MessageSquare, 
  Search, 
  User, 
  Home, 
  Briefcase, 
  HeartPulse, 
  Info,
  Send,
  Loader2,
  ChevronRight,
  Gavel,
  UserCircle,
  Bot
} from 'lucide-react';
import { cn } from './lib/utils';
import { generateHakiResponse } from './services/hakiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_SCENARIOS = [
  { id: 'arrest', icon: Shield, label: 'Arrest Rights', query: 'What are my rights if I am arrested by the police?' },
  { id: 'eviction', icon: Home, label: 'Illegal Eviction', query: 'What protection do I have against illegal eviction from my house?' },
  { id: 'salary', icon: Briefcase, label: 'Work/Salary', query: 'My employer is refusing to pay my salary. What does the law say?' },
  { id: 'health', icon: HeartPulse, label: 'Emergency Care', query: 'Can a hospital deny me emergency treatment if I cannot pay?' },
  { id: 'id', icon: User, label: 'ID/Birth Cert', query: 'How do I get a national ID or birth certificate if I am a Kenyan citizen?' },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { role: 'user', content: text, timestamp };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateHakiResponse(text);
      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: assistantTimestamp }]);
    } catch (error) {
      console.error(error);
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Pole sana (I am sorry), I encountered an error. Please try again later.',
        timestamp: errorTimestamp
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white border-x border-gray-200 shadow-sm">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kenya-red rounded-full flex items-center justify-center text-white shadow-sm">
            <Gavel size={20} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight">Haki-Guide</h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Civic Empowerment AI</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-gray-600">Constitution 2010 Context</span>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-md mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif italic text-gray-900">Jua Haki Zako</h2>
              <p className="text-gray-600">Know your rights as a citizen of Kenya. Ask me anything about the Constitution or common legal issues.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {QUICK_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleSend(scenario.query)}
                  className="flex items-center gap-3 p-4 text-left border border-gray-200 rounded-xl hover:border-kenya-red hover:bg-red-50 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                    <scenario.icon size={18} className="text-gray-600 group-hover:text-kenya-red" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{scenario.label}</span>
                  <ChevronRight size={14} className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest font-bold pt-4">
              <Info size={12} />
              <span>Powered by Kenyan Law</span>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                msg.role === 'user' ? "bg-gray-200 text-gray-600" : "bg-kenya-red/10 text-kenya-red"
              )}>
                {msg.role === 'user' ? <UserCircle size={20} /> : <Bot size={20} />}
              </div>

              <div className={cn(
                "flex flex-col",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                <div 
                  className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-kenya-black text-white rounded-tr-none" 
                      : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
                  )}
                >
                  <div className={cn(
                    "markdown-body prose prose-sm max-w-none",
                    msg.role === 'user' ? "prose-invert" : ""
                  )}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1.5 px-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">
                    {msg.role === 'user' ? 'Mwananchi' : 'Haki-Guide'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    • {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-3 mr-auto max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-kenya-red/10 text-kenya-red flex items-center justify-center">
              <Bot size={20} className="animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-gray-400 italic text-xs">
              <Loader2 size={14} className="animate-spin" />
              Haki-Guide anatafuta sheria...
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-gray-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center max-w-3xl mx-auto w-full"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Uliza swali kuhusu haki zako..."
            className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-kenya-red focus:bg-white transition-all text-sm shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-kenya-red text-white rounded-xl disabled:bg-gray-300 transition-all shadow-sm active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[9px] text-center text-gray-400 mt-3 uppercase tracking-widest font-medium">
          Haki-Guide: Built for the Citizen
        </p>
      </footer>
    </div>
  );
}

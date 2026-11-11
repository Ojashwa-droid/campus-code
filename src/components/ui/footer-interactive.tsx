import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Terminal,
  Sparkles
} from "lucide-react";

export default function FooterInteractive() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "This assistant preview uses sample responses. Ask about repository analysis, knowledge graphs, or source citations." }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userMsg = inputMsg;
    setChatMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInputMsg("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Sample response: CampusCode uses Eclipse JGit to clone repositories, Cognee (FastAPI) to map AST relationships into KùzuDB, and LanceDB for vector retrieval. In a full analysis, claims are linked to source locations.`
        }
      ]);
    }, 500);
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-black text-zinc-400 pt-16 pb-12 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-white/10">
                <img
                  src="/assets/logo.png"
                  alt="CampusCode"
                  width={18}
                  height={18}
                  className="invert opacity-90"
                />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                CAMPUS CODE
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              AI-Powered Student Code Portfolio & Architecture Analyzer. Transforming student GitHub repositories into verifiable Engineering Profiles.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>100% Local Privacy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-accent font-medium text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs font-mono-accent">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-white transition-colors">
                  Analyze Repository
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Engineering Dossier
                </Link>
              </li>
              <li>
                <Link to="/playground" className="hover:text-white transition-colors">
                  Simulator
                </Link>
              </li>
              <li>
                <a 
                  href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-zinc-300"
                >
                  Postman API Docs <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-accent font-medium text-white uppercase tracking-widest">
              Core Stack
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-accent">
              <div className="p-2 rounded-lg bg-zinc-950 border border-white/5">
                <div className="text-white text-[10px]">Backend</div>
                <div className="text-zinc-500 text-[9px]">Spring Boot</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-white/5">
                <div className="text-white text-[10px]">Graph DB</div>
                <div className="text-zinc-500 text-[9px]">KùzuDB</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-white/5">
                <div className="text-white text-[10px]">Vector DB</div>
                <div className="text-zinc-500 text-[9px]">LanceDB</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-white/5">
                <div className="text-white text-[10px]">LLM Engine</div>
                <div className="text-zinc-500 text-[9px]">Ollama (Local)</div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-accent font-medium text-white uppercase tracking-widest">
              Cohort Updates
            </h4>
            <p className="text-xs text-zinc-500 font-sans">
              Get notified when university engineering profiles are published.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2 rounded-md bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors flex items-center justify-center"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {subscribed && (
                <p className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Subscribed
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-zinc-600 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">CAMPUS CODE</span>
            <span>•</span>
            <span>SRM University Delhi-NCR</span>
          </div>
          <div>
            © {new Date().getFullYear()} CampusCode Project.
          </div>
        </div>
      </div>

      {/* Floating Interactive Assistant macOS Chat Window */}
      <div className="fixed bottom-5 right-5 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
          className="flex items-center gap-2 rounded-full bg-white px-2.5 py-2 text-xs font-semibold text-black shadow-glow-white hover:bg-white/95 transition-all lg:px-3.5"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Ask CampusCode AI</span>
          </button>
        ) : (
          <div className="w-80 rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-2xl overflow-hidden">
            {/* macOS title bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111] px-3.5 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] font-mono-accent text-zinc-400">
                  Assistant Preview
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-zinc-500 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="p-3 h-56 overflow-y-auto space-y-2 text-xs font-sans">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed text-xs ${
                      m.from === "user"
                        ? "bg-white text-black font-medium"
                        : "bg-zinc-900 border border-white/10 text-zinc-300"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-white/[0.08] p-2 flex gap-1.5 bg-black">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask about graph analysis..."
                className="flex-1 rounded-lg border border-white/10 bg-[#0c0c0c] px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 font-sans"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-black hover:bg-white/90"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>
        )}
      </div>
    </footer>
  );
}

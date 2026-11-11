import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Send, X } from "lucide-react";

export default function FooterInteractive() {
  const [email, setEmail] = useState("");
  const [emailNote, setEmailNote] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "assistant", text: "This is a sample assistant. Ask how the evidence reader works." }]);
  const [message, setMessage] = useState("");

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailNote(email ? "This preview does not send email yet." : "Enter an email address to preview validation.");
  };
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((items) => [...items, { from: "user", text: message }, { from: "assistant", text: "Sample answer: CampusCode connects claims to repository paths and line ranges so reviewers can inspect the source evidence." }]);
    setMessage("");
  };

  return (
    <footer className="border-t border-[var(--color-rule)] bg-[color:var(--color-source)]">
      <div className="cc-container grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2"><img src="/assets/logo.png" alt="" width={24} height={24} className="h-6 w-6 invert" /><span className="cc-title text-base">CampusCode</span></div>
          <p className="cc-copy mt-4 max-w-md">Repository-grounded engineering evidence for recruiters and university placement teams.</p>
        </div>
        <div>
          <p className="cc-label">Navigate</p>
          <nav className="mt-3 grid gap-2 text-sm"><Link className="cc-link" to="/dashboard">View sample dossier</Link><Link className="cc-link" to="/product">Analyze repository</Link><Link className="cc-link" to="/playground">Open simulator</Link><a className="cc-link" href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j" target="_blank" rel="noopener noreferrer">API docs</a></nav>
        </div>
        <div>
          <p className="cc-label">Cohort updates</p>
          <p className="cc-copy mt-3">A preview form for future placement-cell announcements.</p>
          <form onSubmit={subscribe} className="mt-4 grid gap-2">
            <label className="sr-only" htmlFor="cohort-email">Email address</label>
            <div className="flex flex-col gap-2 sm:flex-row"><input className="cc-input" id="cohort-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="recruiter@company.com" /><button className="cc-button cc-button--primary" type="submit"><Send className="h-3.5 w-3.5" /> Check email</button></div>
            <p aria-live="polite" className="cc-label min-h-[1.4em]">{emailNote}</p>
          </form>
        </div>
      </div>
      <div className="border-t border-[var(--color-rule)]"><div className="cc-container flex flex-col gap-2 py-5 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>CampusCode Project</span><span>SRM University Delhi-NCR</span></div></div>

      <div className="fixed bottom-5 right-5 z-50">
        {!chatOpen ? <button type="button" onClick={() => setChatOpen(true)} className="cc-button cc-button--primary min-h-11"><MessageSquare className="h-4 w-4" /> Ask CampusCode</button> : (
          <section aria-label="Sample assistant" className="cc-panel w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden">
            <header className="flex items-center justify-between border-b border-[var(--color-rule)] px-4 py-3"><span className="cc-label">Sample assistant</span><button type="button" onClick={() => setChatOpen(false)} className="cc-button cc-button--quiet min-h-8 w-8 border-0 px-0" aria-label="Close assistant"><X className="h-3.5 w-3.5" /></button></header>
            <div className="max-h-56 space-y-3 overflow-y-auto p-4">{messages.map((item, index) => <p key={index} className={`rounded-[var(--radius-control)] border p-3 text-xs leading-relaxed ${item.from === "user" ? "border-[var(--color-recruiter)] bg-[color:var(--color-recruiter-soft)] text-[color:var(--color-ink)]" : "border-[var(--color-rule)] bg-[color:var(--color-source)] text-[color:var(--color-ink-soft)]"}`}>{item.text}</p>)}</div>
            <form onSubmit={send} className="flex gap-2 border-t border-[var(--color-rule)] p-3"><label className="sr-only" htmlFor="assistant-message">Ask the sample assistant</label><input className="cc-input min-w-0" id="assistant-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about evidence" /><button className="cc-button cc-button--primary min-h-12 w-12 px-0" type="submit" aria-label="Send question"><Send className="h-4 w-4" /></button></form>
          </section>
        )}
      </div>
    </footer>
  );
}

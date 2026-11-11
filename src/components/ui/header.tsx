import { Link, useLocation } from "react-router-dom";
import { FileCode2, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Dossier" },
  { href: "/product", label: "Analyze" },
  { href: "/playground", label: "Simulator" },
];

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[color:var(--color-ground)]/95 backdrop-blur-sm">
      <div className="cc-container flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 no-underline" onClick={() => setMobileOpen(false)}>
          <img src="/assets/logo.png" alt="CampusCode" width={24} height={24} className="h-6 w-6 invert" />
          <span className="text-sm font-medium tracking-[-0.05em] text-[color:var(--color-ink)]">CampusCode</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => <Link key={link.href} to={link.href} className={`rounded-[var(--radius-control)] px-3 py-2 text-xs no-underline transition-colors duration-150 ${pathname === link.href ? "bg-[color:var(--color-surface)] text-[color:var(--color-ink)]" : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j" target="_blank" rel="noopener noreferrer" className="cc-button cc-button--quiet min-h-10 text-xs"><FileCode2 className="h-3.5 w-3.5" /> API docs</a>
          <Link to="/dashboard" className="cc-button cc-button--primary min-h-10 text-xs">View sample dossier</Link>
        </div>
        <button type="button" onClick={() => setMobileOpen((open) => !open)} className="cc-button cc-button--quiet min-h-10 w-10 px-0 lg:hidden" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
      </div>
      {mobileOpen && <nav aria-label="Mobile navigation" className="border-t border-[var(--color-rule)] bg-[color:var(--color-source)] lg:hidden"><div className="cc-container grid gap-1 py-3">{navLinks.map((link) => <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className={`rounded-[var(--radius-control)] px-3 py-3 text-sm no-underline ${pathname === link.href ? "bg-[color:var(--color-surface)] text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-soft)]"}`}>{link.label}</Link>)}<Link to="/dashboard" onClick={() => setMobileOpen(false)} className="cc-button cc-button--primary mt-2">View sample dossier</Link></div></nav>}
    </header>
  );
}

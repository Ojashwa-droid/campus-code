import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { 
  FileCode2, 
  Sparkles, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/product", label: "Analyze Repository" },
    { href: "/dashboard", label: "Engineering Dossier" },
    { href: "/playground", label: "Simulator" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-black">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 group-hover:border-white/25 transition-colors">
            <img
              src="/assets/logo.png"
              alt="CampusCode Logo"
              width={18}
              height={18}
              className="object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
            CampusCode
            <span className="text-[10px] font-mono-accent px-1.5 py-0.2 rounded-md bg-zinc-900 text-zinc-400 border border-white/10 font-normal">
              v1.0
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 text-xs font-mono-accent font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-white bg-zinc-900 border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono-accent text-zinc-400 hover:text-white border border-white/10 px-2.5 py-1.5 rounded-lg hover:border-white/20 transition-colors"
          >
            <FileCode2 className="h-3 w-3 text-zinc-400" />
            API Docs
            <ExternalLink className="h-2.5 w-2.5 opacity-50" />
          </a>

          <Link to="/product">
            <Button size="sm" variant="default" className="text-xs h-8 px-3.5 gap-1.5 font-medium">
              Analyze Repository
              <ChevronRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-white/10 bg-black px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-xs font-mono-accent font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link to="/product" onClick={() => setMobileOpen(false)}>
              <Button size="sm" variant="default" className="w-full text-xs">
                Analyze Repository
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

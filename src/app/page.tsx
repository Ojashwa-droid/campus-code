import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Code2, Database, FileSearch, GitBranch, MessageSquareText, ShieldCheck } from "lucide-react";
import { RainbowPrismWave } from "@/components/ui/rainbow-prism-wave";

const dimensions = [
  ["Architecture", "Service boundaries and orchestration", "WebSearchService → OmnisearchOrchestrator", GitBranch],
  ["Maintainability", "Configuration and documentation signals", "design-tokens.md", FileSearch],
  ["Testing", "Unit and integration evidence", "No verified test suite in the sample", ShieldCheck],
  ["Reliability", "Timeout and failure recovery", "multimodal-input-plan.md", Check],
  ["Security", "Injection and authentication controls", "SecurityFilter.java", ShieldCheck],
  ["Performance", "Streaming and parallel execution", "WebFlux and follow-up agents", Database],
] as const;

export default function Home() {
  return (
    <div className="cc-shell">
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-[var(--color-rule)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-55"><RainbowPrismWave /></div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[color:color-mix(in_oklab,var(--color-ground)_45%,transparent)]" />
        <div className="cc-container relative py-24 text-center md:py-32">
          <h1 className="cc-display mx-auto mt-5 max-w-5xl">Evidence-Based<br />Engineering Profiles</h1>
          <p className="cc-lead mx-auto">Review what a candidate actually built, with line-level proof from the repository.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/dashboard" className="cc-button cc-button--primary min-h-12 px-5">View sample dossier <ArrowUpRight className="h-4 w-4" /></Link>
            <Link to="/product" className="cc-button cc-button--quiet min-h-12 px-5">Analyze repository</Link>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-end">
            <div><h2 className="cc-heading">The dossier, before the interview</h2></div>
            <p className="cc-lead lg:mb-1">A recruiter can move from an engineering claim to the underlying file and line range without waiting for a screening call.</p>
          </div>
          <div className="cc-seamed mt-12 grid gap-px lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)]">
            <aside className="grid content-start gap-px"><div className="p-5"><p className="cc-label">Candidate dossier</p><p className="cc-title mt-2">OmniSearch</p><p className="cc-copy mt-4">Six evidence dimensions from the current repository sample.</p></div>{["Architecture", "Maintainability", "Testing", "Reliability", "Security", "Performance"].map((name, index) => <div key={name} className={`flex items-center justify-between p-4 ${index === 0 ? "bg-[color:var(--color-instrument-soft)]" : ""}`}><span className="text-sm text-[color:var(--color-ink-soft)]">{name}</span><span className="cc-measured text-sm text-[color:var(--color-ink)]">{index === 2 ? "0 / 5" : index > 2 ? "2 / 5" : "3 / 5"}</span></div>)}</aside>
            <article className="min-w-0 p-5 sm:p-8"><div className="mt-3 flex flex-wrap items-start justify-between gap-4"><h3 className="cc-title">System architecture and coupling</h3><span className="cc-measured cc-instrument text-sm">3 / 5</span></div><p className="cc-copy mt-4 max-w-3xl">The architecture is documented with services and agents that coordinate parallel execution and streaming responses.</p><div className="cc-source mt-8 overflow-hidden"><div className="flex flex-wrap justify-between gap-3 border-b border-[var(--color-rule)] px-4 py-3"><span className="cc-label text-[color:var(--color-ink-soft)]">OMNISEARCH_SETUP.md</span><span className="cc-label cc-instrument">Lines 20 to 32</span></div><pre className="m-0 overflow-x-auto p-4 text-xs leading-6 text-[color:var(--color-ink-soft)]"><code><span className="text-[color:var(--color-muted)]">20</span> WebSearchService handles Tavily API integration{"\n"}<span className="text-[color:var(--color-muted)]">21</span> OmnisearchOrchestrator coordinates parallel execution{"\n"}<span className="text-[color:var(--color-muted)]">22</span> SupabaseService handles data persistence</code></pre></div><Link className="cc-link mt-5 inline-flex items-center gap-2 text-sm" to="/dashboard">Inspect the full dossier <ArrowUpRight className="h-3.5 w-3.5" /></Link></article>
          </div>
        </div>
      </section>

      <section className="cc-section cc-section--band">
        <div className="cc-container grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div><h2 className="cc-heading">Ask the repository. Get cited answers.</h2><p className="cc-lead">Query the candidate’s architecture in natural language, then follow the answer directly into the repository.</p><Link to="/product" className="cc-button cc-button--primary mt-7">Open analysis workspace</Link></div>
          <div className="cc-panel overflow-hidden"><div className="border-b border-[var(--color-rule)] px-5 py-4"><p className="cc-label">Sample RAG response</p></div><div className="p-5"><div className="border-l-2 border-[var(--color-instrument)] pl-4"><p className="cc-label">Question</p><p className="mt-2 text-sm text-[color:var(--color-ink)]">Where is the auth middleware and JWT validation?</p></div><div className="mt-6 border-l-2 border-[var(--color-recruiter)] pl-4"><p className="cc-label">Grounded answer</p><p className="cc-copy mt-2">SecurityFilter.java validates the bearer token and attaches the authenticated principal before authorization checks run.</p><p className="cc-label cc-instrument mt-4">src/main/java/security/SecurityFilter.java, lines 42 to 65</p></div></div></div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-container"><div className="max-w-2xl"><h2 className="cc-heading">Six engineering dimensions</h2><p className="cc-lead">Each dimension is an evidence path, not a generic scorecard.</p></div><div className="mt-12 border-y border-[var(--color-rule)]">{dimensions.map(([name, description, source, Icon], index) => <article key={name} className="grid gap-4 border-b border-[var(--color-rule)] py-6 last:border-b-0 md:grid-cols-[3rem_minmax(12rem,0.6fr)_minmax(0,1fr)_auto] md:items-center"><span className="cc-measured text-sm text-[color:var(--color-muted)]">0{index + 1}</span><div className="flex items-center gap-3"><Icon className="h-4 w-4 cc-instrument" /><h3 className="cc-title text-base">{name}</h3></div><p className="cc-copy">{description}</p><span className="cc-label cc-instrument">{source}</span></article>)}</div></div>
      </section>

      <section className="cc-section cc-section--band">
        <div className="cc-container grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-rule)] bg-[color:var(--color-rule)] lg:grid-cols-2">
          <article className="bg-[color:var(--color-surface)] p-7 sm:p-10"><h2 className="cc-heading text-[clamp(2rem,4vw,3.25rem)]">For technical recruiters: inspect the proof.</h2><p className="cc-copy mt-5 max-w-lg">Verify reactive streaming, modular coupling, dependency injection, and source evidence before a technical interview is scheduled.</p><Link to="/dashboard" className="cc-button cc-button--primary mt-8">View sample dossier</Link></article>
          <article className="bg-[color:var(--color-ground)] p-7 sm:p-10"><h2 className="cc-heading mt-4 text-[clamp(2rem,4vw,3.25rem)]">For placement cells: standardize review.</h2><p className="cc-copy mt-5 max-w-lg">Generate consistent engineering dossiers across a graduating cohort without losing the path back to source code.</p><Link to="/product" className="cc-button cc-button--quiet mt-8">Analyze a repository</Link></article>
        </div>
      </section>
    </div>
  );
}

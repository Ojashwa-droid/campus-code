import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { RainbowPrismWave } from "@/components/ui/rainbow-prism-wave";
import { 
  Terminal, 
  Layers, 
  FileCode, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Cpu, 
  ChevronRight, 
  BarChart3, 
  ArrowUpRight,
  GitBranch,
  ShieldAlert,
  CheckCircle2,
  MessageSquare,
  FileCode2
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <RainbowPrismWave />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-24 text-center sm:px-10 md:py-32">
        {/* Hero Main Headline with subtle gradient */}
        <h1 className="relative max-w-4xl text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
          Evidence-Based <br className="hidden sm:inline" />
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Engineering Profiles
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Move beyond static resumes and timed coding quizzes. CampusCode models candidate repositories into verifiable AST knowledge graphs with line-level proof.
        </p>

        {/* High-contrast Sleek CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/product">
            <Button size="lg" variant="default" className="gap-2 text-xs font-semibold h-11 px-6 shadow-glow-white">
              <Sparkles className="h-3.5 w-3.5" />
              Analyze Repository
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="glass" className="gap-2 text-xs font-medium h-11 px-6">
              <BarChart3 className="h-3.5 w-3.5 text-zinc-400" />
              View Engineering Dossier
            </Button>
          </Link>
          <Link href="/playground">
            <Button size="lg" variant="outline" className="gap-2 text-xs font-medium h-11 px-5">
              <Terminal className="h-3.5 w-3.5 text-zinc-400" />
              Simulator
            </Button>
          </Link>
        </div>
      </section>

      {/* Problem / solution banner */}
      <section className="relative mx-auto flex max-w-5xl flex-col gap-4 px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 px-6 py-8 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-10">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent" />
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-widest text-blue-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              The case for evidence
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Stop Hiring Based on Memorized Puzzles.
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Traditional resumes and timed algorithmic quizzes fail to capture how a candidate actually engineers software.
            </p>
            <p className="mx-auto max-w-3xl text-xs leading-7 text-zinc-400 sm:text-sm">
              CampusCode shifts the evaluation from whiteboard hypotheticals to applied engineering. By transforming student GitHub repositories into verifiable knowledge graphs, we expose a candidate&apos;s true capability in system architecture, clean code practices, and security sanitization. No hallucinations, just line-level proof of competence.
            </p>
          </div>
        </div>
      </section>

      {/* Terminal Window with Negative Top Margin to visually connect with Hero */}
      <div className="relative z-20 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-left backdrop-blur-xl">
          {/* macOS window header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111111] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono-code text-[11px] text-zinc-500">
                sample-pipeline — bash
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              SAMPLE · HTTP 202 ACCEPTED
            </div>
          </div>

          {/* Terminal Body with Vercel / GitHub Dark syntax styling */}
          <div className="p-5 font-mono-code text-xs space-y-2.5 bg-[#0a0a0a] text-zinc-400 overflow-x-auto leading-relaxed">
            <div className="flex items-center gap-2 text-white">
              <span className="text-zinc-500">$</span>
              <span className="text-zinc-300">curl -X POST /api/v1/analyze</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-400">{`{"repo": "https://github.com/Ojashwa-droid/OmniSearch"}`}</span>
            </div>
            <div className="text-zinc-400 flex items-center gap-2 pl-3 border-l border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Step 1: Spring Boot spawned async worker in PostgreSQL.</span>
            </div>
            <div className="text-zinc-400 flex items-center gap-2 pl-3 border-l border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Step 2: Eclipse JGit cloned repository • Ingested 18 pull requests.</span>
            </div>
            <div className="text-zinc-400 flex items-center gap-2 pl-3 border-l border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-zinc-300">Step 3: Cognee built structural Knowledge Graph in KùzuDB & LanceDB.</span>
            </div>
            <div className="text-zinc-400 flex items-center gap-2 pl-3 border-l border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Step 4: Spring AI formatted Ollama analysis via BeanOutputConverter.</span>
            </div>
            <div className="text-emerald-400 font-medium pl-3 border-l border-emerald-500/40">
              ✓ 6 Evaluation Dimensions completed • Line-level citations verified.
            </div>
          </div>
        </div>
      </div>

      {/* How the pipeline turns source code into verifiable evidence */}
      <section className="relative mx-auto flex max-w-5xl flex-col gap-12 px-4 py-24 sm:px-6 md:py-32">
        <div className="flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl sm:p-8">
          <span className="text-xs font-mono-accent font-medium uppercase tracking-widest text-blue-200/60">
            How it works
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Explainable AI, Powered by AST and Graph RAG.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <article className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-zinc-950 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/20 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-300/[0.07] text-blue-200">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-white">Deep Repository Parsing</h3>
            <p className="text-xs leading-6 text-zinc-400">
              Asynchronous workers ingest repositories via Eclipse JGit, mapping out complex directory structures and extracting Abstract Syntax Trees (AST) to understand the code&apos;s foundational architecture.
            </p>
          </article>

          <article className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-zinc-950 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/20 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-300/[0.07] text-blue-200">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-white">Hybrid Knowledge Graphs</h3>
            <p className="text-xs leading-6 text-zinc-400">
              Raw code is transformed into semantic representations. By combining KùzuDB for structural graph relationships and LanceDB for vector embeddings, the engine understands both the syntax and the intent behind the commits.
            </p>
          </article>

          <article className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-zinc-950 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/20 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-300/[0.07] text-blue-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-white">Verifiable LLM Evaluation</h3>
            <p className="text-xs leading-6 text-zinc-400">
              Quantized, locally-hosted LLMs evaluate the codebase against strict engineering dimensions. A Spring AI formatting firewall ensures every insight generated is grounded in exact file paths and line numbers, eliminating false claims.
            </p>
          </article>
        </div>
      </section>

      {/* Repository RAG query engine */}
      <div className="relative mx-auto w-full max-w-7xl">
      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 border-y border-white/[0.08] px-4 py-24 sm:px-6 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex min-w-0 flex-col gap-8 rounded-2xl border border-white/[0.06] bg-zinc-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1 text-[10px] font-mono-accent uppercase tracking-[0.16em] text-emerald-200/80">
                <MessageSquare className="h-3 w-3" aria-hidden="true" />
                Repository RAG
              </span>
              <h2 className="max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Chat Directly With the Codebase.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                Stop guessing about implementation details. Ask the architecture directly.
              </p>
              <p className="max-w-xl text-xs leading-7 text-zinc-400 sm:text-sm">
                Interrogate candidate repositories in natural language. Powered by hybrid semantic retrieval via LanceDB and KùzuDB, CampusCode understands control flow, dependencies, and architectural intent—not just plain text.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-mono-accent font-medium uppercase tracking-widest text-zinc-500">
                Example queries
              </h3>
              <ul className="space-y-2.5">
                <li className="flex gap-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  <span className="mt-0.5 font-sans text-emerald-300/70">01</span>
                  <span>&ldquo;How does this handle reactive streaming?&rdquo;</span>
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  <span className="mt-0.5 font-sans text-emerald-300/70">02</span>
                  <span>&ldquo;Where is the auth middleware and JWT validation?&rdquo;</span>
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  <span className="mt-0.5 font-sans text-emerald-300/70">03</span>
                  <span>&ldquo;Explain the database timeout fallbacks.&rdquo;</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3 border-t border-white/[0.08] pt-5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
              <p className="font-sans text-xs leading-6 text-zinc-400 sm:text-sm">
                Responses are strictly grounded, returning verifiable file paths and code snippets instead of generic advice.
              </p>
            </div>
          </div>

          {/* Illustrative, non-interactive preview of a grounded RAG exchange. */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#090a0b] shadow-[0_24px_80px_-32px_rgba(16,185,129,0.2)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#111214] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-semibold text-white">CampusCode Repository RAG</h3>
                  <p className="truncate text-[10px] font-mono-accent text-zinc-500">OmniSearch · source-grounded chat</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-2 py-1 text-[9px] font-mono-accent uppercase tracking-wider text-emerald-200/80">
                Sample
              </span>
            </div>

            <div className="space-y-5 p-4 sm:p-5" role="group" aria-label="Illustrative repository conversation">
              <div className="flex justify-end">
                <div className="max-w-[92%] rounded-2xl rounded-tr-md border border-white/[0.06] bg-zinc-800 px-4 py-3 text-xs leading-relaxed text-zinc-100 sm:max-w-[86%] sm:text-sm">
                  Where is the auth middleware and JWT validation?
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl rounded-tl-md border border-emerald-300/20 bg-emerald-300/[0.045] p-4 shadow-[0_0_28px_-18px_rgba(52,211,153,0.55)] sm:p-5">
                <div className="flex items-center gap-2 text-[10px] font-mono-accent uppercase tracking-[0.14em] text-emerald-200/80">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Grounded answer
                </div>
                <p className="font-sans text-xs leading-6 text-zinc-200 sm:text-sm">
                  The authentication middleware is defined in <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono-code text-[11px] text-emerald-100">SecurityFilter.java</code>. It validates the bearer token, then attaches the authenticated principal to Spring&apos;s security context before authorization checks run.
                </p>

                <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#070809]">
                  <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2 text-[10px] font-mono-code text-zinc-500">
                    <FileCode2 className="h-3 w-3" aria-hidden="true" />
                    src/main/java/security/SecurityFilter.java
                  </div>
                  <pre className="overflow-x-auto p-3 font-mono-code text-[10px] leading-5 text-zinc-300 sm:text-[11px]"><code><span className="text-zinc-600">42 </span><span className="text-violet-300">if</span> (tokenProvider.isValid(token)) {'{'}{"\n"}<span className="text-zinc-600">43 </span>  <span className="text-sky-200">var</span> auth = tokenProvider.getAuthentication(token);{"\n"}<span className="text-zinc-600">44 </span>  SecurityContextHolder.getContext(){"\n"}<span className="text-zinc-600">45 </span>      .setAuthentication(auth);{"\n"}<span className="text-zinc-600">46 </span>{'}'}</code></pre>
                </div>

                <div className="inline-flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-1 rounded-lg border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1.5 text-[10px] font-mono-code text-emerald-100/90">
                  <span className="font-mono-accent text-emerald-200/60">Citation:</span>
                  <span>SecurityFilter.java (Lines 42-65)</span>
                </div>
              </div>

              <p className="text-center text-[9px] font-mono-accent uppercase tracking-wider text-zinc-600">
                Illustrative conversation · citations shown as a product preview
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Bento Box Layout for 6 Dimensions */}
      <section className="relative mx-auto flex max-w-5xl flex-col gap-12 border-t border-white/[0.08] px-4 py-24 sm:px-6 md:py-32">
        <div className="flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl sm:p-8">
          <span className="text-xs font-mono-accent font-medium tracking-widest text-zinc-500 uppercase">
            Architecture Dimensions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Comprehensive Codebase Audit
          </h2>
          <p className="text-xs font-sans text-zinc-400 sm:text-sm">
            Every candidate is measured against real engineering criteria extracted straight from repository commits.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="System Architecture & Coupling"
            description="Examines modular service boundaries, orchestrators, and separation of concerns across packages."
            tag="Dim 01"
            scoreBadge="3.0 / 5.0"
            scoreType="high"
            icon={<Layers className="h-4 w-4" />}
          />

          <FeatureCard
            title="Maintainability & Clean Code"
            description="Audits DRY principles, standardized configuration guidelines, design tokens, and documentation."
            tag="Dim 02"
            scoreBadge="3.0 / 5.0"
            scoreType="high"
            icon={<FileCode className="h-4 w-4" />}
          />

          <FeatureCard
            title="Automated Test Coverage"
            description="Scans for unit tests, integration suites, mock drivers, and regression defenses across pull requests."
            tag="Dim 03"
            scoreBadge="0.0 / 5.0"
            scoreType="low"
            icon={<ShieldAlert className="h-4 w-4 text-rose-400" />}
          />

          <FeatureCard
            title="Reliability & Error Handling"
            description="Detects timeout fallbacks, exception propagation, multimodal upload error handling, and recovery."
            tag="Dim 04"
            scoreBadge="2.0 / 5.0"
            scoreType="med"
            icon={<CheckCircle2 className="h-4 w-4 text-amber-400" />}
          />

          <FeatureCard
            title="Security & Sanitization"
            description="Audits prompt injection risks, privileged tool gating, authentication middleware, and token safety."
            tag="Dim 05"
            scoreBadge="2.0 / 5.0"
            scoreType="med"
            icon={<Lock className="h-4 w-4 text-amber-400" />}
          />

          <FeatureCard
            title="Performance & Concurrency"
            description="Evaluates async transitions, reactive streaming (WebFlux), thread concurrency, and parallel agents."
            tag="Dim 06"
            scoreBadge="3.0 / 5.0"
            scoreType="high"
            icon={<Cpu className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Stakeholder value proposition */}
      <section className="relative mx-auto flex max-w-5xl flex-col gap-12 border-t border-white/[0.08] px-4 py-24 sm:px-6 md:py-32">
        <div className="flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl sm:p-8">
          <span className="text-xs font-mono-accent font-medium uppercase tracking-widest text-zinc-500">
            Who it serves
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built for the Modern University to Enterprise Pipeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/20 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono-accent text-[10px] uppercase tracking-widest text-zinc-500">
                For University Placement Cells
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            </div>
            <p className="flex-1 font-sans text-sm leading-7 text-zinc-300">
              Automate the technical vetting of your graduating cohorts. Generate standardized, unbiased engineering dossiers for every student, drastically reducing the manual overhead for professors and placement officers.
            </p>
            <Link href="/product">
              <Button variant="glass" size="sm" className="w-full gap-2 text-xs">
                Analyze Repository <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </article>

          <article className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/20 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono-accent text-[10px] uppercase tracking-widest text-zinc-500">
                For Technical Recruiters
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            </div>
            <p className="flex-1 font-sans text-sm leading-7 text-zinc-300">
              Skip the initial technical screening call. Recruiters can instantly verify a candidate&apos;s proficiency in reactive streaming, modular coupling, or dependency injection before a single interview is scheduled. Every claim in the dossier links directly back to the candidate&apos;s source code.
            </p>
            <Link href="/dashboard">
              <Button variant="glass" size="sm" className="w-full gap-2 text-xs">
                Inspect Sample Dossier <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </article>
        </div>
      </section>

    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  MessageSquare,
  ExternalLink,
  Loader2,
  FileCode2,
} from "lucide-react";
import { submitRepositoryIngestion, sendRagConversation } from "@/lib/api";
import { IngestionJob } from "@/lib/types";

export default function ProductPage() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/Ojashwa-droid/OmniSearch");
  const [job, setJob] = useState<IngestionJob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [ragQuery, setRagQuery] = useState("");
  const [ragAnswer, setRagAnswer] = useState<{ answer: string; citations: string[] } | null>(null);
  const [ragLoading, setRagLoading] = useState(false);
  const [ragError, setRagError] = useState<string | null>(null);
  const progressTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => {
    progressTimers.current.forEach(clearTimeout);
  }, []);

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    progressTimers.current.forEach(clearTimeout);
    progressTimers.current = [];
    setSubmissionError(null);
    setIsSubmitting(true);
    try {
      const newJob = await submitRepositoryIngestion(repoUrl);
      setJob(newJob);

      progressTimers.current = [
        setTimeout(() => {
          setJob((prev) => prev ? { ...prev, progressPercentage: 50, step: "Step 3: Cognee constructing Knowledge Graph in KùzuDB..." } : null);
        }, 1500),
        setTimeout(() => {
          setJob((prev) => prev ? { ...prev, progressPercentage: 80, step: "Step 4: Ollama analyzing coupling & modularity..." } : null);
        }, 3200),
        setTimeout(() => {
          setJob((prev) => prev ? { ...prev, progressPercentage: 100, status: "COMPLETED", step: "Sample pipeline complete. No repository was analyzed." } : null);
        }, 4800),
      ];
    } catch {
      setSubmissionError("The sample analysis could not start. Check the repository URL and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;
    setRagError(null);
    setRagAnswer(null);
    setRagLoading(true);
    try {
      const resp = await sendRagConversation(ragQuery);
      setRagAnswer(resp);
    } catch {
      setRagError("The sample response could not be loaded. Try again.");
    } finally {
      setRagLoading(false);
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 text-xs font-mono-accent text-zinc-400">
          <Terminal className="h-3 w-3 text-zinc-400" />
          <span>Repository Analysis Demo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Analyze Repository
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
          Enter a GitHub repository URL to preview the analysis flow. This page uses simulated progress and sample RAG answers; it does not run a live repository analysis.
        </p>
      </div>

      <div>
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c] shadow-[0_24px_80px_-36px_rgba(255,255,255,0.16)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-[#111113] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
            <span className="ml-2 flex items-center gap-2 text-[11px] font-mono-accent text-zinc-500">
              <GitBranch className="h-3 w-3" /> Repository Submission
            </span>
          </div>
          <p className="px-5 pt-4 text-xs leading-relaxed text-zinc-400 sm:px-6" role="note">
            Demo preview · progress and query responses are illustrative, not live analysis results.
          </p>
          <form onSubmit={handleStartIngestion} className="space-y-4 p-5 sm:p-6">
            <div>
              <label htmlFor="repository-url" className="mb-2 block text-[10px] font-mono-accent uppercase tracking-[0.18em] text-zinc-500">
                GitHub Repository URL
              </label>
              <input
                id="repository-url"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                required
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-xs text-white font-mono-code placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setRepoUrl("https://github.com/spring-projects/spring-boot")}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 underline font-sans"
              >
                Use Spring Boot demo repo
              </button>
              <Button type="submit" disabled={isSubmitting} variant="default" className="gap-2 text-xs h-9 px-4">
                {isSubmitting ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Starting demo...</> : <><Sparkles className="h-3.5 w-3.5" /> Run Demo Analysis</>}
              </Button>
            </div>
            {submissionError && <p className="text-xs leading-relaxed text-rose-300" role="alert">{submissionError}</p>}
          </form>
        </div>
      </div>

      <div className="relative pt-0 lg:pt-24">
        <svg aria-hidden="true" viewBox="0 0 1000 96" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 hidden h-24 w-full overflow-visible lg:block">
          <defs>
            <filter id="branch-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g fill="none" stroke="#86efac" strokeOpacity="0.38" strokeWidth="1.2" filter="url(#branch-glow)">
            <path d="M500 0 V28 H166 V94" />
            <path d="M500 0 V94" />
            <path d="M500 0 V28 H834 V94" />
          </g>
          <g fill="#86efac" fillOpacity="0.8">
            <circle cx="500" cy="28" r="3" />
            <circle cx="166" cy="94" r="2.5" />
            <circle cx="500" cy="94" r="2.5" />
            <circle cx="834" cy="94" r="2.5" />
          </g>
        </svg>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Left branch: ingestion and pipeline status */}
          <section className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                <Layers className="h-4 w-4 text-emerald-300" /> Pipeline Status
              </h2>
              <span className={`rounded border px-2 py-0.5 text-[9px] font-mono-accent ${job ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-zinc-900 text-zinc-500"}`}>
                {job ? `DEMO · ${job.status}` : "DEMO READY"}
              </span>
            </div>

            {job && (
              <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c]">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111] px-3 py-2 text-[10px] font-mono-code">
                  <span className="truncate text-zinc-400">job :: {job.jobId}</span>
                  <span className="text-zinc-500">{job.progressPercentage}%</span>
                </div>
                <div className="h-1 bg-zinc-900">
                  <div className="h-full bg-emerald-300 transition-all duration-700" style={{ width: `${job.progressPercentage}%` }} />
                </div>
                <p className="p-3 text-[11px] leading-relaxed text-zinc-400">{job.step}</p>
              </div>
            )}

            <div className="space-y-3 font-sans text-xs">
              <div className="rounded-xl border border-white/5 bg-black p-3">
                <span className="flex items-center gap-2 font-medium text-zinc-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Simulated HTTP 202 response</span>
                <p className="mt-1.5 pl-3.5 text-[11px] leading-relaxed text-zinc-500">Asynchronous ingestion avoids gateway timeouts during deep AST parsing.</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-black p-3">
                <span className="flex items-center gap-2 font-medium text-zinc-200"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> KùzuDB Graph + LanceDB</span>
                <p className="mt-1.5 pl-3.5 text-[11px] leading-relaxed text-zinc-500">Cognee builds hybrid AST and vector representations for retrieval.</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-black p-3">
                <span className="flex items-center gap-2 font-medium text-zinc-200"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Spring AI Formatting Firewall</span>
                <p className="mt-1.5 pl-3.5 text-[11px] leading-relaxed text-zinc-500">BeanOutputConverter validates structured analysis before it reaches the UI.</p>
              </div>
            </div>
          </section>

          {/* Center branch: report destination */}
          <section className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                <FileCode2 className="h-4 w-4 text-emerald-300" /> Generated Report
              </h2>
              <span className="rounded border border-white/10 bg-zinc-900 px-2 py-0.5 text-[9px] font-mono-accent text-zinc-500">DOSSIER</span>
            </div>
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-white/5 bg-black p-5 text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07]">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Engineering Dossier</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 font-sans">Six evidence-backed dimensions, code citations, and an architecture profile.</p>
              <Link to="/dashboard" className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-emerald-300/30 hover:text-white">
                View Engineering Dossier <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-4 text-center text-[10px] font-mono-accent text-zinc-600">SAMPLE DOSSIER PREVIEW</p>
          </section>

          {/* Right branch: repository RAG */}
          <section className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                <MessageSquare className="h-4 w-4 text-emerald-300" /> RAG Response Preview
              </h2>
              <span className="rounded border border-white/5 bg-zinc-900 px-2 py-0.5 text-[9px] font-mono-accent text-zinc-500">/conversation</span>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-zinc-400 font-sans">
              Preview the format of a code-grounded answer. This demo returns a sample response rather than querying a repository.
            </p>
            <form onSubmit={handleRagSubmit} className="space-y-3">
              <label htmlFor="rag-query" className="sr-only">Ask the repository</label>
              <textarea
                id="rag-query"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                placeholder="How does this repository handle reactive streaming?"
                rows={3}
                className="w-full resize-y rounded-lg border border-white/10 bg-black px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
              />
              <Button type="submit" disabled={ragLoading} size="sm" variant="default" className="w-full gap-2 text-xs">
                {ragLoading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing preview...</> : <>Show Sample Answer <ArrowRight className="h-3.5 w-3.5" /></>}
              </Button>
            </form>
            {ragError && <p className="mt-3 text-xs leading-relaxed text-rose-300" role="alert">{ragError}</p>}
            {ragAnswer && (
              <div className="mt-4 space-y-2.5 rounded-xl border border-white/10 bg-[#0c0c0c] p-3 text-xs">
                <span className="block text-[10px] font-mono-accent uppercase tracking-widest text-zinc-500">Sample response</span>
                <p className="font-sans leading-relaxed text-zinc-300">{ragAnswer.answer}</p>
                <div className="border-t border-white/5 pt-2">
                  <span className="mb-1.5 block text-xs font-mono-accent font-semibold uppercase tracking-widest text-zinc-500">Retrieved citations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ragAnswer.citations.map((cite, i) => <span key={i} className="rounded-md border border-white/10 bg-zinc-900 px-2 py-0.5 font-mono-code text-[10px] text-zinc-300">{cite}</span>)}
                  </div>
                </div>
              </div>
            )}
            <a href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-zinc-500 transition hover:text-zinc-200">
              <span className="flex items-center gap-2"><FileCode2 className="h-3.5 w-3.5" /> Postman API Collection</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>
        </div>
      </div>
      </div>

    </div>
  );
}

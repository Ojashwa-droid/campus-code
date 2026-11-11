import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, CircleDashed, Database, FileCode2, GitBranch, Loader2, MessageSquareText, ShieldCheck } from "lucide-react";
import { submitRepositoryIngestion, sendRagConversation } from "@/lib/api";
import { IngestionJob } from "@/lib/types";

const stages = [
  ["Repository", "Eclipse JGit resolves the repository and commits.", GitBranch],
  ["Structure", "Cognee maps files, classes, methods, and dependencies.", FileCode2],
  ["Knowledge", "KùzuDB and LanceDB connect structure to semantic retrieval.", Database],
  ["Evaluation", "Spring AI formats an evidence-backed engineering dossier.", ShieldCheck],
] as const;

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

  useEffect(() => () => progressTimers.current.forEach(clearTimeout), []);

  const startAnalysis = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!repoUrl) return;
    progressTimers.current.forEach(clearTimeout);
    setSubmissionError(null);
    setIsSubmitting(true);
    try {
      const nextJob = await submitRepositoryIngestion(repoUrl);
      setJob(nextJob);
      progressTimers.current = [
        setTimeout(() => setJob((current) => current ? { ...current, progressPercentage: 50, step: "Structure mapped into the sample knowledge graph." } : current), 1500),
        setTimeout(() => setJob((current) => current ? { ...current, progressPercentage: 80, step: "Evidence dimensions prepared for evaluation." } : current), 3200),
        setTimeout(() => setJob((current) => current ? { ...current, progressPercentage: 100, status: "COMPLETED", step: "Sample pipeline complete. No repository was analyzed." } : current), 4800),
      ];
    } catch { setSubmissionError("The sample analysis could not start. Check the repository URL and try again."); }
    finally { setIsSubmitting(false); }
  };

  const askRepository = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ragQuery.trim()) return;
    setRagError(null); setRagAnswer(null); setRagLoading(true);
    try { setRagAnswer(await sendRagConversation(ragQuery)); }
    catch { setRagError("The sample response could not be loaded. Try again."); }
    finally { setRagLoading(false); }
  };

  return (
    <div className="cc-shell cc-app-section">
      <div className="cc-container">
        <header className="grid gap-6 border-b border-[var(--color-rule)] pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div><h1 className="cc-heading">Repository analysis demo</h1><p className="cc-copy mt-3">Trace the evidence chain.</p></div>
          <p className="cc-lead lg:mb-1">This is a simulated analysis flow. It shows how a repository becomes verifiable dossier evidence without claiming to analyze a live URL.</p>
        </header>

        <section className="cc-section grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-rule)] bg-[color:var(--color-rule)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <form onSubmit={startAnalysis} className="bg-[color:var(--color-surface)] p-6 sm:p-8">
            <label htmlFor="repository-url" className="cc-label">GitHub repository URL</label>
            <input id="repository-url" value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} className="cc-input mt-2" placeholder="https://github.com/owner/repository" />
            <p className="cc-label mt-3">The run is illustrative. No repository is cloned or transmitted.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="submit" disabled={isSubmitting} className="cc-button cc-button--primary">{isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing sample</> : "Run sample analysis"}</button><button type="button" onClick={() => setRepoUrl("https://github.com/spring-projects/spring-boot")} className="cc-button cc-button--quiet">Use Spring Boot sample</button></div>
            {submissionError && <p className="mt-4 text-sm text-[color:var(--color-warning)]" role="alert">{submissionError}</p>}
          </form>
          <div className="bg-[color:var(--color-source)] p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><p className="cc-label">Pipeline state</p><span className={`cc-label ${job ? "cc-instrument" : ""}`}>{job ? `Sample ${job.status.toLowerCase()}` : "Ready for sample run"}</span></div><p className="cc-title mt-4">{job?.step ?? "Choose a repository to preview the evidence pipeline."}</p><div className="mt-7 h-1 bg-[color:var(--color-rule)]"><div className="h-full origin-left bg-[color:var(--color-instrument)] transition-transform duration-300" style={{ transform: `scaleX(${(job?.progressPercentage ?? 0) / 100})` }} /></div><p className="cc-label mt-3">{job ? `${job.progressPercentage}%` : "No job started"}</p></div>
        </section>

        <section className="cc-section"><div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start"><div><h2 className="cc-heading">Provenance trail</h2><p className="cc-copy mt-3">One path from source to claim.</p></div><div className="border-l border-[var(--color-rule-strong)]">{stages.map(([name, description, Icon], index) => <article key={name} className="relative grid gap-4 border-b border-[var(--color-rule)] py-5 pl-8 last:border-b-0 sm:grid-cols-[2rem_minmax(10rem,0.55fr)_minmax(0,1fr)] sm:items-center"><span className="absolute -left-[0.35rem] top-7 h-3 w-3 rounded-full border border-[var(--color-rule-strong)] bg-[color:var(--color-ground)]" /><Icon className={index === 0 ? "h-4 w-4 cc-recruiter" : "h-4 w-4 cc-instrument"} /><h3 className="cc-title text-base">{name}</h3><p className="cc-copy">{description}</p></article>)}</div></div></section>

        <section className="cc-section cc-section--band"><div className="grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-rule)] bg-[color:var(--color-rule)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"><div className="bg-[color:var(--color-surface)] p-6 sm:p-8"><h2 className="cc-heading text-[clamp(2rem,4vw,3.25rem)]">Repository RAG preview</h2><p className="cc-copy mt-3">Ask for an implementation detail.</p><p className="cc-copy mt-4">The answer below is sample content, formatted as a code-grounded response.</p><form onSubmit={askRepository} className="mt-7 grid gap-3"><label className="cc-label" htmlFor="rag-query">Question</label><textarea id="rag-query" className="cc-input min-h-28 resize-y" value={ragQuery} onChange={(event) => setRagQuery(event.target.value)} placeholder="How does this repository handle reactive streaming?" /><button type="submit" disabled={ragLoading} className="cc-button cc-button--primary justify-self-start">{ragLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><MessageSquareText className="h-4 w-4" /> Answer</>}</button>{ragError && <p className="text-sm text-[color:var(--color-warning)]" role="alert">{ragError}</p>}</form></div><div className="bg-[color:var(--color-source)] p-6 sm:p-8">{ragAnswer ? <div><p className="cc-label">Grounded sample response</p><p className="cc-copy mt-4 text-[color:var(--color-ink-soft)]">{ragAnswer.answer}</p><div className="mt-8 border-t border-[var(--color-rule)] pt-4"><p className="cc-label">Retrieved citations</p><ul className="mt-3 grid gap-2">{ragAnswer.citations.map((citation) => <li key={citation} className="cc-instrument text-xs">{citation}</li>)}</ul></div></div> : <div className="flex min-h-full items-center"><p className="cc-copy">Submit a question to preview an answer with source citations.</p></div>}<Link to="/dashboard" className="cc-link mt-8 inline-flex items-center gap-2 text-sm">View the sample dossier <ArrowUpRight className="h-3.5 w-3.5" /></Link></div></div></section>
      </div>
    </div>
  );
}

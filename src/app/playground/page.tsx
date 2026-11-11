import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  ExternalLink, 
  Layers, 
  Cpu, 
  GitBranch, 
  CheckCircle2, 
  FolderTree,
  FileCode2,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaygroundPage() {
  const stages = [
    {
      step: 1,
      title: "JGit Repository Cloning",
      desc: "Clones the target Spring Boot codebase, resolves branch heads, and fetches commit metadata.",
      status: "COMPLETED",
      time: "1.2s",
    },
    {
      step: 2,
      title: "AST Parsing & Graph Mapping",
      desc: "Extracts classes, methods, annotations (@RestController, @Service, @Async), and dependencies into KùzuDB.",
      status: "COMPLETED",
      time: "3.4s",
    },
    {
      step: 3,
      title: "Vector Embeddings & LanceDB Sync",
      desc: "Generates semantic vectors for docstrings and code chunks to power deep RAG context retrieval.",
      status: "COMPLETED",
      time: "2.8s",
    },
    {
      step: 4,
      title: "Spring AI LLM Scoring (Ollama)",
      desc: "Executes local model prompts with BeanOutputConverter formatting firewall to produce verified scorecards.",
      status: "READY",
      time: "Pending",
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      
      {/* Playground Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 text-xs font-mono-accent text-zinc-400 mb-3">
            <Terminal className="h-3 w-3 text-zinc-400" />
            <span>Reference Pipeline Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Spring Boot Ingestion Preview
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-sans">
            The stages, timings, and file hierarchy below are illustrative snapshots for the Spring Boot reference repository.
          </p>
          <a
            href="https://github.com/spring-projects/spring-boot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-sans hover:text-white underline mt-2"
          >
            spring-projects/spring-boot <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a 
            href="https://documenter.getpostman.com/view/41403866/2sBYHYuy7j" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="glass" size="sm" className="gap-1.5 text-xs">
              <FileCode2 className="h-3.5 w-3.5 text-zinc-400" /> API Docs
            </Button>
          </a>
        </div>
      </div>

      {/* Simulator Pipeline Steps Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((st) => (
          <div
            key={st.step}
            className={`p-4 rounded-xl border transition-all ${
              st.status === "COMPLETED"
                ? "bg-zinc-950 border-white/15"
                : "bg-black border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-accent uppercase text-zinc-500">
                Stage 0{st.step}
              </span>
              <span className="text-[10px] font-mono-accent px-2 py-0.2 rounded bg-zinc-900 text-zinc-300 border border-white/10 font-semibold">
                {st.time}
              </span>
            </div>
            <h3 className="text-xs font-semibold text-white mb-1">
              {st.title}
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* AST Viewer & Sandbox in macOS IDE format */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Ingested File Tree */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-zinc-950 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-xs font-semibold text-white flex items-center gap-2">
              <FolderTree className="h-3.5 w-3.5 text-zinc-400" />
              Ingested Repository AST Structure
            </h3>
            <span className="text-[10px] font-mono-code text-zinc-500">
              spring-boot / main
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono-code">
            <div className="p-2 rounded-lg bg-black border border-white/5 flex items-center justify-between text-zinc-400 text-[11px]">
              <span>spring-boot-project/</span>
              <span className="text-[10px] font-mono-accent text-zinc-600">Folder</span>
            </div>

            <div className="pl-3 space-y-1 border-l border-white/10">
              <div className="p-2 rounded-lg bg-black border border-white/5 flex items-center justify-between text-zinc-200 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="h-3 w-3 text-zinc-400" />
                  SpringBootApplication.java
                </span>
                <span className="text-[9px] font-mono-accent bg-zinc-900 text-zinc-400 px-1.5 py-0.2 rounded border border-white/5">@Config</span>
              </div>

              <div className="p-2 rounded-lg bg-black border border-white/5 flex items-center justify-between text-zinc-200 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="h-3 w-3 text-zinc-400" />
                  ApplicationContextFactory.java
                </span>
                <span className="text-[9px] font-mono-accent bg-zinc-900 text-zinc-400 px-1.5 py-0.2 rounded border border-white/5">Factory</span>
              </div>

              <div className="p-2 rounded-lg bg-black border border-white/5 flex items-center justify-between text-zinc-200 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="h-3 w-3 text-zinc-400" />
                  AutoConfigurationImportSelector.java
                </span>
                <span className="text-[9px] font-mono-accent bg-zinc-900 text-zinc-400 px-1.5 py-0.2 rounded border border-white/5">AutoConfig</span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-zinc-900 border border-white/10 text-[11px] text-zinc-400 leading-relaxed font-sans">
              <span className="font-semibold text-zinc-200 block mb-0.5">Knowledge Representation:</span>
              Cognee parsed 4,820 classes and 19,410 methods into KùzuDB graph nodes without high memory consumption.
            </div>
          </div>
        </div>

        {/* Right: macOS Native Window Code Sandbox */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0c0c0c] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111] px-4 py-3 text-xs font-mono-code">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-zinc-400">
                spring-projects/spring-boot — git
              </span>
            </div>
            <a
              href="https://github.com/spring-projects/spring-boot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px] underline"
            >
              GitHub <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>

          <div className="p-6 bg-black flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300">
              <Terminal className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">
              Target Codebase: Spring Boot Reference Sandbox
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm font-sans leading-relaxed">
              Explore the official repository directly on GitHub or run an automated CampusCode evaluation against it.
            </p>
            <div className="flex gap-2.5 pt-2">
              <a
                href="https://github.com/spring-projects/spring-boot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="sm" className="text-xs gap-1.5">
                  Open GitHub <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
              <Link to="/product">
                <Button variant="glass" size="sm" className="text-xs gap-1.5">
                  <Sparkles className="h-3 w-3" /> Analyze In Ingestion
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

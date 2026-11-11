"use client";

import { useState } from "react";
import { SAMPLE_REPORT, SAMPLE_GRAPH_NODES } from "@/lib/api";
import { DimensionScore } from "@/lib/types";
import { 
  BarChart3, 
  Layers, 
  GitCommit, 
  FileCode, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  Network,
  ChevronRight,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionScore>(SAMPLE_REPORT.dimensions[0]);
  const [activeTab, setActiveTab] = useState<"dimensions" | "graph" | "raw">("dimensions");
  const [selectedGraphNode, setSelectedGraphNode] = useState(SAMPLE_GRAPH_NODES[0]);

  const getScoreBadge = (score: number) => {
    if (score >= 3) return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", label: "Strong Evidence" };
    if (score >= 2) return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", label: "Acceptable" };
    return { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", label: "Deficit" };
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      
      {/* Top Dossier Summary Header */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono-accent font-medium px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-white/10">
                Verified Dossier
              </span>
              <span className="text-xs text-zinc-500 font-mono-accent">
                id :: {SAMPLE_REPORT.id.substring(0, 8)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Skill Dossier
            </h1>
            <p className="mt-1 text-xs text-zinc-400 flex items-center gap-2 font-sans">
              Repository: 
              <a 
                href={SAMPLE_REPORT.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-white underline font-sans inline-flex items-center gap-1"
              >
                {SAMPLE_REPORT.repositoryUrl} <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          {/* Overall Compliance Score Badge */}
          <div className="flex items-center gap-4 bg-black p-3.5 rounded-xl border border-white/10">
            <div className="text-right">
              <div className="text-[10px] font-mono-accent text-zinc-500 uppercase">Compliance Score</div>
              <div className="text-2xl font-bold text-white tracking-tight">
                {SAMPLE_REPORT.overallScore} <span className="text-xs font-normal text-zinc-500">/ 100</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white font-mono-accent font-bold text-sm">
              43%
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
          <button
            onClick={() => setActiveTab("dimensions")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-2 transition-colors ${
              activeTab === "dimensions" 
                ? "bg-white text-black font-semibold" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            6 Dimension Breakdowns
          </button>

          <button
            onClick={() => setActiveTab("graph")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-2 transition-colors ${
              activeTab === "graph" 
                ? "bg-white text-black font-semibold" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            KùzuDB AST Graph
          </button>

          <button
            onClick={() => setActiveTab("raw")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-2 transition-colors ${
              activeTab === "raw" 
                ? "bg-white text-black font-semibold" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            Strict JSON
          </button>
        </div>
      </div>

      {/* TAB 1: Bento Dimensions & Evidence */}
      {activeTab === "dimensions" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Dimension Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-mono-accent font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Select Dimension
            </span>
            {SAMPLE_REPORT.dimensions.map((dim) => {
              const isSelected = selectedDimension.dimension === dim.dimension;
              const badge = getScoreBadge(dim.score);
              return (
                <div
                  key={dim.dimension}
                  onClick={() => setSelectedDimension(dim)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-900 border-white/25 shadow-glass-inner"
                      : "bg-zinc-950 border-white/10 hover:border-white/20 hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white capitalize">
                      {dim.dimension}
                    </span>
                    <span className={`text-[10px] font-mono-accent px-2 py-0.2 rounded-md border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {dim.score} / 5
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {dim.rationale}
                  </p>
                  <div className="mt-2 text-[10px] font-mono-accent text-zinc-500 flex items-center gap-1">
                    <span>Evidence items:</span>
                    <span className="text-zinc-300 font-semibold">{dim.citations.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evidence Dossier & Citations Detail View */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl space-y-6">
              
              <div className="border-b border-white/[0.08] pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white capitalize">
                    {selectedDimension.dimension} Evaluation
                  </h3>
                  <span className={`text-[11px] font-mono-accent px-2.5 py-0.5 rounded-md border ${getScoreBadge(selectedDimension.score).bg} ${getScoreBadge(selectedDimension.score).text} ${getScoreBadge(selectedDimension.score).border}`}>
                    Score: {selectedDimension.score} / 5.0 • {getScoreBadge(selectedDimension.score).label}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                  {selectedDimension.rationale}
                </p>
              </div>

              {/* Citations Code Blocks Styled like macOS Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-accent uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-zinc-400" />
                    Verified Repository Lines
                  </span>
                  <span className="text-[10px] font-mono-accent text-zinc-500">
                    Strict AST Linking
                  </span>
                </div>

                {selectedDimension.citations.length === 0 ? (
                  <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-center space-y-1.5">
                    <ShieldAlert className="h-5 w-5 text-rose-400 mx-auto" />
                    <p className="text-xs text-rose-300 font-medium">
                      No automated tests found in repository commits.
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Dimension scored 0 due to missing unit test or mock test suites.
                    </p>
                  </div>
                ) : (
                  selectedDimension.citations.map((cite) => (
                    <div 
                      key={cite.evidenceId}
                      className="rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden"
                    >
                      {/* macOS Editor Header */}
                      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111] px-3.5 py-2 text-xs font-mono-code">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                          <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                          <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                          <span className="ml-2 text-zinc-300 font-medium flex items-center gap-1 font-mono-code">
                            {cite.filePath}
                          </span>
                        </div>
                        <a
                          href={`${SAMPLE_REPORT.repositoryUrl}/blob/main/${cite.filePath}#L${cite.startLine}-L${cite.endLine}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px] underline"
                        >
                          Lines {cite.startLine}-{cite.endLine} <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>

                      {/* Code Block with Vercel/GitHub dark mode syntax aesthetics */}
                      <pre className="p-3.5 font-mono-code text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap bg-[#080808]">
                        {cite.excerpt}
                      </pre>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: KùzuDB Graph Representation View */}
      {activeTab === "graph" && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Network className="h-4 w-4 text-zinc-400" />
                Structural Knowledge Graph (KùzuDB AST)
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Cognee constructs a graph representation of files, classes, methods, and dependency relationships.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono-accent">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">API</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">Services</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">Agents</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">Repository</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-4 rounded-xl border border-white/10 bg-black min-h-[340px] flex flex-wrap content-start gap-2.5">
              {SAMPLE_GRAPH_NODES.map((node) => {
                const isSelected = selectedGraphNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedGraphNode(node)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans flex items-center gap-2 transition-all ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-glow-white"
                        : "bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                    <span>{node.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-4 p-4 rounded-xl border border-white/10 bg-[#0c0c0c] space-y-3 text-xs font-mono-accent">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Selected Node</span>
                <span className="text-white text-xs font-bold">{selectedGraphNode.name}</span>
                <span className="block text-zinc-400 text-[10px] mt-0.5">Layer: {selectedGraphNode.layer}</span>
              </div>

              <div className="pt-2 border-t border-white/[0.08]">
                <span className="text-zinc-500 block text-[10px] mb-2 uppercase">Outgoing Edge Calls:</span>
                {selectedGraphNode.connections.length === 0 ? (
                  <span className="text-zinc-600 italic">Terminal Node</span>
                ) : (
                  <ul className="space-y-1">
                    {selectedGraphNode.connections.map((c) => (
                      <li key={c} className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900 p-1.5 rounded-md border border-white/5 text-[11px]">
                        <ChevronRight className="h-3 w-3 text-zinc-500" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Raw JSON Payload from Spring AI Firewall */}
      {activeTab === "raw" && (
        <div className="rounded-2xl border border-white/10 bg-[#0c0c0c] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono-code text-[11px] text-zinc-500">
                scorecard.json — BeanOutputConverter
              </span>
            </div>
            <span className="text-[10px] font-mono-accent text-emerald-400">
              100% Validated
            </span>
          </div>
          <pre className="p-4 bg-black font-mono-code text-xs text-zinc-300 overflow-x-auto leading-relaxed">
            {JSON.stringify(SAMPLE_REPORT, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}

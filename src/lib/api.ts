import { EngineeringReport, IngestionJob, GraphNode } from "./types";

export const SAMPLE_REPORT: EngineeringReport = {
  id: "c6725736-cc1b-4f16-814a-559ea4a5c7e2",
  ingestionId: "18948747-5444-4805-a3dd-4ba966aad51d",
  repositoryUrl: "https://github.com/Ojashwa-droid/OmniSearch",
  overallScore: 43,
  summary: "Scores use six equal-weight dimensions evaluated across knowledge-graph representations, AST dependencies, and commit evolutions. Every assertion contains clickable file and line number proof.",
  dimensions: [
    {
      dimension: "Architecture",
      score: 3,
      rationale: "The architecture is well-documented with clear services and agents such as WebSearchService, OmnisearchOrchestrator, ContextEngineeringAgent, ResponseGenerationAgent, and FollowUpQuestionsAgent using parallel execution and streaming responses.",
      citations: [
        {
          evidenceId: "e1",
          filePath: "OMNISEARCH_SETUP.md",
          startLine: 20,
          endLine: 32,
          excerpt: "- **WebSearchService**: Handles Tavily API integration for web search\n- **OmnisearchOrchestrator**: Coordinates all agents and manages parallel execution\n- **SupabaseService**: Handles data persistence to Supabase"
        }
      ]
    },
    {
      dimension: "Maintainability",
      score: 3,
      rationale: "The project maintains clear configuration guidelines, design tokens, structured documentation, and modular planning documents.",
      citations: [
        {
          evidenceId: "e2",
          filePath: "design/references/the-gate-grind/design-tokens.md",
          startLine: 1,
          endLine: 12,
          excerpt: "# Design tokens and visual observations\n\nThis file separates **verified project values** from **visual estimates** of the reference site. The reference observations are descriptive, not production-ready hex values."
        }
      ]
    },
    {
      dimension: "Testing",
      score: 0,
      rationale: "Insufficient verifiable repository evidence for automated unit or integration tests in the primary source folders.",
      citations: []
    },
    {
      dimension: "Reliability",
      score: 2,
      rationale: "Error handling and failure behaviors are documented in the multimodal input plan, detailing fallbacks and error messages for service timeouts or upload failures.",
      citations: [
        {
          evidenceId: "e9",
          filePath: "multimodal-input-plan.md",
          startLine: 6,
          endLine: 10,
          excerpt: "Invalid type, oversize file, empty/malformed upload, Tika failure, Groq failure, and Gemini planner failure produce clear, specific status/error messages; do not silently ignore a selected attachment."
        }
      ]
    },
    {
      dimension: "Security",
      score: 2,
      rationale: "Security considerations such as handling prompt injection risks from retrieved or uploaded content and configuring Supabase authentication are noted in documentation.",
      citations: [
        {
          evidenceId: "e9",
          filePath: "multimodal-input-plan.md",
          startLine: 1,
          endLine: 3,
          excerpt: "Keep the planner limited to returning search queries; validate its output and give it no privileged tools. Prompt injection in retrieved or uploaded content is a documented risk."
        }
      ]
    },
    {
      dimension: "Performance & Scalability",
      score: 3,
      rationale: "Parallel execution of follow-up questions and real-time streaming response generation using WebFlux are explicitly incorporated into the design and architecture.",
      citations: [
        {
          evidenceId: "e1",
          filePath: "OMNISEARCH_SETUP.md",
          startLine: 38,
          endLine: 42,
          excerpt: "3. **Streaming Responses**: Real-time response generation using WebFlux\n4. **Parallel Execution**: Follow-up questions generated in parallel with response"
        }
      ]
    }
  ],
  createdAt: "2026-11-09T20:13:22.730597Z",
  completedAt: "2026-11-09T20:13:29.643396500Z"
};

export const SAMPLE_GRAPH_NODES: GraphNode[] = [
  { id: "root", name: "CampusCode / OmniSearch", type: "root", layer: "api", connections: ["api-layer", "services", "agents"] },
  { id: "api-layer", name: "SearchController.java", type: "class", layer: "api", connections: ["orchestrator", "auth-filter"] },
  { id: "auth-filter", name: "SecurityFilter.java", type: "class", layer: "config", connections: ["supabase-svc"] },
  { id: "orchestrator", name: "OmnisearchOrchestrator.java", type: "class", layer: "service", connections: ["context-agent", "resp-agent", "followup-agent", "tavily-svc"] },
  { id: "context-agent", name: "ContextEngineeringAgent.java", type: "class", layer: "agent", connections: ["lancedb-vector"] },
  { id: "resp-agent", name: "ResponseGenerationAgent.java", type: "class", layer: "agent", connections: ["ollama-llm"] },
  { id: "followup-agent", name: "FollowUpQuestionsAgent.java", type: "class", layer: "agent", connections: ["ollama-llm"] },
  { id: "tavily-svc", name: "WebSearchService.java", type: "class", layer: "service", connections: ["tavily-api"] },
  { id: "supabase-svc", name: "SupabaseService.java", type: "class", layer: "service", connections: ["supabase-db"] },
  { id: "lancedb-vector", name: "LanceDB (Vector Store)", type: "method", layer: "repository", connections: [] },
  { id: "ollama-llm", name: "Ollama (Local LLM Server)", type: "method", layer: "repository", connections: [] },
  { id: "tavily-api", name: "Tavily External Search", type: "method", layer: "repository", connections: [] },
  { id: "supabase-db", name: "PostgreSQL Database", type: "method", layer: "repository", connections: [] },
];

export async function submitRepositoryIngestion(repoUrl: string): Promise<IngestionJob> {
  // Simulates HTTP 202 Accepted response from Spring Boot backend
  return {
    jobId: "job-" + Math.random().toString(36).substring(2, 9),
    repoUrl,
    status: "PROCESSING",
    step: "Step 2: Cloning repository via Eclipse JGit...",
    progressPercentage: 25,
  };
}

export async function sendRagConversation(question: string): Promise<{ answer: string; citations: string[] }> {
  // Simulates /conversation REST API response
  return {
    answer: `CampusCode's Cognee ingestion engine parsed this repository into KùzuDB (structural graph) and LanceDB (vector embeddings). Based on verified AST extraction, the codebase utilizes Spring WebFlux for reactive streaming and manages dependency injection across modular service boundaries.`,
    citations: [
      "OMNISEARCH_SETUP.md (Lines 20-32)",
      "multimodal-input-plan.md (Lines 6-10)",
      "OMNISEARCH_SETUP.md (Lines 38-42)"
    ]
  };
}

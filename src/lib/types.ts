export interface Citation {
  evidenceId: string;
  filePath: string;
  startLine: number;
  endLine: number;
  excerpt: string;
}

export interface DimensionScore {
  dimension: string;
  score: number; // 0 to 5
  rationale: string;
  citations: Citation[];
}

export interface EngineeringReport {
  id: string;
  ingestionId: string;
  repositoryUrl: string;
  overallScore: number;
  summary: string;
  dimensions: DimensionScore[];
  createdAt: string;
  completedAt: string;
}

export interface IngestionJob {
  jobId: string;
  repoUrl: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  step: string;
  progressPercentage: number;
}

export interface GraphNode {
  id: string;
  name: string;
  type: "root" | "package" | "file" | "class" | "method";
  layer: "api" | "service" | "agent" | "repository" | "config";
  connections: string[];
}

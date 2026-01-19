/**
 * Learning topic/subject that students can study
 */
export interface Topic {
  id: string;
  title: string;
  description: string;
  category: "react" | "nextjs" | "typescript" | "langgraph" | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  prerequisites: string[]; // IDs of topics that should be learned first
  resources: Resource[];
}

/**
 * Learning resource (article, video, documentation)
 */
export interface Resource {
  title: string;
  type: "article" | "video" | "documentation" | "tutorial";
  url: string;
  description?: string;
}

/**
 * User's progress on a specific topic
 */
export interface TopicProgress {
  topicId: string;
  status: "not-started" | "in-progress" | "completed";
  completedAt?: Date;
  quizScore?: number; // Percentage score on quiz (0-100)
  timeSpentMinutes: number;
}

import { Topic } from "./topic";

/**
 * Individual item in a study plan
 */
export interface StudyPlanItem {
  id: string;
  topicId: string;
  topic?: Topic; // Populated when fetching full plan
  order: number; // Order in which topics should be learned
  estimatedCompletionDate?: Date;
  status: "pending" | "in-progress" | "completed" | "skipped";
  notes?: string; // AI-generated or user notes about this item
}

/**
 * Complete personalized study plan
 */
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  items: StudyPlanItem[];
  createdAt: Date;
  updatedAt: Date;
  targetCompletionDate?: Date;
  overallProgress: number; // Percentage (0-100)
}

/**
 * Input for creating a new study plan
 */
export interface CreateStudyPlanInput {
  goals: string[]; // What the user wants to learn
  currentKnowledge: string[]; // What the user already knows
  availableHoursPerWeek: number;
  preferredDifficulty?: "beginner" | "intermediate" | "advanced";
}

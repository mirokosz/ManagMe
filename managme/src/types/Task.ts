export type TaskState = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  projectId: string;
  storyId: string;
  estimateHours: number;
  state: TaskState;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  assigneeId?: string;
}

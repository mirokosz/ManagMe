import type { Task } from "./Task";

export type StoryState = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export interface Story {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  projectId: string;
  createdAt: string;
  state: StoryState;
  ownerId: string;
  tasks?: Task[]; // POWIĄZANE ZADANIA
}
import type { Task } from "@/types/Task";

const STORAGE_KEY = "tasks";

class TaskService {
  static getAll(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getByStoryId(storyId: string): Task[] {
    return this.getAll().filter(t => t.storyId === storyId);
  }

  static add(task: Task): void {
    const tasks = this.getAll();
    tasks.push(task);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static update(task: Task): void {
    const tasks = this.getAll().map(t => t.id === task.id ? task : t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static delete(id: string): void {
    const tasks = this.getAll().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

export default TaskService;

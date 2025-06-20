import type { Story } from "@/types/Story";

const STORAGE_KEY = "stories";

class StoryService {
  static getAll(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Story | undefined {
    return this.getAll().find(s => s.id === id);
  }

  static getByProjectId(projectId: string): Story[] {
    return this.getAll().filter(s => s.projectId === projectId);
  }

  static add(story: Story): void {
    const stories = this.getAll();
    stories.push(story);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static update(story: Story): void {
    const updated = this.getAll().map(s => s.id === story.id ? story : s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  static delete(id: string): void {
    const filtered = this.getAll().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}

export default StoryService;

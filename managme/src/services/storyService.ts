import type { Story } from "../types/Story";

const STORAGE_KEY = "stories";

class StoryService {
  static getAll(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getByProject(projectId: string | null): Story[] {
    if (!projectId) return [];
    return this.getAll().filter((story) => story.projectId === projectId);
  }

  static add(story: Story): void {
    const stories = this.getAll();
    stories.push(story);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static update(updated: Story): void {
    const stories = this.getAll().map((s) =>
      s.id === updated.id ? updated : s
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static delete(id: string): void {
    const stories = this.getAll().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }
}

export default StoryService;
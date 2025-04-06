import type { Story } from "@/types/Story";

const STORAGE_KEY = "stories";

class StoryService {
  static getAll(): Story[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getByProject(projectId: string): Story[] {
    return this.getAll().filter(s => s.projectId === projectId);
  }

  static add(story: Story) {
    const list = this.getAll();
    list.push(story);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  static update(story: Story) {
    const list = this.getAll().map(s => s.id === story.id ? story : s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  static delete(id: string) {
    const list = this.getAll().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

export default StoryService;

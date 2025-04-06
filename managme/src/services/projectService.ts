import type { Project } from "@/types/Project";

const STORAGE_KEY = "projects";
const ACTIVE_KEY = "active_project";

class ProjectService {
  static getAllProjects(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static addProject(project: Project) {
    const list = this.getAllProjects();
    list.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  static updateProject(project: Project) {
    const list = this.getAllProjects().map(p => p.id === project.id ? project : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  static deleteProject(id: string) {
    const list = this.getAllProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  static setActiveProject(id: string) {
    localStorage.setItem(ACTIVE_KEY, id);
  }

  static getActiveProject(): string | null {
    return localStorage.getItem(ACTIVE_KEY);
  }
}

export default ProjectService;

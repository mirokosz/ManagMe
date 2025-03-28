import type { Project } from "@/types/Project";

const STORAGE_KEY = "projects";
const ACTIVE_PROJECT_KEY = "active_project"; // 🔹 Dodany klucz

class ProjectService {
  static getAllProjects(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getProjectById(id: string): Project | undefined {
    return this.getAllProjects().find((project) => project.id === id);
  }

  static addProject(project: Project): void {
    const projects = this.getAllProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static updateProject(updatedProject: Project): void {
    const projects = this.getAllProjects().map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static deleteProject(id: string): void {
    const projects = this.getAllProjects().filter((project) => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  // 🔹 Nowe metody:

  static setActiveProject(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }

  static getActiveProject(): string | null {
    return localStorage.getItem(ACTIVE_PROJECT_KEY);
  }
}

export default ProjectService;
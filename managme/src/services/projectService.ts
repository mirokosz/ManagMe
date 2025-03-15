import type { Project } from "@/types/Project";

const STORAGE_KEY = "projects";

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
}

export default ProjectService;
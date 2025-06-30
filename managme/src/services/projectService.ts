import type { Project } from "@/types/Project";
import AuthService from "./authService";

const API_URL = "http://localhost:3000/api/projects";

class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    const response = await AuthService.axios().get(API_URL);
    return response.data.map((p: any) => ({
      ...p,
      id: p._id
    }));
  }

  static async addProject(project: Project): Promise<void> {
    await AuthService.axios().post(API_URL, project);
  }

  static async updateProject(project: Project): Promise<void> {
    await AuthService.axios().put(`${API_URL}/${project.id}`, project);
  }

  static async deleteProject(id: string): Promise<void> {
    await AuthService.axios().delete(`${API_URL}/${id}`);
  }

  static setActiveProject(id: string) {
    localStorage.setItem("active_project", id);
  }

  static getActiveProject(): string | null {
    return localStorage.getItem("active_project");
  }
}

export default ProjectService;

import type { Task } from "@/types/Task";
import AuthService from "./authService";

const API_URL = "http://localhost:3000/api/tasks";

class TaskService {
  static async getByStoryId(storyId: string): Promise<Task[]> {
    const response = await AuthService.axios().get(`${API_URL}/${storyId}`);
    return response.data.map((t: any) => ({
      ...t,
      id: t._id,
    }));
  }

  static async add(task: Task): Promise<Task> {
    const res = await AuthService.axios().post(API_URL, task);
    const t = res.data;
    return { ...t, id: t._id };
  }

  static async update(task: Task): Promise<Task> {
    const res = await AuthService.axios().put(`${API_URL}/${task.id}`, task);
    const t = res.data;
    return { ...t, id: t._id };
  }

  static async delete(id: string): Promise<void> {
    await AuthService.axios().delete(`${API_URL}/${id}`);
  }
}

export default TaskService;

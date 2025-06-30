import type { Story } from "@/types/Story";
import AuthService from "./authService";

const API_URL = "http://localhost:3000/api/stories";

class StoryService {
  static async getByProjectId(projectId: string): Promise<Story[]> {
    const response = await AuthService.axios().get(`${API_URL}/${projectId}`);
    return response.data.map((s: any) => ({
      ...s,
      id: s._id,
    }));
  }

  static async add(story: Story): Promise<Story> {
    const res = await AuthService.axios().post(API_URL, story);
    const s = res.data;
    return { ...s, id: s._id };
  }

  static async update(story: Story): Promise<Story> {
    const res = await AuthService.axios().put(`${API_URL}/${story.id}`, story);
    const s = res.data;
    return { ...s, id: s._id };
  }

  static async delete(id: string): Promise<void> {
    await AuthService.axios().delete(`${API_URL}/${id}`);
  }

  static async getById(id: string): Promise<Story | null> {
  const res = await AuthService.axios().get(`${API_URL}/single/${id}`);
  const s = res.data;
  return s ? { ...s, id: s._id } : null;
  }
}

export default StoryService;

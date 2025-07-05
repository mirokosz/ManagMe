<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Project } from "@/types/Project";
import type { Story } from "@/types/Story";

import ProjectService from "@/services/projectService";
import StoryService from "@/services/storyService";
import AuthService from "@/services/authService";

import ProjectForm from "@/components/ProjectForm.vue";
import ProjectList from "@/components/ProjectList.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";
import StoryForm from "@/components/StoryForm.vue";
import StoryList from "@/components/StoryList.vue";

//dane użytkownika po załadowaniu
const user = ref<{ imie: string; nazwisko: string; rola: string } | null>(null);

const projects = ref<Project[]>([]);
const editingProject = ref<Project | null>(null);

const stories = ref<Story[]>([]);
const editingStory = ref<Story | null>(null);

const router = useRouter();

const logout = () => {
    AuthService.logout();
    router.push("/login");
};

const loadProjects = async () => {
    try {
        projects.value = await ProjectService.getAllProjects();
    } catch (e) {
        console.error("Błąd ładowania projektów:", e);
    }
};

const loadStories = async () => {
    try {
        const activeProjectId = ProjectService.getActiveProject();
        stories.value = activeProjectId
            ? await StoryService.getByProjectId(activeProjectId)
            : [];
    } catch (e) {
        console.error("Błąd ładowania historyjek:", e);
    }
};

const saveProject = async (project: Project) => {
    if (editingProject.value) {
        await ProjectService.updateProject(project);
    } else {
        await ProjectService.addProject(project);
    }
    editingProject.value = null;
    await loadProjects();
};

const deleteProject = async (id: string) => {
    await ProjectService.deleteProject(id);
    await loadProjects();
    await loadStories();
};

const editProject = (project: Project) => {
    editingProject.value = { ...project };
};

const handleStorySaved = async () => {
    editingStory.value = null;
    await loadStories();
};

const handleEditStory = (story: Story) => {
    editingStory.value = { ...story };
};

const deleteStory = async (id: string) => {
    await StoryService.delete(id);
    await loadStories();
};

const handleProjectChange = async () => {
    editingStory.value = null;
    await loadStories();
};

onMounted(async () => {
    await loadProjects();
    await loadStories();
    user.value = AuthService.getUser();
});
</script>

<template>
    <div class="container py-5">
        <div class="card shadow p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>ManagMe - Projekty</h2>
                <div v-if="user" class="text-end">
                    <div class="text-muted mb-1">
                        <strong>Zalogowany:</strong> {{ user.imie }} {{ user.nazwisko }}<br />
                        <strong>Rola:</strong> {{ user.rola }}
                    </div>
                    <button class="btn btn-outline-secondary btn-sm" @click="logout">Wyloguj się</button>
                </div>
            </div>

            <ProjectSelector :projects="projects" @change="handleProjectChange" />

            <div class="row mt-4">
                <div class="col-md-6">
                    <h4>Formularz Projektu</h4>
                    <ProjectForm :project="editingProject" @save="saveProject" />
                </div>
                <div class="col-md-6">
                    <h4>Lista Projektów</h4>
                    <ProjectList :projects="projects" @edit="editProject" @delete="deleteProject" />
                </div>
            </div>

            <hr class="my-4" />

            <div class="row">
                <div class="col-md-6">
                    <StoryForm :story="editingStory" @save="handleStorySaved" />
                </div>
                <div class="col-md-6">
                    <StoryList :stories="stories" @edit="handleEditStory" @delete="deleteStory" />
                </div>
            </div>
        </div>
    </div>
</template>

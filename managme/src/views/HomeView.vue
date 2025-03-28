<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Project } from "@/types/Project";
import type { Story } from "@/types/Story";
import ProjectService from "@/services/projectService";
import StoryService from "@/services/storyService";
import UserService from "@/services/userService";

// Komponenty
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectList from "@/components/ProjectList.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";
import StoryForm from "@/components/StoryForm.vue";
import StoryList from "@/components/StoryList.vue";

// Dane
const user = UserService.getLoggedUser();
const projects = ref<Project[]>([]);
const editingProject = ref<Project | null>(null);
const stories = ref<Story[]>([]);
const editingStory = ref<Story | null>(null);

// CRUD Project
const saveProject = (project: Project) => {
    if (editingProject.value) {
        ProjectService.updateProject(project);
    } else {
        ProjectService.addProject(project);
    }
    projects.value = ProjectService.getAllProjects();
    editingProject.value = null;
};

const editProject = (project: Project) => {
    editingProject.value = { ...project };
};

const deleteProject = (id: string) => {
    ProjectService.deleteProject(id);
    projects.value = ProjectService.getAllProjects();
};

// CRUD Story
const loadStories = () => {
    const activeId = ProjectService.getActiveProject();
    stories.value = StoryService.getByProject(activeId);
};

const handleStorySaved = () => {
    loadStories();
    editingStory.value = null;
};

const handleEditStory = (story: Story) => {
    editingStory.value = { ...story };
};

// Init
onMounted(() => {
    projects.value = ProjectService.getAllProjects();
    loadStories();
});

// Reakcja na zmianę projektu
const handleProjectChange = () => {
    editingStory.value = null;
    loadStories();
};
</script>

<template>
    <div class="container py-5">
        <div class="card shadow p-4">
            <!-- Nagłówek -->
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>ManagMe - Projekty</h2>
                <div class="text-muted">
                    <strong>Zalogowany:</strong> {{ user.firstName }} {{ user.lastName }}
                </div>
            </div>

            <!-- Wybór aktywnego projektu -->
            <ProjectSelector @change="handleProjectChange" />

            <!-- Formularz i lista projektów -->
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

            <!-- Formularz i lista historyjek -->
            <div class="row">
                <div class="col-md-6">
                    <StoryForm :story="editingStory" @save="handleStorySaved" />
                </div>
                <div class="col-md-6">
                    <StoryList :stories="stories" @edit="handleEditStory" />
                </div>
            </div>
        </div>
    </div>
</template>

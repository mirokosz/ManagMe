<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Project } from "@/types/Project";
import type { Story } from "@/types/Story";
import UserService from "@/services/userService";
import ProjectService from "@/services/projectService";
import StoryService from "@/services/storyService";

import ProjectForm from "@/components/ProjectForm.vue";
import ProjectList from "@/components/ProjectList.vue";
import ProjectSelector from "@/components/ProjectSelector.vue";
import StoryForm from "@/components/StoryForm.vue";
import StoryList from "@/components/StoryList.vue";

const user = UserService.getLoggedUser();

const projects = ref<Project[]>([]);
const editingProject = ref<Project | null>(null);

const stories = ref<Story[]>([]);
const editingStory = ref<Story | null>(null);

const loadProjects = () => {
    projects.value = ProjectService.getAllProjects();
};

const loadStories = () => {
    const activeProjectId = ProjectService.getActiveProject();
    stories.value = activeProjectId ? StoryService.getByProject(activeProjectId) : [];
};

const saveProject = (project: Project) => {
    if (editingProject.value) {
        ProjectService.updateProject(project);
    } else {
        ProjectService.addProject(project);
    }
    editingProject.value = null;
    loadProjects();
};

const deleteProject = (id: string) => {
    ProjectService.deleteProject(id);
    loadProjects();
};

const editProject = (project: Project) => {
    editingProject.value = { ...project };
};

const handleStorySaved = () => {
    editingStory.value = null;
    loadStories();
};

const handleEditStory = (story: Story) => {
    editingStory.value = { ...story };
};

const handleProjectChange = () => {
    editingStory.value = null;
    loadStories();
};

onMounted(() => {
    loadProjects();
    loadStories();
});
</script>

<template>
    <div class="container py-5">
        <div class="card shadow p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>ManagMe - Projekty</h2>
                <div class="text-muted"><strong>Zalogowany:</strong> {{ user.firstName }} {{ user.lastName }}</div>
            </div>

            <ProjectSelector @change="handleProjectChange" />

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
                    <StoryList :stories="stories" @edit="handleEditStory" />
                </div>
            </div>
        </div>
    </div>
</template>

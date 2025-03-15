<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import ProjectService from "../services/projectService";
import type { Project } from "../types/Project";

// ✅ Dynamiczny import komponentów (rozwiązuje problem braku rejestracji)
const ProjectForm = defineAsyncComponent(() => import("../components/ProjectForm.vue"));
const ProjectList = defineAsyncComponent(() => import("../components/ProjectList.vue"));

const projects = ref<Project[]>([]);
const editingProject = ref<Project | null>(null);

onMounted(() => {
    projects.value = ProjectService.getAllProjects() || [];
});

const saveProject = (project: Project) => {
    if (editingProject.value) {
        ProjectService.updateProject(project);
    } else {
        ProjectService.addProject(project);
    }
    projects.value = ProjectService.getAllProjects() || [];
    editingProject.value = null;
};

const editProject = (project: Project) => {
    editingProject.value = { ...project };
};

const deleteProject = (id: string) => {
    ProjectService.deleteProject(id);
    projects.value = ProjectService.getAllProjects() || [];
};
</script>

<template>
    <div>
        <h1 class="text-center py-3">ManagMe - Projekty</h1>
        <ProjectForm v-if="!editingProject" @save="saveProject" />
        <ProjectForm v-else :project="editingProject" @save="saveProject" />
        <ProjectList :projects="projects" @edit="editProject" @delete="deleteProject" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProjectService from "@/services/projectService";
import type { Project } from "@/types/Project";

const emit = defineEmits<{
    (e: "change", projectId: string): void;
}>();

const projects = ref<Project[]>([]);
const activeProjectId = ref<string | null>(ProjectService.getActiveProject());

const loadProjects = () => {
    projects.value = ProjectService.getAllProjects();
};

const selectProject = () => {
    if (activeProjectId.value) {
        ProjectService.setActiveProject(activeProjectId.value);
        emit("change", activeProjectId.value); // 🟡 powiadamiamy widok nadrzędny
    }
};

onMounted(loadProjects);
</script>

<template>
    <div class="mb-3">
        <label class="form-label">Wybierz aktywny projekt:</label>
        <select v-model="activeProjectId" @change="selectProject" class="form-select">
            <option disabled value="">-- wybierz projekt --</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
                {{ project.name }}
            </option>
        </select>
    </div>
</template>
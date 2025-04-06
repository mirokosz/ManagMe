<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Project } from "@/types/Project";
import ProjectService from "@/services/projectService";

const emit = defineEmits(["change"]);
const projects = ref<Project[]>([]);
const selected = ref<string | null>(ProjectService.getActiveProject());

onMounted(() => {
    projects.value = ProjectService.getAllProjects();
});

const change = () => {
    if (selected.value) {
        ProjectService.setActiveProject(selected.value);
        emit("change");
    }
};
</script>

<template>
    <div class="mb-3">
        <label class="form-label">Wybierz aktywny projekt:</label>
        <select v-model="selected" @change="change" class="form-select">
            <option disabled value="">-- wybierz projekt --</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
    </div>
</template>

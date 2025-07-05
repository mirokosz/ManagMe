<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Project } from "@/types/Project";
import ProjectService from "@/services/projectService";

const emit = defineEmits(["change"]);
const props = defineProps<{ projects: Project[] }>();

const selected = ref<string | null>(ProjectService.getActiveProject());

watch(selected, () => {
    if (selected.value) {
        ProjectService.setActiveProject(selected.value);
        emit("change");
    }
});

//ustawienie aktywnego projektu na liście 
onMounted(() => {
    if (!selected.value && props.projects.length > 0) {
        selected.value = props.projects[0].id;
        ProjectService.setActiveProject(selected.value);
        emit("change");
    }
});
</script>

<template>
    <div class="mb-3">
        <label class="form-label">Wybierz aktywny projekt:</label>
        <select v-model="selected" @change="() => emit('change')" class="form-select">
            <option disabled value="">-- wybierz projekt --</option>
            <option v-for="project in props.projects" :key="project.id" :value="project.id">
                {{ project.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "../types/Project";

// ✅ Definiujemy props i zapewniamy domyślną wartość
const props = defineProps<{
    project?: Project;
}>();

const emit = defineEmits<{
    (e: "save", project: Project): void;
}>();

// ✅ Zapewniamy, że `project` zawsze istnieje i jest edytowalny
const project = computed(() => props.project ?? { id: "", name: "", description: "" });

const save = () => {
    emit("save", project.value);
};
</script>

<template>
    <div>
        <h2>Formularz Projektu</h2>
        <form @submit.prevent="save">
            <input v-model="project.name" placeholder="Nazwa projektu" required />
            <textarea v-model="project.description" placeholder="Opis projektu"></textarea>
            <button type="submit">Zapisz</button>
        </form>
    </div>
</template>
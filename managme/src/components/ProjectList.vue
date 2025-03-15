<script setup lang="ts">
import type { Project } from "../types/Project"; // ✅ Upewniamy się, że import działa

const props = defineProps < {
    projects: readonly Project[];
} > ();

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
    <div>
        <h2>Lista Projektów</h2>
        <ul>
            <li v-for="project in props.projects" :key="project.id">
                <span>{{ project.name }}</span>
                <button @click="emit('edit', project)">Edytuj</button>
                <button @click="emit('delete', project.id)">Usuń</button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import type { Project } from "@/types/Project";

const props = defineProps<{
    projects: Project[];
}>();

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
    <ul class="list-group">
        <li v-for="project in props.projects" :key="project.id"
            class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>{{ project.name }}</strong><br />
                <small>{{ project.description }}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-primary me-2" @click="$emit('edit', project)">Edytuj</button>
                <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', project.id)">Usuń</button>
            </div>
        </li>
    </ul>
</template>

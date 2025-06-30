<script setup lang="ts">
import type { Story } from "@/types/Story";

const { stories } = defineProps<{ stories: Story[] }>();

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
    <div class="row">
        <div class="col-md-4" v-for="story in stories" :key="story.id">
            <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-2">{{ story.name }}</h5>
                    <p class="card-text flex-grow-1">{{ story.description }}</p>
                    <small class="text-muted d-block mb-2">
                        Priorytet: {{ story.priority }} | Autor: Michał Rokosz
                    </small>
                    <div class="d-flex flex-wrap gap-2 mt-3">
                        <button class="btn btn-sm btn-primary" @click="$emit('edit', story)">Edytuj</button>
                        <button class="btn btn-sm btn-danger" @click="$emit('delete', story.id)">Usuń</button>
                        <router-link class="btn btn-sm btn-outline-secondary"
                            :to="`/projekty/${story.projectId}/historyjki/${story.id}`">
                            Zadania
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.project-card {
    background: #fff;
    border-radius: 8px;
    padding: 1.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: box-shadow 0.2s ease;
}

.project-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.project-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.project-description {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 1rem;
}

.project-actions {
    display: flex;
    gap: 0.5rem;
}

.dark-mode .project-card {
    background: #2a2a2a;
    color: #ddd;
}

.dark-mode .project-description {
    color: #bbb;
}
</style>

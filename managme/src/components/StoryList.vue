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

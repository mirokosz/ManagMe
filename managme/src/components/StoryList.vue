<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { Story } from "@/types/Story";
import ProjectService from "@/services/projectService";

const props = defineProps<{
    stories: Story[];
}>();

const emit = defineEmits(["edit", "delete"]);

const router = useRouter();
const activeProjectId = computed(() => ProjectService.getActiveProject());

const storiesByState = computed(() => ({
    todo: props.stories.filter((s) => s.state === "todo"),
    doing: props.stories.filter((s) => s.state === "doing"),
    done: props.stories.filter((s) => s.state === "done"),
}));

const goToTasks = (storyId: string) => {
    router.push(`/projekty/${activeProjectId.value}/historyjki/${storyId}`);
};
</script>

<template>
    <div class="row">
        <!-- Do zrobienia -->
        <div class="col-md-4">
            <h6>🕒 Do zrobienia</h6>
            <div v-for="story in storiesByState.todo" :key="story.id" class="card p-2 mb-2">
                <strong>{{ story.name }}</strong>
                <p class="mb-1">{{ story.description }}</p>
                <small>Priorytet: {{ story.priority }} | Autor: Michał Rokosz</small>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-primary" @click="emit('edit', story)">Edytuj</button>
                    <button class="btn btn-sm btn-danger" @click="emit('delete', story)">Usuń</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="goToTasks(story.id)">Zadania</button>
                </div>
            </div>
        </div>

        <!-- W trakcie -->
        <div class="col-md-4">
            <h6>⚙️ W trakcie</h6>
            <div v-for="story in storiesByState.doing" :key="story.id" class="card p-2 mb-2">
                <strong>{{ story.name }}</strong>
                <p class="mb-1">{{ story.description }}</p>
                <small>Priorytet: {{ story.priority }} | Autor: Michał Rokosz</small>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-primary" @click="emit('edit', story)">Edytuj</button>
                    <button class="btn btn-sm btn-danger" @click="emit('delete', story)">Usuń</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="goToTasks(story.id)">Zadania</button>
                </div>
            </div>
        </div>

        <!-- Zrobione -->
        <div class="col-md-4">
            <h6>✅ Zrobione</h6>
            <div v-for="story in storiesByState.done" :key="story.id" class="card p-2 mb-2">
                <strong>{{ story.name }}</strong>
                <p class="mb-1">{{ story.description }}</p>
                <small>Priorytet: {{ story.priority }} | Autor: Michał Rokosz</small>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-primary" @click="emit('edit', story)">Edytuj</button>
                    <button class="btn btn-sm btn-danger" @click="emit('delete', story)">Usuń</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="goToTasks(story.id)">Zadania</button>
                </div>
            </div>
        </div>
    </div>
</template>

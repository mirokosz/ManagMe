<script setup lang="ts">
import { ref, computed } from "vue";
import type { Story } from "@/types/Story";

const props = defineProps<{
    stories: Story[];
}>();

const emit = defineEmits<{
    (e: "edit", story: Story): void;
}>();

const filter = ref<"all" | "todo" | "doing" | "done">("all");

const filteredStories = computed(() => {
    if (filter.value === "all") return props.stories;
    return props.stories.filter((s) => s.state === filter.value);
});
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Historyjki</h4>
            <select v-model="filter" class="form-select w-auto">
                <option value="all">Wszystkie</option>
                <option value="todo">Do zrobienia</option>
                <option value="doing">W trakcie</option>
                <option value="done">Zrobione</option>
            </select>
        </div>

        <ul class="list-group">
            <li v-for="story in filteredStories" :key="story.id"
                class="list-group-item d-flex justify-content-between align-items-start">
                <div class="w-100">
                    <h5 class="mb-1">{{ story.name }}</h5>
                    <p class="mb-1">{{ story.description }}</p>
                    <small>
                        Priorytet: {{ story.priority }} |
                        Stan: {{ story.state }} |
                        Data: {{ new Date(story.createdAt).toLocaleDateString() }}
                    </small>
                </div>
                <div class="ms-3">
                    <button @click="emit('edit', story)" class="btn btn-sm btn-outline-primary me-1">
                        Edytuj
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Task } from "@/types/Task";
import type { Story } from "@/types/Story";
import StoryService from "@/services/storyService";
import TaskService from "@/services/taskService";
import TaskForm from "@/components/TaskForm.vue";
import TaskBoard from "@/components/TaskBoard.vue";
import TaskDetails from "@/components/TaskDetails.vue";

const route = useRoute();
const storyId = route.params.id as string;

const story = ref<Story | null>(null);
const tasks = ref<Task[]>([]);
const editingTask = ref<Task | null>(null);
const selectedTask = ref<Task | null>(null);

const loadStoryAndTasks = () => {
    story.value = StoryService.getById(storyId);
    tasks.value = TaskService.getByStoryId(storyId);
};

const saveTask = () => {
    loadStoryAndTasks();
    editingTask.value = null;
};

const editTask = (task: Task) => {
    editingTask.value = task;
};

const viewTask = (task: Task) => {
    selectedTask.value = task;
};

const closeDetails = () => {
    selectedTask.value = null;
};

onMounted(loadStoryAndTasks);
</script>

<template>
    <div class="container py-4">
        <h3>Szczegóły Historyjki</h3>

        <div v-if="story">
            <p><strong>Tytuł:</strong> {{ story.name }}</p>
            <p><strong>Opis:</strong> {{ story.description }}</p>

            <!-- Dodawanie / Edycja zadania -->
            <TaskForm :task="editingTask" :storyId="story.id" :projectId="story.projectId" @save="saveTask" />

            <!-- Szczegóły zadania -->
            <TaskDetails v-if="selectedTask" :task="selectedTask" @update="saveTask" @close="closeDetails" />

            <hr />

            <!-- Tablica zadań -->
            <TaskBoard :tasks="tasks" @edit="editTask" @view="viewTask" />
        </div>

        <div v-else>
            <p>Nie znaleziono historyjki.</p>
        </div>
    </div>
</template>

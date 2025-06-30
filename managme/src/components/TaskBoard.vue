<script setup lang="ts">
import type { Task } from "@/types/Task";
import { computed } from "vue";

const props = defineProps<{
    tasks: Task[];
}>();

const emit = defineEmits(["edit", "view"]);

const todoTasks = computed(() => props.tasks.filter((t) => t.state === "todo"));
const doingTasks = computed(() => props.tasks.filter((t) => t.state === "doing"));
const doneTasks = computed(() => props.tasks.filter((t) => t.state === "done"));
</script>

<template>
    <div class="board">
        <div class="column">
            <h5 class="column-title">🕒 Do zrobienia</h5>
            <div v-for="task in todoTasks" :key="task.id" class="task-card">
                <strong>{{ task.name }}</strong>
                <p class="small">{{ task.description }}</p>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-info" @click="emit('view', task)">Szczegóły</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">Edytuj</button>
                </div>
            </div>
        </div>

        <div class="column">
            <h5 class="column-title">🔧 W trakcie</h5>
            <div v-for="task in doingTasks" :key="task.id" class="task-card">
                <strong>{{ task.name }}</strong>
                <p class="small">{{ task.description }}</p>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-info" @click="emit('view', task)">Szczegóły</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">Edytuj</button>
                </div>
            </div>
        </div>

        <div class="column">
            <h5 class="column-title">✅ Zrobione</h5>
            <div v-for="task in doneTasks" :key="task.id" class="task-card">
                <strong>{{ task.name }}</strong>
                <p class="small">{{ task.description }}</p>
                <div class="d-flex gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-info" @click="emit('view', task)">Szczegóły</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.column {
    flex: 1;
    background: #f9f9f9;
    border-radius: 6px;
    padding: 1rem;
}

.column-title {
    margin-bottom: 1rem;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
}

.task-card {
    background: #fff;
    padding: 0.75rem;
    border-radius: 6px;
    margin-bottom: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.dark-mode .column {
    background: #2c2c2c;
}

.dark-mode .task-card {
    background: #3a3a3a;
}
</style>

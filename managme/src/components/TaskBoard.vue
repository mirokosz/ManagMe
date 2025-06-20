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
    <div class="row">
        <div class="col-md-4">
            <h6>Do zrobienia</h6>
            <div v-for="task in todoTasks" :key="task.id" class="card p-2 mb-2">
                <strong>{{ task.name }}</strong>
                <div class="d-flex mt-2">
                    <button class="btn btn-sm btn-outline-info me-2" @click="emit('view', task)">Szczegóły</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">Edytuj</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <h6>W trakcie</h6>
            <div v-for="task in doingTasks" :key="task.id" class="card p-2 mb-2">
                <strong>{{ task.name }}</strong>
                <div class="d-flex mt-2">
                    <button class="btn btn-sm btn-outline-info me-2" @click="emit('view', task)">Szczegóły</button>
                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">Edytuj</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <h6>Zrobione</h6>
            <div v-for="task in doneTasks" :key="task.id" class="card p-2 mb-2">
                <strong>{{ task.name }}</strong>
                <div class="d-flex mt-2">
                    <button class="btn btn-sm btn-outline-info" @click="emit('view', task)">Szczegóły</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Task } from "@/types/Task";
import { computed } from "vue";

const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits(["edit", "view", "delete"]);

const todoTasks = computed(() => props.tasks.filter((t) => t.state === "todo"));
const doingTasks = computed(() => props.tasks.filter((t) => t.state === "doing"));
const doneTasks = computed(() => props.tasks.filter((t) => t.state === "done"));
</script>

<template>
    <div class="container-fluid mt-4" data-testid="task-board">
        <div class="row g-4">

            <div class="col-md-4 column">
                <div class="card task-card h-100">
                    <div class="card-header header-primary">Do zrobienia</div>
                    <div class="card-body">
                        <div v-for="task in todoTasks" :key="task.id" class="card mb-3 sub-card">
                            <div class="card-body">
                                <h6 class="card-title">{{ task.name }}</h6>
                                <p class="card-text">{{ task.description }}</p>
                                <div class="d-flex gap-2 mt-2">
                                    <button class="btn btn-sm btn-outline-primary" @click="emit('view', task)">
                                        <i class="bi bi-eye"></i> Szczegóły
                                    </button>
                                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">
                                        <i class="bi bi-pencil"></i> Edytuj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-md-4 column">
                <div class="card task-card h-100">
                    <div class="card-header header-primary">W trakcie</div>
                    <div class="card-body">
                        <div v-for="task in doingTasks" :key="task.id" class="card mb-3 sub-card">
                            <div class="card-body">
                                <h6 class="card-title">{{ task.name }}</h6>
                                <p class="card-text">{{ task.description }}</p>
                                <div class="d-flex gap-2 mt-2">
                                    <button class="btn btn-sm btn-outline-primary" @click="emit('view', task)">
                                        <i class="bi bi-eye"></i> Szczegóły
                                    </button>
                                    <button class="btn btn-sm btn-outline-secondary" @click="emit('edit', task)">
                                        <i class="bi bi-pencil"></i> Edytuj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-md-4 column">
                <div class="card task-card h-100">
                    <div class="card-header header-primary">Zrobione</div>
                    <div class="card-body">
                        <div v-for="task in doneTasks" :key="task.id" class="card mb-3 sub-card">
                            <div class="card-body">
                                <h6 class="card-title">{{ task.name }}</h6>
                                <p class="card-text">{{ task.description }}</p>
                                <div class="d-flex gap-2 mt-2">
                                    <button class="btn btn-sm btn-outline-primary" @click="emit('view', task)">
                                        <i class="bi bi-eye"></i> Szczegóły
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', task.id)">
                                        <i class="bi bi-trash"></i> Usuń
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*jasny*/
.task-card {
    border: none;
    border-radius: 0.75rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15);
}

.header-primary {
    background-color: var(--bs-primary);
    color: #fff;
    font-weight: 600;
    border-bottom: none;
    border-radius: 0.75rem 0.75rem 0 0;
}

.sub-card {
    border-radius: 0.5rem;
    overflow: hidden;
}

.card-title {
    font-weight: 700;
}

.card-text {
    color: #6c757d;
    font-size: 0.9rem;
}

.btn-outline-primary,
.btn-outline-secondary,
.btn-outline-danger {
    transition: background 0.2s, color 0.2s;
}

.btn-outline-primary:hover {
    background-color: rgba(13, 110, 253, 0.1);
}

.btn-outline-secondary:hover {
    background-color: rgba(108, 117, 125, 0.1);
}

.btn-outline-danger:hover {
    background-color: rgba(220, 53, 69, 0.1);
}

/*ciemny*/
.dark-mode .task-card {
    background-color: #2b2b2b;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}

.dark-mode .header-primary {
    background-color: #375a7f;
    color: #e9ecef;
}

.dark-mode .sub-card {
    background-color: #333;
    border: 1px solid #444;
}

.dark-mode .card-body {
    background: transparent;
}

.dark-mode .card-title {
    color: #e9ecef;
}

.dark-mode .card-text {
    color: rgba(255, 255, 255, 0.7);
}

.dark-mode .btn-outline-primary {
    border-color: rgba(13, 110, 253, 0.6);
    color: rgba(13, 110, 253, 0.9);
}

.dark-mode .btn-outline-primary:hover {
    background-color: rgba(13, 110, 253, 0.2);
}

.dark-mode .btn-outline-secondary:hover {
    background-color: rgba(108, 117, 125, 0.2);
}

.dark-mode .btn-outline-danger:hover {
    background-color: rgba(220, 53, 69, 0.2);
}
</style>

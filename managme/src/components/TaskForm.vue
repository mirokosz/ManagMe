<script setup lang="ts">
import { ref, watch } from "vue";
import type { Task } from "@/types/Task";
import TaskService from "@/services/taskService";

const props = defineProps<{
    task: Task | null;
    storyId: string;
    projectId: string;
}>();

const emit = defineEmits(["save"]);

const emptyTask = (): Task => ({
    id: crypto.randomUUID(),
    name: "",
    description: "",
    priority: "medium",
    storyId: props.storyId,
    projectId: props.projectId,
    estimateHours: undefined as unknown as number,
    state: "todo",
    createdAt: new Date().toISOString(),
    startedAt: undefined,
    finishedAt: undefined,
    assigneeId: undefined,
});

const form = ref<Task>(emptyTask());

const resetForm = () => {
    form.value = emptyTask();
};

watch(
    () => props.task,
    (newVal) => {
        if (newVal) {
            form.value = { ...newVal };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const save = async () => {
    if (!form.value.name.trim()) return;

    if (props.task) {
        await TaskService.update(form.value);
    } else {
        await TaskService.add(form.value);
    }

    resetForm();
    emit("save");
};
</script>

<template>
    <form @submit.prevent="save" class="card shadow-sm task-form">
        <h5 class="mb-3">{{ props.task ? "✏️ Edytuj zadanie" : "Dodaj zadanie" }}</h5>
        <input v-model="form.name" class="form-control mb-2" placeholder="Nazwa" required />
        <textarea v-model="form.description" class="form-control mb-2" placeholder="Opis" required />
        <input v-model.number="form.estimateHours" type="number" class="form-control mb-2"
            placeholder="Szacowany czas (h)" min="1" required />
        <select v-model="form.priority" class="form-select mb-3">
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
        </select>
        <button type="submit" class="btn btn-primary w-100">
            {{ props.task ? "Zapisz zmiany" : "Dodaj zadanie" }}
        </button>
    </form>
</template>

<style scoped>
.task-form {
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    background: #fff;
    border-radius: 8px;
    color: #212529;
    /* Domyślny tekst */
}

/* === DARK MODE OVERRIDES === */
.dark-mode .task-form {
    background: #2a2a2a;
    color: #e9ecef;
    /* tekst formularza */
}

.dark-mode .task-form h5 {
    color: #e9ecef;
    /* nagłówek */
}

.dark-mode .task-form .form-control,
.dark-mode .task-form .form-select {
    background-color: #333;
    color: #e9ecef;
    border-color: #444;
}

.dark-mode .task-form .form-control::placeholder,
.dark-mode .task-form .form-select option {
    color: rgba(255, 255, 255, 0.6);
}

/* przycisk primary zostawiamy oryginalny, on ma już dobry kontrast */
</style>

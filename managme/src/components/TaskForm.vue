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
    estimateHours: 1,
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

const save = () => {
    if (!form.value.name.trim()) return;

    if (props.task) {
        TaskService.update(form.value);
    } else {
        TaskService.add(form.value);
    }

    resetForm();
    emit("save");
};
</script>

<template>
    <form @submit.prevent="save" class="border p-3 mb-4">
        <h5 class="mb-3">{{ props.task ? "Edytuj zadanie" : "Dodaj zadanie" }}</h5>
        <input v-model="form.name" class="form-control mb-2" placeholder="Nazwa" required />
        <textarea v-model="form.description" class="form-control mb-2" placeholder="Opis" required />
        <input v-model.number="form.estimateHours" type="number" class="form-control mb-2"
            placeholder="Szacowany czas (h)" min="1" required />
        <select v-model="form.priority" class="form-select mb-2">
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
        </select>
        <button class="btn btn-primary">Zapisz</button>
    </form>
</template>

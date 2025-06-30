<script setup lang="ts">
import { ref, computed } from "vue";
import type { Task } from "@/types/Task";
import type { User } from "@/types/User";
import TaskService from "@/services/taskService";
import UserService from "@/services/userService";

const props = defineProps<{ task: Task }>();
const emit = defineEmits(["update", "close"]);

const form = ref<Task>({ ...props.task });
const users = UserService.getAssignableUsers();

const userOptions = computed(() =>
    users.map((u: User) => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u.id,
    }))
);

const assignUser = async () => {
    if (!form.value.assigneeId) return;
    form.value.state = "doing";
    form.value.startedAt = new Date().toISOString();
    await TaskService.update(form.value);
    emit("update");
};

const markAsDone = async () => {
    form.value.state = "done";
    form.value.finishedAt = new Date().toISOString();
    await TaskService.update(form.value);
    emit("update");
};

const getUserName = (id?: string) => {
    const u = UserService.getById(id ?? "");
    return u ? `${u.firstName} ${u.lastName}` : "Nieznany";
};
</script>

<template>
    <div class="task-details card">
        <h5 class="mb-3">📝 Szczegóły zadania</h5>
        <p><strong>Nazwa:</strong> {{ form.name }}</p>
        <p><strong>Opis:</strong> {{ form.description }}</p>
        <p><strong>Priorytet:</strong> {{ form.priority }}</p>
        <p><strong>Stan:</strong> {{ form.state }}</p>
        <p><strong>Data dodania:</strong> {{ new Date(form.createdAt).toLocaleString() }}</p>
        <p v-if="form.startedAt"><strong>Rozpoczęto:</strong> {{ new Date(form.startedAt).toLocaleString() }}</p>
        <p v-if="form.finishedAt"><strong>Zakończono:</strong> {{ new Date(form.finishedAt).toLocaleString() }}</p>
        <p><strong>Przypisana osoba:</strong> {{ getUserName(form.assigneeId) }}</p>

        <div class="d-flex gap-2 flex-wrap mt-3">
            <select v-model="form.assigneeId" class="form-select w-auto">
                <option value="">-- Wybierz osobę --</option>
                <option v-for="u in userOptions" :key="u.value" :value="u.value">
                    {{ u.label }}
                </option>
            </select>

            <button @click="assignUser" class="btn btn-outline-success btn-sm">Przypisz</button>
            <button @click="markAsDone" class="btn btn-outline-primary btn-sm" :disabled="form.state === 'done'">Oznacz
                jako zrobione</button>
            <button @click="emit('close')" class="btn btn-outline-secondary btn-sm">Zamknij</button>
        </div>
    </div>
</template>

<style scoped>
.task-details {
    padding: 1rem;
    margin-top: 1rem;
    border-left: 4px solid #007bff;
}

.dark-mode .task-details {
    background: #2a2a2a;
    border-left-color: #66b3ff;
}
</style>

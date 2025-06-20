<script setup lang="ts">
import { ref, computed } from "vue";
import type { Task } from "@/types/Task";
import type { User } from "@/types/User";
import TaskService from "@/services/taskService";
import UserService from "@/services/userService";

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits(["update", "close"]);

const form = ref<Task>({ ...props.task });

// 🔧 Pobierz użytkowników devops/developer
const users = UserService.getAssignableUsers();

// 👥 Lista opcji do selecta
const userOptions = computed(() =>
    users.map((u: User) => ({
        label: `${u.firstName} ${u.lastName}`,
        value: u.id
    }))
);

// ✅ Przypisanie osoby – ustawia stan na "doing" i datę startu
const assignUser = () => {
    if (!form.value.assigneeId) return;
    form.value.state = "doing";
    form.value.startedAt = new Date().toISOString();
    TaskService.update(form.value);
    emit("update");
};

// ✅ Oznaczenie zadania jako zakończone – ustawia datę zakończenia
const markAsDone = () => {
    form.value.state = "done";
    form.value.finishedAt = new Date().toISOString();
    TaskService.update(form.value);
    emit("update");
};

// 🔍 Pobierz nazwę użytkownika na podstawie ID
const getUserName = (id?: string) => {
    const u = UserService.getById(id ?? "");
    return u ? `${u.firstName} ${u.lastName}` : "Nieznany";
};
</script>

<template>
    <div class="border p-3 mb-4">
        <h5>Szczegóły zadania</h5>

        <p><strong>Nazwa:</strong> {{ form.name }}</p>
        <p><strong>Opis:</strong> {{ form.description }}</p>
        <p><strong>Priorytet:</strong> {{ form.priority }}</p>
        <p><strong>Stan:</strong> {{ form.state }}</p>
        <p><strong>Data dodania:</strong> {{ new Date(form.createdAt).toLocaleString() }}</p>

        <p v-if="form.startedAt">
            <strong>Data rozpoczęcia:</strong> {{ new Date(form.startedAt).toLocaleString() }}
        </p>

        <p v-if="form.finishedAt">
            <strong>Data zakończenia:</strong> {{ new Date(form.finishedAt).toLocaleString() }}
        </p>

        <p>
            <strong>Przypisana osoba:</strong> {{ getUserName(form.assigneeId) }}
        </p>

        <div class="d-flex gap-2 mt-3">
            <select v-model="form.assigneeId" class="form-select w-auto">
                <option value="">-- Wybierz użytkownika --</option>
                <option v-for="u in userOptions" :key="u.value" :value="u.value">
                    {{ u.label }}
                </option>
            </select>

            <button @click="assignUser" class="btn btn-sm btn-outline-success">
                Przypisz
            </button>

            <button @click="markAsDone" class="btn btn-sm btn-outline-primary" :disabled="form.state === 'done'">
                Oznacz jako Zrobione
            </button>

            <button @click="emit('close')" class="btn btn-sm btn-outline-secondary">
                Zamknij
            </button>
        </div>
    </div>
</template>

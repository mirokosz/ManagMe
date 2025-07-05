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
    <div class="task-details position-relative bg-white rounded shadow p-4 border-start border-4 border-primary">
        <!-- przycisk zamykania -->
        <button class="btn-close position-absolute top-0 end-0 m-2" aria-label="Zamknij"
            @click="emit('close')"></button>

        <h5 class="mb-3 text-primary">Szczegóły zadania</h5>
        <p><strong>Nazwa:</strong> {{ form.name }}</p>
        <p><strong>Opis:</strong> {{ form.description }}</p>
        <p><strong>Priorytet:</strong> {{ form.priority }}</p>
        <p><strong>Stan:</strong> {{ form.state }}</p>
        <p>
            <strong>Data dodania:</strong>
            {{ new Date(form.createdAt).toLocaleString() }}
        </p>
        <p v-if="form.startedAt">
            <strong>Rozpoczęto:</strong>
            {{ new Date(form.startedAt).toLocaleString() }}
        </p>
        <p v-if="form.finishedAt">
            <strong>Zakończono:</strong>
            {{ new Date(form.finishedAt).toLocaleString() }}
        </p>
        <p><strong>Przypisana osoba:</strong> {{ getUserName(form.assigneeId) }}</p>

        <div class="d-flex flex-wrap gap-2 mt-3">
            <select v-model="form.assigneeId" class="form-select w-auto">
                <option value="">-- Wybierz osobę --</option>
                <option v-for="u in userOptions" :key="u.value" :value="u.value">
                    {{ u.label }}
                </option>
            </select>

            <button class="btn btn-outline-success btn-sm" @click="assignUser">
                Przypisz
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="markAsDone" :disabled="form.state === 'done'">
                Oznacz jako zrobione
            </button>
        </div>
    </div>
</template>

<style scoped>
/* jasny */
.task-details {
    animation: fadeIn 0.25s ease-out;
    max-width: 500px;
    margin: 1rem auto;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ciemny */
.dark-mode .task-details {
    background-color: #2b2b2b !important;
    color: #e9ecef;
    border-left-color: #66b3ff !important;
}

.dark-mode .task-details p,
.dark-mode .task-details strong {
    color: #e9ecef;
}

.dark-mode .form-select,
.dark-mode .form-control {
    background-color: #333 !important;
    color: #e9ecef !important;
    border-color: #555 !important;
}

.dark-mode .form-select option {
    background-color: #333;
    color: #e9ecef;
}

.dark-mode .btn-close {
    filter: invert(1);
}
</style>

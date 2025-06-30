<script setup lang="ts">
import { ref, watch } from "vue";
import type { Story } from "@/types/Story";
import ProjectService from "@/services/projectService";
import StoryService from "@/services/storyService";
import UserService from "@/services/userService";

const props = defineProps<{ story: Story | null }>();
const emit = defineEmits(["save"]);

const user = UserService.getLoggedUser();
const form = ref<Story>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
    priority: "medium",
    state: "todo",
    createdAt: new Date().toISOString(),
    ownerId: user.id,
    projectId: ProjectService.getActiveProject() ?? "",
});

const resetForm = () => {
    form.value = {
        id: crypto.randomUUID(),
        name: "",
        description: "",
        priority: "medium",
        state: "todo",
        createdAt: new Date().toISOString(),
        ownerId: user.id,
        projectId: ProjectService.getActiveProject() ?? "",
    };
};

watch(
    () => props.story,
    (story) => {
        if (story) form.value = { ...story };
        else resetForm();
    },
    { immediate: true }
);

const save = async () => {
    if (props.story) {
        await StoryService.update(form.value);
    } else {
        await StoryService.add(form.value);
    }
    emit("save");
    resetForm();
};
</script>

<template>
    <form @submit.prevent="save" class="border p-3 rounded shadow-sm bg-light">
        <h5 class="mb-3">{{ props.story ? "Edytuj" : "Dodaj" }} historyjkę</h5>
        <div class="mb-3">
            <input v-model="form.name" class="form-control" placeholder="Nazwa" required />
        </div>
        <div class="mb-3">
            <textarea v-model="form.description" class="form-control" placeholder="Opis" required />
        </div>
        <div class="mb-3">
            <select v-model="form.priority" class="form-select">
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
            </select>
        </div>
        <div class="mb-3">
            <select v-model="form.state" class="form-select">
                <option value="todo">Do zrobienia</option>
                <option value="doing">W trakcie</option>
                <option value="done">Zrobione</option>
            </select>
        </div>
        <button class="btn btn-primary w-100">Zapisz</button>
    </form>
</template>

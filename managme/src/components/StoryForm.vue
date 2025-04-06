<script setup lang="ts">
import { ref, watch } from "vue";
import type { Story } from "@/types/Story";
import ProjectService from "@/services/projectService";
import StoryService from "@/services/storyService";
import UserService from "@/services/userService";

const props = defineProps<{
    story: Story | null;
}>();

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
        if (story) {
            form.value = { ...story };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const save = () => {
    if (props.story) {
        StoryService.update(form.value);
    } else {
        StoryService.add(form.value);
    }
    emit("save");
};
</script>

<template>
    <div class="mb-4 border p-3">
        <h4 class="mb-3">{{ props.story ? "Edytuj" : "Dodaj" }} historyjkę</h4>
        <form @submit.prevent="save">
            <input v-model="form.name" placeholder="Nazwa" class="form-control mb-2" required />
            <textarea v-model="form.description" placeholder="Opis" class="form-control mb-2" required />
            <select v-model="form.priority" class="form-select mb-2">
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
            </select>
            <select v-model="form.state" class="form-select mb-2">
                <option value="todo">Do zrobienia</option>
                <option value="doing">W trakcie</option>
                <option value="done">Zrobione</option>
            </select>
            <button class="btn btn-primary">Zapisz</button>
        </form>
    </div>
</template>

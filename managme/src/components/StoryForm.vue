<script setup lang="ts">
import { ref, watch } from "vue";
import type { Story } from "@/types/Story";
import StoryService from "@/services/storyService";
import ProjectService from "@/services/projectService";
import UserService from "@/services/userService";

const props = defineProps<{
    story: Story | null;
}>();

const emit = defineEmits(["save"]);

const user = UserService.getLoggedUser();
const projectId = ProjectService.getActiveProject();

const form = ref<Story>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
    priority: "medium",
    state: "todo",
    createdAt: new Date().toISOString(),
    ownerId: user.id,
    projectId: projectId ?? "",
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
        projectId: projectId ?? "",
    };
};

watch(
    () => props.story,
    (newStory) => {
        if (newStory) {
            form.value = { ...newStory };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);



const save = () => {
    if (!form.value.name.trim()) return;

    if (props.story) {
        StoryService.update(form.value);
    } else {
        StoryService.add(form.value);
    }

    resetForm();
    emit("save");
};
</script>

<template>
    <div class="mb-4 border p-3">
        <h4 class="mb-3">{{ props.story ? "Edytuj" : "Dodaj" }} historyjkę</h4>
        <form @submit.prevent="save">
            <input v-model="form.name" placeholder="Nazwa" class="form-control mb-2" required />
            <textarea v-model="form.description" placeholder="Opis" class="form-control mb-2" required></textarea>
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
            <button type="submit" class="btn btn-primary">Zapisz</button>
        </form>
    </div>
</template>

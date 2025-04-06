<script setup lang="ts">
import { ref, watch } from "vue";
import type { Project } from "@/types/Project";

const props = defineProps<{
    project: Project | null;
}>();

const emit = defineEmits<{
    (e: "save", project: Project): void;
}>();

const name = ref("");
const description = ref("");

watch(
    () => props.project,
    (project) => {
        name.value = project?.name || "";
        description.value = project?.description || "";
    },
    { immediate: true }
);

const save = () => {
    emit("save", {
        id: props.project?.id || crypto.randomUUID(),
        name: name.value,
        description: description.value,
    });
};
</script>

<template>
    <form @submit.prevent="save">
        <input v-model="name" class="form-control mb-2" placeholder="Nazwa projektu" required />
        <textarea v-model="description" class="form-control mb-2" placeholder="Opis projektu" />
        <button class="btn btn-primary">Zapisz</button>
    </form>
</template>

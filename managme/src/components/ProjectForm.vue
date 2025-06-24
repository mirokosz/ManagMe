<script setup lang="ts">
import { ref, watch } from "vue";
import type { Project } from "@/types/Project";

const props = defineProps<{ project: Project | null }>();
const emit = defineEmits<{ (e: "save", project: Project): void }>();

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
    <form @submit.prevent="save" class="border p-3 rounded shadow-sm bg-light">
        <div class="mb-3">
            <input v-model="name" class="form-control" placeholder="Nazwa projektu" required />
        </div>
        <div class="mb-3">
            <textarea v-model="description" class="form-control" placeholder="Opis projektu" />
        </div>
        <button class="btn btn-primary w-100">Zapisz</button>
    </form>
</template>

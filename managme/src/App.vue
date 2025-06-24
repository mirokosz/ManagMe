<template>
  <div :class="['container py-5', themeClass]">
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-sm btn-outline-secondary" @click="toggleTheme">
        Tryb: {{ isDark ? "Ciemny" : "Jasny" }}
      </button>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const isDark = ref(localStorage.getItem("theme") === "dark");

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const mode = isDark.value ? "dark" : "light";
  localStorage.setItem("theme", mode);

  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${mode}-mode`);
};

const themeClass = computed(() => (isDark.value ? "dark-mode" : "light-mode"));
</script>

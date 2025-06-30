<template>
  <div :class="['app-container', themeClass]">
    <nav class="navbar shadow-sm">
      <div class="navbar-left">
        <span class="logo">ManagMe</span>
      </div>
      <div class="navbar-right">
        <button class="nav-btn" @click="goToHome">🏠 Projekty</button>
        <button class="nav-btn" @click="toggleTheme">
          🌓 Tryb: {{ isDark ? "Ciemny" : "Jasny" }}
        </button>
        <button class="nav-btn logout" @click="logout">🚪 Wyloguj się</button>
      </div>
    </nav>
    <main class="main-content container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(localStorage.getItem("theme") === "dark");

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const mode = isDark.value ? "dark" : "light";
  localStorage.setItem("theme", mode);

  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(`${mode}-mode`);
};

onMounted(() => {
  const mode = isDark.value ? "dark" : "light";
  document.body.classList.add(`${mode}-mode`);
});

const themeClass = computed(() => (isDark.value ? "dark-mode" : "light-mode"));

const goToHome = () => router.push("/");
const logout = () => router.push("/login");
</script>

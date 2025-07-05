<template>
  <div :class="['app-container', themeClass]">
    <nav class="navbar navbar-expand-lg shadow-sm" :class="isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-white'">
      <div class="container-fluid">
        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-kanban-fill me-1"></i> ManagMe
        </router-link>

        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav ms-auto align-items-center">
            <!-- przycisk projekty -->
            <li class="nav-item">
              <router-link to="/" class="btn btn-sm btn-outline-secondary nav-btn me-2">
                <i class="bi bi-folder-fill me-1"></i> Projekty
              </router-link>
            </li>


            <li class="nav-item">
              <button class="btn btn-sm btn-outline-secondary nav-btn me-2" @click="toggleTheme">
                <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
                <span class="ms-1">Tryb: {{ isDark ? 'Ciemny' : 'Jasny' }}</span>
              </button>
            </li>


            <li class="nav-item">
              <button class="btn btn-sm btn-outline-danger nav-btn" @click="logout">
                <i class="bi bi-box-arrow-right me-1"></i> Wyloguj się
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const isDark = ref(localStorage.getItem('theme') === 'dark');

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const mode = isDark.value ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${mode}-mode`);
};

onMounted(() => {
  const mode = isDark.value ? 'dark' : 'light';
  document.body.classList.add(`${mode}-mode`);
});

const themeClass = computed(() =>
  isDark.value ? 'dark-mode' : 'light-mode'
);

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
.navbar-brand {
  font-weight: 700;
  font-size: 1.25rem;
}

.nav-btn {
  display: flex;
  align-items: center;
}

.main-content.container {
  max-width: 1140px;
}
</style>

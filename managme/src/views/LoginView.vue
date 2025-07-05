<template>
    <div class="container py-5">
        <div class="card p-4 mx-auto" style="max-width: 400px;">
            <h3 class="mb-4 text-center">Logowanie</h3>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <input v-model="loginForm.login" type="text" class="form-control" placeholder="Login" required />
                </div>
                <div class="mb-3">
                    <input v-model="loginForm.password" type="password" class="form-control" placeholder="Hasło"
                        required />
                </div>
                <button class="btn btn-primary w-100">Zaloguj się</button>
            </form>
            <div v-if="error" class="mt-3 alert alert-danger text-center">{{ error }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";

const router = useRouter();
const loginForm = ref({ login: "", password: "" });
const error = ref("");

const login = async () => {
    error.value = "";
    try {
        await AuthService.login(loginForm.value.login, loginForm.value.password);
        await AuthService.fetchAndStoreUser();
        router.push("/"); //przekierowanie do aplikacji
    } catch (e) {
        error.value = "Nieprawidłowy login lub hasło";
    }
};
</script>

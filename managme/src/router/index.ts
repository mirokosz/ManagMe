//cała logika przejść między widokami
import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import StoryDetailsView from "@/views/StoryDetailsView.vue";
import LoginView from "@/views/LoginView.vue";
import AuthService from "@/services/authService";

//definiowanie tras i widoków, każda ścieżka jest powiązana z konkretnym widokiem 
const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/projekty/:projectId/historyjki/:id",
    name: "story-details-full",
    component: StoryDetailsView,
    props: (route: RouteLocationNormalized) => ({ id: route.params.id }),
    meta: { requiresAuth: true },
  },
];

//tworzenie routera
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//wyciągamy czy trasa wymaga uwierzytelnienia czy mamy token i czy w pamięci jest obiekt użytkownika
router.beforeEach((to, _, next) => {
  const loggedIn = !!AuthService.getAccessToken();

  
  if (to.meta.requiresAuth && !loggedIn) { //jeśli trasa wymaga auth i nie ma tokena to logujemy
    return next({ name: "login" });
  }

  
  if (to.name === "login" && loggedIn) { //jeśli jesteśmy zalogowani przekieruj na home
    return next({ name: "home" });
  }

  next();
});

export default router;

import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import StoryDetailsView from "@/views/StoryDetailsView.vue";
import LoginView from "@/views/LoginView.vue";
import AuthService from "@/services/authService";

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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware autoryzacji
router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const hasToken = !!AuthService.getAccessToken();
  const userLoaded = !!AuthService.getUser();

  if (requiresAuth && !hasToken) {
    return next({ name: "login" });
  }

  // Jeśli token jest, ale brak danych o użytkowniku – spróbuj je pobrać
  if (requiresAuth && hasToken && !userLoaded) {
    try {
      await AuthService.fetchAndStoreUser();
    } catch {
      AuthService.logout();
      return next({ name: "login" });
    }
  }

  if (to.name === "login" && hasToken) {
    return next({ name: "home" });
  }

  next();
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import StoryDetailsView from "@/views/StoryDetailsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    // nowy pełny kontekstowy routing dla: /projekty/:projectId/historyjki/:id
    path: "/projekty/:projectId/historyjki/:id",
    name: "story-details-full",
    component: StoryDetailsView,
    props: (route: RouteLocationNormalized) => ({ id: route.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
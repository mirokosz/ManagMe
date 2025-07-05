import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/style.css"; 

import AuthService from "@/services/authService";

const app = createApp(App);
app.use(router);

// zastosuj tryb zapisany w localStorage
const mode = localStorage.getItem("theme") || "light";
document.body.classList.add(`${mode}-mode`);

AuthService.fetchAndStoreUser()
  .catch(() => {
    AuthService.logout();
  })
  .finally(() => {
    app.mount("#app");
  });

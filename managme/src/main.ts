import { createApp } from "vue";
import App from "./App.vue";

// ✅ Poprawny import Bootstrapa
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { plugin, defaultConfig } from "@formkit/vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "@formkit/themes/dist/genesis/theme.css";
import Toaster from "@meforma/vue-toaster";

createApp(App)
  .use(Toaster)
  .use(store)
  .use(router)
  .use(plugin, defaultConfig)
  .mount("#app");

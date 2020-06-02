import Vue from "vue";
import App from "./App.vue";
import VueRessource from "vue-resource";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueRessource);
new Vue({
  render: h => h(App)
}).$mount("#app");

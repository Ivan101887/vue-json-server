import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import '@/assets/scss/normalize.scss';
import '@/assets/scss/reset.scss';
import '@/assets/scss/helper.scss';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
new Vue({
  render: (h) => h(App),
}).$mount('#app');

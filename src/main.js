import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import About from '../src/views/AboutView.vue';
import Home from '../src/views/HomeView.vue';
import Form from '../src/views/DataForm.vue';
import ViewJson from '../src/views/ViewJson.vue';
import DataDisplay from '../src/views/DataDisplay.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/Form', component: Form },
  { path: '/View', component: ViewJson },
  { path: '/DataDisplay', component: DataDisplay },
];

const router = new VueRouter({
  mode: 'history', // Set the mode to 'history'
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

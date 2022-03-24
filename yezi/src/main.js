import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/styles/global.less"
import "./eventBus"
store.dispatch("setting/fetchSetting")

import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage;

import vLoading from './directives/loading';
Vue.directive("loading", vLoading);

import vLazy from './directives/lazy';
Vue.directive("lazy", vLazy);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

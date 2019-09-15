import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import store from './store'
import loadingImg from '@/static/img/loading.gif'
import errImg from '@/static/img/err.jpg'
// import axios from './axios';
Vue.use(ElementUI)
Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errImg,
  loading: loadingImg ,
  attempt: 1
})

Vue.directive('document-click', {
  bind (el, binding, vnode) {
    document.addEventListener('click', binding.value, false)
  },
  inserted () {
    console.log('insert')
  },
  update () {
    console.log('update')
  }
})
/* eslint-disable no-new */
// Vue.prototype.axios = axios;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

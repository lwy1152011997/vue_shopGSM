// 这个文件为项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css' // 引入全局基本样式

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' // 配置axios发送请求时的根路径
Vue.prototype.$http = axios // 在Vue的原型上创建一个$http对象,然后将axios挂在到上面,这样我们就可以通过this.$http来发送请求了
Vue.config.productionTip = false

new Vue({
  router, // 将路由挂载到Vue的实实例对象上,通过this.$router 来调用
  render: h => h(App) // 通过render函数将App组件渲染到页面上
}).$mount('#app') // 表示将new Vue 的实例对象挂在在#app容器上进行渲染；#app是App.vue中的

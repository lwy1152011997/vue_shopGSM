// 路由配置文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

// 这里是写路由的相关配置
const routes = [
  // 直接访问到login组件
  {
    path: '/',
    redirect: '/login' // 重定向
  },
  {
    path: '/login', // 路由路径
    component: Login // 注册路由组件
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 为router挂载路由导航守卫, 通过路由导航守卫来控制访问权限(如果用户没有通过登录直接通过URL的方式访问特定的页面,那么我们要给他重定向到登录的页面上)
router.beforeEach((to, from, next) => {
  /**
   * 路由当行守卫:
   * to: 路由跳转后将要去到的路径
   * from: 从哪个页面路径跳转而来的
   * next: 是一个放行的函数,.决定是否展示你要看到的路由页面; 直接调用next() 表示放行; 传参调用next('/login') 表示强制跳转到login页面
   */
  // console.log(to, from, next)
  if (to.path === '/login') next() // 如果访问的是登录页面,直接放行
  // 如果用户没有访问登录页,那么我们要先拿到token,根据token存不存在来判断
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

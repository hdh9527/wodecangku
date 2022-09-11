// 第一步导入 Vue 和 VueRouter 包
import Vue from "vue"
import VueRouter from "vue-router"
import Login from '@/views/Login/login.vue'
import Main from "@/views/Main.vue"


// import Home from '@/view/home/index.vue'
// import User from '@/view/user/User.vue'
// import Goods from '@/view/goods/goods.vue'
// import page1 from '@/view/other/pageOne.vue'
// import page2 from '@/view/other/pageTwo.vue'

// 用 Vue.use 方法把 VueRouter 注册为 Vue 标签 
Vue.use(VueRouter)

// 创建理由规则
const routes = [
  {
    path: '/', redirect:'/home', component: Main, name: 'Main', children: [
    // { path: '/user', component: User, name: 'user' },
    // { path: '/home', component: Home, name: 'home' },
    // { path: '/mall', component: Goods, name: 'mall' },
    // { path: '/page1', component: page1, name: 'page1' },
    // { path: '/page2', component: page2, name: 'page2'}
    ] 
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
] 

// 第三步创建路由实例
const router = new VueRouter({
  routes
})

// 导出路由实例
export default router
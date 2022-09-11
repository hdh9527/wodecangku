import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
// 引入生成（token） 的组件
import user from '@/store/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tab,
    user
  }
})
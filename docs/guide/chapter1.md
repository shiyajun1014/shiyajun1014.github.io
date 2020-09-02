---
sidebarDepth: 2
title: Vue 使用 token 身份验证
---

# Vue 使用 token 身份验证

在登录路由添加自定义 meta 字段，来记录该页面是否需要身份验证

```js
//router.js
const route = {
  path: '/index',
  name: 'index',
  component: (resolve) => require(['./index.vue'], resolve),
  meta: {
    requiresAuth: true,
  },
}
```

设置路由拦截

```js
router.beforeEach((to, from, next) => {
  // matched的数组中包含 $route 对象的检查元字段
  // arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判断当前是否有登录的权限
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

设置请求拦截

```js
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      // 判断是否存在 token，在每个 http header 都加上 token
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath },
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)
```

token 存储到 localStorage

```js
// login.vue
methods: {
  login() {
    if (this.token) {
      // 存储在本地的localStograge中
      this.$store.commit(types.LOGIN, this.token)
      // 跳转至其他页面
      let redirect = decodeURIComponent(this.$route.query.redirect || '/');
      this.$router.push({
        path: redirect
      })
    }
  }
}
```

```js
// store.js
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
  },
  mutations: {
    // 为什么会把 token 存入 Vuex 中呢？
    // 可以直接使用 localStorage 操作数据，但无法监听数据改变。
    // 而 Vuex 是全局存储同时可监听数据状态的变更，在 Vuex 中封装的 localStorage 操作，
    // 当 Vuex 数值发生变化时可以响应式地监听到该数据的变化。

    // 登录成功将, token 保存在 localStorage 中
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    // 退出登录将 token 清空
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
  },
})
```

```js
// mutation-types.js
export const LOGIN = 'login'
export const LOGOUT = 'logout'
```

> JavaScript 代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。
> 刷新页面，以前申请的内存被释放，重新加载脚本代码，变量重新赋值。
> 所以这些数据要想储存就必须储存在外部，例如：Local Storage / Session Storage / IndexDB 等。  
> 这些是浏览器提供的 API，让你可以将数据储存在硬盘上，做持久化储存。

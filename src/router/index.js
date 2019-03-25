import Vue from 'vue'
import Router from 'vue-router'
const List = () => import('@/components/List')
const Login = () => import('@/views/TheLogin')
const Container = () => import('@/container/Container')
const Dashboard = () => import('@/views/Dashboard')
const Article = () => import('@/views/Article')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Container',
      component: Container,
      children: [
        {path: 'dashboard', name: '首页', component: Dashboard},
        {path: 'article', name: '文章', component: Article}
      ]
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})

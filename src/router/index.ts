import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/service-details'
  },
  {
    path: '/service-details',
    name: 'ServiceDetails',
    component: MainPage
  },
  {
	path: '/login',
	name: 'Login',
	component: LoginPage
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

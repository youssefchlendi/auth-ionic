import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import { useAuthStore } from '@/store/auth.store';
import { pinia } from '@/main';
import TabsPage from '../views/docs/TabsPage.vue'
import sig from '../views/docs/SignaturesPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage,
		meta: {
			requiresNotAuth: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterPage,
		meta: {
			requiresNotAuth: true
		}
	},
	{
		path: '/home',
		name: 'Home',
		component: HomePage,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/signatures',
		component: sig,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/files',
		component: () => import('@/views/docs/FilesPage.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/signandpreviewfile/:id',
		name: 'SignAndPreviewFile',
		component: () => import('@/views/docs/SignAndPreviewFile.vue'),
		meta: {
			requiresAuth: true
		}
	}

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore(pinia);
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!authStore.isLoggedIn) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.requiresNotAuth)) {
		if (authStore.isLoggedIn) {
			next({
				path: '/home',
				params: { nextUrl: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next()
	}
})


export default router

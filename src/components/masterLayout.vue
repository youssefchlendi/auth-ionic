<template>
	<ion-page>
	<main-menu v-if="authStore.isLoggedIn"/>
	<div class="ion-page" id="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button v-if="authStore.isLoggedIn"></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
				<ion-buttons slot="end">
					<ion-button v-if="authStore.isLoggedIn" @click="logout">
						<ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<slot> </slot>
		</ion-content>
	</div>
</ion-page>
</template>
<script lang="ts">
import {
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonMenuButton,
	IonPage,
IonIcon,
IonButton,
} from "@ionic/vue";
import {logOutOutline} from 'ionicons/icons';
import MainMenu from '@/components/MainMenu.vue';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'vue-router';
export default {
	components: {
		IonHeader,
		IonContent,
		IonToolbar,
		IonTitle,
		IonButtons,
		IonButton,
		IonMenuButton,
		MainMenu,
		IonIcon,
		IonPage
	},
	props: [
		"pageTitle"
	],
	setup() {
		const authStore = useAuthStore();
		const router = useRouter();
		
		const logout = () => {
			const res = authStore.logout();
			console.log(res);
			if (res) {
				router.push('/login');
			}
		};
		return {
			authStore,
			logOutOutline,
			logout
		};
	},

};
</script>
<style scoped>
ion-toolbar {
	--background: var(--ion-color-primary);
	--color: var(--ion-color-primary-contrast)
}
</style>
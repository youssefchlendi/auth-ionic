<template>
	<ion-menu type="push" v-if="authStore.isLoggedIn" contentId="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-menu-toggle>
				<ion-item class="ion-activatable" @click="goTo('/home')" routerDirection="root">
					<ion-icon slot="start" :icon="home"></ion-icon>
					<ion-label :autoHide="false" expand="block">Home</ion-label>
				</ion-item>
			</ion-menu-toggle>
			<ion-menu-toggle>
				<ion-item  class="ion-activatable" @click="goTo('/signatures')" routerDirection="root">
					<ion-icon slot="start" :icon="pencil"></ion-icon>
					<ion-label :autoHide="false" expand="block">Signatures</ion-label>
				</ion-item>
			</ion-menu-toggle>
			<ion-menu-toggle>
				<ion-item class="ion-activatable"  @click="goTo('/files')" routerDirection="root">
					<ion-icon slot="start" :icon="documents"></ion-icon>
					<ion-label :autoHide="false" expand="block">Files</ion-label>
				</ion-item>
			</ion-menu-toggle>
		</ion-content>
	</ion-menu>
</template>

<script  lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { navigationAnimation } from "@/utils/animations";
import { IonMenu, IonMenuToggle, IonHeader, IonToolbar, IonContent, IonTitle, IonButton, useIonRouter, AnimationBuilder, createAnimation } from "@ionic/vue";
import { defineComponent } from "vue";
import { home, documents,pencil } from 'ionicons/icons';
export default defineComponent({
	components: {
		IonMenu,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonMenuToggle
	},
	setup() {
		const authStore = useAuthStore();
		const router = useIonRouter();
		const routerAnimation: AnimationBuilder = navigationAnimation;
		const goTo = (link: string) => {
			router.replace(link,
			);
		}
		return {
			goTo,
			authStore,
			home,
			documents,
			pencil
		}
	}
});
</script>

<style lang="scss" scoped></style>
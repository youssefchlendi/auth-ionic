<template>
	<ion-menu v-if="authStore.isLoggedIn" contentId="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-menu-toggle>
				<ion-button expand="block" @click="goTo('/home')">Home</ion-button>
			</ion-menu-toggle>
			<ion-menu-toggle>
			<ion-button expand="block" @click="goTo('/signatures')">Signatures</ion-button>
			</ion-menu-toggle>
			<ion-menu-toggle>
			<ion-button expand="block" @click="goTo('/files')">Files</ion-button>
			</ion-menu-toggle>
		</ion-content>
	</ion-menu>
</template>

<script  lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { IonMenu, IonMenuToggle, IonHeader, IonToolbar, IonContent, IonTitle, IonButton, useIonRouter } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		IonMenu,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonButton,
		IonMenuToggle
	},
	setup() {
		const authStore = useAuthStore();
		const router = useIonRouter();
		const goTo = (link: string) => {
			router.push(link);
		}
		return {
			goTo,
			authStore
		}
	}
});
</script>

<style lang="scss" scoped>

</style>
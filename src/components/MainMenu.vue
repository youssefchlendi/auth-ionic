<template>
	<ion-menu contentId="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-button expand="block" @click="goTo('/home')">Home</ion-button>
			<ion-button expand="block" @click="goTo('/signatures')">Signatures</ion-button>
			<ion-button expand="block" @click="goTo('/files')">Files</ion-button>
		</ion-content>
	</ion-menu>
</template>

<script  lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonContent, IonTitle, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		IonMenu,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle,
		IonButton
	},
	methods: {
		goTo(link: string) {
			this.$router.replace(link);
		}
	}
});
</script>

<style lang="scss" scoped>

</style>
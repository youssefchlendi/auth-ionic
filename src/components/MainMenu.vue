<template>
	<ion-menu contentId="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">This is the menu content.</ion-content>
	</ion-menu>
</template>

<script  lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonContent, IonTitle } from "@ionic/vue";
export default {
	components: {
		IonMenu,
		IonHeader,
		IonToolbar,
		IonContent,
		IonTitle
	},
};
</script>

<style lang="scss" scoped>

</style>
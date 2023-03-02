<template>
	<master-layout pageTitle="Service Form">
		<div class="centered">
			<!-- centered -->
			<ion-card style="width:100%" elevation="2">
				<ion-card-header>
					<ion-card-title>SignIn</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<!-- user enters serviceUri -->
					<ion-item ref="item">
						<ion-label position="floating">Service URI</ion-label>
						<ion-input v-model="serviceUri.value" @ionFocus="validate" @ionInput="validate" @ionBlur="markTouched"></ion-input>
						<ion-note slot="helper">Enter a valid URI</ion-note>
						<ion-note slot="error">Invalid URI</ion-note>
					</ion-item>
					<!-- users submit -->
					<ion-button expand="full" @click="submit" :disabled="!serviceUri.valid">Submit</ion-button>

				</ion-card-content>
			</ion-card>
		</div>
	</master-layout>
</template>

<script lang="ts">
import { useServiceStore } from "@/store/service.store";
import { IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonNote } from "@ionic/vue";
import { useRoute, useRouter } from 'vue-router';
import {defineComponent} from 'vue';
export default defineComponent({
	components: {
		IonItem,
		IonLabel,
		IonInput,
		IonButton,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardContent,
		IonNote
	},
	setup() {
		const serviceStore = useServiceStore();
		const router = useRouter();
		// if(serviceStore.serviceUri)router.push('/login');
		return {
			serviceStore
		};
	},
	data() {
		return {
			serviceUri: {
				value: (this.serviceStore as any).serviceUri??'',
				valid: false,
			}

		};
	},
	methods: {
		validateURI(URI: string) {
			return URI.match(/^https?:\/\/(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/) || URI.match(/^http:\/\/localhost:[0-9]{4}$/);
		},

		validate(ev: any) {
			const value = ev.target.value;
			(this.$refs.item as any).$el.classList.remove('ion-valid');
			(this.$refs.item as any).$el.classList.remove('ion-invalid');

			if (value === '') return;

			if(this.validateURI(value)){
				(this.$refs.item as any).$el.classList.add('ion-valid')
				this.serviceUri.valid = true;
			}else{
				(this.$refs.item as any).$el.classList.add('ion-invalid');
			}
		},

		markTouched() {
			(this.$refs.item as any).$el.classList.add('ion-touched')
		},

		submit() {
			if(this.serviceUri.valid){
				this.serviceStore.setServiceUri(this.serviceUri.value);
				this.$router.push('/login');
			}
		}
	},
})
</script>

<style>
.centered {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
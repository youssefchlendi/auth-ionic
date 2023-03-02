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
						<ion-input :readonly="submittedUri" v-model="serviceUri.value" @ionFocus="validate($event, 'uri')"
							@ionInput="validate($event, 'uri')" @ionBlur="markTouched('uri')"></ion-input>
						<ion-note slot="helper">Enter a valid URI</ion-note>
						<ion-note slot="error">Invalid URI</ion-note>
					</ion-item>



					<template v-if="submittedUri">
						<ion-item :class="userInfo.email.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
							<ion-label position="floating">Email</ion-label>
							<ion-input v-model="userInfo.email.value" @ionInput="validate($event, 'email')"
								@ionBlur="markTouched('email')"></ion-input>
							<ion-note slot="helper">Enter a your email</ion-note>
							<ion-note slot="error">{{ userInfo.email.validationMessage }}</ion-note>

						</ion-item>
						<ion-item :class="userInfo.password.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
							<ion-label position="floating">Password</ion-label>
							<ion-input type="password" @ionInput="validate($event, 'password')"
								@ionBlur="markTouched('email')" v-model="userInfo.password.value"></ion-input>
							<ion-note slot="helper">Enter a your password</ion-note>
							<ion-note slot="error">{{ userInfo.password.validationMessage }}</ion-note>
						</ion-item>
						<!-- users submit -->

					</template>



				</ion-card-content>
				<ion-button expand="full" @click="submitUri" v-if="!submittedUri"
					:disabled="!serviceUri.valid">Submit</ion-button>
					<ion-buttons class="ion-padding ion-justify-content-center" v-if="submittedUri">
						<ion-button expand="full" fill="outline" color="danger" shape="round" @click="cancel">cancel</ion-button>
						<ion-button expand="block"  fill="solid" color="success" shape="round" :disabled="!valid" @click="login">Login</ion-button>
					</ion-buttons>
			</ion-card>
		</div>
	</master-layout>
</template>

<script lang="ts">
import { useServiceStore } from "@/store/service.store";
import {
	IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonNote, IonButtons,toastController 
} from "@ionic/vue";
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { useAuthStore } from "@/store/auth.store";
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
		IonNote,
		IonButtons
	},
	setup() {
		const serviceStore = useServiceStore();
		const authStore = useAuthStore();

		const router = useRouter();
		// if(serviceStore.serviceUri)router.push('/login');
		return {
			serviceStore,
			authStore
		};
	},
	data() {
		return {
			serviceUri: {
				value: (this.serviceStore as any).serviceUri ?? '',
				valid: false,
			},
			userInfo: {
				email: {
					value: "",
					validationMessage: "",
					touched: false,
				},
				password: {
					value: "",
					validationMessage: "",
					touched: false,
				}
			},
			loginMessage: "",
			submittedUri: false,
		};
	},
	computed: {
		valid() {
			if (this.userInfo.email.validationMessage === "" && this.userInfo.password.validationMessage === "") {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		validateURI(URI: string) {
			return URI.match(/^https?:\/\/(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/) || URI.match(/^http:\/\/localhost:[0-9]{4}$/);
		},
		markTouched(field: string) {
			if (field === "email") {
				this.userInfo.email.touched = true;
			}
			if (field === "password") {
				this.userInfo.password.touched = true;
			}
			if (field === "uri") {
				(this.$refs.item as any).$el.classList.add('ion-touched')
			}
		},


		submitUri() {
			if (this.serviceUri.valid) {
				const res = this.serviceStore.setServiceUri(this.serviceUri.value);
				if (res) {
					this.submittedUri = true;
				}

			}
		},
		async login() {
			this.validate(null, "email");
			this.validate(null, "password");
			if (!this.valid) return;
			const res = await this.authStore.login(this.userInfo.email.value, this.userInfo.password.value);
			if (res) {
				toastController.create({
					message: "Login Successful",
					duration: 2000,
					color: "success"
				}).then(toast => toast.present());
				this.$router.push('/home');
			} else {
				this.authStore.loginErrors.errors ? Object.entries(this.authStore.loginErrors.errors).forEach((error: any) => {
					console.log(error);
					console.log(error[0]==="password");
					console.log(error[1][0]);
					if (error[0] === "email") this.userInfo.email.validationMessage = error[1][0];
					if (error[0] === "password") this.userInfo.password.validationMessage = error[1][0];
				}) : null;

				this.loginMessage = this.authStore.loginErrors.message;

				toastController.create({
					message: this.loginMessage,
					duration: 2000,
					color: "danger"
				}).then(toast => toast.present());
			}
		},
		validateEmail(email: string) {
			return email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		},
		validatePassword(password: string) {
			return true || password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);
		},
		validate(event: any, field: string) {
			if (field === "email") {
				if (!this.validateEmail(this.userInfo.email.value)) {
					this.userInfo.email.validationMessage = "Invalid email";
				} else {
					this.userInfo.email.validationMessage = "";
				}
			}
			if (field === "password") {
				if (!this.validatePassword(this.userInfo.password.value)) {
					this.userInfo.password.validationMessage = "Invalid password";
				} else {
					this.userInfo.password.validationMessage = "";
				}
			}
			if (field === "uri") {
				const value = event.target.value;
				(this.$refs.item as any).$el.classList.remove('ion-valid');
				(this.$refs.item as any).$el.classList.remove('ion-invalid');

				if (value === '') return;

				if (this.validateURI(value)) {
					(this.$refs.item as any).$el.classList.add('ion-valid')
					this.serviceUri.valid = true;
				} else {
					(this.$refs.item as any).$el.classList.add('ion-invalid');
				}
			}
		},
		cancel() {
			this.serviceUri.value = '';
			this.serviceUri.valid = false;
			this.submittedUri = false;
			(this.$refs.item as any).$el.classList.remove('ion-valid');
			(this.$refs.item as any).$el.classList.remove('ion-invalid');
			(this.$refs.item as any).$el.classList.remove('ion-touched');
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
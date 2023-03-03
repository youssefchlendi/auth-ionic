<template>
	<master-layout pageTitle="Login">
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



					<div id="loginContent" style="opacity:0;height:0;visibility:hidden">
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

						<!-- don't have an account -->
					</div>


				</ion-card-content>
				<ion-row class="ion-padding" id="registerRow" style="opacity:0;height:0;visibility:hidden">
					<ion-col>
						<span class="small-text">Don't have an account? </span>
						<a @click.prevent="goToRegister" class="small-text"> Register</a>
					</ion-col>
				</ion-row>
				<ion-button expand="full" @click="submitUri" id="submitUriButton" 
					:disabled="!serviceUri.valid">
					<ion-spinner v-if="serviceLoading" name="crescent"></ion-spinner>
					<span v-else>Submit</span>
				</ion-button>
				<ion-buttons class="ion-padding ion-justify-content-center" style="opacity:0;height:0;visibility:hidden"
					id="submitButtons">
					<ion-button expand="full" fill="outline" color="danger" style="opacity:0;height:0;visibility:hidden"
						shape="round" id="cancelButton" @click="cancel">
						Cancel
					</ion-button>
					<ion-button expand="block" fill="solid" :color="valid?'success':'medium'" style="opacity:0;height:0;visibility:hidden"
						shape="round" :disabled="!valid" id="loginButton" @click="login">
						<ion-spinner v-if="loginLoading" name="crescent"></ion-spinner>
						<span v-else>Login</span>
					</ion-button>
				</ion-buttons>
			</ion-card>
		</div>
	</master-layout>
</template>

<script lang="ts">
import { useServiceStore } from "@/store/service.store";
import {
	IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonNote, IonButtons, toastController, IonCol, IonRow, useIonRouter, createAnimation
} from "@ionic/vue";
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, ref } from 'vue';
import { useAuthStore } from "@/store/auth.store";
import { fadeInOutAnimation, forwardAnimation } from "@/utils/animations";
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
		IonButtons,
		IonRow,
		IonCol
	},
	setup() {
		const serviceStore = useServiceStore();
		const authStore = useAuthStore();
		const router = useIonRouter();

		let showLoginContentAnimation: any;
		let hideLoginContentAnimation: any;
		let showSubmitUriButtonAnimation: any;
		let hideSubmitUriButtonAnimation: any;
		let showSubmitButtonsAnimation: any;
		let hideSubmitButtonsAnimation: any;
		let showRegisterRowAnimation: any;
		let hideRegisterRowAnimation: any;
		let showLoginButtonAnimation: any;
		let hideLoginButtonAnimation: any;
		let showCancelButtonAnimation: any;
		let hideCancelButtonAnimation: any;



		// if(serviceStore.serviceUri)router.push('/login');
		return {
			serviceStore,
			authStore,
			router,
			showLoginContentAnimation,
			hideLoginContentAnimation,
			showSubmitUriButtonAnimation,
			hideSubmitUriButtonAnimation,
			showSubmitButtonsAnimation,
			hideSubmitButtonsAnimation,
			showRegisterRowAnimation,
			hideRegisterRowAnimation,
			showLoginButtonAnimation,
			hideLoginButtonAnimation,
			showCancelButtonAnimation,
			hideCancelButtonAnimation
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
			loginLoading: false,
			serviceLoading: false,
			loginMessage: "",
			submittedUri: false,
			// showLoginContentAnimation: new Animation(),
			// hideLoginContentAnimation: undefined
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
	mounted() {
		this.initAnimations();
	},
	watch: {
		submittedUri() {
			console.log(this.submittedUri);
			this.stopAnimations();
			if (this.submittedUri) {
				this.showLoginForm();
			} else {
				this.showServiceForm();
			}
		}
	},
	methods: {
		goToRegister() {
			this.router.push('/register', forwardAnimation);
		},
		stopAnimations() {
			this.showLoginContentAnimation.stop();
			this.hideLoginContentAnimation.stop();
			this.showSubmitUriButtonAnimation.stop();
			this.hideSubmitUriButtonAnimation.stop();
			this.showSubmitButtonsAnimation.stop();
			this.hideSubmitButtonsAnimation.stop();
			this.showRegisterRowAnimation.stop();
			this.hideRegisterRowAnimation.stop();
			this.showLoginButtonAnimation.stop();
			this.hideLoginButtonAnimation.stop();
			this.showCancelButtonAnimation.stop();
			this.hideCancelButtonAnimation.stop();
		},
		showLoginForm() {
			this.showLoginContentAnimation.play();
			this.hideSubmitUriButtonAnimation.play();
			this.showSubmitButtonsAnimation.play();
			this.showRegisterRowAnimation.play();
			this.showLoginButtonAnimation.play();
			this.showCancelButtonAnimation.play();

		},
		showServiceForm() {
			this.hideLoginContentAnimation.play();
			this.showSubmitUriButtonAnimation.play();
			this.hideSubmitButtonsAnimation.play();
			this.hideRegisterRowAnimation.play();
			this.hideLoginButtonAnimation.play();
			this.hideCancelButtonAnimation.play();
		},
		validateURI(URI: string) {
			if (URI === "") {
				return false;
			}
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
			this.serviceLoading = true;
			if (this.serviceUri.valid) {
				const res = this.serviceStore.setServiceUri(this.serviceUri.value);
				if (res) {
					this.submittedUri = true;
				}
				this.validate(null, "email");
				this.validate(null, "password");

			}
			this.serviceLoading = false;
		},
		async login() {
			this.validate(null, "email");
			this.validate(null, "password");
			if (!this.valid) return;
			this.loginLoading = true;
			const res = await this.authStore.login(this.userInfo.email.value, this.userInfo.password.value);
			if (res) {
				toastController.create({
					message: "Login Successful",
					duration: 2000,
					color: "success"
				}).then(toast => toast.present());
				this.cancel();
				this.loginLoading = false;
				this.router.push('/home', fadeInOutAnimation);
			} else {
				this.authStore.loginErrors.errors ? Object.entries(this.authStore.loginErrors.errors).forEach((error: any) => {
					console.log(error);
					console.log(error[0] === "password");
					console.log(error[1][0]);
					if (error[0] === "email") this.userInfo.email.validationMessage = error[1][0];
					if (error[0] === "password") this.userInfo.password.validationMessage = error[1][0];
				}) : null;

				this.loginMessage = this.authStore.loginErrors.message;

				toastController.create({
					message: this.loginMessage,
					duration: 2000,
					color: "danger"
				}).then(toast => {toast.present();this.loginLoading = false;});
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
			this.userInfo.email.value = "";
			this.userInfo.password.value = "";
			this.userInfo.email.touched = false;
			this.userInfo.password.touched = false;
			this.userInfo.email.validationMessage = "";
			this.userInfo.password.validationMessage = "";
			this.serviceUri.valid = this.validateURI(this.serviceUri.value) !== null;
			this.submittedUri = false;
			(this.$refs.item as any).$el.classList.remove('ion-valid');
			(this.$refs.item as any).$el.classList.remove('ion-invalid');
			(this.$refs.item as any).$el.classList.remove('ion-touched');
		},
		initAnimations() {
			this.showLoginContentAnimation = createAnimation()
				.addElement(document.querySelector('#loginContent') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('transform', 'translateY(100px)', 'translateY(0px)')
				.fromTo('height', '0px', '200px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideLoginContentAnimation = createAnimation()
				.addElement(document.querySelector('#loginContent') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('transform', 'translateY(0px)', 'translateY(100px)')
				.fromTo('height', '200px', '0px')

			this.showSubmitUriButtonAnimation = createAnimation()
				.addElement(document.querySelector('#submitUriButton') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('height', '0px', '36px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideSubmitUriButtonAnimation = createAnimation()
				.addElement(document.querySelector('#submitUriButton') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('height', '36px', '0px')

			this.showSubmitButtonsAnimation = createAnimation()
				.addElement(document.querySelector('#submitButtons') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('height', '0px', '80px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideSubmitButtonsAnimation = createAnimation()
				.addElement(document.querySelector('#submitButtons') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('height', '80px', '0px')

			this.showRegisterRowAnimation = createAnimation()
				.addElement(document.querySelector('#registerRow') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('height', '0px', '36px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideRegisterRowAnimation = createAnimation()
				.addElement(document.querySelector('#registerRow') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('height', '36px', '0px')

			this.showLoginButtonAnimation = createAnimation()
				.addElement(document.querySelector('#loginButton') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('height', '0px', '36px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideLoginButtonAnimation = createAnimation()
				.addElement(document.querySelector('#loginButton') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('height', '36px', '0px')
			this.showCancelButtonAnimation = createAnimation()
				.addElement(document.querySelector('#cancelButton') as Element)
				.duration(500)
				.fromTo('opacity', '0', '1')
				.fromTo('height', '0px', '36px')
				.fromTo('visibility', 'hidden', 'visible')

			this.hideCancelButtonAnimation = createAnimation()
				.addElement(document.querySelector('#cancelButton') as Element)
				.duration(500)
				.fromTo('opacity', '1', '0')
				.fromTo('height', '36px', '0px')





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
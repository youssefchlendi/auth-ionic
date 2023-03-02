<template>
	<master-layout pageTitle="Login Form">
		<ion-card>
			<ion-card-header>
				<ion-card-title>SignIn</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<ion-item :class="userInfo.email.validationMessage!=''?'ion-invalid':'ion-valid'">
					<ion-label position="floating">Email</ion-label>
					<ion-input v-model="userInfo.email.value" @ionInput="validate('email')"
						@ionBlur="markTouched('email')"></ion-input>
					<ion-note slot="helper">Enter a your email</ion-note>
					<ion-note slot="error">{{ userInfo.email.validationMessage }}</ion-note>

				</ion-item>
				<ion-item :class="userInfo.password.validationMessage!=''?'ion-invalid':'ion-valid'">
					<ion-label position="floating">Password</ion-label>
					<ion-input type="password" @ionInput="validate('password')" @ionBlur="markTouched('email')"
						v-model="userInfo.password.value"></ion-input>
					<ion-note slot="helper">Enter a your password</ion-note>
					<ion-note slot="error">{{ userInfo.password.validationMessage }}</ion-note>

				</ion-item>
				<ion-button expand="full" :disabled="!valid" @click="login">Login</ion-button>
			</ion-card-content>
		</ion-card>
	</master-layout>
</template>
<script lang="ts">
import { useAuthStore } from "@/store/auth.store";
import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonInput,
} from "@ionic/vue";
import { computed, reactive, ref } from "vue";
export default {
	components: {
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardContent,
		IonItem,
		IonLabel,
		IonInput,
	},
	setup() {
		const userInfo = ref({
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
		});

		const email = ref<HTMLElement|null>(null);
		const password = ref<HTMLElement|null>(null);

		const authStore = useAuthStore();

		const login = async () => {
			validate("email");
			validate("password");
			if (!valid) return;
			const res = await authStore.login(userInfo.value.email.value, userInfo.value.password.value);
			if (res) {
				console.log("login success");
			} else {
				authStore.loginErrors.errors?Object.entries(authStore.loginErrors.errors).forEach((error:any) => {
					console.log(error);
					if (error[0] === "email") userInfo.value.email.validationMessage = error[1][0];
					if (error[0] === "password") userInfo.value.password.validationMessage = error[1][0];

				}):null;
				console.log("login failed");
			}
		}

		const validateEmail = (email: string) => {
			return email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		}

		const validatePassword = (password: string) => {
			return true||password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);
		}



		const validate = (field: string) => {
			if (field === "email") {
				if (!validateEmail(userInfo.value.email.value)) {
					userInfo.value.email.validationMessage = "Invalid email";
				} else {
					userInfo.value.email.validationMessage = "";
				}
			}
			if (field === "password") {
				if (!validatePassword(userInfo.value.password.value)) {
					userInfo.value.password.validationMessage = "Invalid password";
				} else {
					userInfo.value.password.validationMessage = "";
				}
			}
		}

		const markTouched = (field: string) => {
			if (field === "email") {
				userInfo.value.email.touched = true;
			}
			if (field === "password") {
				userInfo.value.password.touched = true;
			}
		}

		const valid = reactive(() => {
			console.log(userInfo.value.email.validationMessage, userInfo.value.password.validationMessage);
			if (userInfo.value.email.validationMessage === "" && userInfo.value.password.validationMessage === "") {
				return true;
			} else {
				return false;
			}
		});

		return {
			userInfo,
			login,
			email,
			password,
			validate,
			markTouched,
			valid
		};
	}
};
</script>
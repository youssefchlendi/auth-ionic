<template>
	<master-layout pageTitle="Register">
		<div class="centered">
			<!-- centered -->
			<ion-card style="width:100%" elevation="2">

				<ion-card-header>
					<ion-card-title>Register</ion-card-title>
				</ion-card-header>

				<ion-card-content>

					<ion-item :class="userInfo.name.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
						<ion-label position="floating">Name</ion-label>
						<ion-input v-model="userInfo.name.value" @ionInput="validate('name')"
							@ionBlur="markTouched('name')"></ion-input>
						<ion-note slot="helper">Enter a your Name</ion-note>
						<ion-note slot="error">{{ userInfo.name.validationMessage }}</ion-note>
					</ion-item>

					<ion-item :class="userInfo.email.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
						<ion-label position="floating">Email</ion-label>
						<ion-input v-model="userInfo.email.value" @ionInput="validate('email')"
							@ionBlur="markTouched('email')"></ion-input>
						<ion-note slot="helper">Enter a your email</ion-note>
						<ion-note slot="error">{{ userInfo.email.validationMessage }}</ion-note>
					</ion-item>

					<ion-item :class="userInfo.password.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
						<ion-label position="floating">Password</ion-label>
						<ion-input type="password" @ionInput="validate('password')" @ionBlur="markTouched('email')"
							v-model="userInfo.password.value"></ion-input>
						<ion-note slot="helper">Enter a your password</ion-note>
						<ion-note slot="error">{{ userInfo.password.validationMessage }}</ion-note>
					</ion-item>

					<!--  role selection reader or editor -->
					<ion-item :class="userInfo.role.validationMessage != '' ? 'ion-invalid' : 'ion-valid'">
						<ion-label position="floating">Role</ion-label>
						<ion-select :selected-text="userInfo.role.value??null" interface="action-sheet" v-model="userInfo.role.value" placeholder="Select your role">
							<ion-select-option  value="reader">Reader</ion-select-option>
							<ion-select-option  value="editor">Editor</ion-select-option>
						</ion-select>
						<ion-note slot="helper">Select your role</ion-note>
						<ion-note slot="error">{{ userInfo.role.validationMessage }}</ion-note>
					</ion-item>

				</ion-card-content>

				<ion-row class="ion-padding">
					<ion-col>
						<span class="small-text">Already have an account?</span>
						<a @click.prevent="goToLogin" class="small-text"> Login</a>
					</ion-col>
				</ion-row>

				<ion-buttons class="ion-padding ion-justify-content-center">
					<ion-button expand="full" fill="outline" color="danger" shape="round"
						@click="cancel">cancel</ion-button>
					<ion-button expand="block" fill="solid" color="success" shape="round" :disabled="!valid"
						@click="register">Register</ion-button>
				</ion-buttons>
			</ion-card>
		</div>
	</master-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import commons from "@/shared/common-ionic-components";
import { useAuthStore } from '@/store/auth.store';
import { toastController, useIonRouter } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { backwardAnimation } from '@/utils/animations';
export default defineComponent({
	components: {
		...commons
	},
	setup() {
		const authStore = useAuthStore();
		const router = useIonRouter();
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
			},
			name: {
				value: "",
				validationMessage: "",
				touched: false,
			},
			role: {
				value: "reader",
				validationMessage: "",
				touched: false,
			}
		})
		const loginMessage = ref("")
		const submittedUri = ref(false)

		const goToLogin = function () {
			router.back(backwardAnimation);
		}

		const valid = computed(() => {
			if (userInfo.value.email.validationMessage === "" && userInfo.value.password.validationMessage === "" && userInfo.value.name.validationMessage === "" && userInfo.value.role.validationMessage === "") {
				return true;
			} else {
				return false;
			}
		})

		const validateURI = function (URI: string) {
			return URI.match(/^https?:\/\/(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/) || URI.match(/^http:\/\/localhost:[0-9]{4}$/);
		}

		const markTouched = function (field: string) {
			if (field === "email") {
				userInfo.value.email.touched = true;
			}
			if (field === "password") {
				userInfo.value.password.touched = true;
			}
			if (field === "name") {
				userInfo.value.name.touched = true;
			}
			if (field === "role") {
				userInfo.value.role.touched = true;
			}
		}



		const register = async () => {
			validate("email");
			validate("password");
			validate("name");
			validate("role");
			if (!valid.value) return;

			const res = await authStore.register(userInfo.value.name.value, userInfo.value.email.value, userInfo.value.password.value, userInfo.value.role.value);
			if (res) {
				toastController.create({
					message: "Registered Successfully, You'll be redirected soon",
					duration: 2000,
					color: "success"
				})
					.then(toast => toast.present());
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			} else {
				authStore.registerErrors.errors ? Object.entries(authStore.registerErrors.errors).forEach((error: any) => {
					if (error[0] === "email") userInfo.value.email.validationMessage = error[1][0];
					if (error[0] === "password") userInfo.value.password.validationMessage = error[1][0];
					if (error[0] === "name") userInfo.value.name.validationMessage = error[1][0];
					if (error[0] === "role") userInfo.value.role.validationMessage = error[1][0];
				}) : null;

				loginMessage.value = authStore.registerErrors.message;

				toastController.create({
					message: loginMessage.value,
					duration: 2000,
					color: "danger"
				}).then(toast => toast.present());
			}
		}

		const validateEmail = function (email: string) {
			if (email === "") return true;
			return email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		}

		const validatePassword = function (password: string) {
			if (password === "") return true;
			return true || password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);
		}

		const validate = function (field: string) {
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
			if (field === "name") {
				if (userInfo.value.name.value.length < 3) {
					userInfo.value.name.validationMessage = "Name must be at least 3 characters";
				} else {
					userInfo.value.name.validationMessage = "";
				}
			}
			if (field === "role") {
				if (userInfo.value.role.value === "") {
					userInfo.value.role.validationMessage = "Role is required";
				} else {
					userInfo.value.role.validationMessage = "";
				}
			}

		}

		const cancel = function () {
			if (userInfo.value.email.value !== "" || userInfo.value.password.value !== "" || userInfo.value.name.value !== "") {
				userInfo.value.email.value = "";
				userInfo.value.password.value = "";
				userInfo.value.name.value = "";
				userInfo.value.role.value = "reader";

				return;
			}
			goToLogin();
		}

		return {
			userInfo,
			loginMessage,
			submittedUri,
			valid,
			validateURI,
			markTouched,
			register,
			validate,
			cancel,
			goToLogin
		}
	}
})
</script>

<style scoped></style>
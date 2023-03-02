import { User } from '@/models/user.model';
import { AuthService } from '@/service/auth.service';
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useServiceStore } from './service.store';

export const useAuthStore = defineStore('auth',() => {
	
	const token = ref<string | null>(localStorage.getItem('token'));
	const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
	const loginErrors = ref<any>({message: "", errors: {}});
	const registerErrors = ref<any>( {message: "", errors: {}});
	
	const isLoggedIn = computed(() => {
		return token.value !== null && user.value !== null;
	})
	
	const setToken = (tkn: string|null) => {
		token.value = tkn;
		if(tkn === null) {
			localStorage.removeItem('token');
			return;
		}
		localStorage.setItem('token', tkn);
	}

	const setUser = (usr: User|null) => {
		user.value = usr;
		if(usr === null) {
			localStorage.removeItem('user');
			return;
		}
		localStorage.setItem('user', JSON.stringify(usr));
	}

	const login = async (email:string, password: string) => {
		const serviceUri = useServiceStore().serviceUri;
		if(!serviceUri) return;

		const res =	await AuthService.Login(serviceUri,email, password);
		if(!res){
			loginErrors.value.message = "Unable to connect to service"
			return false;
		}
		if(res.status=="success"){
			setToken(res.authorisation.token);
			setUser(res.user);
			return true;
		}else{
			loginErrors.value = res
			return false;
		}
			
	}

	const register = async (name: string, email: string, password: string) => {
		const serviceUri = useServiceStore().serviceUri;
		if(!serviceUri) return;

		const res = await AuthService.Register(serviceUri, name, email, password);
		if(!res){
			registerErrors.value.message = "Unable to connect to service"
			return false;
		}
		if(res.status=="success"){
			setToken(res.authorisation.token);
			setUser(res.user);
			return true;
		}else{
			registerErrors.value = res
			return false;
		}
	}

	const logout = () => {
		try {
			setToken(null);
			setUser(null);
			return true;
		} catch (error) {
			return false;
		}
	}

	return {
		token,
		user,
		login,
		register,
		logout,
		loginErrors,
		registerErrors,
		isLoggedIn
	}







})

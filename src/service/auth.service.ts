import axios from 'axios';
import { useServiceStore } from '../store/service.store';


export class AuthService{
	static async Register(serviceUri: string, name: string, email: string, password: string, role: string) {
		try {
			const response = await axios.post(`${serviceUri}/api/register`, {
				name,
				email,
				password,
				role
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return response.data;
		} catch (error:any) {
			return error?.response?.data??null;
		}
	}

	static async Login(serviceUri: string, email: string, password: string) {
		try {
			const response = await axios.post(`${serviceUri}/api/login`, {
				email,
				password
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return response.data;
		} catch (error:any) {
			return error?.response?.data??null;
		}
	}
} 

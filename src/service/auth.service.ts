import axios from 'axios';
import { useServiceStore } from '../store/service.store';


export class AuthService{
	static async Register(name: string, email: string, password: string) {
		return;
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
			return error.response.data;
		}
	}
} 

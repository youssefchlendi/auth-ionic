import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useServiceStore = defineStore('service',() => {
	const serviceUri = ref<string | null>(localStorage.getItem('serviceUri'));

	const setServiceUri = (uri: string|null) => {
		try {
			serviceUri.value = uri;
			if(uri === null) {
				localStorage.removeItem('serviceUri');
				return;
			}
			localStorage.setItem('serviceUri', uri);
			return true;
		} catch (e) {
			return false;
		}
	}

	return {
		serviceUri,
		setServiceUri,
	}
})

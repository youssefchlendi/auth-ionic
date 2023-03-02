import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useServiceStore = defineStore('service',() => {
	const serviceUri = ref<string | null>(localStorage.getItem('serviceUri'));

	const setServiceUri = (uri: string|null) => {
		serviceUri.value = uri;
		if(uri === null) {
			localStorage.removeItem('serviceUri');
			return;
		}
		localStorage.setItem('serviceUri', uri);
	}

	return {
		serviceUri,
		setServiceUri,
	}
})

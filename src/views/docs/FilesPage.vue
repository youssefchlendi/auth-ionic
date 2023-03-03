<template>
	<master-layout pageTitle="Manage files">

		<ion-card>
			<ion-card-header>
				<ion-card-title>Upload File</ion-card-title>
			</ion-card-header>
			<!-- input -->
			<ion-item>
				<input type="file" accept="application/pdf" @change="convert64" ref="file" required />
			</ion-item>
			<!-- button -->
			<ion-button @click="saveFile()" expand="full">Upload</ion-button>
		</ion-card>
		<ion-list>
			<ion-item-sliding v-for="file in store.files" :key="file.id">
				<ion-item >
					{{ file.name }}
				</ion-item>

					<ion-item-options>
						<ion-item-option v-if="authStore.canSignDocuments" @click="goToFile(file.id)" color="primary" ><ion-icon :icon="pencil"/></ion-item-option>
						<ion-item-option v-else @click="goToFile(file.id)" color="secondary"><ion-icon :icon="eye"/></ion-item-option>
						<ion-item-option @click="deleteFile(file)" color="danger"><ion-icon :icon="trash"/></ion-item-option>
					</ion-item-options>
			</ion-item-sliding>
		</ion-list>

	</master-layout>
</template>

<script setup lang="ts">
import { IonIcon,IonItemOptions, IonItemOption, IonItemSliding, toastController, alertController, IonButtons, IonList, modalController, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonCardHeader, IonCardTitle, IonButton, useIonRouter } from '@ionic/vue';
import { ref } from 'vue';
import { pencil, eye, trash } from 'ionicons/icons';
import FileForm from '@/components/files/fileForm.vue';
import { useFilesStore } from '@/store/files.store';
import { File } from "@/models/Files.model";
import { goLeftAnimation, goRightAnimation } from '@/utils/animations';
import { useAuthStore } from '@/store/auth.store';
const pdfFile = ref<string | null>(null);
const filename = ref<string | null>(null);
const store = useFilesStore();
const router = useIonRouter();
const authStore = useAuthStore();
const convert64 = (e: any) => {
	const file = e?.target?.files[0];
	filename.value = file.name;
	const reader = new FileReader();
	reader.onloadend = () => {
		pdfFile.value = reader.result as string | null;
	};
	reader.readAsDataURL(file);
}

const saveFile = async () => {
	if (pdfFile.value == null) {
		const alert = await alertController.create({
			header: 'Error',
			message: 'Please select a file',
			buttons: ['OK'],
		});

		await alert.present();

		return;
	}
	displayModal(pdfFile.value);
}

const displayModal = async (file: string | null) => {
	const modal = await modalController.create({
		component: FileForm,
	});
	modal.present();

	const { data, role } = await modal.onWillDismiss();

	if (role === 'confirm' && file) {
		store.addFile(file, data ? data : filename.value);
		pdfFile.value = null;
	}
};


const deleteFile = async (file: File) => {
	const alert = await alertController.create({
		header: 'Delete File',
		message: 'Are you sure you want to delete this file?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: async () => {
					const toast = await toastController.create({
						message: 'Cancelled',
						duration: 1500,
						position: "bottom"
					});
					console.log(file.file);
					await toast.present();
				},
			},
			{
				text: 'Delete',
				handler: async () => {

					store.removeFile(file.id);
					const toast = await toastController.create({
						message: 'Deleted file!',
						duration: 1500,
						position: "bottom"
					});

					await toast.present();
				},
			},
		],
	});
	await alert.present();
}


const goToFile = (id: number) => {
	router.push(`/signandpreviewfile/${id}`,goLeftAnimation);
}

</script>

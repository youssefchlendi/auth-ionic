<template>
  <ion-app>
	<main-menu />
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script setup lang="ts">
import MainMenu from './components/MainMenu.vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

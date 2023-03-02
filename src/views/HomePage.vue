<template>
<master-layout pageTitle="Home">
  <div id="container">
	<strong>Welcome to the Ionic Vue Starter</strong>
	<p>Use this starter to build amazing apps using Ionic and Vue.</p>
	<p>For more information, check out the <a href="https://ionicframework.com/docs/vue/overview" target="_blank" rel="noopener noreferrer">Ionic Vue documentation</a>.</p>
  </div>
</master-layout>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

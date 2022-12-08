<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Erreur 404</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="error">
        <p class="ion-text-center">La page que vous recherchez n'existe pas.</p>
        <img src="../assets/images/lost.svg" />
        <ion-button @click="router.push('/')">Retour à l'accueil</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>

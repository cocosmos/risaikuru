<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative background">
      <h2 class="ion-text-center">Félicitations ton annonce est publiée !</h2>
      <template v-if="newDemand.published">
        <MyDemandOrPublished :demand="savedDemand" />
      </template>
      <fixed-bottom-container>
        <ion-button expand="block" router-link="/" router-direction="back">
          Retour à l'accueil
        </ion-button>
        <ion-button-secondary expand="block" router-link="/profile/my-demands">
          Gérer mes annonces
        </ion-button-secondary>
      </fixed-bottom-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonPage,
} from "@ionic/vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import IonButtonSecondary from "@/components/Buttons/IonButtonSecondary.vue";
import { useNewDemand } from "@/composables/newDemand";
import { computed, onMounted } from "vue";
import MyDemandOrPublished from "@/components/MyDemandOrPublished.vue";

const newDemand = useNewDemand();
const savedDemand = computed(() => {
  return newDemand.savedDemand.value;
});

onMounted(() => {
  newDemand.saveDemand();
});
</script>

<style lang="scss" scoped>
.background {
  --background: none;
  background: var(--ion-background-color)
    url("../../assets/summary-background.png") center 105% no-repeat;
  background-size: 125%;
}
</style>

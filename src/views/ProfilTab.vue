<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import AvatarName from "@/components/AvatarName.vue";
import CardPot from "@/components/Card/CardPot.vue";
import { cardOutline, fileTrayFullOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

const user = {
  fname: "Jean",
  lname: "de Florette",
  email: "",
  profilePicture: "https://ionicframework.com/docs/img/demos/avatar.svg",
};
const router = useRouter();
const useLocation = (link: string) => {
  router.push(link);
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="profil">
        <avatar-name
          :profilePicture="user.profilePicture"
          :fname="user.fname"
          :lname="user.lname"
          size="large"
        ></avatar-name>

        <card-pot :balance="10"></card-pot>
        <ion-button @click="useLocation('/profil/paiement')"
          >Demande de paiement</ion-button
        >
        <div class="profil__line"></div>

        <div class="profil__menu">
          <ion-item button @click="useLocation('/profil/mes-annonces')">
            <ion-icon :icon="fileTrayFullOutline"></ion-icon>
            <ion-label>Mes annonces</ion-label>
          </ion-item>
          <ion-item
            button
            lines="none"
            @click="useLocation('/profil/paiement')"
          >
            <ion-icon :icon="cardOutline"></ion-icon>
            <ion-label>Informations de paiement</ion-label>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.profil {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;

  &__line {
    background-color: var(--ion-color-primary-contrast);
    height: 1px;
    width: 100%;
  }
  &__menu {
    $radius: 1rem;
    $padding: 0.5rem;
    background-color: var(--ion-color-primary-contrast);
    border-radius: $radius;

    ion-item {
      padding: $padding;

      &::part(native) {
        background-color: var(--ion-color-primary-contrast);
      }
      ion-icon {
        margin-right: $padding;
      }

      &:first-child {
        padding-bottom: 0;
      }

      &:last-child {
        padding-top: 0;
      }
    }
  }
}
</style>

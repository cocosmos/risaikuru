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
import { store } from "@/data/store";

const currentUser = store.currentUser;

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
      <div class="profile">
        <avatar-name
          :profilePicture="currentUser.profilePicture"
          :fname="currentUser.fname"
          :lname="currentUser.lname"
          size="large"
        ></avatar-name>

        <card-pot :balance="currentUser.totalMoney"></card-pot>
        <ion-button
          @click="useLocation('/profile/payment')"
          :disabled="currentUser.totalMoney <= 20"
        >
          Demande de paiement</ion-button
        >
        <div class="profile__line"></div>

        <div class="profile__menu">
          <ion-item button @click="useLocation('/profile/my-demands')">
            <ion-icon :icon="fileTrayFullOutline"></ion-icon>
            <ion-label>Mes annonces</ion-label>
          </ion-item>
          <ion-item
            button
            lines="none"
            @click="useLocation('/profile/payment')"
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
.profile {
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

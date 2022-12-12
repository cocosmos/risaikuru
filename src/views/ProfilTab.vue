<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AvatarName from "@/components/Profile/AvatarName.vue";
import CardPot from "@/components/Card/CardPot.vue";
import {
  cardOutline,
  fileTrayFullOutline,
  settingsOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const router = useRouter();
const { user, updateUser, logout } = useAuthStore();

const useLocation = (link: string) => {
  router.push(link);
};

onMounted(() => {
  updateUser();
});
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
          :user="user"
          :showLname="true"
          :add="true"
          size="large"
        ></avatar-name>

        <card-pot :balance="user.balance"></card-pot>
        <ion-button
          @click="useLocation('/profile/payment')"
          :disabled="user.balance <= 20"
        >
          Demande de paiement
        </ion-button>
        <div class="profile__line"></div>

        <div class="profile__menu">
          <ion-item button @click="useLocation('/profile/my-demands')">
            <ion-icon :icon="fileTrayFullOutline"></ion-icon>
            <ion-label>Mes annonces</ion-label>
          </ion-item>
          <ion-item button @click="useLocation('/profile/payment')">
            <ion-icon :icon="cardOutline"></ion-icon>
            <ion-label>Informations de paiement</ion-label>
          </ion-item>
          <ion-item
            button
            lines="none"
            @click="useLocation('/profile/settings')"
          >
            <ion-icon :icon="settingsOutline"></ion-icon>
            <ion-label>Paramètre du profil</ion-label>
          </ion-item>
        </div>
        <ion-button @click="logout()" fill="outline">Déconnexion </ion-button>
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

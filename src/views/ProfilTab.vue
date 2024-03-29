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
import { cardOutline, fileTrayFullOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const router = useRouter();
const authStore = useAuthStore();

const useLocation = (link: string) => {
  router.push(link);
};

onMounted(() => {
  authStore.updateUser();
});

const disconnect = () => {
  authStore.logout();
  router.push("/login");
};
const handleRefresh = async (event: CustomEvent) => {
  await authStore.updateUser();
  event.detail.complete();
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
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="profile">
        <avatar-name
          :user="authStore.user"
          :showLname="true"
          :add="true"
          size="large"
        ></avatar-name>

        <card-pot :balance="authStore.user.balance ?? 0"></card-pot>
        <ion-button
          @click="useLocation('/profile/payment/ask')"
          :disabled="authStore.user.balance < 20"
        >
          Demande de paiement
        </ion-button>
        <div class="profile__line"></div>

        <div class="profile__menu">
          <ion-item button @click="useLocation('/profile/my-demands')">
            <ion-icon :icon="fileTrayFullOutline"></ion-icon>
            <ion-label>Mes annonces</ion-label>
          </ion-item>
          <ion-item
            button
            @click="useLocation('/profile/payment/infos')"
            lines="none"
          >
            <ion-icon :icon="cardOutline"></ion-icon>
            <ion-label>Informations de paiement</ion-label>
          </ion-item>
        </div>
        <ion-button @click="disconnect" fill="outline">Déconnexion</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__line {
    background-color: var(--ion-color-primary-contrast);
    height: 1px;
    width: 100%;
  }

  &__menu {
    $radius: 1rem;
    $padding: 0.5rem;
    background-color: var(--ion-color-light);
    border-radius: $radius;
    ion-item {
      --inner-padding-bottom: 0.5em;
      --inner-padding-top: 0.5em;
      border-radius: $radius;
      &::part(native) {
        background-color: var(--ion-color-light);
      }

      ion-icon {
        margin-right: $padding;
      }
    }
  }
}
</style>

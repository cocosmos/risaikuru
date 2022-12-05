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
import AvatarName from "@/components/AvatarName.vue";
import CardPot from "@/components/Card/CardPot.vue";
import {
  cardOutline,
  fileTrayFullOutline,
  settingsOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { store } from "@/data/store";
import { watch } from "vue";
import { supabase } from "@/data/supabase";

const router = useRouter();
const useLocation = (link: string) => {
  router.push(link);
};
async function getProfile(id: string) {
  try {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`lname, fname, avatar, balance, adress, iban`)
      .eq("id", id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      store.user = {
        id: id,
        lname: data.lname,
        fname: data.fname,
        email: "",
        profilePicture: data.avatar,
        balance: data.balance,
        adress: data.adress,
        iban: data.iban,
      };
    }
  } catch (error: any) {
    console.error("Error loading profile: ", error.message);
  }
}
watch(
  () => store.session,
  () => {
    if (store.session?.user) {
      const id = store.session.user.id;
      getProfile(id);
    } else {
      router.push("/login");
    }
  },
  { immediate: true }
);
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
          :user="store.user"
          :profilePicture="store.user.profilePicture"
          :fname="store.user.fname"
          :lname="store.user.lname"
          :add="true"
          size="large"
        ></avatar-name>

        <card-pot :balance="store.user.balance"></card-pot>
        <ion-button
          @click="useLocation('/profile/payment')"
          :disabled="store.user.balance <= 20"
        >
          Demande de paiement</ion-button
        >
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

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";
import { ref, watch } from "vue";
import { supabase } from "@/supabase";

import router from "@/router";
import PasswordShowHide from "@/components/Input/PasswordShowHide.vue";

const password = ref("");
const passwordConfirm = ref("");
const route = (id: string) => {
  router.push(id);
};

watch(
  () => password.value,
  () => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        const { error } = await supabase.auth.updateUser({
          password: password.value,
        });
        if (error) throw error;
        else route("login");
      }
    });
  }
);
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouveau mot de passe</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <img src="../../assets/images/login.svg" alt="coffre fort" />
      </div>

      <form>
        <password-show-hide
          v-model="password"
          name="password"
          label="Mot de passe"
          required
          error="Mot de passe trop faible"
          :is-error="password.length < 8 && password.length !== 0"
        />
        <password-show-hide
          v-model="passwordConfirm"
          name="passwordConfirm"
          label="Confirmer le mot de passe"
          required
          error="Mot de passe ne sont pas identiques"
          :is-error="password !== passwordConfirm"
        />

        <ion-button type="submit" expand="block">
          Nouveau mot de passe
        </ion-button>

        <ion-button
          color="tertiary"
          fill="clear"
          expand="block"
          @click="route('login')"
          class="ion-margin-top"
        >
          Retour à la connexion
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

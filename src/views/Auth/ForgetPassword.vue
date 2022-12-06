<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  loadingController,
} from "@ionic/vue";
import { ref } from "vue";
import { supabase } from "../../data/supabase";
import TextField from "@/components/Input/TextField.vue";
import router from "@/router";

const email = ref("");
const error = ref(false);
const route = (id: string) => {
  router.push(id);
};

const handleLogin = async () => {
  const loader = await loadingController.create({});
  try {
    await loader.present();
    const { error } = await supabase.auth.resetPasswordForEmail(email.value);

    if (error) throw error;
    else route("login");
  } catch (e: any) {
    error.value = true;
    console.log(e);
  } finally {
    await loader.dismiss();
  }
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mot de passe oublié ?</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <img src="../../assets/images/login.svg" alt="coffre fort" />
      </div>

      <form @submit.prevent="handleLogin">
        <text-field
          v-model="email"
          name="email"
          label="Email"
          type="email"
          required
          :is-error="error"
          error="Il n'y a pas de compte associé à cet email"
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

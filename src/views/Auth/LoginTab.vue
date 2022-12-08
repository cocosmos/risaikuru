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
import {ref} from "vue";
import {supabase} from "../../data/supabase";
import PasswordShowHide from "@/components/Input/PasswordShowHide.vue";
import TextField from "@/components/Input/TextField.vue";
import router from "@/router";
import {useAuthStore} from "@/store/auth";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const route = (id: string) => {
  router.push(id);
};

const handleLogin = async () => {
  const loader = await loadingController.create({});
  try {
    await loader.present();
    const {error, data} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    authStore.session = data.session;

    if (error) throw error;
    else router.push("/profile");
  } catch (error: any) {
    console.log(error);
  } finally {
    await loader.dismiss();
  }
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <img src="../../assets/images/login.svg" alt="coffre fort"/>
      </div>

      <form @submit.prevent="handleLogin">
        <text-field
            v-model="email"
            name="email"
            label="Email"
            required
            :is-error="false"
        >
        </text-field>
        <password-show-hide
            v-model="password"
            :error="'Mot de passe incorrect'"
            :isError="false"
            label="Mot de passe"
        ></password-show-hide>
        <ion-button
            color="tertiary"
            fill="clear"
            expand="block"
            @click="route('forget-password')"
            class="ion-margin-top"
        >
          Mot de passe oublié ?
        </ion-button>

        <ion-button type="submit" expand="block"> Connexion</ion-button>

        <ion-button
            color="tertiary"
            fill="clear"
            expand="block"
            @click="route('signup')"
            class="ion-margin-top"
        >
          Pas encore de compte ? Inscrivez-vous
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

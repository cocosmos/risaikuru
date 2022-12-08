<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  loadingController,
} from "@ionic/vue";
import {ref} from "vue";
import {supabase} from "../../data/supabase";
import PasswordShowHide from "@/components/Input/PasswordShowHide.vue";
import TextField from "@/components/Input/TextField.vue";
import {regexCheckEmail} from "@/utils/helper";
import router from "@/router";
import {store} from "@/data/store";
import {useAuthStore} from "@/store/auth";

const fname = ref("");
const lname = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const authStore = useAuthStore();

const route = (id: string) => {
  router.push(id);
};

const handleSignup = async () => {
  const loader = await loadingController.create({});
  if (password.value !== passwordConfirm.value) {
    throw new Error("Passwords do not match");
  } else if (password.value.length < 8) {
    throw new Error("Password must be at least 8 characters");
  } else if (
      fname.value.length < 2 &&
      lname.value.length < 2 &&
      regexCheckEmail(email.value)
  ) {
    throw new Error("Please fill in all fields");
  } else {
    try {
      await loader.present();
      const {error, data} = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            fname: fname.value,
            lname: lname.value,
            updatedAt: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;
      else {
        authStore.session = data.session;
        console.log(data);
        route("/profile");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      await loader.dismiss();
    }
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="ion-text-center">
        <img src="../../assets/images/signup.svg" alt="coffre fort"/>
      </div>
      <form @submit.prevent="handleSignup">
        <div class="group">
          <TextField
              label="Prénom"
              name="fname"
              v-model="fname"
              required
              :is-error="false"
          />
          <TextField
              label="Nom"
              name="lname"
              v-model="lname"
              required
              :is-error="false"
          />
        </div>
        <TextField
            label="Email"
            name="email"
            v-model="email"
            required
            :is-error="false"
        />
        <password-show-hide
            v-model="password"
            label="Mot de passe"
            error="Mot de passe trop faible"
            :is-error="password.length < 8 && password.length !== 0"
        ></password-show-hide>
        <password-show-hide
            v-model="passwordConfirm"
            label="Confirmer le mot de passe"
            error="Mot de passe ne sont pas identiques"
            :is-error="password !== passwordConfirm"
        ></password-show-hide>

        <ion-button type="submit" expand="block"> Inscription</ion-button>

        <ion-button
            color="tertiary"
            fill="clear"
            expand="block"
            @click="route('/login')"
            class="ion-margin-top"
        >
          Vous avez déjà un compte? Connectez-vous
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
}
</style>

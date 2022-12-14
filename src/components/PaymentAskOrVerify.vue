<script lang="ts" setup>
import { IonButton } from "@ionic/vue";
import { computed, ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { regexCheckIban } from "@/utils/helper";
import { useAuthStore } from "@/store/auth";
import { Mask } from "maska";
import { supabase } from "../supabase/config";

const props = defineProps<{
  text: {
    title: string;
    text: string;
    link: string;
    button: string;
  };
  isAsking: boolean;
}>();

const authStore = useAuthStore();

const isIbanValid = ref<null | boolean>(
  authStore.user.iban ? regexCheckIban(authStore.user.iban) : null
);

const ibanValue = ref(authStore.user.iban);
const adress = ref(authStore.user.adress);
const router = useRouter();
const isFormValid = computed(() => {
  return isIbanValid.value && adress.value;
});

const validateIban = (ev: any) => {
  const mask = new Mask({
    mask: "@@## #### #### #### #### #",
  });
  ibanValue.value = mask.masked(ev.target.value.toUpperCase());

  isIbanValid.value = regexCheckIban(ibanValue.value);
};

const handleForm = () => {
  if (isFormValid.value) {
    supabase
      .from("profiles")
      .update({
        iban: ibanValue.value,
        adress: adress.value,
        balance: props.isAsking ? 0 : authStore.user.balance,
      })
      .eq("id", authStore.user.id)
      .then(() => {
        authStore.user.iban = ibanValue.value;
        authStore.user.adress = adress.value;
        authStore.user.balance = props.isAsking ? 0 : authStore.user.balance;
        router.push(props.text.link);
      });
  }
};
</script>

<template>
  <h2 class="ion-text-center">{{ text.title }}</h2>
  <p class="ion-text-center">
    {{ text.text }}
  </p>
  <div class="ion-text-center">
    <img src="../assets/images/savings.svg" alt="cochon tirelire" />
  </div>
  <form @submit.prevent="handleForm">
    <ion-item
      fill="outline"
      mode="md"
      class="ion-margin-top"
      :class="{
        'ion-invalid': isIbanValid === false,
      }"
    >
      <ion-label position="floating">IBAN</ion-label>

      <ion-input
        type="text"
        placeholder="CH00 0000 0000 0000 0000 0"
        @ionInput="validateIban"
        v-model="ibanValue"
        :value="authStore.user.iban"
      ></ion-input>
      <ion-note slot="error">IBAN Invalide</ion-note>
    </ion-item>

    <ion-item fill="outline" mode="md" class="ion-margin-top">
      <ion-label position="floating">Adresse</ion-label>
      <ion-textarea
        placeholder="Chemin du petit Chevreuil 19, 1000 Lausanne"
        v-model="adress"
        :value="authStore.user.adress"
      ></ion-textarea>
    </ion-item>

    <ion-button
      expand="block"
      class="ion-margin-top"
      type="submit"
      :disabled="!isFormValid"
    >
      {{ text.button }}
    </ion-button>
  </form>
</template>

<style scoped lang="scss"></style>

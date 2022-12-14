<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import MyDemandOrPublished from "@/components/MyDemandOrPublished.vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { supabase } from "../../supabase/config";
import { getDemand } from "../../supabase/demand";
import { Demand } from "@/types/Demand";
import LoaderFullPage from "@/components/LoaderFullPage.vue";
import { apresentToast } from "@/utils/helper";

const route = useRoute();
const router = useRouter();
const demand = ref<Demand>();

onMounted(() => {
  getDemand(route.params.id as string).then((res) => {
    demand.value = res;
  });
});

const deleteDemand = () => {
  if (!demand.value) return;

  supabase
    .from("demands")
    .delete()
    .eq("id", demand.value.id)
    .then((res) => {
      if (res.error) {
        console.log(res.error);
        apresentToast(
          "Annonce non supprimée, vous avez des messages.",
          "danger",
          2000,
          "top"
        );
      } else {
        apresentToast("Annonce supprimée", "success", 1500, "top");
      }
    });

  router.push("/profile/my-demands");
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile/my-demands"></ion-back-button>
        </ion-buttons>
        <ion-title>Votre annonce</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative background">
      <LoaderFullPage v-if="!demand" :loading="!demand" />
      <MyDemandOrPublished :demand="demand" v-if="demand" />
      <fixed-bottom-container>
        <ion-button
          expand="block"
          router-link="/profile/my-demands"
          router-direction="back"
        >
          Retour à mes annonces
        </ion-button>
        <ion-button
          expand="block"
          color="danger"
          @click="deleteDemand"
          v-if="demand"
        >
          Supprimer cette annonce
        </ion-button>
      </fixed-bottom-container>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
.background {
  --background: none;

  background: var(--ion-background-color)
    url("../../assets/summary-background.png") center 105% no-repeat;
  background-size: 125%;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

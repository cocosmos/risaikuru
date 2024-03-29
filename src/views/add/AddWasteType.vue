<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative">
      <h2 class="ion-text-center">
        Selectionne les types de déchêts dont tu veux te débarrasser
      </h2>
      <div class="waste-types">
        <WasteSwitch
          v-for="wasteType in wasteTypes"
          :waste="wasteType.waste"
          v-model="wasteType.selected"
          :key="wasteType.waste"
        ></WasteSwitch>
      </div>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()" :disabled="!valid">
          Choisir la quantité
          <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
        </ion-button>
      </fixed-bottom-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonPage,
  onIonViewWillEnter,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import WasteSwitch from "@/components/Add/WasteSwitch.vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { icons } from "../../assets/icons/index";
import { Waste } from "@/types/Demand";
import { computed, onMounted, ref } from "vue";
import { useNewDemand } from "@/composables/newDemand";

const router = useRouter();
const newDemand = useNewDemand();

const wasteTypes = ref<{ waste: Waste; selected: boolean }[]>([]);

onMounted(() => {
  wasteTypes.value = [];
  icons.forEach((icon) => {
    wasteTypes.value.push({ waste: icon.name, selected: false });
  });
  newDemand.published.value = false;
});

onIonViewWillEnter(() => {
  if (newDemand.wasteTypes.value.length <= 0) {
    wasteTypes.value.map((wasteType) => (wasteType.selected = false));
  }
});

const selectedWaste = computed<Waste[]>(() => {
  let wastes: Waste[] = [];
  wasteTypes.value.forEach((wasteType) => {
    if (wasteType.selected) wastes.push(wasteType.waste);
  });
  return wastes;
});

const valid = computed(() => {
  return selectedWaste.value.length > 0;
});

const validate = () => {
  newDemand.wasteTypes.value = selectedWaste.value;
  if (valid.value) router.push("/add/quantity");
};
</script>

<style lang="scss">
.waste-types {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>

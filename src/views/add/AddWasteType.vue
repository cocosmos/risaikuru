<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative">
      <h2 class="ion-text-center">Selectionne les types de déchêts dont tu veux te débarrasser</h2>
      <div class="waste-types">
        <WasteSwitch v-for="wasteType in wasteTypes" :waste="wasteType.waste" v-model="wasteType.selected"
                     :key="wasteType.waste"></WasteSwitch>
      </div>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()">
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
  IonPage
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";
import WasteSwitch from '@/components/WasteSwitch.vue';
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import {icons} from "../../assets/icons/index";
import {Waste} from "@/types/Demand";
import {computed, ComputedRef, onBeforeMount, reactive, ref} from "vue";

const router = useRouter();

const wasteTypes = ref<{ waste: Waste, selected: boolean }[]>([]);

onBeforeMount(() => {
  icons.forEach((icon) => {
    wasteTypes.value.push({waste: icon.name, selected: false});
  });
});

const validate = () => {
  router.push('/add/quantity');
}

const selectedWaste: ComputedRef<Waste[]> = computed(() => {
  let wastes: Waste[] = [];
  wasteTypes.value.forEach((wasteType) => {
    if (wasteType.selected) wastes.push(wasteType.waste);
  });
  return wastes;
})
</script>

<style lang="scss">
.waste-types {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
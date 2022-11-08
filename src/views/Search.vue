<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-searchbar
              show-cancel-button="never"
              placeholder="Adresse"
              class="custom"
            ></ion-searchbar
          ></ion-col>
          <ion-col size="auto">
            <ion-button shape="circle">
              <ion-icon :icon="locate"></ion-icon> </ion-button
          ></ion-col>
        </ion-row>
      </ion-grid>
      <ion-text>
        <b>Rayon</b>
      </ion-text>
      <ion-range
        :min="0"
        :max="20"
        :value="10"
        :pin="true"
        :pin-formatter="pinFormatter"
      ></ion-range>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange,
} from "@ionic/vue";
import { search, locate } from "ionicons/icons";

export default defineComponent({
  name: "SearchTabs",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRange,
  },
  setup() {
    return {
      search,
      locate,
      pinFormatter: (value: number) => `${value}km`,
    };
  },
});
</script>

<style scoped>
ion-content {
  margin: 5px;
}
.searchbar {
  border: 2px solid var(--ion-color-primary);
  border-radius: 8px;
}
.item-native {
  padding-inline-start: var(--ion-safe-area-left, 0px);
}
ion-icon {
  font-size: x-large;
}
ion-button[shape="circle"] {
  --border-radius: 50%;
  width: 56px;
  height: 56px;
}
ion-searchbar.custom {
  --background: transparent;
  border: 2px solid var(--ion-color-primary);
  border-radius: 10px;
  --placeholder-color: var(--ion-color-primary);
}
ion-range {
  --bar-background: var(--ion-color-light);
  --bar-background-active: var(--ion-color-primary);
  --bar-height: 20px;
  --bar-border-radius: 8px;
  --knob-background: var(--ion-color-primary-tint);
  --knob-size: 40px;
  padding-top: 5px;
}
ion-range::part(pin) {
  color: var(--ion-color-text);
  transform: scale(1.1);
  top: 60px;
}

ion-range::part(pin)::before {
  content: none;
}
</style>

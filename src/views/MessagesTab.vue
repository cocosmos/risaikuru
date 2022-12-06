<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Messages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-segment value="default">
        <ion-segment-button value="default">
          <ion-label>Mes demandes</ion-label>
        </ion-segment-button>
        <ion-segment-button value="segment">
          <ion-label>Mes proposition</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped></style>

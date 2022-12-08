<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ConversationCard from "@/components/Messages/ConversationCard.vue";
import { store } from "@/data/store";
const conversations = store.conversations;
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Messages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="conversation__list">
        <ion-text v-if="conversations.length === 0" class="ion-text-center"
          >Pas de mesages récents.</ion-text
        >
        <conversation-card
          v-for="conversation in conversations"
          v-bind:key="conversation.id"
          :conversation="conversation"
        ></conversation-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.conversation__list {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}
</style>

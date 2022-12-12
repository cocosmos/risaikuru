<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
} from "@ionic/vue";
import ConversationCard from "@/components/Card/CardConversation.vue";
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/store/auth";
const { dataOfUser, subscribeConversation, updateConversations } =
  useAuthStore();

const toRerender = ref(0);

watch(
  dataOfUser.conversations,
  () => {
    toRerender.value++;
  },
  { deep: true }
);

onMounted(() => {
  subscribeConversation();
  updateConversations();
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Messages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="conversation__list" :key="toRerender">
        <ion-text
          v-if="dataOfUser.conversations.length === 0"
          class="ion-text-center"
          >Pas de mesages récents.</ion-text
        >
        <conversation-card
          v-for="conversation in dataOfUser.conversations"
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

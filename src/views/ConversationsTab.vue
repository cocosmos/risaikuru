<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  onIonViewWillEnter,
} from "@ionic/vue";
import ConversationCard from "@/components/Card/CardConversation.vue";
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/store/auth";
import { Conversation } from "@/types/Message";
import LoaderFullPage from "@/components/LoaderFullPage.vue";
import { useRouter } from "vue-router";
import { apresentToast } from "@/utils/helper";

const authStore = useAuthStore();

const toRerender = ref(0);
const loading = ref(true);
const conversations = ref<Conversation[]>([]);
const router = useRouter();

watch(
  authStore.dataOfUser.conversations,
  () => {
    toRerender.value++;
  },
  { deep: true }
);

onMounted(() => {
  if (router.currentRoute.value.query.success === "true") {
    apresentToast("Paiement effectué !", "success", 1500, "top");
  }
});

onIonViewWillEnter(() => {
  loading.value = true;
  loadConversations(() => {
    loading.value = false;
  });
});

const handleRefresh = async (event: CustomEvent) => {
  loadConversations(event.detail.complete);
};

const loadConversations = (cb: () => void | undefined) => {
  authStore.getConversations().then((fetchedConversations) => {
    conversations.value = fetchedConversations;
    if (cb) cb();
  });
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Messages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <loader-full-page :loading="loading"></loader-full-page>
      <template v-if="!loading">
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <div class="conversation__list">
          <ion-text v-if="conversations.length < 1" class="ion-text-center"
            >Pas de mesages récents.
          </ion-text>
          <conversation-card
            v-for="conversation in conversations"
            v-bind:key="conversation.id"
            :conversation="conversation"
          ></conversation-card>
        </div>
      </template>
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

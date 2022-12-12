<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonTitle,
  IonLabel,
} from "@ionic/vue";
import CardStatus from "@/components/Card/CardStatus.vue";
import { onMounted, ref } from "vue";
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { Conversation, Day } from "@/types/Message";
import { send } from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { returnMessagesByDay } from "@/utils/helper";
import { useRoute } from "vue-router";
import {
  supabase,
  getMessages,
  getConversation,
  insertMessage,
} from "@/supabase";

import { useAuthStore } from "@/store/auth";

const route = useRoute();
const conversationId = route.params.id as string;
const { user, getAllMessages } = useAuthStore();
const content = ref();
const message = ref("");
const scrollBottom = () => {
  content.value.$el.scrollToBottom();
};

const days = ref<Day[]>([]);
const conversation = ref<Conversation>();
//!TO REDO

onMounted(() => {
  messages();
  subscribeMessages();
});

const handleMessage = () => {
  if (message.value === "") return;

  insertMessage(conversationId, user.id, message.value);
  message.value = "";

  getAllMessages();
};

const messages = async () => {
  conversation.value = await getConversation(conversationId, user.id);
  days.value = returnMessagesByDay(await getMessages(conversationId, user));
  scrollBottom();
};

const subscribeMessages = () => {
  supabase
    .channel("messages")
    .on("postgres_changes", { event: "*", schema: "public" }, () => messages())
    .subscribe();
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title
          >Conversation avec {{ conversation?.receiver.fname }}</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" ref="content">
      <div class="conversation">
        <div class="conversation__fixed">
          <card-status
            :conversation="conversation"
            v-if="conversation"
          ></card-status>
        </div>

        <div class="conversation__messages">
          <messages-by-day v-for="day in days" :key="day.date" :day="day" />
        </div>

        <fixed-bottom-container>
          <div class="conversation__input">
            <form @submit.prevent="handleMessage">
              <ion-item fill="outline" mode="md">
                <ion-label position="floating">Votre Message</ion-label>
                <ion-input
                  :name="message"
                  type="text"
                  required
                  :maxlength="80"
                  v-model="message"
                ></ion-input>
                <ion-button slot="end" fill="clear" type="submit">
                  <ion-icon :icon="send" />
                </ion-button>
              </ion-item>
            </form>
          </div>
        </fixed-bottom-container>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.conversation {
  &__fixed {
    position: fixed;
    top: 50px;
    left: var(--padding-start);
    width: calc(100% - var(--padding-end) - var(--padding-start));
  }
  &__messages {
    margin-top: 140px;
  }
  &__input {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background-color: white;
      opacity: 0.8;
    }
  }
}
</style>

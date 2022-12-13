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
  onIonViewDidEnter,
} from "@ionic/vue";
import CardStatus from "@/components/Card/CardStatus.vue";
import { ref, watch } from "vue";
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { send } from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { useRoute } from "vue-router";
import { getConversation, insertMessage } from "@/supabase";

import { useMessages } from "@/composables/messages";

import { useAuthStore } from "@/store/auth";

const route = useRoute();
const conversationId = route.params.id as string;
const authStore = useAuthStore();
const content = ref();
const message = ref("");
const messagesComp = useMessages();

const scrollBottom = () => {
  content.value.$el.scrollToBottom();
};

onIonViewDidEnter(async () => {
  if (!messagesComp.conversation.value) {
    messagesComp.conversation.value = await getConversation(
      conversationId,
      authStore.user.id
    );
  }
});

const handleMessage = () => {
  if (message.value === "") return;
  insertMessage(conversationId, authStore.user.id, message.value);
  message.value = "";
};

watch(messagesComp.messagesByDay, () => {
  scrollBottom();
});
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title
          >Conversation avec
          {{
            messagesComp.conversation.value
              ? messagesComp.conversation.value.receiver.fname
              : "..."
          }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" ref="content">
      <div class="conversation">
        <div class="conversation__fixed">
          <card-status
            v-if="messagesComp.conversation.value"
            :conversation="messagesComp.conversation.value"
          ></card-status>
        </div>

        <div class="conversation__messages">
          <messages-by-day
            v-for="day in messagesComp.messagesByDay.value"
            :key="day.date"
            :day="day"
          />
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

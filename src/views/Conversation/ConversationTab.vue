<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { ref } from "vue";
import { createUser } from "../../types/User";
import MessageCard from "@/components/Messages/MessageCard.vue";
import { Conversation } from "@/types/Message";

const sender = ref(createUser("John", "Doe", "example@example.com"));
const receiver = ref(createUser("Jack", "Doe", "example@example.com"));
const conversation = ref<Conversation>({
  id: "1",
  sender: sender.value,
  receiver: receiver.value,
  messages: [
    {
      id: "1",
      isSender: true,
      user: sender.value,
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: "2",
      isSender: false,
      user: receiver.value,
      content: "Hi",
      createdAt: new Date(),
    },
  ],
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
          >Conversation avec {{ conversation.receiver.fname }}</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <message-card
        v-for="message in conversation.messages"
        :key="message.id"
        :message="message"
      ></message-card>
    </ion-content>
  </ion-page>
</template>

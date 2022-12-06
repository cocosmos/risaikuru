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
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { Conversation } from "@/types/Message";
import { send } from "ionicons/icons";

const sender = ref(createUser("John", "Doe", "example@example.com"));
const receiver = ref(createUser("Jack", "Doe", "example@example.com"));
const conversation = ref<Conversation>({
  id: "1",
  sender: sender.value,
  receiver: receiver.value,
  days: [
    {
      date: new Date(),
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
        {
          id: "3",
          isSender: false,
          user: receiver.value,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(),
        },
      ],
    },
    {
      date: new Date(),
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
        {
          id: "3",
          isSender: false,
          user: receiver.value,
          content:
            "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
          createdAt: new Date(),
        },
      ],
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
      <div class="conversation">
        <div class="conversation__messages">
          <messages-by-day
            v-for="day in conversation.days"
            :key="day.date.toISOString"
            :day="day"
          />
        </div>
        <div class="conversation__input">
          <ion-item>
            <ion-input placeholder="Votre message"></ion-input>
            <ion-button slot="end" fill="clear">
              <ion-icon :icon="send" />
            </ion-button>
          </ion-item>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

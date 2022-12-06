<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { createUser } from "../../types/User";
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { Conversation } from "@/types/Message";
import { send } from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import FixedTopContainer from "@/components/FixedTopContainer.vue";
import TextField from "@/components/Input/TextField.vue";
import CardConversation from "@/components/Card/CardConversation.vue";
import { store } from "@/data/store";
const sender = ref(createUser("John", "Doe", "example@example.com"));
const receiver = ref(createUser("Jack", "Doe", "example@example.com"));
const conversation = ref<Conversation>({
  id: "1",
  sender: sender.value,
  demand: store.demands[0],
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
const content = ref();
const scrollBottom = () => {
  content.value.$el.scrollToBottom();
};

const message = ref("");
const handleMessage = () => {
  conversation.value.days[1].messages.push({
    id: "4",
    isSender: true,
    user: sender.value,
    content: message.value,
    createdAt: new Date(),
  });
  scrollBottom();
};
onMounted(() => {
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
          >Conversation avec {{ conversation.receiver.fname }}</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" ref="content">
      <div class="conversation">
        <fixed-top-container>
          <card-conversation
            :demand="conversation.demand"
            :is-asker="true"
          ></card-conversation>
        </fixed-top-container>

        <div class="conversation__messages">
          <messages-by-day
            v-for="day in conversation.days"
            :key="day.date.toISOString"
            :day="day"
          />
        </div>
        <fixed-bottom-container>
          <div class="conversation__input">
            <form @submit.prevent="handleMessage">
              <text-field
                :isError="false"
                label="Votre Message"
                name="message"
                :isMargin="true"
                v-model="message"
                ><ion-button slot="end" fill="clear" type="submit">
                  <ion-icon :icon="send" /> </ion-button
              ></text-field>
            </form>
          </div>
        </fixed-bottom-container>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.conversation {
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

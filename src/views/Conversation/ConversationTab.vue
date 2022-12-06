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
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { createUser } from "../../types/User";
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { Conversation, Day } from "@/types/Message";
import { send } from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import CardConversation from "@/components/Card/CardConversation.vue";
import { store } from "@/data/store";
import { returnMessagesByDay } from "@/utils/helper";
const sender = ref(createUser("John", "Doe", "example@example.com"));
const receiver = ref(createUser("Jack", "Doe", "example@example.com"));

const conversation = ref<Conversation>({
  id: "1",
  sender: sender.value,
  demand: store.demands[0],
  receiver: receiver.value,
  messages: [
    {
      id: "1",
      isSender: true,
      user: store.users[0],
      content: "Hello",
      createdAt: new Date(),
      isRead: false,
    },
    {
      id: "2",
      isSender: false,
      user: store.users[0],
      content: "Hi",
      createdAt: new Date(),
      isRead: false,
    },
    {
      id: "3",
      isSender: false,
      user: store.users[0],
      content:
        "Bonjour, je peux venir vers 15h pour chercher vos déchets, pouvez vous les mettre devant votre porte ?",
      createdAt: new Date(99999999),
      isRead: false,
    },
  ],
});

const days = ref<Day[]>(returnMessagesByDay(conversation.value.messages));

const content = ref();
const scrollBottom = () => {
  content.value.$el.scrollToBottom();
};

const message = ref("");

const handleMessage = () => {
  if (message.value === "") return;
  conversation.value.messages.push({
    id: "4",
    isSender: true,
    user: sender.value,
    content: message.value,
    createdAt: new Date(),
    isRead: false,
  });
  message.value = "";

  days.value = returnMessagesByDay(conversation.value.messages);
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
        <div class="conversation__fixed">
          <card-conversation
            :demand="conversation.demand"
            :is-asker="true"
          ></card-conversation>
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

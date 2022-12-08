<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import { Conversation, Message } from "@/types/Message";
import { IonAvatar, IonBadge, IonItem, IonLabel, IonText } from "@ionic/vue";
import { handRightOutline, readerOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import moment from "moment";
import "moment/src/locale/fr-ch";

const props = defineProps<{
  conversation: Conversation;
}>();

const messagesUnread = ref(0);
const lastMessage = ref<Message>();
const isAsked = ref(false);

const router = useRouter();

const goToConversation = () => {
  router.push("/messages/" + props.conversation.id);
};

onMounted(() => {
  messagesUnread.value = props.conversation.messages.filter(
    (message) => !message.isRead
  ).length;
  lastMessage.value =
    props.conversation.messages[props.conversation.messages.length - 1];
  isAsked.value =
    props.conversation.demand.user === props.conversation.receiver;
});
</script>

<template>
  <ion-item button lines="none" :detail="false" @click="goToConversation">
    <div slot="start" class="ion-text-center">
      <ion-avatar>
        <img
          :src="props.conversation.receiver.profilePicture"
          :alt="props.conversation.receiver.fname"
        />
      </ion-avatar>
      <ion-text class="conversation__name">
        {{ props.conversation.receiver.fname }}
      </ion-text>
    </div>

    <ion-label>
      <ion-label class="conversation__info">
        <ion-text color="warning" class="conversation__info-type">
          <ion-icon v-if="isAsked" :icon="readerOutline" /><ion-icon
            v-if="!isAsked"
            :icon="handRightOutline"
          />
          {{ isAsked ? "Votre annonce" : "Votre demande" }}
        </ion-text>

        <ion-text class="conversation__date">
          {{
            moment(props.conversation.demand.dateBegin)
              .locale("fr-ch")
              .calendar()
          }}</ion-text
        >
      </ion-label>

      <p>{{ lastMessage?.content }}</p>
    </ion-label>
    <ion-badge slot="end">{{ messagesUnread }}</ion-badge>
  </ion-item>
</template>

<style lang="scss" scoped>
ion-item {
  --inner-padding-bottom: 0.5em;
  --inner-padding-top: 0.5em;
  position: relative;
  overflow: hidden;

  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  ion-avatar {
    width: 2.5em;
    height: 2.5em;
  }
  .conversation__info {
    font-size: 0.75rem;
    &-type {
      margin-right: 0.4em;
      // font-size: 1em;
    }
  }
  .conversation__name {
    font-size: 0.8em;
  }
  .conversation__date {
    color: #8f8f8f;
  }
}
</style>

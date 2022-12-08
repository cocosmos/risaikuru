<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import { Conversation, Message } from "@/types/Message";
import { IonAvatar, IonBadge, IonItem, IonLabel, IonText } from "@ionic/vue";
import { trashBinOutline } from "ionicons/icons";
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

const dateTakeAway = moment(props.conversation.demand.dateBegin)
  .locale("fr-ch")
  .calendar();

const dateTakePopOver = moment(props.conversation.demand.dateBegin)
  .locale("fr-ch")
  .format("dddd D MMMM YYYY");
</script>

<template>
  <div class="card__badge ion-padding-right">
    <ion-item
      button
      lines="none"
      :detail="false"
      @click="goToConversation"
      :data-before="3"
    >
      <ion-avatar slot="start">
        <img
          :src="props.conversation.receiver.profilePicture"
          :alt="props.conversation.receiver.fname"
        />
      </ion-avatar>
      <ion-label>
        <ion-label class="conversation">
          <ion-text class="conversation__name">
            {{ props.conversation.receiver.fname }}
          </ion-text>

          <ion-chip
            class="conversation__date"
            color="warning"
            :id="conversation.id"
          >
            <ion-icon :icon="trashBinOutline"></ion-icon>

            {{ dateTakeAway }}</ion-chip
          >
        </ion-label>
        <ion-popover :trigger="conversation.id" trigger-action="hover">
          <ion-content class="ion-padding"
            >Ramassage prévu le {{ dateTakePopOver }}</ion-content
          >
        </ion-popover>

        <p>{{ lastMessage?.content }}</p>
      </ion-label>
    </ion-item>
    <ion-badge slot="end">{{ messagesUnread }}</ion-badge>
  </div>
</template>

<style lang="scss" scoped>
ion-item {
  --inner-padding-bottom: 0.5em;
  --inner-padding-top: 0.5em;
  position: relative;

  border-radius: 1em;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  ion-avatar {
    width: 2.5em;
    height: 2.5em;
    margin-right: 1em;
  }
  .conversation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    &__date {
      font-size: 0.75rem;

      ion-icon {
        font-size: 1rem;
        margin-right: 0.3em;
      }
    }
  }
}
.card__badge {
  position: relative;
  margin-right: 0.5em;
}
ion-badge {
  position: absolute;
  top: -7px;
  right: -10px;
  z-index: 999;
}
</style>

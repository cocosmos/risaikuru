<script lang="ts" setup>
import { defineProps, onMounted, ref } from "vue";
import { Conversation, Message } from "@/types/Message";
import {
  IonAvatar,
  IonBadge,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonText,
} from "@ionic/vue";
import { trashBinOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import moment from "moment";
import "moment/src/locale/fr-ch";
import { useAuthStore } from "@/store/auth";
import { supabase, getImage, getMessages } from "@/supabase";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  conversation: Conversation;
}>();
const { user } = useAuthStore();
const messages = ref<Message[]>([]);
const messagesUnread = ref(0);
const lastMessage = ref("");

const router = useRouter();

const goToConversation = () => {
  makeMessagesRead();
  router.push("/messages/" + props.conversation.id);
};

onMounted(() => {
  checkUnreads();
  /*  subscribeMessage(); */
});

const dateTakeAway = moment(props.conversation.demand.dateBegin)
  .locale("fr-ch")
  .calendar();

const dateTakePopOver = moment(props.conversation.demand.dateBegin)
  .locale("fr-ch")
  .format("dddd D MMMM YYYY");

const checkUnreads = async () => {
  messages.value = await getMessages(props.conversation.id, user);

  if (messages.value.length > 0) {
    messagesUnread.value = messages.value.filter(
      (message) => !message.isRead && !message.isSender
    ).length;

    lastMessage.value = label(messages.value[messages.value.length - 1]);
  }
};

const makeMessagesRead = async () => {
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation", props.conversation.id)
    .neq("user", user.id);

  if (error) {
    console.log(error);
  }
};

/* const subscribeMessage = () => {
  supabase
    .channel("messages")
    .on("postgres_changes", { event: "INSERT", schema: "public" }, () => {
      checkUnreads();
    })
    .subscribe();
}; */

const label = (message: Message) => {
  if (message.user.id === user.id) {
    return "Vous: " + message.content;
  } else {
    return message.user.fname + ": " + message.content;
  }
};

const colorStatus = computed(() => {
  if (props.conversation.demand.status === "pending") {
    return "warning";
  } else if (props.conversation.demand.status === "accepted") {
    return "success";
  } else if (props.conversation.demand.status === "rejected") {
    return "danger";
  }
});
</script>

<template>
  <div class="card__badge ion-padding-right">
    <ion-item button lines="none" :detail="false" @click="goToConversation">
      <ion-avatar slot="start">
        <img
          :src="getImage(props.conversation.receiver.avatar)"
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
            :color="colorStatus"
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

        <p>{{ lastMessage }}</p>
      </ion-label>
    </ion-item>
    <ion-badge v-if="messagesUnread > 0" slot="end">{{
      messagesUnread
    }}</ion-badge>
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

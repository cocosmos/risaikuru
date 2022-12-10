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
import { onMounted, ref, computed, reactive } from "vue";
import MessagesByDay from "@/components/Messages/MessagesByDay.vue";
import { Conversation, Day, Label } from "@/types/Message";
import { send } from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { returnMessagesByDay } from "@/utils/helper";
import { useRoute } from "vue-router";
import { supabase } from "../../data/supabase";
import { useAuthStore } from "@/store/auth";
import moment from "moment";
const route = useRoute();
const conversationId = route.params.id as string;
const { user } = useAuthStore();
const content = ref();
const message = ref("");
const scrollBottom = () => {
  content.value.$el.scrollToBottom();
};
const days = ref<Day[]>([]);
const conversation = ref<Conversation>();
const label = reactive<Label>({
  status: "pending",
  showFname: true,
  text: ` veut récupérer vos déchets.`,
  color: "warning",
});
switch (conversation.value?.demand.status) {
  case "pending":
    if (conversation.value.isAsker) {
      label.showFname = true;
      label.text = ` veut récupérer vos déchets.`;
      label.color = "warning";
    } else {
      label.showFname = true;
      label.text = ` n'a pas encore validé votre demande.`;
      label.color = "warning";
    }
    break;
  case "accepted":
    if (conversation.value.isAsker) {
      label.showFname = false;
      label.text = `Prise en charge acceptée.`;
      label.color = "success";
    } else {
      label.showFname = true;
      label.text = ` a accepté votre demande.`;
      label.color = "success";
    }
    break;
  case "rejected":
    if (conversation.value.isAsker) {
      label.showFname = false;
      label.text = `Vous avez refusé la prise en charge.`;
      label.color = "danger";
    } else {
      label.showFname = true;
      label.text = ` a refusé votre demande.`;
      label.color = "danger";
    }
    break;
}
onMounted(() => {
  getMessages();
  subscribeMessages();
});

const handleMessage = () => {
  if (message.value === "") return;

  supabase
    .from("messages")
    .insert([
      {
        content: message.value,
        conversation: conversationId,
        user: user.id,
      },
    ])
    .then(({ data, error }) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    });
  message.value = "";
};

const getConversation = () => {
  supabase
    .from("conversations")
    .select(
      `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
    )
    .eq("id", conversationId)
    .single()
    .then(({ data, error }) => {
      if (error) {
        console.error(error);
      } else {
        if (data) {
          const sender =
            data.requester.id === user.id ? data.requester : data.needer;
          const receiver =
            data.requester.id === user.id ? data.needer : data.requester;

          conversation.value = {
            id: data.id,
            sender: sender,
            receiver: receiver,
            demand: data.demand,
            isAsker: data.requester.id === user.id,
          };
          label.status = data.demand.status;
        }
      }
    });
};

const getMessages = async () => {
  getConversation();

  const { data, error } = await supabase
    .from("messages")
    .select(
      "*, conversation!inner(*,needer!inner(*),requester!inner(*), demand!inner(*,user!inner(*))), user!inner(*)"
    )
    .eq("conversation.id", conversationId);
  console.log(data);
  if (error) {
    console.error(error);
  } else {
    const messages = data.map((message) => {
      return {
        id: message.id,
        isSender: message.user.id === user.id,
        user: message.user,
        content: message.content,
        createdAt: moment(message.created_at).toDate(),
        isRead: false,
      };
    });

    days.value = returnMessagesByDay(messages);
    scrollBottom();
  }
};

const subscribeMessages = () => {
  supabase
    .channel("messages")
    .on("postgres_changes", { event: "*", schema: "public" }, () =>
      getMessages()
    )
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
            :label="label"
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

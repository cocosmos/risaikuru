import { ref, watch } from "vue";
import { supabase } from "@/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Conversation, Day } from "@/types/Message";
import * as SupabaseConversation from "@/supabase/conversation";
import { returnMessagesByDay } from "@/utils/helper";
import { useAuthStore } from "@/store/auth";
import { onIonViewDidEnter, onIonViewWillLeave } from "@ionic/vue";

const messageChannel = ref<RealtimeChannel>();
const conversation = ref<Conversation>();
const messagesByDay = ref<Day[]>();

export const useMessages = () => {
  const authStore = useAuthStore();

  onIonViewDidEnter(() => {
    messageChannel.value = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        () => getMessages()
      )
      .subscribe();
  });

  onIonViewWillLeave(() => {
    conversation.value = undefined;
    messagesByDay.value = [];
  });

  watch(conversation, () => {
    getMessages();
  });

  const getMessages = async () => {
    if (conversation.value) {
      const convId = conversation.value?.id;
      const { user } = authStore;
      const convMessages = await SupabaseConversation.getMessages(convId, user);
      messagesByDay.value = returnMessagesByDay(convMessages);
    }
  };

  return { conversation, messagesByDay };
};

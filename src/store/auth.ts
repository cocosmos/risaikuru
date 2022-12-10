import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { Session } from "@supabase/supabase-js";
import { UserType } from "@/types/User";
import { supabase } from "@/data/supabase";
import { Conversation, makeMessage, Message } from "@/types/Message";
import moment from "moment";

export const useAuthStore = defineStore("auth", () => {
  const session = ref(useStorage<Session>("risaikuru-session", {} as Session));
  const user = ref(useStorage<UserType>("risaikuru-user", {} as UserType));
  const conversations = ref<Conversation[]>([]);
  const messages = ref<Message[]>([]);

  const isLoggedIn = computed(() => {
    return (
      Object.entries(session.value).length !== 0 && session.value !== undefined
    );
  });

  const logout = () => {
    session.value = {} as Session;
    user.value = {} as UserType;
  };

  const updateUser = () => {
    supabase
      .from("profiles")
      .select(`lname, fname, avatar, balance, adress, iban`)
      .eq("id", session.value.user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          user.value = {
            id: session.value.user.id,
            lname: data.lname,
            fname: data.fname,
            email: "",
            avatar: data.avatar,
            balance: data.balance,
            adress: data.adress,
            iban: data.iban,
          };
        }
      });
  };

  const updateConversations = () => {
    //TODO : BUG: when the page is refreshed, the conversations is duplicated
    if (user.value.id) {
      supabase
        .from("conversations")
        .select(
          `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
        )
        .or(`requester.eq.${user.value.id},needer.eq.${user.value.id}`)
        .then(({ data }) => {
          if (data) {
            console.log(data);
            data?.forEach((conversation) => {
              const sender =
                conversation.requester.id === user.value.id
                  ? conversation.requester
                  : conversation.needer;
              const receiver =
                conversation.requester.id === user.value.id
                  ? conversation.needer
                  : conversation.requester;
              const createdAt = moment(conversation.demand.created_at);

              const isPassedTheeDays = moment
                .duration(moment().startOf("day").diff(createdAt))
                .asDays();
              if (isPassedTheeDays < 4) {
                conversations.value.push({
                  id: conversation.id,
                  sender: sender,
                  receiver: receiver,
                  demand: conversation.demand,
                  isAsker: conversation.requester.id === user.value.id,
                });
              }
            });
          }
        });
    }
  };

  const getAllMessages = () => {
    messages.value = [];
    supabase
      .from("messages")
      .select(`*, user!inner(*)`)
      .then(({ data }) => {
        if (data) {
          data.forEach((message) => {
            messages.value.push(makeMessage(message, user.value));
          });
        }
      });
  };

  const subscribeConversation = () => {
    supabase
      .channel("conversations")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        conversations.value = [];
        updateConversations();
      })
      .subscribe();
  };
  // Save the user when the session is set
  watch(session, async () => {
    if (isLoggedIn.value) {
      updateUser();
      updateConversations();
      subscribeConversation();
      getAllMessages();
    }
  });

  return {
    session,
    user,
    isLoggedIn,
    conversations,
    updateConversations,
    logout,
    updateUser,
    messages,
    getAllMessages,
  };
});

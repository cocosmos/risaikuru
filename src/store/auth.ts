import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed, ref, watch, watchEffect, onMounted } from "vue";
import { Session, User } from "@supabase/supabase-js";
import { UserType } from "@/types/User";
import { supabase } from "@/data/supabase";
import { Conversation } from "@/types/Message";

export const useAuthStore = defineStore("auth", () => {
  const session = ref(useStorage<Session>("risaikuru-session", {} as Session));
  const user = ref(useStorage<UserType>("risaikuru-user", {} as UserType));
  const conversations = ref<Conversation[]>([]);

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
      .then(({ data, error, status }) => {
        if (data) {
          user.value = {
            id: session.value.user.id,
            lname: data.lname,
            fname: data.fname,
            email: "",
            profilePicture: data.avatar,
            balance: data.balance,
            adress: data.adress,
            iban: data.iban,
          };
        }
      });
  };

  const updateConversations = () => {
    if (user.value.id) {
      supabase
        .from("conversations")
        .select(
          `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
        )
        .or(`requester.eq.${user.value.id},needer.eq.${user.value.id}`)
        .then(({ data }) => {
          if (data) {
            data?.forEach((conversation) => {
              const sender =
                conversation.requester.id === user.value.id
                  ? conversation.requester
                  : conversation.needer;
              const receiver =
                conversation.requester.id === user.value.id
                  ? conversation.needer
                  : conversation.requester;

              conversations.value.push({
                id: conversation.id,
                sender: sender,
                receiver: receiver,
                demand: conversation.demand,
                isAsker: conversation.requester.id === user.value.id,
              });
            });
          }
        });
    }
  };

  const subscribeConversation = () => {
    supabase
      .channel("conversations")
      .on("postgres_changes", { event: "*", schema: "public" }, () =>
        updateConversations()
      )
      .subscribe();
  };
  // Save the user when the session is set
  watch(session, async () => {
    if (isLoggedIn.value) {
      updateUser();
      updateConversations();
      subscribeConversation();
    }
  });

  return {
    session,
    user,
    isLoggedIn,
    conversations,
    updateConversations,
    logout,
  };
});

import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed, ref, watch, reactive } from "vue";
import { Session } from "@supabase/supabase-js";
import { UserType } from "@/types/User";
import { supabase } from "@/supabase";
import { Conversation, makeMessage, Message } from "@/types/Message";
import moment from "moment";
import { Demand } from "@/types/Demand";

export const useAuthStore = defineStore("auth", () => {
  const session = ref(useStorage<Session>("risaikuru-session", {} as Session));
  const user = ref(useStorage<UserType>("risaikuru-user", {} as UserType));

  const dataOfUser = reactive({
    myDemands: useStorage("risaikuru-", [] as Demand[]),
    conversations: [] as Conversation[],
    messages: [] as Message[],
  });
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

  const conversations = computed(async (): Promise<Conversation[]> => {
    if (!isLoggedIn.value) return [];
    const minDate = moment().startOf("day").subtract(4).toISOString();
    return supabase
      .from("conversations")
      .select(
        `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
      )
      .or(`requester.eq.${user.value.id},needer.eq.${user.value.id}`)
      .gt(`demand.dateEnd`, minDate)
      .order("updated_at", { ascending: true })
      .then(({ data }): Conversation[] => {
        if (!data) return [];
        return data?.map((conversation) => {
          const sender =
            conversation.requester.id === user.value.id
              ? conversation.requester
              : conversation.needer;
          const receiver =
            conversation.requester.id === user.value.id
              ? conversation.needer
              : conversation.requester;

          return {
            id: conversation.id,
            sender: sender,
            receiver: receiver,
            demand: conversation.demand,
            isAsker: conversation.requester.id === user.value.id,
            canceled: conversation.canceled,
          };
        });
      });
  });

  const updateConversations = () => {
    dataOfUser.conversations = [];
    if (user.value.id) {
      supabase
        .from("conversations")
        .select(
          `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
        )
        .or(`requester.eq.${user.value.id},needer.eq.${user.value.id}`)
        .order("updated_at", { ascending: true })
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
                dataOfUser.conversations.push({
                  id: conversation.id,
                  sender: sender,
                  receiver: receiver,
                  demand: conversation.demand,
                  isAsker: conversation.requester.id === user.value.id,
                  canceled: conversation.canceled,
                });
              }
            });
          }
        });
    }
  };
  const getMyDemands = () => {
    dataOfUser.myDemands = [];
    supabase
      .from("demands")
      .select(`*`)
      .eq("user", user.value.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          console.log(data);
          data.forEach((demand) => {
            const location = {
              lat: demand.lat,
              long: demand.long,
              name: demand.address,
            };
            dataOfUser.myDemands.push({ ...demand, location });
          });
        }
      });
  };

  const getAllMessages = () => {
    dataOfUser.messages = [];
    supabase
      .from("messages")
      .select(`*, user!inner(*)`)
      .then(({ data }) => {
        if (data) {
          data.forEach((message) => {
            dataOfUser.messages.push(makeMessage(message, user.value));
          });
        }
      });
  };

  const subscribeConversation = () => {
    /*supabase
                          .channel("conversations")
                          .on(
                            "postgres_changes",
                            { event: "*", schema: "public", table: "messages" },
                            () => {
                              updateConversations();
                            }
                          )
                          .subscribe();*/
  };

  const subscribeDemands = () => {
    /*supabase
                          .channel("demands")
                          .on("postgres_changes", { event: "*", schema: "public" }, () => {
                            getMyDemands();
                            console.log("subscribed");
                          })
                          .subscribe();*/
  };
  console.log(dataOfUser.conversations);

  // Save the user when the session is set
  watch(session, async () => {
    if (isLoggedIn.value) {
      updateUser();
      getAllMessages();
    }
  });

  return {
    session,
    user,
    isLoggedIn,
    dataOfUser,
    conversations,
    updateConversations,
    logout,
    updateUser,
    getAllMessages,
    getMyDemands,
    subscribeConversation,
    subscribeDemands,
  };
});

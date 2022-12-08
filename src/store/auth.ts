import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed, ref, watch, watchEffect } from "vue";
import { Session, User } from "@supabase/supabase-js";
import { UserType } from "@/types/User";
import { supabase } from "@/data/supabase";

export const useAuthStore = defineStore("auth", () => {
  const session = ref(useStorage<Session>("risaikuru-session", {} as Session));
  const user = ref(useStorage<UserType>("risaikuru-user", {} as UserType));

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

  // Save the user when the session is set
  watch(session, async () => {
    if (isLoggedIn.value) {
      updateUser();
    }
  });

  return { session, user, isLoggedIn };
});

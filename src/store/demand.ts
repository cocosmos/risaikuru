import { supabase } from "@/supabase";
import { Demand } from "@/types/Demand";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

//!THIS IS THE TEMPORARY SOLUTION
const { user } = useAuthStore();

export const useDemandStore = defineStore("demand", () => {
  const demands = ref(useStorage<Demand[]>("risaikuru-demands", []));
  console.log(user.id);
  const getDemands = async () => {
    const { data } = await supabase
      .from("demands")
      .select(`*`)
      .eq("user", user.id);
    /*  .order("created_at", { ascending: false }); */
    if (data) {
      demands.value = data;
    }
  };

  return {
    demands,
    getDemands,
  };
});

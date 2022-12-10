import { supabase } from "@/supabase";
import { Demand } from "@/types/Demand";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDemandStore = defineStore("demand", () => {
  const demands = ref<Demand[]>([]);

  const getDemands = async () => {
    const { data } = await supabase
      .from("demands")
      .select(
        `*, user!inner(*), category!inner(*), subcategory!inner(*), city!inner(*)`
      )
      .order("created_at", { ascending: false });
    if (data) {
      demands.value = data;
    }
  };

  return {
    demands,
    getDemands,
  };
});

import { computed, ref } from "vue";
import { Demand, Waste } from "@/types/Demand";
import Location from "@/types/Location";
import { Quantity } from "@/types/Demand";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { supabase } from "@/supabase";
import { onIonViewDidEnter } from "@ionic/vue";
import { useAuthStore } from "@/store/auth";

const wasteTypes = ref<Waste[]>([]);
const quantities = ref<Quantity[]>([
  {
    id: "S",
    number: 0,
    description: "Équivalent d'une boite à chaussures",
  },
  {
    id: "M",
    number: 0,
    description: "Équivalent d'un sac de courses",
  },
  {
    id: "L",
    number: 0,
    description: "Équivalent d'un carton de déménagement",
  },
  {
    id: "XL",
    number: 0,
    description: "Environ 200 litres",
  },
]);
const dateBegin = ref<Date>();
const dateEnd = ref<Date>();
const location = ref<Location>();
const reward = ref<number>(0);
const published = ref(false);
const savedDemand = ref<Demand>({} as Demand);

export const useNewDemand = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  onIonViewDidEnter(() => {
    if (!hasWasteTypes.value) {
      router.replace("/add/type");
    }
  });

  onBeforeRouteLeave(() => {
    if (published.value) {
      published.value = false;
      wasteTypes.value = [];
      quantities.value.map((quantity) => (quantity.number = 0));
      dateBegin.value = undefined;
      dateEnd.value = undefined;
      location.value = undefined;
      reward.value = 0;
    }
  });

  const hasWasteTypes = computed(() => {
    return wasteTypes.value.length > 0;
  });

  const hasQuantity = computed(() => {
    for (const quantity of quantities.value) {
      if (quantity.number > 0) return true;
    }
    return false;
  });

  const hasMoment = computed(() => {
    return dateBegin.value !== undefined && dateEnd.value !== undefined;
  });

  const hasLocation = computed(() => {
    return location.value !== undefined;
  });

  const hasReward = computed(() => {
    return reward.value > 0;
  });

  const saveDemand = () => {
    if (
      hasWasteTypes.value &&
      hasQuantity.value &&
      hasMoment.value &&
      hasLocation.value &&
      hasReward.value
    ) {
      supabase
        .from("demands")
        .insert({
          // TODO : add a loading to the confirmation page
          user: authStore.user.id,
          wastes: wasteTypes.value,
          address: location.value?.name,
          lat: location.value?.lat,
          long: location.value?.long,
          reward: reward.value,
          dateBegin: dateBegin.value,
          dateEnd: dateEnd.value,
          quantity: quantities.value,
          fees: reward.value * 0.3,
          status: "pending",
        })
        .select("*, user!inner(*)")
        .single()
        .then(({ data, error }) => {
          if (error === null) {
            const location = {
              lat: data.lat,
              long: data.long,
              name: data.address,
            };
            savedDemand.value = { ...data, location: location };
            published.value = true;
          } else {
            console.log("error while publishing demand", error);
          }
        });
    }
  };

  return {
    wasteTypes,
    quantities,
    dateBegin,
    dateEnd,
    location,
    reward,
    published,
    hasQuantity,
    hasMoment,
    hasLocation,
    savedDemand,
    saveDemand,
  };
};

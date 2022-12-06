import {
  computed,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
} from "vue";
import { Waste } from "@/types/Demand";
import Location from "@/types/Location";
import { Quantity } from "@/types/Demand";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { supabase } from "@/data/supabase";
import { onIonViewDidEnter } from "@ionic/vue";

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

export const useNewDemand = () => {
  const router = useRouter();

  onIonViewDidEnter(() => {
    if (!hasWasteTypes.value) {
      router.replace("/add/type");
    }
  });

  onBeforeRouteLeave((to) => {
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
      console.log("saving demand");
      supabase
        .from("demands")
        .insert({
          // TODO : change hard-coded user
          // TODO : add a loading to the confirmation page
          user: "7c8d5bd1-4e85-4424-918b-7a14cf316654",
          wastes: wasteTypes.value,
          address: location.value?.name,
          lat: location.value?.lat,
          long: location.value?.long,
          reward: reward.value,
          dateBegin: dateBegin.value,
          dateEnd: dateEnd.value,
          quantity: quantities.value,
        })
        .select()
        .then(({ data, error }) => {
          if (error === null) {
            console.log("published", data);
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
    saveDemand,
  };
};

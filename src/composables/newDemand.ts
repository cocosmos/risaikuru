import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { Waste } from "@/types/Demand";
import Location from "@/types/Location";
import { Quantity } from "@/types/Demand";
import { useRouter } from "vue-router";

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

  onMounted(() => {
    if (wasteTypes.value.length <= 0) {
      router.replace("/add/type");
    } else if (!hasQuantity.value) {
      router.replace("/add/quantity");
    } else if (dateBegin.value === undefined || dateEnd.value === undefined) {
      router.replace("/add/moment");
    } else if (location.value === undefined) {
      router.replace("/add/location");
    } else if (reward.value === 0) {
      router.replace("/add/reward");
    }
  });

  const hasQuantity = computed(() => {
    for (const quantity of quantities.value) {
      if (quantity.number > 0) return true;
    }
    return false;
  });

  return {
    wasteTypes,
    quantities,
    dateBegin,
    dateEnd,
    location,
    reward,
    published,
    hasQuantity,
  };
};

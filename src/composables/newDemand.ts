import { reactive, ref } from "vue";
import { Waste } from "@/types/Demand";
import Location from "@/types/Location";

const wasteTypes = ref<Waste[]>([]);
const quantities = ref({
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
});
const dateBegin = ref<Date>();
const dateEnd = ref<Date>();
const location = ref<Location>();
const reward = ref<number>(0);
const published = ref(false);

export const useNewDemand = () => {
  return {
    wasteTypes,
    quantities,
    dateBegin,
    dateEnd,
    location,
    reward,
    published,
  };
};

import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { Waste } from "@/types/Demand";
import Location from "@/types/Location";
import { useRouter } from "vue-router";

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
    return (
      quantities.value.s > 0 ||
      quantities.value.m > 0 ||
      quantities.value.l > 0 ||
      quantities.value.xl > 0
    );
  });

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

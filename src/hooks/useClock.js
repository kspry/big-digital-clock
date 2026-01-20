import { computed, ref } from "vue";
import useSettings from "@/hooks/useSettings";

let t = null;

const time = ref(new Date());

export default () => {
  const { format } = useSettings();

  const hours = computed(() => {
    const hours = time.value.getHours();
    if (format.value.toString() === "24") return hours;
    if (hours === 0) return 12;
    if (hours > 12) return hours - 12;
    return hours;
  });
  const minutes = computed(() => time.value.getMinutes());
  const seconds = computed(() => time.value.getSeconds());
  const period = computed(() => (time.value.getHours() < 12 ? "AM" : "PM"));

  const activate = (fn) => {
    refreshTime(fn);
  };

  const refreshTime = (fn) => {
    time.value = new Date();
    fn();
    t = setTimeout(() => {
      clearTimeout(t);
      t = null;
      refreshTime(fn);
    }, 500);
  };

  return {
    activate,
    hours,
    minutes,
    seconds,
    period
  };
};

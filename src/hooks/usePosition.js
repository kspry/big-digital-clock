import { computed } from "vue";
import useClock from "@/hooks/useClock";
import useSettings from "@/hooks/useSettings";

const SINGLE_DIGIT_HOURS_PADDING = 159;

export default () => {
  const { hours } = useClock();
  const { zero } = useSettings();

  const defaultHoursPosX = 395;

  const hoursPos = computed(() => {
    let x = defaultHoursPosX;
    const y = 700;

    if (!zero.value && hours.value < 10) {
      x += SINGLE_DIGIT_HOURS_PADDING;
    }

    return { x, y };
  });
  const minutesPos = { x: 1145, y: 700 };
  const periodPos = { x: 1488, y: 195 };
  const secondsPos = { x: 1652, y: 640 };
  const separatorPos = { x: 770, y: 700 };

  return {
    defaultHoursPosX,
    hoursPos,
    minutesPos,
    periodPos,
    secondsPos,
    separatorPos
  };
};

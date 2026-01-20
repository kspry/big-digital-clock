import { reactive, ref } from "vue";

const blink = ref(true);
const burnin = reactive({ amount: 10, visible: true });
const color = reactive({ background: "#000", foreground: "#cc0000" });
const format = ref(24); // 12 or 24 hour format
const glow = reactive({ blur: 10, visible: true });
const sepia = reactive({ amount: 50, visible: true });
const zero = ref(false);

const storeKey = "big-clock.settings";

export default () => {
  const loadSettings = () => {
    const store = localStorage.getItem(storeKey);
    if (!store) return;
    const settings = JSON.parse(store);
    blink.value = settings.blink;
    burnin.amount = settings.burnin.amount;
    burnin.visible = settings.burnin.visible;
    color.background = settings.color.background;
    color.foreground = settings.color.foreground;
    format.value = settings.format;
    glow.blur = settings.glow.blur;
    glow.visible = settings.glow.visible;
    sepia.amount = settings.sepia.amount;
    sepia.visible = settings.sepia.visible;
    zero.value = settings.zero;
  };

  const saveSettings = () => {
    const settings = {
      blink: blink.value,
      burnin: {
        amount: burnin.amount,
        visible: burnin.visible
      },
      color: {
        background: color.background,
        foreground: color.foreground
      },
      format: format.value,
      glow: {
        blur: glow.blur,
        visible: glow.visible
      },
      sepia: {
        amount: sepia.amount,
        visible: sepia.visible
      },
      zero: zero.value
    };
    const store = JSON.stringify(settings);
    localStorage.setItem(storeKey, store);
  };

  return {
    blink,
    burnin,
    color,
    format,
    glow,
    loadSettings,
    saveSettings,
    sepia,
    zero
  };
};

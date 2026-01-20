<template>
  <canvas ref="the_canvas"></canvas>
</template>

<script>
import { onMounted } from "vue";
import useCanvas from "@/hooks/useCanvas";
import useClock from "@/hooks/useClock";

export default {
  name: "BigClock",
  setup() {
    const { activate } = useClock();
    const { render, resize, the_canvas } = useCanvas();

    onMounted(() => {
      activate(() => render());
      resize();
      window.onresize = resize;
    });

    return {
      the_canvas,
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: "digital-7_monomono";
  src: url("https://rawcdn.githack.com/kspry/digital-clock/v1.0.0/css/font/digital-7.mono-webfont.woff2")
      format("woff2"),
    url("https://rawcdn.githack.com/kspry/digital-clock/v1.0.0/css/font/digital-7.mono-webfont.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>

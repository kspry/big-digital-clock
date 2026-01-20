<template>
  <Settings />
  <div class="overlay"></div>
  <BigClock />
</template>

<script>
import { onMounted } from "vue";
import BigClock from "@/components/BigClock.vue";
import Settings from "@/components/Settings.vue";
import useSettings from "@/hooks/useSettings";

export default {
  name: "App",
  components: {
    BigClock,
    Settings,
  },
  setup() {
    const { loadSettings } = useSettings();

    onMounted(() => {
      loadSettings();
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

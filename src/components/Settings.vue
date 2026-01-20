<template>
  <div class="settings">
    <div class="settings__control">
      <label>
        <input type="color" v-model="color.background" /> Background</label
      >
    </div>
    <div class="settings__control">
      <label>
        <input type="color" v-model="color.foreground" /> Foreground</label
      >
    </div>
    <div class="settings__control">
      <label> <input type="checkbox" v-model="blink" /> Blink</label>
    </div>
    <div class="settings__control">
      <label>
        <input type="checkbox" v-model="burnin.visible" /> Burn-in ({{
          burnin.amount
        }})</label
      >
    </div>
    <div class="settings__control">
      <input
        type="range"
        :disabled="!burnin.visible"
        min="0"
        max="30"
        step="1"
        v-model="burnin.amount"
      />
    </div>
    <div class="settings__control">
      <label>
        <input type="checkbox" v-model="glow.visible" /> Glow ({{
          glow.blur
        }})</label
      >
    </div>
    <div class="settings__control">
      <input
        type="range"
        :disabled="!glow.visible"
        min="0"
        max="30"
        step="1"
        v-model="glow.blur"
      />
    </div>
    <div class="settings__control">
      <label>
        <input type="checkbox" v-model="sepia.visible" /> Sepia ({{
          sepia.amount
        }}%)</label
      >
    </div>
    <div class="settings__control">
      <input
        type="range"
        :disabled="!sepia.visible"
        min="0"
        max="100"
        step="10"
        v-model="sepia.amount"
      />
    </div>
    <div class="settings__control">
      <select v-model.number="format">
        <option value="12">12-hour format</option>
        <option value="24">24-hour format</option>
      </select>
    </div>
    <div class="settings__control">
      <label> <input type="checkbox" v-model="zero" /> Leading Zero</label>
    </div>
    <div class="settings__control">
      <button @click="onSave">Save</button>
    </div>
  </div>
</template>

<script>
import useSettings from "@/hooks/useSettings";

export default {
  name: "Settings",
  setup() {
    const {
      blink,
      burnin,
      color,
      format,
      glow,
      saveSettings,
      sepia,
      zero,
    } = useSettings();

    const onSave = saveSettings;

    return {
      blink,
      burnin,
      color,
      format,
      glow,
      onSave,
      sepia,
      zero,
    };
  },
};
</script>

<style scoped>
.settings {
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}

.settings__control {
  color: #fff;
  display: none;
  font-family: sans-serif;
  margin-bottom: 1em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.settings__control button {
  font: inherit;
  padding: 3px 0;
  width: 100%;
}

.settings__control select {
  font: inherit;
  padding: 3px 0;
}

.settings:hover {
  background: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.3)
  );
}

.settings:hover .settings__control {
  display: block;
}
</style>
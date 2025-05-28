<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "./composables/useTheme";
import { computed } from "vue";
import logo from '@/assets/images/logo.png';

const { t, locale } = useI18n();
const { toggleTheme, theme } = useTheme();

const themeIcon = computed(() => (theme.value === "dark" ? "sun" : "moon"));
</script>

<template>
  <header class="navbar is-transparent is-flex is-align-items-center">
    <div class="navbar-item is-flex-grow-1 ml-6 is-justify-content-center">
      <div class="is-flex is-align-items-center">
        <figure class="image mr-3 is-flex is-align-items-center">
          <img :src="logo" alt="Logo" class="is-fullwidth is-fullheight" />
        </figure>
        <div class="is-size-3 has-text-centered">
          {{ t("Repositories") }}
        </div>
      </div>
    </div>
    <div class="navbar-start">
      <div class="navbar-item">
        <button class="button is-text" @click="toggleTheme" aria-label="Toggle theme">
          <span class="icon is-large">
            <font-awesome-icon :icon="themeIcon" size="lg" />
          </span>
        </button>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>

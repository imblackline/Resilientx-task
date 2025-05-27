<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "./composables/useTheme";

const { t, locale } = useI18n();
const { toggleTheme } = useTheme();
</script>

<template>
  <header
    class="navbar is-transparent is-flex is-align-content-center is-justify-content-center"
  >
    <div class="navbar-item is-size-2">
      {{ t("Repositories") }}
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <button class="button is-text" @click="toggleTheme" aria-label="Toggle theme">
          <span class="icon">
            <font-awesome-icon icon="coffee" />
          </span>
        </button>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>

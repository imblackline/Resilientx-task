<template>
  <footer class="footer mt-6 is-light has-border-top">
    <div class="container">
      <div class="content has-text-centered">
        <div class="is-flex is-justify-content-center is-align-items-center mb-4">
          <figure class="image is-32x32 mr-2">
            <img :src="logo" alt="Logo" class="is-fullwidth is-fullheight" />
          </figure>
          <p class="has-text-weight-semibold">Repositories</p>
        </div>
        <p class="is-size-6">
          Created by with 💀 by
          <a 
            href="https://github.com/imblackline" 
            target="_blank" 
            rel="noopener noreferrer"
            class="has-text-weight-semibold has-text-primary"
          >
            @imblackline
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/images/logo.png';
</script>

<style scoped>
.has-border-top {
  border-top: 1px solid var(--bulma-scheme-border);
}
</style> 
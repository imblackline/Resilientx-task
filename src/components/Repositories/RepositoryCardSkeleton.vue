<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="is-flex is-flex-direction-column">
          <h3 class="title has-skeleton">Title</h3>
          <div class="is-flex is-flex-direction-column skeleton-lines">
            <div class="skeleton mb-1 is-three-quarters"></div>
            <div class="skeleton mb-1 is-half"></div>
            <div class="skeleton mb-4 is-four-fifths"></div>
          </div>
          <div class="is-flex gap-2">
            <div class="button is-skeleton mr-3 is-medium"></div>
            <div class="button is-skeleton mr-3 is-medium"></div>
            <div class="button is-skeleton is-medium"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card {
  background-color: var(--bulma-card-color);
}

.skeleton {
  background: var(--color-skeleton-light);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.has-skeleton {
  color: var(--color-skeleton);
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style> 
<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h3 class="title is-4">
          <a :href="repository.html_url" target="_blank" rel="noopener noreferrer">
            {{ repository.name }}
          </a>
        </h3>
        <p class="subtitle is-6 mt-2 is-flex is-align-items-center">
          <figure class="image is-24x24 mr-2">
            <img class="is-rounded" :src="repository.owner.avatar_url" :alt="repository.owner.login">
          </figure>
          by&nbsp;
          <a :href="repository.owner.html_url" target="_blank" rel="noopener noreferrer">
            {{ repository.owner.login }}
          </a>
        </p>
        <p class="mb-2 has-text-break-word">{{ repository.description || "No description available" }}</p>
        <div class="tags">
          <span v-if="repository.language" class="tag is-info">
            {{ repository.language }}
          </span>
          <span class="tag is-light"> ⭐ {{ repository.stargazers_count }} </span>
          <span class="tag is-light"> 🔄 {{ repository.forks_count }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  repository: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.card {
  background-color: var(--color-card-bg);
}
.has-text-break-word {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style> 
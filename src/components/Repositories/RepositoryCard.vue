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
        <p class="mb-2 has-text-break-word is-clipped has-text-grey">
          {{ repository.description || "No description available" }}
        </p>
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
  background-color: var(--bulma-scheme-main);
}

.has-text-break-word {
  overflow-wrap: break-word;
  word-break: break-word;
}

.is-clipped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 4.5em;
}
</style> 
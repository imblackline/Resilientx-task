<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
import { useRepositories } from "@/composables/api/useRepositories";
import RepositoryCardSkeleton from "@/components/Repositories/RepositoryCardSkeleton.vue";
import RepositoryCard from "@/components/Repositories/RepositoryCard.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

const route = useRoute();
const searchQuery = ref("stars:>1000");
const {
  repositories,
  loading,
  error,
  hasRepositories,
  totalCount,
  currentPage,
  itemsPerPage,
  totalPages,
  searchRepositories,
} = useRepositories();

const handlePageChange = async (page) => {
  await searchRepositories(searchQuery.value, page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(async () => {
  // Get initial page from URL or default to 1
  const initialPage = route.query.page ? parseInt(route.query.page) : 1;
  await searchRepositories(searchQuery.value, initialPage);
});
</script>

<template>
  <div class="container mt-4">
    <div class="masonry-grid">
      <template v-if="loading">
        <div v-for="n in 15" :key="n" class="mb-4">
          <div class="px-2">
            <RepositoryCardSkeleton />
          </div>
        </div>
      </template>

      <div v-else-if="error" class="column is-12 has-text-centered">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>

      <div v-else-if="!hasRepositories" class="column is-12 has-text-centered">
        <div class="notification is-warning">No repositories found.</div>
      </div>

      <div
        v-else
        v-for="repo in repositories"
        :key="repo.id"
        class="mb-5"
      >
        <div class="px-2">
          <RepositoryCard :repository="repo" />
        </div>
      </div>
    </div>

    <Pagination
      v-if="!loading && hasRepositories"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-card-bg);
}

.masonry-grid {
  column-count: 1;
  column-gap: 1.5rem;
}

/* Tablet */
@media screen and (min-width: 769px) {
  .masonry-grid {
    column-count: 2;
  }
}

/* Desktop */
@media screen and (min-width: 1024px) {
  .masonry-grid {
    column-count: 3;
  }
}

.masonry-grid .card {
  display: inline-block;
  width: 100%;
  break-inside: avoid;
}
</style>

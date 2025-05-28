<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
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

const quickSearches = [
  { label: "Most Stars", value: "stars:>1000" },
  { label: "Most Forks", value: "forks:>100" },
  { label: "Recently Updated", value: "pushed:>2024-01-01" },
  { label: "Most Popular Vue", value: "stars:>1000 language:vue" },
  { label: "Most Popular React", value: "stars:>1000 language:javascript" },
  { label: "Most Popular Python", value: "stars:>1000 language:python" },
];

const handleQuickSearch = (query) => {
  searchQuery.value = query;
  handleSearch();
};

const handleSearch = async () => {
  await searchRepositories(searchQuery.value, 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handlePageChange = async (page) => {
  await searchRepositories(searchQuery.value, page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(async () => {
  const initialPage = route.query.page ? parseInt(route.query.page) : 1;
  await searchRepositories(searchQuery.value, initialPage);
});
</script>

<template>
  <div class="container mt-4">
    <div class="field has-addons has-addons-centered mb-4">
      <div class="control has-icons-left is-expanded">
        <input
          v-model="searchQuery"
          class="input"
          type="text"
          placeholder="Search repositories..."
          @keyup.enter="handleSearch"
        />
        <span class="icon is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="control">
        <button
          class="button is-primary"
          :class="{ 'is-loading': loading }"
          @click="handleSearch"
        >
          Search
        </button>
      </div>
    </div>

    <div class="is-flex is-justify-content-center is-flex-wrap-wrap mb-6">
      <button
        v-for="query in quickSearches"
        :key="query.label"
        class="tag is-small is-light mr-2 mb-2"
        @click="handleQuickSearch(query.value)"
      >
        {{ query.label }}
      </button>
    </div>

    <div class="masonry-grid">
      <template v-if="loading">
        <div v-for="n in 15" :key="n" class="mb-4">
          <div class="px-2">
            <RepositoryCardSkeleton />
          </div>
        </div>
      </template>

      <div v-else-if="error" class="Erorr-container">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>

      <div v-else-if="!hasRepositories" class="column is-12 has-text-centered">
        <div class="notification is-warning">No repositories found.</div>
      </div>

      <div v-else v-for="repo in repositories" :key="repo.id" class="mb-5">
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
  position: relative;
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

.field.has-addons {
  max-width: 600px;
  margin: 0 auto;
}
.Erorr-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

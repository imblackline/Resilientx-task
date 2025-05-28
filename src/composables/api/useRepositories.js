import { ref, computed } from 'vue';
import { repositoryService } from '@/services/repositoryService';

export function useRepositories() {
  const repositories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const totalCount = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = 15;
  const MAX_RESULTS = 1000;

  const hasRepositories = computed(() => repositories.value.length > 0);

  const totalPages = computed(() => {
    const total = Math.min(totalCount.value, MAX_RESULTS);
    return Math.ceil(total / itemsPerPage);
  });


  const fetchUserRepositories = async (username) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await repositoryService.getUserRepositories(username);
      repositories.value = response.data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch repositories';
      repositories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const searchRepositories = async (query, page = 1) => {
    loading.value = true;
    error.value = null;
    currentPage.value = page;

    try {
      const maxPage = Math.ceil(MAX_RESULTS / itemsPerPage);
      if (page > maxPage) {
        throw new Error('Only the first 1000 search results are available');
      }

      const response = await repositoryService.searchRepositories(query, page, itemsPerPage);
      repositories.value = response.items;
      totalCount.value = Math.min(response.total_count, MAX_RESULTS);
    } catch (err) {
      error.value = err.message || 'Failed to fetch repositories';
      repositories.value = [];
      totalCount.value = 0;
    } finally {
      loading.value = false;
    }
  };


  const getRepositoryDetails = async (owner, repo) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await repositoryService.getRepositoryDetails(owner, repo);
      return response.data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch repository details';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    repositories,
    loading,
    error,
    hasRepositories,
    totalCount,
    currentPage,
    itemsPerPage,
    totalPages,
    
    fetchUserRepositories,
    searchRepositories,
    getRepositoryDetails
  };
} 
<template>
  <div class="columns is-centered mt-5 mb-6">
    <div class="column is-narrow">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a 
          class="pagination-previous" 
          :class="{ 'is-disabled': currentPage === 1 }"
          @click="currentPage > 1 && onPageChange(currentPage - 1)"
        >
          Previous
        </a>
        <a 
          class="pagination-next" 
          :class="{ 'is-disabled': currentPage === totalPages }"
          @click="currentPage < totalPages && onPageChange(currentPage + 1)"
        >
          Next
        </a>
        <ul class="pagination-list">
          <li v-for="page in visiblePages" :key="page">
            <a 
              v-if="page !== '...'"
              class="pagination-link" 
              :class="{ 'is-current': page === currentPage }"
              @click="onPageChange(page)"
            >
              {{ page }}
            </a>
            <span v-else class="pagination-ellipsis">&hellip;</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const route = useRoute();
const router = useRouter();

// Show max 4 pages plus ellipsis
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 4;
  
  if (props.totalPages <= maxVisible) {
    // If total pages is less than max visible, show all pages
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    // Calculate middle pages
    const middleStart = Math.max(2, props.currentPage - 1);
    const middleEnd = Math.min(props.totalPages - 1, props.currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (middleStart > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (middleEnd < props.totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page
    pages.push(props.totalPages);
  }
  
  return pages;
});

const onPageChange = (page) => {
  if (page === '...' || page === props.currentPage) return;
  
  // Update URL with new page number
  router.push({ 
    query: { 
      ...route.query,
      page: page.toString()
    }
  });
  
  emit('page-change', page);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Watch for URL changes
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      const pageNum = parseInt(newPage);
      if (pageNum !== props.currentPage && !isNaN(pageNum)) {
        emit('page-change', pageNum);
      }
    }
  }
);
</script>

<style scoped>
.pagination-link.is-current {
  background-color: var(--bulma-primary);
  border-color: var(--bulma-primary);
  color: var(--bulma-primary-invert);
}
</style> 
import apiClient from './apiClient';


export const repositoryService = {

  getUserRepositories(username) {
    return apiClient.get(`/users/${username}/repos`);
  },


  getRepositoryDetails(owner, repo) {
    return apiClient.get(`/repos/${owner}/${repo}`);
  },


  searchRepositories: async (query, page = 1, perPage = 15) => {
    const response = await apiClient.get('/search/repositories', {
      params: {
        q: query,
        page,
        per_page: perPage,
        sort: 'stars',
        order: 'desc'
      }
    });
    return response.data;
  }
}; 
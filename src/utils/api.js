const API_PREFIX = 'http://localhost:3001';

const buildRequestOptions = token => ({
  headers: {
    Authorization: token,
  },
});

export const fetchCategories = token =>
  fetch(`${API_PREFIX}/categories`, buildRequestOptions(token))
    .then(res => res.json())
    .then(res => res.categories);


export const fetchPosts = token =>
  fetch(`${API_PREFIX}/posts`, buildRequestOptions(token))
    .then(res => res.json());

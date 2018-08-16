import uuid from 'uuid/v1';

const API_PREFIX = 'http://localhost:3001';

const buildRequestOptions = token => ({
  headers: {
    Authorization: token,
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const fetchCategories = token =>
  fetch(`${API_PREFIX}/categories`, buildRequestOptions(token))
    .then(res => res.json())
    .then(res => res.categories);


export const fetchPosts = token =>
  fetch(`${API_PREFIX}/posts`, buildRequestOptions(token))
    .then(res => res.json());


export const fetchPostsByCategory = (path, token) =>
  fetch(`${API_PREFIX}/${path}/posts`, buildRequestOptions(token))
    .then(res => res.json());


export const fetchPost = (id, token) =>
  fetch(`${API_PREFIX}/posts/${id}`, buildRequestOptions(token))
    .then(res => res.json());

export const fetchComments = (postId, token) =>
  fetch(`${API_PREFIX}/posts/${postId}/comments`, buildRequestOptions(token))
    .then(res => res.json());

export const updatePostVoteScore = (postId, data, token) =>
  fetch(`${API_PREFIX}/posts/${postId}`, {
    ...buildRequestOptions(token),
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateCommentVoteScore = (commentId, data, token) =>
  fetch(`${API_PREFIX}/comments/${commentId}`, {
    ...buildRequestOptions(token),
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
  }).then(res => res.json());


export const createPost = (data, token) =>
  fetch(`${API_PREFIX}/posts`, {
    ...buildRequestOptions(token),
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      ...data,
      id: uuid(),
      timestamp: Date.now(),
    }),
  }).then(res => res.json());


export const updatePost = (postId, data, token) =>
  fetch(`${API_PREFIX}/posts/${postId}`, {
    ...buildRequestOptions(token),
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify({
      ...data,
    }),
  }).then(res => res.json());

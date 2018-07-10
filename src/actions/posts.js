import { fetchPosts } from '../utils/api';

export const LIST_POSTS = 'LIST_POSTS';

export const listPosts = posts => ({
  type: LIST_POSTS,
  posts,
});

export const loadPosts = () => (dispatch, getState) => (
  fetchPosts(getState().token)
    .then(posts => dispatch(listPosts(posts)))
);

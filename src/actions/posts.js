import {
  fetchPosts,
  fetchPostsByCategory,
  fetchPost,
  updatePostVoteScore,
  createPost,
  updatePost,
  deletePost,
} from '../utils/api';

export const LIST_POSTS = 'LIST_POSTS';
export const LIST_POSTS_BY_CATEGORY = 'LIST_POSTS_BY_CATEGORY';
export const GET_POST = 'GET_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';

const loadedPostList = posts => ({
  type: LIST_POSTS,
  posts,
});

const loadedPostsByCategory = (categoryPath, posts) => ({
  type: LIST_POSTS_BY_CATEGORY,
  categoryPath,
  posts,
});

const loadedPost = post => ({
  type: GET_POST,
  post,
});

const createdPost = post => ({
  type: CREATE_POST,
  post,
});

const updatedPost = post => ({
  type: UPDATE_POST,
  post,
});

const removedPost = postId => ({
  type: REMOVE_POST,
  postId,
});

export const loadPosts = () => (dispatch, getState) => (
  fetchPosts(getState().token)
    .then(posts => dispatch(loadedPostList(posts)))
);

export const loadPostsByCategory = categoryPath => (dispatch, getState) => (
  fetchPostsByCategory(categoryPath, getState().token)
    .then(posts => dispatch(loadedPostsByCategory(categoryPath, posts)))
);

export const loadPost = id => (dispatch, getState) => (
  fetchPost(id, getState().token)
    .then(post => dispatch(loadedPost(post)))
);

export const upVotePost = id => (dispatch, getState) => (
  updatePostVoteScore(id, { option: 'upVote' }, getState().token)
    .then(post => dispatch(updatedPost(post)))
);

export const downVotePost = id => (dispatch, getState) => (
  updatePostVoteScore(id, { option: 'downVote' }, getState().token)
    .then(post => dispatch(updatedPost(post)))
);

export const newPost = data => (dispatch, getState) => (
  createPost(data, getState().token)
    .then((post) => {
      if (!post || post.error || !post.id) {
        throw Error('Ops, it was not possible to create post');
      }
      dispatch(createdPost(post));
      return post;
    })
);

export const changePost = (postId, data) => (dispatch, getState) => (
  updatePost(postId, data, getState().token)
    .then((post) => {
      if (!post || post.error) {
        throw Error('Ops, it was not possible to update post');
      }
      dispatch(updatedPost(post));
      return post;
    })
);

export const removePost = postId => (dispatch, getState) =>
  deletePost(postId, getState().token)
    .then(() => dispatch(removedPost(postId)));

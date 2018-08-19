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
export const POST_CREATED = 'POST_CREATED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_REMOVED = 'POST_REMOVED';

export const listPosts = posts => ({
  type: LIST_POSTS,
  posts,
});

export const listPostsByCategory = (categoryPath, posts) => ({
  type: LIST_POSTS_BY_CATEGORY,
  categoryPath,
  posts,
});

export const getPost = post => ({
  type: GET_POST,
  post,
});

export const postCreated = post => ({
  type: POST_CREATED,
  post,
});

export const postUpdated = post => ({
  type: POST_UPDATED,
  post,
});

export const postRemoved = postId => ({
  type: POST_REMOVED,
  postId,
});

export const loadPosts = () => (dispatch, getState) => (
  fetchPosts(getState().token)
    .then(posts => dispatch(listPosts(posts)))
);

export const loadPostsByCategory = categoryPath => (dispatch, getState) => (
  fetchPostsByCategory(categoryPath, getState().token)
    .then(posts => dispatch(listPostsByCategory(categoryPath, posts)))
);

export const loadPost = id => (dispatch, getState) => (
  fetchPost(id, getState().token)
    .then(post => dispatch(getPost(post)))
);

export const upVotePost = id => (dispatch, getState) => (
  updatePostVoteScore(id, { option: 'upVote' }, getState().token)
    .then(post => dispatch(getPost(post)))
);

export const downVotePost = id => (dispatch, getState) => (
  updatePostVoteScore(id, { option: 'downVote' }, getState().token)
    .then(post => dispatch(getPost(post)))
);

export const newPost = data => (dispatch, getState) => (
  createPost(data, getState().token)
    .then((post) => {
      if (!post || post.error || !post.id) {
        throw Error('Ops, it was not possible to create post');
      }
      dispatch(postCreated(post));
      return post;
    })
);

export const changePost = (postId, data) => (dispatch, getState) => (
  updatePost(postId, data, getState().token)
    .then((post) => {
      if (!post || post.error) {
        throw Error('Ops, it was not possible to update post');
      }
      dispatch(postUpdated(post));
      return post;
    })
);

export const removePost = postId => (dispatch, getState) =>
  deletePost(postId, getState().token)
    .then(() => dispatch(postRemoved(postId)));

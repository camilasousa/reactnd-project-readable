import { fetchComments } from '../utils/api';

export const LIST_COMMENTS = 'LIST_COMMENTS';

export const listComments = (postId, comments) => ({
  type: LIST_COMMENTS,
  comments,
  postId,
});

export const loadComments = postId => (dispatch, getState) => (
  fetchComments(postId, getState().token)
    .then(comments => dispatch(listComments(postId, comments)))
);

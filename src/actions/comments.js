import { fetchComments, updateCommentVoteScore } from '../utils/api';

export const LIST_COMMENTS = 'LIST_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const listComments = (postId, comments) => ({
  type: LIST_COMMENTS,
  comments,
  postId,
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment,
});

export const loadComments = postId => (dispatch, getState) => (
  fetchComments(postId, getState().token)
    .then(comments => dispatch(listComments(postId, comments)))
);

export const upVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'upVote' }, getState().token)
    .then(comment => dispatch(updateComment(comment)))
);

export const downVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'downVote' }, getState().token)
    .then(comment => dispatch(updateComment(comment)))
);

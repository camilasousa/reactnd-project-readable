import {
  fetchComments,
  fetchComment,
  updateCommentVoteScore,
  createComment,
  updateComment,
  deleteComment,
} from '../utils/api';

export const LIST_COMMENTS = 'LIST_COMMENTS';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const COMMENT_CREATED = 'COMMENT_CREATED';
export const COMMENT_LOADED = 'COMMENT_LOADED';
export const COMMENT_REMOVED = 'COMMENT_REMOVED';

export const listComments = (postId, comments) => ({
  type: LIST_COMMENTS,
  comments,
  postId,
});

export const commentLoaded = comment => ({
  type: COMMENT_LOADED,
  comment,
});

export const commentUpdated = comment => ({
  type: COMMENT_UPDATED,
  comment,
});

export const commentCreated = comment => ({
  type: COMMENT_CREATED,
  comment,
});

export const commentRemoved = commentId => ({
  type: COMMENT_REMOVED,
  commentId,
});

export const loadComments = postId => (dispatch, getState) => (
  fetchComments(postId, getState().token)
    .then(comments => dispatch(listComments(postId, comments)))
);

export const loadComment = commentId => (dispatch, getState) =>
  fetchComment(commentId, getState().token)
    .then((comment) => {
      dispatch(commentLoaded(comment));
      return comment;
    });

export const removeComment = commentId => (dispatch, getState) =>
  deleteComment(commentId, getState().token)
    .then(() => dispatch(commentRemoved(commentId)));


export const upVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'upVote' }, getState().token)
    .then(comment => dispatch(commentUpdated(comment)))
);

export const downVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'downVote' }, getState().token)
    .then(comment => dispatch(commentUpdated(comment)))
);

export const newComment = (postId, data) => (dispatch, getState) => (
  createComment(postId, data, getState().token)
    .then((comment) => {
      if (!comment || comment.error || !comment.id) {
        throw Error('Ops, it was not possible to create post');
      }
      dispatch(commentCreated(comment));
      return comment;
    })
);

export const changeComment = (commentId, data) => (dispatch, getState) => (
  updateComment(commentId, data, getState().token)
    .then((comment) => {
      if (!comment || comment.error) {
        throw Error('Ops, it was not possible to update post');
      }
      dispatch(commentUpdated(comment));
      return comment;
    })
);

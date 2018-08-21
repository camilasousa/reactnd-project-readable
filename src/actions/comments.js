import {
  fetchComments,
  fetchComment,
  updateCommentVoteScore,
  createComment,
  updateComment,
  deleteComment,
} from '../utils/api';

export const LIST_COMMENTS = 'LIST_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const loadedCommentsList = (postId, comments) => ({
  type: LIST_COMMENTS,
  comments,
  postId,
});

const loadedComment = comment => ({
  type: GET_COMMENT,
  comment,
});

const updatedComment = comment => ({
  type: UPDATE_COMMENT,
  comment,
});

const createdComment = comment => ({
  type: CREATE_COMMENT,
  comment,
});

const removedComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const loadComments = postId => (dispatch, getState) => (
  fetchComments(postId, getState().token)
    .then(comments => dispatch(loadedCommentsList(postId, comments)))
);

export const loadComment = commentId => (dispatch, getState) =>
  fetchComment(commentId, getState().token)
    .then((comment) => {
      dispatch(loadedComment(comment));
      return comment;
    });

export const removeComment = commentId => (dispatch, getState) =>
  deleteComment(commentId, getState().token)
    .then(() => dispatch(removedComment(commentId)));


export const upVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'upVote' }, getState().token)
    .then(comment => dispatch(updatedComment(comment)))
);

export const downVoteComment = id => (dispatch, getState) => (
  updateCommentVoteScore(id, { option: 'downVote' }, getState().token)
    .then(comment => dispatch(updatedComment(comment)))
);

export const newComment = (postId, data) => (dispatch, getState) => (
  createComment(postId, data, getState().token)
    .then((comment) => {
      if (!comment || comment.error || !comment.id) {
        throw Error('Ops, it was not possible to create post');
      }
      dispatch(createdComment(comment));
      return comment;
    })
);

export const changeComment = (commentId, data) => (dispatch, getState) => (
  updateComment(commentId, data, getState().token)
    .then((comment) => {
      if (!comment || comment.error) {
        throw Error('Ops, it was not possible to update post');
      }
      dispatch(updatedComment(comment));
      return comment;
    })
);

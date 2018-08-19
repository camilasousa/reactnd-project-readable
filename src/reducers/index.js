import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';
import {
  LIST_POSTS,
  LIST_POSTS_BY_CATEGORY,
  GET_POST,
  POST_CREATED,
  POST_UPDATED,
  POST_REMOVED,
} from '../actions/posts';
import {
  LIST_COMMENTS,
  COMMENT_UPDATED,
  COMMENT_CREATED,
  COMMENT_LOADED,
  COMMENT_REMOVED,
} from '../actions/comments';

const categories = (state = [], action) => {
  switch (action.type) {
    case LIST_CATEGORIES :
      return action.categories;
    default :
      return state;
  }
};

const postIdsByCategory = (state = {}, action) => {
  switch (action.type) {
    case LIST_POSTS_BY_CATEGORY :
      return {
        ...state,
        [action.categoryPath]: action.posts.map(p => p.id),
      };
    default :
      return state;
  }
};

const postsById = (state = {}, action) => {
  switch (action.type) {
    case GET_POST:
    case POST_UPDATED:
    case POST_CREATED:
      return {
        ...state,
        [action.post.id]: action.post,
      };
    case POST_REMOVED: {
      const { [action.postId]: value, ...newState } = state;
      return newState;
    }
    case LIST_POSTS_BY_CATEGORY:
      return {
        ...state,
        ...action.posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
      };
    case LIST_POSTS :
      return {
        ...state,
        ...action.posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
      };
    default :
      return state;
  }
};

const commentsById = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_LOADED:
    case COMMENT_CREATED:
    case COMMENT_UPDATED: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    }
    case LIST_COMMENTS :
      return {
        ...state,
        ...action.comments.reduce((acc, comm) => ({ ...acc, [comm.id]: comm }), {}),
      };
    case COMMENT_REMOVED: {
      const { [action.commentId]: value, ...newState } = state;
      return newState;
    }
    default :
      return state;
  }
};

const commentIdsByPostId = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATED: {
      const postId = action.comment.parentId;
      return {
        ...state,
        [postId]: [...(state[postId] || []), action.comment.id],
      };
    }
    case LIST_COMMENTS :
      return {
        ...state,
        [action.postId]: action.comments.map(c => c.id),
      };
    default :
      return state;
  }
};

const token = () => 'authorization-token';

export default combineReducers({
  categories,
  commentIdsByPostId,
  postIdsByCategory,
  postsById,
  commentsById,
  token,
});

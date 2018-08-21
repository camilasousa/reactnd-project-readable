import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';
import {
  LIST_POSTS,
  LIST_POSTS_BY_CATEGORY,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
  REMOVE_POST,
} from '../actions/posts';
import {
  LIST_COMMENTS,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  GET_COMMENT,
  REMOVE_COMMENT,
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
    case UPDATE_POST:
    case CREATE_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      };
    case REMOVE_POST: {
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
    case GET_COMMENT:
    case CREATE_COMMENT:
    case UPDATE_COMMENT: {
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
    case REMOVE_COMMENT: {
      const { [action.commentId]: value, ...newState } = state;
      return newState;
    }
    default :
      return state;
  }
};

const commentIdsByPostId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT: {
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

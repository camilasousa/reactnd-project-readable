import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';
import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, GET_POST, POST_REMOVED } from '../actions/posts';
import { LIST_COMMENTS, COMMENT_UPDATED, COMMENT_CREATED, COMMENT_LOADED } from '../actions/comments';
import { updateItemInList } from '../utils/list-utils';

const categories = (state = [], action) => {
  switch (action.type) {
    case LIST_CATEGORIES :
      return action.categories;
    default :
      return state;
  }
};

const posts = (state = [], action) => {
  switch (action.type) {
    case GET_POST:
      return updateItemInList(state, action.post);
    case LIST_POSTS :
      return action.posts;
    default :
      return state;
  }
};

const postsByCategory = (state = {}, action) => {
  switch (action.type) {
    case GET_POST: {
      const category = action.post.category;
      return {
        ...state,
        [category]: updateItemInList(state[category], action.post),
      };
    }
    case LIST_POSTS_BY_CATEGORY :
      return {
        ...state,
        [action.categoryPath]: action.posts,
      };
    default :
      return state;
  }
};

const postsById = (state = {}, action) => {
  switch (action.type) {
    case GET_POST :
      return {
        ...state,
        [action.post.id]: action.post,
      };
    case POST_REMOVED: {
      const { [action.postId]: value, ...newState } = state;
      return newState;
    }
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
    default :
      return state;
  }
};

const commentsByPostId = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATED: {
      const postId = action.comment.parentId;
      return {
        ...state,
        [postId]: [...(state[postId] || []), action.comment],
      };
    }
    case COMMENT_UPDATED: {
      const postId = action.comment.parentId;
      return {
        ...state,
        [postId]: updateItemInList(state[postId], action.comment),
      };
    }
    case LIST_COMMENTS :
      return {
        ...state,
        [action.postId]: action.comments,
      };
    default :
      return state;
  }
};

const token = () => 'authorization-token';

export default combineReducers({
  categories,
  commentsByPostId,
  posts,
  postsByCategory,
  postsById,
  commentsById,
  token,
});

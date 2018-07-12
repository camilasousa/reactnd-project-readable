import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';
import { LIST_POSTS, LIST_POSTS_BY_CATEGORY, GET_POST } from '../actions/posts';
import { LIST_COMMENTS } from '../actions/comments';

const updatePostInList = (list, post) =>
  list && list.map(p => (p.id === post.id ? post : p));

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
      return updatePostInList(state, action.post);
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
        [category]: updatePostInList(state[category], action.post),
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
    default :
      return state;
  }
};

const commentsByPostId = (state = {}, action) => {
  switch (action.type) {
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
  token,
});

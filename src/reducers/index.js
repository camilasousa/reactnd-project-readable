import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';
import { LIST_POSTS } from '../actions/posts';

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
    case LIST_POSTS :
      return action.posts;
    default :
      return state;
  }
};

const token = () => 'authorization-token';

export default combineReducers({
  categories,
  posts,
  token,
});

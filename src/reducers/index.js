import { combineReducers } from 'redux';

import { LIST_CATEGORIES } from '../actions/categories';

const categories = (state = [], action) => {
  switch (action.type) {
    case LIST_CATEGORIES :
      return action.categories;
    default :
      return state;
  }
};

const token = () => 'authorization-token';

export default combineReducers({
  categories,
  token,
});

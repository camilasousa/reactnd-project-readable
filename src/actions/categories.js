import { fetchCategories } from '../utils/api';

export const LIST_CATEGORIES = 'LIST_CATEGORIES';

export const listCategories = categories => ({
  type: LIST_CATEGORIES,
  categories,
});

export const loadCategories = () => (dispatch, getState) => (
  fetchCategories(getState().token)
    .then(categories => dispatch(listCategories(categories)))
);

export const updateItemInList = (list, item) =>
  list && list.map(a => (a.id === item.id ? item : a));

import { ADD_ITEM, DELETE_ITEM, COMPLETE_ITEM, FILTER_COMPLETED } from './constants';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = content => {
  return { type: DELETE_ITEM, content };
};

export const completeItem = content => {
  return { type: COMPLETE_ITEM, content };
};

export const filterCompleted = content => {
  return { type: FILTER_COMPLETED, content };
};

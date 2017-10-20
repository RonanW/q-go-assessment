import { ADD_ITEM, DELETE_ITEM, COMPLETE_ITEM, FILTER_COMPLETED } from './constants';

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', completed: false },
    { id: 2, content: 'Buy cat food', completed: false },
    { id: 3, content: 'Water the plants', completed: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
        completed: false
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    case DELETE_ITEM:
      const toDelete = action.content;
      for(let i = 0; i < state.items.length; i++) {
          const obj = state.items[i];

          if (toDelete === obj.id) {
              state.items.splice(i, 1);
          }
      }
      return {
        ...state,
        items: [...state.items],
      };
    case COMPLETE_ITEM:
      const toComplete = action.content;
      for(let i = 0; i < state.items.length; i++) {
          const obj = state.items[i];

          if (toComplete === obj.id) {
              const item = state.items[i];
              item.completed = !item.completed;
          }
      }
      return {
        ...state,
        items: [...state.items],
      };
    case FILTER_COMPLETED:
      const filter = action.content;
      return {
        ...state,
        items: [...state.items],
        filter: filter
      };
    default:
      return state;
  }
};

export default reducer;

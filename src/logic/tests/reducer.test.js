import reducer, { initialState } from '../reducer';
import { addItem, deleteItem, completeItem, filterCompleted } from '../actions';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should delete an item on DELETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = deleteItem(2);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toEqual(1);
    expect(result.items[0].content).toEqual('first');
  });

  it('should mark an item complete on COMPLETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = completeItem(2);
    const result = reducer(state, mockAction);
    expect(result.items[1].completed).toEqual(true);
  });

  it('should mark an completed item incomplete on COMPLETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = completeItem(1);
    const result = reducer(state, mockAction);
    expect(result.items[0].completed).toEqual(false);
  });

  it('should set state.filter to true on FILTER_COMPLETED', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second' },
      ],
      filter: false
    }
    const mockAction = filterCompleted(true);
    const result = reducer(state, mockAction);
    expect(result.filter).toEqual(true);
  });

  it('should set state.filter to false on FILTER_COMPLETED', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second' },
      ],
      filter: true
    }
    const mockAction = filterCompleted(false);
    const result = reducer(state, mockAction);
    expect(result.filter).toEqual(false);
  });
});

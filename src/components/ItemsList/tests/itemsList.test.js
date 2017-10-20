import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onDelete: f => f,
  onComplete: f => f,
  onFilterCompleted: f => f
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });
  it('should call onDelete if an item\'s delete button is clicked', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const onDeleteMock = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onDelete={onDeleteMock}/>);
    renderedItem.find('.delete-1').simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
  });
  it('should call onComplete if an item\'s complete button is clicked', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const onCompleteMock = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onComplete={onCompleteMock}/>);
    renderedItem.find('.complete-1').simulate('click');
    renderedItem.find('.complete-1').simulate('click');
    expect(onCompleteMock.mock.calls.length).toBe(2);
  });

  it('should call onFilterCompleted when filter flag is changed', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const onFilterCompletedMock = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onFilterCompleted={onFilterCompletedMock}/>);
    renderedItem.find('.filter-completed').simulate('change', {target: { checked: true } });
    renderedItem.find('.filter-completed').simulate('change', {target: { checked: false } });
    expect(onFilterCompletedMock.mock.calls.length).toBe(2);
  });
});

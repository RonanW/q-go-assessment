import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';
import { deleteItem, completeItem, filterCompleted } from '../../logic/actions';
import MdDelete from 'react-icons/lib/md/delete';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';

export const ItemsList = ({ items, filter, onDelete, onComplete, onFilterCompleted }) => {
  return (
    <div>
        <label>
          Filter completed:
          <input
            name="filterCompleted"
            type="checkbox"
            className={'filter-completed'}
            onChange={(event) => {
              onFilterCompleted(event.target.checked);
            }} />
        </label>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map(item => <li
          className={!!filter && item.completed ? 'hidden' : ''} 
          key={item.id}>
          {item.content} 
          <MdDelete onClick={() => onDelete(item.id)} className={'delete-'+item.id}/>
          {item.completed ? 
            <MdCheckBox onClick={() => onComplete(item.id)} className={'complete-'+item.id}/> : 
            <MdCheckBoxOutlineBlank onClick={() => onComplete(item.id)} className={'complete-'+item.id}/>}
        </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onFilterCompleted: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { 
    items: state.todos.items,
    filter: state.todos.filter
  };
};

const mapDispatchToProps = dispatch => ({
  onDelete: item => dispatch(deleteItem(item)),
  onComplete: item => dispatch(completeItem(item)),
  onFilterCompleted: checked => dispatch(filterCompleted(checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);

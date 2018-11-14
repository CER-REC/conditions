// 
import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  if (props.items.length === 0) { return null; }
  const selectedItem = props.items.includes(props.selected)
    ? props.selected
    : props.items[0];
  const items = props.items.map((v, i) => (
    <li
      key={i}
      className={`List-Item ${selectedItem === v ? 'selected' : ''}`}
    >
      <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log(e);
        props.onChange(v);
      }}>
        {v}
      </a>
    </li>
  ));
  return (
    <div className="List">
      <ul>{items}</ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
};

List.defaultProps = {
  selected: '',
};

export default List;
import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../utilities/handleInteraction';

const List = (props) => {
  if (props.items.length === 0) { return null; }
  const selectedItem = props.items.includes(props.selected)
    ? props.selected
    : props.items[0];
  const items = props.items.map(v => (
    <li
      key={v.key || v}
      className={`List-Item ${selectedItem === v ? 'selected' : ''}`}
      {...(props.itemInteractions ? handleInteraction(props.onChange, v) : {})}
    >
      {v}
    </li>
  ));
  return (
    <div className="List">
      <ul>{items}</ul>
    </div>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  itemInteractions: PropTypes.bool,
};

List.defaultProps = {
  selected: '',
  itemInteractions: true,
};

export default List;

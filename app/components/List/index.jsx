import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../utilities/handleInteraction';

const List = (props) => {
  if (props.items.length === 0) { return null; }
  // Selected index cannot exceed the length of the array
  const selectedIndex = (props.selected < props.items.length) ? props.selected : 0;
  const items = props.items.map((item, i) => {
    const isSelected = selectedIndex === i;
    return (
      <li
        key={item.key || item}
        className={`List-Item ${isSelected ? 'selected' : ''}`}
        {...(props.itemInteractions ? handleInteraction(props.onChange, i) : {})}
      >
        {!isSelected || selectedIndex === 0 ? null : (
          <button {...handleInteraction(props.onChange, i - 1)} className="ArrowPrevious">Previous</button>
        )}
        <div className="List-Item-Content">{item}</div>
        {!isSelected || selectedIndex === (props.items.length - 1) ? null : (
          <button {...handleInteraction(props.onChange, i + 1)} className="ArrowNext">Next</button>
        )}
      </li>
    );
  });
  return (
    <div className="List">
      <ul>{items}</ul>
    </div>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  itemInteractions: PropTypes.bool,
};

List.defaultProps = {
  selected: 0,
  itemInteractions: true,
};

export default List;

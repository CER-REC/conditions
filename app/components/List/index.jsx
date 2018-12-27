import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

import styles from './styles.scss';

library.add(
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
);

const List = (props) => {
  if (props.items.length === 0) { return null; }
  // Selected index cannot exceed the length of the array
  const selectedIndex = (props.selected < props.items.length) ? props.selected : 0;
  const previousIcon = props.horizontal ? 'angle-left' : 'angle-up';
  const nextIcon = props.horizontal ? 'angle-right' : 'angle-down';
  const items = props.items.map((item, i) => {
    const isSelected = selectedIndex === i;
    return (
      <li
        key={item.key || item}
        className={`List-Item ${isSelected ? 'selected' : ''}`}
        {...(props.itemInteractions ? handleInteraction(props.onChange, i) : {})}
      >
        {!isSelected || selectedIndex === 0 ? null : (
          <CircleContainer size={styles.arrowSize} onClick={() => props.onChange(i - 1)} className="arrowPrevious">
            <Icon size="1x" icon={previousIcon} />
          </CircleContainer>
        )}
        <div className="List-Item-Content">{item}</div>
        {!isSelected || selectedIndex === (props.items.length - 1) ? null : (
          <CircleContainer size={styles.arrowSize} onClick={() => props.onChange(i + 1)} className="arrowNext">
            <Icon size="1x" icon={nextIcon} />
          </CircleContainer>
        )}
      </li>
    );
  });
  return (
    <div className={`List ${props.horizontal ? 'horizontal' : ''} ${props.guideLine ? 'guideLine' : ''} ${props.className}`}>
      <ul>{items}</ul>
    </div>
  );
};

List.propTypes = {
  /** Rendered items to be displayed in the list */
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** The index of the currently selected item */
  selected: PropTypes.number.isRequired,
  /** The flag to determine if the component renders horizontally */
  horizontal: PropTypes.bool,
  /** The flag to determine if the component renders a guide line for vertical lists only */
  guideLine: PropTypes.bool,
  /** A function that will receive an array index when an item is selected */
  onChange: PropTypes.func.isRequired,
  /** Bind onKeyPress and onClick for selecting an item */
  itemInteractions: PropTypes.bool,
  /** Additional className to add to the list */
  className: PropTypes.string,
};

List.defaultProps = {
  horizontal: false,
  guideLine: false,
  itemInteractions: true,
  className: '',
};

export default List;

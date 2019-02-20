import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

import './styles.scss';

library.add(
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
);

const List = (props) => {
  if (props.items.length === 0) { return null; }
  // arrowSize should match the legend style's arrow-size variable
  // (there are testing issues with :export)
  const arrowSize = 24;
  // Selected index cannot exceed the length of the array
  const selectedIndex = (props.selected < props.items.length) ? props.selected : 0;
  const previousIcon = props.horizontal ? 'angle-left' : 'angle-up';
  const nextIcon = props.horizontal ? 'angle-right' : 'angle-down';
  const items = props.items.map((item, i) => {
    const isSelected = selectedIndex === i;
    return (
      <li
        key={item.key || item}
        className={classNames('List-Item', { selected: isSelected })}
      >
        {!isSelected || selectedIndex === 0 ? null : (
          <CircleContainer
            size={arrowSize}
            onClick={() => props.onChange(i - 1)}
            className="arrowPrevious"
            elevated={props.elevated}
          >
            <Icon size="1x" icon={previousIcon} />
          </CircleContainer>
        )}
        <div {...(props.itemInteractions ? handleInteraction(props.onChange, i) : {})} className="List-Item-Content">
          {item}
        </div>
        {!isSelected || selectedIndex === (props.items.length - 1) ? null : (
          <CircleContainer
            size={arrowSize}
            onClick={() => props.onChange(i + 1)}
            className="arrowNext"
            elevated={props.elevated}
          >
            <Icon size="1x" icon={nextIcon} />
          </CircleContainer>
        )}
      </li>
    );
  });
  return (
    <div
      className={classNames(
        'List',
        props.className,
        { horizontal: props.horizontal, guideLine: props.guideLine },
      )}
    >
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
  elevated: PropTypes.bool,
};

List.defaultProps = {
  horizontal: false,
  guideLine: false,
  itemInteractions: true,
  className: '',
  elevated: false,
};

export default List;

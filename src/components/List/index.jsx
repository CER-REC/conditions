import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
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
const scrollDelay = 250;
const handleScroll = throttle((deltaY, currentIndex, length) => {
  /* Browsers + devices provide different values using different units, so
  * we can't use deltaY directly
  */
  const direction = Math.sign(deltaY, currentIndex, length);
  if (!direction || deltaY === 0) return null;
  const newIndex = Math.min(
    Math.max(0, currentIndex + direction),
    length - 1,
  );
  return newIndex;
}, scrollDelay, { leading: true });

class List extends React.PureComponent {
  componentRef = null;

  componentDidMount() {
    if (this.componentRef) {
      this.componentRef.addEventListener('wheel', this.throttleScrollEvents);
    }
  }

  componentWillUnmount() {
    if (this.componentRef) {
      this.componentRef.removeEventListener('wheel', this.throttleScrollEvents);
    }
  }

  throttleScrollEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = handleScroll(e.deltaY, this.props.selected, this.props.items.length);
    if (newIndex !== this.props.selected && newIndex !== null) this.props.onChange(newIndex);
  }

  renderArrow(next, selectedIndex) {
    const hidden = ((next === false && selectedIndex === 0)
      || (next === true && selectedIndex === this.props.items.length - 1));

    // arrowSize should match the legend style's arrow-size variable
    // (there are testing issues with :export)
    const arrowSize = 24;
    const previousIcon = this.props.horizontal ? 'angle-left' : 'angle-up';
    const nextIcon = this.props.horizontal ? 'angle-right' : 'angle-down';

    return (
      <CircleContainer
        size={arrowSize}
        onClick={() => this.props.onChange(selectedIndex + (next ? 1 : -1))}
        className={classNames('arrow', next ? 'arrowNext' : 'arrowPrevious', { hidden })}
      >
        <Icon size="1x" icon={next ? nextIcon : previousIcon} />
      </CircleContainer>
    );
  }

  render = () => {
    const { arrowsAtEdges } = this.props;
    if (this.props.items.length === 0) { return null; }

    // Selected index cannot exceed the length of the array
    const selectedIndex = (this.props.selected < this.props.items.length) ? this.props.selected : 0;

    return (
      <div
        ref={(node) => { this.componentRef = node; }}
        className={classNames(
          'List',
          this.props.className,
          { horizontal: this.props.horizontal, guideLine: this.props.guideLine },
        )}
      >
        <ul>
          {!arrowsAtEdges
            ? null
            : <li className="List-Arrow">{this.renderArrow(false, selectedIndex)}</li>}
          {this.props.items.map((item, i) => (
            <li
              key={item.key || item}
              className={classNames('List-Item', { selected: selectedIndex === i })}
            >
              {arrowsAtEdges || selectedIndex !== i ? null : this.renderArrow(false, selectedIndex)}
              <div
                {...handleInteraction(this.props.itemInteractions && this.props.onChange, i)}
                className="List-Item-Content"
              >
                {item}
              </div>
              {arrowsAtEdges || selectedIndex !== i ? null : this.renderArrow(true, selectedIndex)}
            </li>
          ))}
          {!arrowsAtEdges
            ? null
            : <li className="List-Arrow">{this.renderArrow(true, selectedIndex)}</li>}
        </ul>
      </div>
    );
  }
}

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
  arrowsAtEdges: PropTypes.bool,
};

List.defaultProps = {
  horizontal: false,
  guideLine: false,
  itemInteractions: true,
  className: '',
  elevated: false,
  arrowsAtEdges: false,
};

export default List;

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
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

import './styles.scss';
import Arrow from '../Arrow';

library.add(
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
);

class List extends React.PureComponent {
  handleScroll = debounce((deltaY) => {
    /* Browsers + devices provide different values using different units, so
    * we can't use deltaY directly
    */
    const direction = (deltaY > 0 && 1) || (deltaY < 0 && -1);
    if (!direction) return;

    const newIndex = Math.min(
      Math.max(0, this.props.selected + direction),
      this.props.items.length - 1,
    );

    if (newIndex !== this.props.selected) this.props.onChange(newIndex);
  }, 200, { leading: true })

  debounceScrollEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleScroll(e.deltaY);
  }

  renderArrow(next, selectedIndex) {
    const hidden = ((next === false && selectedIndex === 0)
      || (next === true && selectedIndex === this.props.items.length - 1));

    // arrowSize should match the legend style's arrow-size variable
    // (there are testing issues with :export)
    const arrowSize = 24;
    const previousArrow = this.props.horizontal ? 'Left' : 'Up';
    const nextArrow = this.props.horizontal ? 'Right' : 'Down';
    

  
    return (
      <CircleContainer
        size={arrowSize}
        onClick={() => this.props.onChange(selectedIndex + (next ? 1 : -1))}
        className={classNames('arrow', next ? 'arrowNext' : 'arrowPrevious', { hidden })}
      >
      <Arrow orientation = {next ? nextArrow : previousArrow}/>
        

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
        className={classNames(
          'List',
          this.props.className,
          { horizontal: this.props.horizontal, guideLine: this.props.guideLine },
        )}
        onWheel={this.debounceScrollEvents}
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

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
import Icon from '../Icon';

import './styles.scss';

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
    const previousIcon = this.props.horizontal ? 'angle-left' : 'angle-up';
    const nextIcon = this.props.horizontal ? 'angle-right' : 'angle-down';
    
//        <Icon size="1x" icon={next ? nextIcon : previousIcon} />

    //What i need to do is pass different svg's based on wether its next or not and wi
    let firstPathStartX,firstPathEndX, firstPathStartY, firstPathEndY,secondPathStartX, secondPathEndX, secondPathStartY, secondPathEndY;
    let point1X, point1Y, point2X, point2Y, point3X, point3Y;

    if (this.props.horizontal){
     
      point1Y = 11.55;
      point2Y =  12;
      point3Y = 12.45;
      firstPathStartY = 12;
      secondPathStartY = 12;

      firstPathEndY = 6.3;
      secondPathEndY = 17.7;

      if (!next){
        //right angle case
        point1X = 4.7;
        point2X =  6;
        point3X = 4.7;

        firstPathStartX = 5;
        secondPathStartX = 5;
     
        firstPathEndX = 16;
        secondPathEndX = 16;
         
      } else{
        //left angle case
        point1X, point3X = 19.3;
        point2X = 18;
        firstPathStartX, secondPathStartX = 19;
        firstPathEndX , secondPathEndX = 8;
      }

    } else {
      point1X = 11.55;
      point2X =  12;
      point3X = 12.45;

      firstPathStartX = 12;
      secondPathStartX = 12;

      firstPathEndX = 6.3;
      secondPathEndX = 17.7;
      if (!next){
        //up angle case
        point1Y = 4.7;
        point2Y =  6;
        point3Y = 4.7;

        firstPathStartY = 5;
        secondPathStartY = 5;
     
        firstPathEndY = 16;
        secondPathEndY = 16;
      } else{
        //down angle case
        point1Y = 19.3;
        point2Y =  18;
        point3Y = 19.3;
        firstPathStartY = 19;
        secondPathStartY = 19;

        firstPathEndY = 8;
        secondPathEndY = 8;
      }

    }
    let firstPath = "M" + firstPathStartX + " " + (firstPathStartY) + " " + firstPathEndX + " " + (firstPathEndY);
    let secondPath = "M" + secondPathStartX + " " + (secondPathStartY) + " " + secondPathEndX + " " + (secondPathEndY);
    let triangle = "M" + point1X + " " + point1Y + "L " + point2X + " " + point2Y + "L " + point3X + " " + point3Y;


    return (
      <CircleContainer
        size={arrowSize}
        onClick={() => this.props.onChange(selectedIndex + (next ? 1 : -1))}
        className={classNames('arrow', next ? 'arrowNext' : 'arrowPrevious', { hidden })}
      >
        
          <svg class="arrow" width="24" height="24">
          <circle cx="12" cy="12" r="11" stroke="blue" stroke-width="0.7" fill="none" />
            <path d={firstPath} stroke="red" stroke-width="1.3" fill="none"></path>
            <path d={secondPath} stroke="red" stroke-width="1.3" fill="none"></path>
            <path d={triangle} fill= "red"/>
         </svg>
        
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

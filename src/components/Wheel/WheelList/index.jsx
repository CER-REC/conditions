import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import List from '../../List';
import './styles.scss';

const offsetClasses = ['', 'oneAway', 'twoAway', 'threeAway'];
const indexOffsets = [-3, -2, -1, 0, 1, 2, 3];

class WheelList extends React.PureComponent {
  wrapIndex = i => (
    (this.props.selected + i + this.props.listContent.length)
    % this.props.listContent.length
  )

  handleOnChange = (i) => {
    const newIndex = this.wrapIndex(i - 3);
    this.props.onChange(newIndex);
  }

  render() {
    const listElements = indexOffsets.map((offset) => {
      const text = this.props.listContent[this.wrapIndex(offset)];

      return (
        <span
          className={offsetClasses[Math.abs(offset)]}
          // eslint-disable-next-line react/no-array-index-key
          key={`${text}-${offset}`}
        >
          {text}
        </span>
      );
    });

    return (
      <div
        className={classNames('WheelList', this.props.className)}
        onScroll={this.scrollHandler}
      >
        <div className="labelContainer">
          <FormattedMessage id={`components.companyWheel.list.${this.props.wheelType}`}>
            {text => <span className="label">{text}</span>}
          </FormattedMessage>
          <span className="selected" style={{ width: this.props.textClippingRadius }}>
            {this.props.listContent[this.props.selected]}
          </span>
        </div>
        <div className="listContainer">
          <div className="list">
            <List
              elevated
              items={listElements}
              onChange={this.handleOnChange}
              selected={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

WheelList.propTypes = {
  /** Distance at which to clip the selected text. Requires a valid CSS width. */
  textClippingRadius: PropTypes.string,
  /** Additional classes to apply */
  className: PropTypes.string,
  /** Event handler, will receive the array index being selected */
  onChange: PropTypes.func.isRequired,
  /** Index of the currently selected item in 'listContent' */
  selected: PropTypes.number.isRequired,
  /** Wheel mode */
  wheelType: PropTypes.oneOf(['company', 'location']).isRequired,
  /** Array of company/location names to pull the list from */
  listContent: PropTypes.arrayOf(PropTypes.node).isRequired,
};

WheelList.defaultProps = {
  className: null,
  textClippingRadius: '50%',
};
export default WheelList;

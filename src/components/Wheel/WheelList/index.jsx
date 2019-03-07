import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import List from '../../List';
import './styles.scss';

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
    const label = (this.props.wheelType === 'location')
      ? (
        <FormattedMessage id="components.companyWheel.list.location">
          {text => <span className="label">{text}</span>}
        </FormattedMessage>
      )
      : (
        <FormattedMessage id="components.companyWheel.list.company">
          {text => <span className="label">{text}</span>}
        </FormattedMessage>
      );

    const indicesToShow = [
      this.wrapIndex(-3),
      this.wrapIndex(-2),
      this.wrapIndex(-1),
      this.wrapIndex(0),
      this.wrapIndex(1),
      this.wrapIndex(2),
      this.wrapIndex(3),
    ];

    const classes = [
      'threeAway',
      'twoAway',
      'oneAway',
      '',
      'oneAway',
      'twoAway',
      'threeAway',
    ];

    const listElements = indicesToShow.map((listIndex, displayIndex) => {
      const text = this.props.listContent[listIndex];

      return (
        <span
          className={classes[displayIndex]}
          // eslint-disable-next-line react/no-array-index-key
          key={`${text}-${displayIndex}`}
        >
          {text}
        </span>
      );
    });

    const selectedText = this.props.listContent[this.props.selected];
    const selectedElement = (
      <span className="selected" style={{ width: this.props.textClippingRadius }}>
        {selectedText}
      </span>
    );

    return (
      <div
        className={classNames('WheelList', this.props.className)}
        onScroll={this.scrollHandler}
      >
        <div className="labelContainer">{label} {selectedElement}</div>
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

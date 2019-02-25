import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import handleInteraction from '../../../utilities/handleInteraction';
import List from '../../List';
import './styles.scss';

class WheelList extends React.PureComponent {
  handleOnChange = element => this.props.onChange(element.props['data-index'])

  wrapIndex = i => (
    (this.props.selected + i + this.props.listContent.length)
    % this.props.listContent.length
  );

  render() {
    const label = (this.props.showingLocation)
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
      'dummy',
      'oneAway',
      'twoAway',
      'threeAway',
    ];

    const listElements = indicesToShow.map((listIndex, displayIndex) => {
      const text = this.props.listContent[listIndex];
      const trimmed = (text.length < 15)
        ? text
        : `${text.substring(0, 13)}...`;

      return (
        <span
          className={classes[displayIndex]}
          data-index={listIndex}
          // eslint-disable-next-line react/no-array-index-key
          key={`${trimmed}-${displayIndex}`}
        >
          {text}
        </span>
      );
    });

    const selectedText = this.props.listContent[this.props.selected];
    const selectedElement = (
      <span
        className="selected"
        style={{ width: (this.props.outerRadius) }}
      >
        {selectedText}
      </span>
    );

    return (
      <div
        className={classNames('WheelList', this.props.className)}
        onScroll={this.scrollHandler}
      >
        <div className="labelContainer">{label} {selectedElement}</div>
        <div className="listContainer" style={{ width: (this.props.innerRadius * 2), height: (this.props.innerRadius * 2) }}>
          <div className="list">
            <List
              elevated
              items={listElements}
              onChange={i => this.handleOnChange(listElements[i])}
              selected={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

WheelList.propTypes = {
  /** Inner radius of the wheel; used to crop unselected items */
  innerRadius: PropTypes.number.isRequired,
  /** Outer radius of the wheel; used to crop the selected item */
  outerRadius: PropTypes.number.isRequired,
  /** Additional classes to apply */
  className: PropTypes.string.isRequired,
  /** Event handler, will receive the array index being selected */
  onChange: PropTypes.func.isRequired,
  /** Index of the currently selected item in 'listContent' */
  selected: PropTypes.number.isRequired,
  /** Toggle for Company or Location mode */
  showingLocation: PropTypes.bool,
  /** Array of company/location names to pull the list from */
  listContent: PropTypes.arrayOf(PropTypes.node).isRequired,
};

WheelList.defaultProps = {
  showingLocation: false,
};
export default WheelList;

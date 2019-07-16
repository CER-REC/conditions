import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import List from '../../List';
import './styles.scss';

const offsetClasses = ['', 'oneAway', 'twoAway', 'threeAway'];
const indexOffsets = [-3, -2, -1, 0, 1, 2, 3];
class WheelList extends React.Component {
  static wrapIndex= (i, selected, length) => (selected + i + length)
  % length;

  constructor(props) {
    super(props);
    this.state = {
      listElements: [],
    };
  }

  static getDerivedStateFromProps(props) {
    const listElements = props.listContent.length > 0
      ? (indexOffsets.map((offset) => {
        const text = props.listContent[WheelList.wrapIndex(
          offset, props.selected, props.listContent.length,
        )].name;
        return (
          <span
            title={text}
            className={offsetClasses[Math.abs(offset)]}
            key={`${text}-${offset}`}
          >
            {text}
          </span>
        );
      }))
      : [];
    return { listElements };
  }

  handleOnChange = i => this.props.onChange(
    WheelList.wrapIndex(i - 3, this.props.selected, this.props.listContent.length),
  );

  render() {
    return (
      <div className={classNames('WheelList', this.props.className)}>
        <div className="labelContainer">
          <FormattedMessage id={`components.companyWheel.list.${this.props.wheelType}`}>
            {text => <span className="label">{text}:</span>}
          </FormattedMessage>
          { this.props.listContent.length > 0
            ? (
              <span
                title={this.props.listContent[this.props.selected].name}
                className="selected"
              >
                {this.props.listContent[this.props.selected].name}
              </span>
            )
            : null
          }
        </div>
        <div className="listContainer">
          { this.props.listContent.length > 0
            ? (
              <div className="list">
                <List
                  elevated
                  items={this.state.listElements}
                  onChange={this.handleOnChange}
                  selected={3}
                />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

WheelList.propTypes = {
  /** Additional classes to apply */
  className: PropTypes.string,
  /** Event handler, will receive the array index being selected */
  onChange: PropTypes.func.isRequired,
  /** Index of the currently selected item in 'listContent' */
  selected: PropTypes.number.isRequired,
  /** Wheel mode */
  wheelType: PropTypes.oneOf(['company', 'location']).isRequired,
  /** Array of company/location names to pull the list from */
  listContent: PropTypes.arrayOf(PropTypes.any).isRequired,
};

WheelList.defaultProps = {
  className: null,
};

export default WheelList;

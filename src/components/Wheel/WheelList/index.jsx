import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import handleInteraction from '../../../utilities/handleInteraction';
import List from '../../List';
import './styles.scss';

class WheelList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['location', 'company']).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    companyList: PropTypes.arrayOf(PropTypes.node).isRequired,
    locationList: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  handleOnChange = (element) => {
    this.props.onChange(element.props['data-index']);
  }

  render() {
    const [label, listInput] = (this.props.mode === 'company')
      ? [
        <FormattedMessage id="components.companyWheel.list.company">
          {text => <span className="label">{text}</span>}
        </FormattedMessage>,
        this.props.companyList,
      ]
      : [
        <FormattedMessage id="components.companyWheel.list.location">
          {text => <span className="label">{text}</span>}
        </FormattedMessage>,
        this.props.locationList,
      ];

    const indicesToShow = [
      (this.props.selected + listInput.length - 3) % listInput.length,
      (this.props.selected + listInput.length - 2) % listInput.length,
      (this.props.selected + listInput.length - 1) % listInput.length,
      this.props.selected,
      (this.props.selected + listInput.length + 1) % listInput.length,
      (this.props.selected + listInput.length + 2) % listInput.length,
      (this.props.selected + listInput.length + 3) % listInput.length,
    ];

    const classes = [
      'threeAway',
      'twoAway',
      'oneAway',
      'selected',
      'oneAway',
      'twoAway',
      'threeAway',
    ];

    const listElements = indicesToShow.map((listIndex, displayIndex) => {
      const text = listInput[listIndex];
      const trimmed = (text.length < 15)
        ? text
        : `${text.substring(0, 13)}...`;

      return (
        <span
          className={classes[displayIndex]}
          data-index={listIndex}
          key={trimmed}
        >
          {trimmed}
        </span>
      );
    });

    return (
      <div
        className={classNames('WheelList', this.props.className)}
        onScroll={this.scrollHandler}
      >
        <div className="labelContainer">{label}</div>
        <div className="listContainer">
          <List
            elevated
            items={listElements}
            onChange={i => this.handleOnChange(listElements[i])}
            selected={3}
          />
        </div>
      </div>
    );
  }
}

export default WheelList;

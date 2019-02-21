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

  handleOnClick = () => {

    this.props.onChange();
  }

  render() {
    let message = <FormattedMessage id="components.companyWheel.list.company" />;
    let renderedList = this.props.companyList;
    if (this.props.mode === 'location') {
      message = <FormattedMessage id="components.companyWheel.list.location" />;
      renderedList = this.props.locationList;
    }
    const checkLength = renderedList.map((k) => {
      if (k.length >= 15) {
        k = `${k.substring(0, 13)}...`;
      }
      return k;
    });
    return (
      <div
        className={classNames('WheelList', this.props.className)}
      >
        {message}
        <List
          className="items-list"
          elevated
          items={checkLength.sort()}
          onChange={this.handleOnClick}
          selected={this.props.selected}
        />
      </div>
    );
  }
}

export default WheelList;

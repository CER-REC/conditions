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

  scrollHandler = (event) => {
    console.log(event.target.clientY);
    console.log(event.target);
  }

  render() {
    let message = <FormattedMessage id="components.companyWheel.list.company" />;
    let listByMode = this.props.companyList;
    if (this.props.mode === 'location') {
      message = <FormattedMessage id="components.companyWheel.list.location" />;
      listByMode = this.props.locationList;
    }
    const renderedList = listByMode.map((k) => {
      if (k.length >= 15) {
        k = `${k.substring(0, 13)}...`;
      }
      return k;
    }).sort();
    return (
      <div
        className={classNames('WheelList', this.props.className)}
        onScroll={this.scrollHandler}
      >
        {message}
        <List
          className="items-list"
          elevated
          items={renderedList}
          onChange={this.handleOnClick}
          selected={this.props.selected}
        />
      </div>
    );
  }
}

export default WheelList;

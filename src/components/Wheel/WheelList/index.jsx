import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import handleInteraction from '../../../utilities/handleInteraction';
import List from '../../List';
import './styles.scss';

const WheelList = (props) => {
  let message = <FormattedMessage id="components.companyWheel.list.company" />;
  let renderedList = props.companyList;
  if (props.mode === 'location') {
    message = <FormattedMessage id="components.companyWheel.list.location" />;
    renderedList = props.locationList;
  }
  const checkFifteen = renderedList.map((k) => {
    if (k.length >= 15) {
      renderedList = `${k}...`;
    }
    return k;
  });
  return (
    <div
      className={classNames('WheelList', props.className)}
    >
      {message}
      <List
        className="items-list"
        elevated
        key={renderedList}
        items={checkFifteen}
        onChange={() => {}}
        selected={props.selected}
      />
    </div>
  );
};

WheelList.propTypes = {
  className: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['location', 'company']).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  companyList: PropTypes.arrayOf(PropTypes.node).isRequired,
  locationList: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default WheelList;
